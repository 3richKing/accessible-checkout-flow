import styled from 'styled-components';

export const Nav = styled.nav`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

export const StepList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.sm};
`;

export const StepItem = styled.li<{ $state: 'done' | 'current' | 'upcoming' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border: 1px solid
    ${({ theme, $state }) => ($state === 'current' ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $state }) =>
    $state === 'current' ? theme.colors.surfaceMuted : 'transparent'};
  color: ${({ theme, $state }) =>
    $state === 'upcoming' ? theme.colors.textMuted : theme.colors.text};
`;

export const StepNumber = styled.span<{ $state: 'done' | 'current' | 'upcoming' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: ${({ theme, $state }) =>
    $state === 'upcoming' ? theme.colors.surfaceMuted : theme.colors.primary};
  color: ${({ theme, $state }) =>
    $state === 'upcoming' ? theme.colors.textMuted : theme.colors.primaryText};
`;
