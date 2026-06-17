import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import provinces from "../../data/provinceData.js";

const AI_API_KEY = "AQ.Ab8RN6IWmAvTl6Xrxb3W7Zm1MNfJsGnY4qqnVdwVKKfkddRQkA";
const AI_API_URL = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
const AI_MODEL = "gemma-4-31b-it";

function stripMarkdown(text) {
  return text
    .replace(/<thought>[\s\S]*?<\/thought>/gi, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/^\s*[\*\-]\s+/gm, "• ")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trimStart();
}

function buildSystemPrompt(provinceName) {
  const provinceContext = provinceName
    ? `\n\nNGỮ CẢNH HIỆN TẠI: Người dùng đang xem trang thông tin về "${provinceName}". Hãy ưu tiên đề xuất địa điểm ăn uống, du lịch tại ${provinceName} trước khi nói về nơi khác.`
    : "";

  return `Bạn là "Trợ Lý Du Lịch Việt Nam" — AI chuyên tư vấn ẩm thực, du lịch và văn hóa Việt Nam.

NHIỆM VỤ:
• Đề xuất địa chỉ cụ thể: quán ăn, nhà hàng, quán cà phê, đặc sản nổi tiếng tại 34 tỉnh thành Việt Nam
• Giới thiệu địa điểm du lịch: danh lam thắng cảnh, di tích lịch sử, bãi biển, núi rừng
• Chia sẻ đặc sản, món ngon đặc trưng của từng vùng miền
• Tư vấn văn hóa, phong tục, lễ hội địa phương
• Cung cấp thông tin thực tế để du khách có thể đến và trải nghiệm

QUY TẮC BẮT BUỘC:
• CHỈ trả lời về ẩm thực, du lịch và văn hóa Việt Nam — tuyệt đối không nói chủ đề khác
• Từ chối lịch sự nếu hỏi về chủ đề khác (công nghệ, chính trị, thể thao quốc tế, v.v.) và hướng về du lịch Việt Nam
• Luôn cung cấp tên cụ thể, địa chỉ hoặc mô tả rõ ràng để du khách dễ tìm kiếm
• Trả lời bằng tiếng Việt (trừ khi người dùng yêu cầu ngôn ngữ khác)${provinceContext}`;
}

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Xin chào! Tôi là Trợ Lý Du Lịch Việt Nam 🇻🇳\n\nTôi có thể giúp bạn khám phá:\n• Quán ăn ngon, nhà hàng đặc sản\n• Địa điểm du lịch hấp dẫn\n• Văn hóa & lễ hội địa phương\n\nBạn muốn tìm hiểu về tỉnh thành nào?"
};

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  const provinceSlug = location.pathname.startsWith("/province/")
    ? location.pathname.slice("/province/".length).split("?")[0]
    : null;
  const province = provinceSlug ? provinces.find((p) => p.slug === provinceSlug) : null;
  const provinceName = province?.name || null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: [
            { role: "system", content: buildSystemPrompt(provinceName) },
            ...updatedMessages.map((m) => ({ role: m.role, content: m.content }))
          ],
          max_tokens: 1024,
          temperature: 0.7
        })
      });

      if (!res.ok) {
        const errBody = await res.text();
        console.error("[AI Chat] API error", res.status, errBody);
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      const raw = data.choices?.[0]?.message?.content || "Xin lỗi, tôi không nhận được phản hồi. Vui lòng thử lại.";
      const reply = stripMarkdown(raw);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("[AI Chat] Fetch error:", err);
      setError(err.message);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Xin lỗi, đã xảy ra lỗi: ${err.message}\n\nVui lòng kiểm tra Console (F12) để biết chi tiết.`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="ai-chat-widget">
      {isOpen && (
        <div className="ai-chat-panel" role="dialog" aria-label="Trợ lý du lịch AI">
          <div className="ai-chat-header">
            <div className="ai-chat-header-info">
              <div className="ai-chat-avatar" aria-hidden="true">🇻🇳</div>
              <div>
                <div className="ai-chat-header-name">Trợ Lý Du Lịch</div>
                <div className="ai-chat-header-sub">Ẩm thực &amp; Điểm đến Việt Nam</div>
              </div>
            </div>
            <button
              className="ai-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng chat"
            >
              ✕
            </button>
          </div>

          {provinceName && (
            <div className="ai-chat-context-bar">
              📍 Đang xem: <strong>{provinceName}</strong>
            </div>
          )}

          <div className="ai-chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`ai-chat-message ai-chat-message--${msg.role}`}>
                <div className="ai-chat-bubble">
                  {msg.content.split("\n").map((line, j, arr) => (
                    <span key={j}>
                      {line}
                      {j < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="ai-chat-message ai-chat-message--assistant">
                <div className="ai-chat-bubble ai-chat-bubble--typing" aria-label="Đang trả lời">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-input-row">
            <textarea
              ref={inputRef}
              className="ai-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi về quán ăn, địa điểm du lịch..."
              rows={1}
              disabled={isLoading}
              aria-label="Nhập câu hỏi"
            />
            <button
              className="ai-chat-send"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Gửi"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        className={`ai-chat-toggle${isOpen ? " is-active" : ""}`}
        onClick={handleToggle}
        aria-label={isOpen ? "Đóng trợ lý" : "Mở trợ lý du lịch AI"}
        title={isOpen ? "Đóng" : "Trợ lý du lịch AI"}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
