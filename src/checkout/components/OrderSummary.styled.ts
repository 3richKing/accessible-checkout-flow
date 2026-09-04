import styled from 'styled-components';

export const SummaryCard = styled.aside`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space.lg};
  align-self: start;
`;

export const SummaryHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const LineList = styled.ul`
  list-style: none;
  margin: 0 0 ${({ theme }) => theme.space.md};
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
`;

export const LineItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TotalsList = styled.dl`
  margin: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.space.md};
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
`;

export const TotalRow = styled.div<{ $emphasis?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme, $emphasis }) => ($emphasis ? theme.fontSizes.lg : theme.fontSizes.md)};
  font-weight: ${({ theme, $emphasis }) =>
    $emphasis ? theme.fontWeights.bold : theme.fontWeights.regular};
  color: ${({ theme, $emphasis }) => ($emphasis ? theme.colors.text : theme.colors.textMuted)};

  dt,
  dd {
    margin: 0;
  }
`;
