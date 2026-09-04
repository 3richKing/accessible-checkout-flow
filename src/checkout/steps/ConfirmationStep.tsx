import { useEffect, useRef } from 'react';
import { useCheckout } from '../CheckoutContext';
import { ConfirmationHeading, Reference, SupportingText } from './ConfirmationStep.styled';

export const ConfirmationStep = () => {
  const { orderReference, shipping } = useCheckout();
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the confirmation heading so assistive tech announces arrival.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section aria-labelledby="confirmation-heading">
      <ConfirmationHeading id="confirmation-heading" ref={headingRef} tabIndex={-1}>
        Order confirmed
      </ConfirmationHeading>
      <Reference>
        Your order reference is <strong>{orderReference}</strong>.
      </Reference>
      <SupportingText>
        Thank you{shipping ? `, ${shipping.fullName}` : ''}. A confirmation has been sent for your
        records. This is a demo, so no payment was taken and nothing will be shipped.
      </SupportingText>
    </section>
  );
};
