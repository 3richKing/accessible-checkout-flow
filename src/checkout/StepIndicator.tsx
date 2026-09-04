import { STEPS, STEP_LABELS, useCheckout } from './CheckoutContext';
import { Nav, StepItem, StepList, StepNumber } from './StepIndicator.styled';

export const StepIndicator = () => {
  const { stepIndex } = useCheckout();

  return (
    <Nav aria-label="Checkout progress">
      <StepList>
        {STEPS.map((step, index) => {
          const state = index < stepIndex ? 'done' : index === stepIndex ? 'current' : 'upcoming';
          return (
            <StepItem
              key={step}
              $state={state}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              <StepNumber $state={state} aria-hidden="true">
                {index + 1}
              </StepNumber>
              <span>
                {STEP_LABELS[step]}
                {state === 'done' && <span className="sr-only"> (completed)</span>}
              </span>
            </StepItem>
          );
        })}
      </StepList>
    </Nav>
  );
};
