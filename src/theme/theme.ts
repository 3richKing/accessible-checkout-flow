export const theme = {
  colors: {
    background: '#0b0d17',
    surface: '#161a2b',
    surfaceMuted: '#1f2437',
    border: '#2c3350',
    text: '#f2f4fb',
    textMuted: '#a7afc9',
    primary: '#3b6ef5',
    primaryText: '#ffffff',
    focus: '#7aa2ff',
    danger: '#ff6b7a',
    success: '#39d98a',
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
  },
  fontSizes: {
    sm: '0.85rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.6rem',
    xxl: '2.2rem',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  breakpoints: {
    tablet: '48rem',
  },
} as const;

export type AppTheme = typeof theme;
