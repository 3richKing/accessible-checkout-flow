# Accessible Checkout Flow

A multi-step checkout demo built with React and TypeScript that puts
accessibility, form validation, and testing first. It walks through Cart,
Shipping, Payment, Review, and Confirmation the way a real commerce storefront
would, and it is small enough to read in one sitting.

> This is a front end demo. It is not a real payment integration. No card data
> leaves the browser, nothing is sent to a server, and no payment is ever
> processed. Do not enter real card details.

## Features

- Multi-step flow: Cart, Shipping address, Payment details, Review, and
  Confirmation.
- Accessible step indicator that marks the active step with `aria-current` and
  blocks advancing past an invalid step.
- Cart with quantity steppers and remove buttons. Subtotal, tax, and total are
  derived from the cart, not duplicated, and formatted with
  `Intl.NumberFormat`.
- Shipping and Payment forms with schema validation. Errors are announced with
  `role="alert"` and tied to inputs with `aria-describedby`, and focus moves to
  the first invalid field on submit.
- Read only review of the whole order before placing it.
- Confirmation screen with a generated order reference. Focus moves to the
  confirmation heading on arrival so assistive technology announces it.
- Mobile first, responsive layout. A single column on small screens, and a two
  column layout with a persistent order summary on wider screens.

## Accessibility

Accessibility is the point of this project, not an afterthought. What was done:

- Semantic HTML throughout. Real `button`, `label`, `fieldset`, `ol`, and `dl`
  elements, no `div` acting as a button.
- Every input has a programmatic label tied via `htmlFor` and `id`, so it has an
  accessible name.
- Validation errors use `role="alert"`, `aria-invalid`, and `aria-describedby`
  so they are announced and associated with the right field.
- Focus management: submitting an invalid form moves focus to the first invalid
  field, and arriving at the confirmation step moves focus to its heading.
- Fully keyboard operable with a logical tab order and a visible focus style on
  every interactive element.
- A skip link lets keyboard users jump straight to the main content.
- The step indicator reflects progress with `aria-current="step"`.

## Tech stack

- Vite, React 18, and TypeScript in strict mode.
- styled-components with a small design token theme (colors, spacing,
  typography) and a mobile first responsive layout.
- react-hook-form with zod for schema validation and accessible inline errors.
- A small cart state in React context. Totals are derived, not stored.
- Vitest, Testing Library, and user-event running on jsdom.
- ESLint and Prettier, with `no-explicit-any` set to error.

## Getting started

Requires Node 20 or newer.

```bash
npm install
npm run dev        # start the local dev server
```

## Scripts

| Script              | What it does                              |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Start the Vite dev server.                |
| `npm run build`     | Type check and build for production.      |
| `npm run typecheck` | Run the TypeScript compiler with no emit. |
| `npm test`          | Run the test suite once with Vitest.      |
| `npm run lint`      | Run ESLint with zero warnings allowed.    |
| `npm run format`    | Format the codebase with Prettier.        |

## Testing

Tests cover the parts that matter for a checkout:

- The pure totals utility, including quantity changes and item removal.
- Validation: an empty shipping form shows accessible errors and does not
  advance, while valid data does.
- Step navigation with Back and Next, and the block on advancing from an
  invalid step.
- Accessible names: each field is found with `getByLabelText`.
- The full happy path through to a confirmation with a focused heading.

```bash
npm test
```

## Project structure

```
src/
  cart/          Cart context and the pure totals utility
  checkout/      Step flow, step components, and shared UI
  data/          Mock catalogue and configuration
  theme/         Design tokens, global styles, and typings
  utils/         Currency formatting
  test/          Test setup and a shared render helper
```

## License

MIT. See [LICENSE](LICENSE).
