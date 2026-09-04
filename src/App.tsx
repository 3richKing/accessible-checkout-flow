import { CartProvider } from './cart/CartContext';
import { Checkout } from './checkout/Checkout';
import { CheckoutProvider } from './checkout/CheckoutContext';
import { Brand, Footer, Header, HeaderInner, Main, Page, SkipLink, Title } from './App.styled';

export const App = () => (
  <CartProvider>
    <CheckoutProvider>
      <Page>
        <SkipLink href="#main-content">Skip to main content</SkipLink>
        <Header>
          <HeaderInner>
            <Brand>Nova Store</Brand>
            <Title>Checkout</Title>
          </HeaderInner>
        </Header>
        <Main id="main-content">
          <Checkout />
        </Main>
        <Footer>
          <p>Demo project. No real payments are processed.</p>
        </Footer>
      </Page>
    </CheckoutProvider>
  </CartProvider>
);
