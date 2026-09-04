import { useCart } from '../../cart/CartContext';
import { formatCurrency } from '../../utils/format';
import { useCheckout } from '../CheckoutContext';
import { ButtonRow, PrimaryButton, SecondaryButton, StepHeading } from '../common.styled';
import { DetailList, ReviewGrid, ReviewSection, SectionTitle } from './ReviewStep.styled';

const maskCardNumber = (cardNumber: string): string => {
  const lastFour = cardNumber.slice(-4);
  return `Card ending in ${lastFour}`;
};

export const ReviewStep = () => {
  const { lines, totals } = useCart();
  const { shipping, payment, goToPrevious, placeOrder } = useCheckout();

  return (
    <section aria-labelledby="review-heading">
      <StepHeading id="review-heading">Review and place order</StepHeading>

      <ReviewGrid>
        <ReviewSection aria-labelledby="review-items">
          <SectionTitle id="review-items">Items</SectionTitle>
          <DetailList>
            {lines.map((line) => (
              <div key={line.product.id}>
                <dt>
                  {line.product.name} x {line.quantity}
                </dt>
                <dd>{formatCurrency(line.product.unitPrice * line.quantity)}</dd>
              </div>
            ))}
            <div>
              <dt>Total</dt>
              <dd>{formatCurrency(totals.total)}</dd>
            </div>
          </DetailList>
        </ReviewSection>

        {shipping && (
          <ReviewSection aria-labelledby="review-shipping">
            <SectionTitle id="review-shipping">Shipping to</SectionTitle>
            <DetailList>
              <div>
                <dt>Name</dt>
                <dd>{shipping.fullName}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>
                  {shipping.addressLine1}
                  {shipping.addressLine2 ? `, ${shipping.addressLine2}` : ''}, {shipping.city},{' '}
                  {shipping.postalCode}, {shipping.country}
                </dd>
              </div>
            </DetailList>
          </ReviewSection>
        )}

        {payment && (
          <ReviewSection aria-labelledby="review-payment">
            <SectionTitle id="review-payment">Payment</SectionTitle>
            <DetailList>
              <div>
                <dt>Name on card</dt>
                <dd>{payment.cardName}</dd>
              </div>
              <div>
                <dt>Card</dt>
                <dd>{maskCardNumber(payment.cardNumber)}</dd>
              </div>
            </DetailList>
          </ReviewSection>
        )}
      </ReviewGrid>

      <ButtonRow>
        <SecondaryButton type="button" onClick={goToPrevious}>
          Back
        </SecondaryButton>
        <PrimaryButton type="button" onClick={placeOrder}>
          Place order
        </PrimaryButton>
      </ButtonRow>
    </section>
  );
};
