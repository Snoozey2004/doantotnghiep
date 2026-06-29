import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import AIChatWidget from "../components/common/AIChatWidget.jsx";
import SmoothScroll from "../components/common/SmoothScroll.jsx";
import ScrollProgress from "../components/common/ScrollProgress.jsx";
import CustomCursor from "../components/common/CustomCursor.jsx";
import PageLoader from "../components/common/PageLoader.jsx";

export default function MainLayout({ children }) {
  return (
    <div>
      {/* Lớp trải nghiệm cao cấp — không ảnh hưởng layout/logic */}
      <SmoothScroll />
      <PageLoader />
      <ScrollProgress />
      <CustomCursor />

      <Header />
      {children}
      <Footer />
      <AIChatWidget />
    </div>
  );
}
