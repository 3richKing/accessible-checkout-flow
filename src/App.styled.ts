import styled from 'styled-components';

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const SkipLink = styled.a`
  position: absolute;
  left: ${({ theme }) => theme.space.md};
  top: -3rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryText};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: top 0.15s ease-in;
  z-index: 10;

  &:focus {
    top: ${({ theme }) => theme.space.md};
  }
`;

export const Header = styled.header`
  padding: ${({ theme }) => `${theme.space.lg} ${theme.space.md}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const HeaderInner = styled.div`
  max-width: 60rem;
  margin: 0 auto;
`;

export const Brand = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;

export const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 60rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.space.xl} ${({ theme }) => theme.space.md};
`;

export const Footer = styled.footer`
  padding: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.md};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
