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
import { shippingSchema, type ShippingFormValues } from '../schemas';

export const ShippingStep = () => {
  const { shipping, saveShipping, goToNext, goToPrevious } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: shipping?.fullName ?? '',
      addressLine1: shipping?.addressLine1 ?? '',
      addressLine2: shipping?.addressLine2 ?? '',
      city: shipping?.city ?? '',
      postalCode: shipping?.postalCode ?? '',
      country: shipping?.country ?? '',
    },
  });

  // shouldFocusError (default true) moves focus to the first invalid field.
  const onSubmit = handleSubmit((values) => {
    saveShipping(values);
    goToNext();
  });

  return (
    <section aria-labelledby="shipping-heading">
      <StepHeading id="shipping-heading">Shipping address</StepHeading>
      <Form onSubmit={onSubmit} noValidate>
        <Field
          id="fullName"
          label="Full name"
          required
          autoComplete="name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <Field
          id="addressLine1"
          label="Address line 1"
          required
          autoComplete="address-line1"
          error={errors.addressLine1?.message}
          {...register('addressLine1')}
        />
        <Field
          id="addressLine2"
          label="Address line 2 (optional)"
          autoComplete="address-line2"
          error={errors.addressLine2?.message}
          {...register('addressLine2')}
        />
        <FieldRow>
          <Field
            id="city"
            label="City"
            required
            autoComplete="address-level2"
            error={errors.city?.message}
            {...register('city')}
          />
          <Field
            id="postalCode"
            label="Postal / ZIP code"
            required
            autoComplete="postal-code"
            error={errors.postalCode?.message}
            {...register('postalCode')}
          />
        </FieldRow>
        <Field
          id="country"
          label="Country"
          required
          autoComplete="country-name"
          error={errors.country?.message}
          {...register('country')}
        />

        <ButtonRow>
          <SecondaryButton type="button" onClick={goToPrevious}>
            Back
          </SecondaryButton>
          <PrimaryButton type="submit">Continue to payment</PrimaryButton>
        </ButtonRow>
      </Form>
    </section>
  );
};
