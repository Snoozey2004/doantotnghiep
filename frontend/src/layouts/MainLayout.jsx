import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import AIChatWidget from "../components/common/AIChatWidget.jsx";

export default function MainLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <AIChatWidget />
    </div>
  );
}
