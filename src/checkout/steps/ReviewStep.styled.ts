import styled from 'styled-components';

export const ReviewGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space.lg};
`;

export const ReviewSection = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.space.sm};
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const DetailList = styled.dl`
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.space.xs};

  dt {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textMuted};
  }

  dd {
    margin: 0;
  }
`;
