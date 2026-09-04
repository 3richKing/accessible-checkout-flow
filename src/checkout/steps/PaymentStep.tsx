import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useCheckout } from '../CheckoutContext';
import {
  ButtonRow,
  FieldRow,
  Form,
  PrimaryButton,
  SecondaryButton,
  StepHeading,
} from '../common.styled';
import { Field } from '../components/Field';
import { paymentSchema, type PaymentFormValues } from '../schemas';

export const PaymentStep = () => {
  const { payment, savePayment, goToNext, goToPrevious } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: payment?.cardName ?? '',
      cardNumber: payment?.cardNumber ?? '',
      expiry: payment?.expiry ?? '',
      cvc: payment?.cvc ?? '',
    },
  });

  const onSubmit = handleSubmit((values) => {
    savePayment(values);
    goToNext();
  });

  return (
    <section aria-labelledby="payment-heading">
      <StepHeading id="payment-heading">Payment details</StepHeading>
      <p id="payment-note">This is a demo. Do not enter real card details.</p>
      <Form onSubmit={onSubmit} noValidate aria-describedby="payment-note">
        <Field
          id="cardName"
          label="Name on card"
          required
          autoComplete="cc-name"
          error={errors.cardName?.message}
          {...register('cardName')}
        />
        <Field
          id="cardNumber"
          label="Card number"
          required
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="4111111111111111"
          error={errors.cardNumber?.message}
          {...register('cardNumber')}
        />
        <FieldRow>
          <Field
            id="expiry"
            label="Expiry (MM/YY)"
            required
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="04/28"
            error={errors.expiry?.message}
            {...register('expiry')}
          />
          <Field
            id="cvc"
            label="Security code (CVC)"
            required
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            error={errors.cvc?.message}
            {...register('cvc')}
          />
        </FieldRow>

        <ButtonRow>
          <SecondaryButton type="button" onClick={goToPrevious}>
            Back
          </SecondaryButton>
          <PrimaryButton type="submit">Review order</PrimaryButton>
        </ButtonRow>
      </Form>
    </section>
  );
};
