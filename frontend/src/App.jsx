import AppRoutes from "./routes/AppRoutes.jsx";
import TokenExpirationManager from "./components/auth/TokenExpirationManager.jsx";

export default function App() {
  return (
    <>
      <TokenExpirationManager />
      <AppRoutes />
    </>
  );
}
