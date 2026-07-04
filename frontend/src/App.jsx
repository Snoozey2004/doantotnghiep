import AppRoutes from "./routes/AppRoutes.jsx";
import TokenExpirationManager from "./components/auth/TokenExpirationManager.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <TokenExpirationManager />
      <AppRoutes />
    </>
  );
}
