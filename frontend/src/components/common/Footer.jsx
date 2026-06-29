import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="vx-footer">
      <div className="vx-footer__inner">
        <div className="vx-footer__top">
          <div className="vx-footer__brand">
            <div className="vx-footer__brand-name">
              Vietnam <span>Identity</span>
            </div>
            <p>
              Khơi gợi bản sắc Việt qua từng hành trình, hương vị và câu chuyện
              của 34 tỉnh thành — một bản đồ di sản sống động.
            </p>
          </div>

          <div className="vx-footer__col">
            <h4>Khám phá</h4>
            <ul>
              <li><Link to="/search?q=">Bản đồ Việt Nam</Link></li>
              <li><Link to="/search?q=đặc sản">Đặc sản vùng miền</Link></li>
              <li><Link to="/search?q=lễ hội">Văn hóa &amp; lễ hội</Link></li>
              <li><Link to="/search?q=di tích">Địa danh &amp; di tích</Link></li>
            </ul>
          </div>

          <div className="vx-footer__col">
            <h4>Kết nối</h4>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer">Youtube</a></li>
            </ul>
          </div>

          <div className="vx-footer__col">
            <h4>Liên hệ</h4>
            <ul>
              <li><a href="mailto:hello@vietnamidentity.vn">hello@vietnamidentity.vn</a></li>
              <li><a href="tel:+842812345678">+84 28 1234 5678</a></li>
              <li>TP. Hồ Chí Minh, Việt Nam</li>
            </ul>
          </div>
        </div>

        <div className="vx-footer__bottom">
          <span>Vietnam Identity © {year} — Hành trình bản sắc Việt Nam</span>
          <span>Thiết kế &amp; phát triển với lòng tự hào dân tộc</span>
        </div>
      </div>
    </footer>
  );
}
