import { render, type RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { CartProvider } from '../cart/CartContext';
import { CheckoutProvider } from '../checkout/CheckoutContext';
import { theme } from '../theme/theme';

export const renderWithProviders = (ui: ReactElement): RenderResult =>
  render(
    <ThemeProvider theme={theme}>
      <CartProvider>
        <CheckoutProvider>{ui}</CheckoutProvider>
      </CartProvider>
    </ThemeProvider>,
  );

export const setupUser = () => userEvent.setup();
