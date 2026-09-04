import { screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders, setupUser } from '../test/renderApp';
import { Checkout } from './Checkout';

const goToShipping = async (user: ReturnType<typeof setupUser>) => {
  await user.click(screen.getByRole('button', { name: /continue to shipping/i }));
};

const fillShipping = async (user: ReturnType<typeof setupUser>) => {
  await user.type(screen.getByLabelText(/full name/i), 'Ada Lovelace');
  await user.type(screen.getByLabelText(/address line 1/i), '1 Analytical Way');
  await user.type(screen.getByLabelText(/city/i), 'London');
  await user.type(screen.getByLabelText(/postal \/ zip code/i), 'EC1A 1BB');
  await user.type(screen.getByLabelText(/country/i), 'United Kingdom');
};

const fillPayment = async (user: ReturnType<typeof setupUser>) => {
  await user.type(screen.getByLabelText(/name on card/i), 'Ada Lovelace');
  await user.type(screen.getByLabelText(/card number/i), '4111111111111111');
  await user.type(screen.getByLabelText(/expiry/i), '04/28');
  await user.type(screen.getByLabelText(/security code/i), '123');
};

describe('Checkout flow', () => {
  it('starts on the cart step with the cart marked as the current step', () => {
    renderWithProviders(<Checkout />);

    expect(screen.getByRole('heading', { name: /your cart/i })).toBeInTheDocument();

    const currentStep = screen.getByRole('listitem', { current: 'step' });
    expect(currentStep).toHaveTextContent(/cart/i);
  });

  it('updates the displayed line price when the quantity changes', async () => {
    const user = setupUser();
    renderWithProviders(<Checkout />);

    expect(screen.getByText('$499.99')).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /increase quantity of nova console bundle/i }),
    );

    expect(screen.getByText('$999.98')).toBeInTheDocument();
  });

  it('removes a line item when its remove button is pressed', async () => {
    const user = setupUser();
    renderWithProviders(<Checkout />);

    expect(screen.getByText('Wireless Controller')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /remove wireless controller from cart/i }));

    expect(screen.queryByText('Wireless Controller')).not.toBeInTheDocument();
  });

  it('navigates forward and back between steps', async () => {
    const user = setupUser();
    renderWithProviders(<Checkout />);

    await goToShipping(user);
    expect(screen.getByRole('heading', { name: /shipping address/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^back$/i }));
    expect(screen.getByRole('heading', { name: /your cart/i })).toBeInTheDocument();
  });

  it('exposes an accessible name for every shipping field', async () => {
    const user = setupUser();
    renderWithProviders(<Checkout />);
    await goToShipping(user);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address line 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postal \/ zip code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  });

  it('shows accessible errors and does not advance when shipping is submitted empty', async () => {
    const user = setupUser();
    renderWithProviders(<Checkout />);
    await goToShipping(user);

    await user.click(screen.getByRole('button', { name: /continue to payment/i }));

    const alerts = await screen.findAllByRole('alert');
    expect(alerts.length).toBeGreaterThanOrEqual(5);

    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
    // Still on the shipping step.
    expect(screen.getByRole('heading', { name: /shipping address/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /payment details/i })).not.toBeInTheDocument();
  });

  it('advances to payment when shipping is valid', async () => {
    const user = setupUser();
    renderWithProviders(<Checkout />);
    await goToShipping(user);
    await fillShipping(user);

    await user.click(screen.getByRole('button', { name: /continue to payment/i }));

    expect(await screen.findByRole('heading', { name: /payment details/i })).toBeInTheDocument();
  });

  it('completes the flow and moves focus to the confirmation heading', async () => {
    const user = setupUser();
    renderWithProviders(<Checkout />);

    await goToShipping(user);
    await fillShipping(user);
    await user.click(screen.getByRole('button', { name: /continue to payment/i }));

    await fillPayment(user);
    await user.click(screen.getByRole('button', { name: /review order/i }));

    const review = await screen.findByRole('heading', { name: /review and place order/i });
    expect(review).toBeInTheDocument();

    // Review summary reflects the entered shipping address.
    expect(screen.getByText(/1 Analytical Way/)).toBeInTheDocument();
    expect(screen.getByText(/Card ending in 1111/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /place order/i }));

    const confirmation = await screen.findByRole('heading', { name: /order confirmed/i });
    await waitFor(() => expect(confirmation).toHaveFocus());
    expect(screen.getByText(/PS-\d{6}/)).toBeInTheDocument();
  });

  it('reflects the order total in the summary once shipping is shown', async () => {
    const user = setupUser();
    renderWithProviders(<Checkout />);
    await goToShipping(user);

    const summary = screen.getByRole('complementary', { name: /order summary/i });
    // Default cart: 499.99 + 69.99 + 59.99 = 629.97 subtotal, 8% tax => 680.37 total.
    expect(within(summary).getByText('$680.37')).toBeInTheDocument();
  });
});
