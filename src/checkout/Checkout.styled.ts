import styled from 'styled-components';

export const Layout = styled.div<{ $withSummary: boolean }>`
  display: grid;
  gap: ${({ theme }) => theme.space.xl};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: ${({ $withSummary }) => ($withSummary ? '1fr 20rem' : '1fr')};
    align-items: start;
  }
`;

export const StepPanel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.space.xl};
  }
`;
