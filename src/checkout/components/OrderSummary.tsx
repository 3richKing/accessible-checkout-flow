import { useCart } from '../../cart/CartContext';
import { formatCurrency } from '../../utils/format';
import {
  LineItem,
  LineList,
  SummaryCard,
  SummaryHeading,
  TotalRow,
  TotalsList,
} from './OrderSummary.styled';

export const OrderSummary = () => {
  const { lines, totals } = useCart();

  return (
    <SummaryCard aria-labelledby="order-summary-heading">
      <SummaryHeading id="order-summary-heading">Order summary</SummaryHeading>
      <LineList>
        {lines.map((line) => (
          <LineItem key={line.product.id}>
            <span>
              {line.product.name} x {line.quantity}
            </span>
            <span>{formatCurrency(line.product.unitPrice * line.quantity)}</span>
          </LineItem>
        ))}
      </LineList>
      <TotalsList>
        <TotalRow>
          <dt>Subtotal</dt>
          <dd>{formatCurrency(totals.subtotal)}</dd>
        </TotalRow>
        <TotalRow>
          <dt>Tax</dt>
          <dd>{formatCurrency(totals.tax)}</dd>
        </TotalRow>
        <TotalRow $emphasis>
          <dt>Total</dt>
          <dd>{formatCurrency(totals.total)}</dd>
        </TotalRow>
      </TotalsList>
    </SummaryCard>
  );
};
