import { useCart } from '../../cart/CartContext';
import { formatCurrency } from '../../utils/format';
import { useCheckout } from '../CheckoutContext';
import { ButtonRow, PrimaryButton, StepHeading } from '../common.styled';
import {
  EmptyMessage,
  LineCard,
  LineControls,
  LineDescription,
  LineList,
  LineName,
  LinePrice,
  Quantity,
  RemoveButton,
  Stepper,
  StepperButton,
} from './CartStep.styled';

export const CartStep = () => {
  const { lines, setQuantity, removeLine } = useCart();
  const { goToNext } = useCheckout();

  return (
    <section aria-labelledby="cart-heading">
      <StepHeading id="cart-heading">Your cart</StepHeading>

      {lines.length === 0 ? (
        <EmptyMessage>Your cart is empty.</EmptyMessage>
      ) : (
        <LineList>
          {lines.map((line) => {
            const { id, name, description, unitPrice } = line.product;
            return (
              <LineCard key={id}>
                <div>
                  <LineName>{name}</LineName>
                  <LineDescription>{description}</LineDescription>
                  <LineDescription>{formatCurrency(unitPrice)} each</LineDescription>
                </div>
                <LineControls>
                  <Stepper role="group" aria-label={`Quantity for ${name}`}>
                    <StepperButton
                      type="button"
                      onClick={() => setQuantity(id, line.quantity - 1)}
                      disabled={line.quantity <= 1}
                      aria-label={`Decrease quantity of ${name}`}
                    >
                      &minus;
                    </StepperButton>
                    <Quantity aria-live="polite">{line.quantity}</Quantity>
                    <StepperButton
                      type="button"
                      onClick={() => setQuantity(id, line.quantity + 1)}
                      aria-label={`Increase quantity of ${name}`}
                    >
                      +
                    </StepperButton>
                  </Stepper>
                  <LinePrice>{formatCurrency(unitPrice * line.quantity)}</LinePrice>
                  <RemoveButton
                    type="button"
                    onClick={() => removeLine(id)}
                    aria-label={`Remove ${name} from cart`}
                  >
                    Remove
                  </RemoveButton>
                </LineControls>
              </LineCard>
            );
          })}
        </LineList>
      )}

      <ButtonRow>
        <PrimaryButton type="button" onClick={goToNext} disabled={lines.length === 0}>
          Continue to shipping
        </PrimaryButton>
      </ButtonRow>
    </section>
  );
};
