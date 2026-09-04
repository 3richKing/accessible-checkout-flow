import { forwardRef, type InputHTMLAttributes } from 'react';
import { ErrorText, FieldWrapper, Input, Label, RequiredMark } from './Field.styled';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ id, label, error, required = false, ...inputProps }, ref) => {
    const errorId = `${id}-error`;

    return (
      <FieldWrapper>
        <Label htmlFor={id}>
          {label}
          {required && <RequiredMark aria-hidden="true">*</RequiredMark>}
        </Label>
        <Input
          id={id}
          ref={ref}
          $invalid={Boolean(error)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          aria-required={required || undefined}
          {...inputProps}
        />
        {error && (
          <ErrorText id={errorId} role="alert">
            {error}
          </ErrorText>
        )}
      </FieldWrapper>
    );
  },
);

Field.displayName = 'Field';
