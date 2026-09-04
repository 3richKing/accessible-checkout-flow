import { useCheckout } from './CheckoutContext';
import { Layout, StepPanel } from './Checkout.styled';
import { OrderSummary } from './components/OrderSummary';
import { StepIndicator } from './StepIndicator';
import { CartStep } from './steps/CartStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { PaymentStep } from './steps/PaymentStep';
import { ReviewStep } from './steps/ReviewStep';
import { ShippingStep } from './steps/ShippingStep';

const STEPS_WITH_SUMMARY = new Set(['shipping', 'payment', 'review']);

export const Checkout = () => {
  const { currentStep } = useCheckout();
  const withSummary = STEPS_WITH_SUMMARY.has(currentStep);

  return (
    <>
      <StepIndicator />
      <Layout $withSummary={withSummary}>
        <StepPanel>
          {currentStep === 'cart' && <CartStep />}
          {currentStep === 'shipping' && <ShippingStep />}
          {currentStep === 'payment' && <PaymentStep />}
          {currentStep === 'review' && <ReviewStep />}
          {currentStep === 'confirmation' && <ConfirmationStep />}
        </StepPanel>
        {withSummary && <OrderSummary />}
      </Layout>
    </>
  );
};
