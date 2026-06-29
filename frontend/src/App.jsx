import AppRoutes from "./routes/AppRoutes.jsx";
import TokenExpirationManager from "./components/auth/TokenExpirationManager.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import CartDrawer from "./components/common/CartDrawer.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <TokenExpirationManager />
      <AppRoutes />
      <CartDrawer />
    </>
  );
}
