import styled from 'styled-components';

export const LineList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.space.md};
`;

export const LineCard = styled.li`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`;

export const LineName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const LineDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LineControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  flex-wrap: wrap;
`;

export const Stepper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const StepperButton = styled.button`
  width: 2.25rem;
  height: 2.25rem;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Quantity = styled.span`
  min-width: 2rem;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const LinePrice = styled.span`
  min-width: 6rem;
  text-align: right;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  padding: ${({ theme }) => theme.space.xs};
  text-decoration: underline;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const EmptyMessage = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;
