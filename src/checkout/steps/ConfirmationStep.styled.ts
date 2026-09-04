import styled from 'styled-components';

export const ConfirmationHeading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.success};
  margin-bottom: ${({ theme }) => theme.space.md};

  &:focus {
    outline: none;
  }
`;

export const Reference = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.space.md};

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SupportingText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 40ch;
`;
