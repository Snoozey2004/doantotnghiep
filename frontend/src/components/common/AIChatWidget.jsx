import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import provinces from "../../data/provinceData.js";

const AI_API_KEY = "AQ.Ab8RN6IWmAvTl6Xrxb3W7Zm1MNfJsGnY4qqnVdwVKKfkddRQkA";
const AI_API_URL = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
const AI_MODEL = "gemma-4-31b-it";

const SUGGESTIONS = [
  "🍜 Quán phở ngon ở Hà Nội?",
  "🏖️ Địa điểm đẹp tại Đà Nẵng?",
  "☕ Cà phê nổi tiếng Đà Lạt?",
  "🦐 Đặc sản Cần Thơ phải thử?",
];

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
• Từ chối lịch sự nếu hỏi về chủ đề khác và hướng về du lịch Việt Nam
• Luôn cung cấp tên cụ thể, địa chỉ hoặc mô tả rõ ràng để du khách dễ tìm kiếm
• Trả lời bằng tiếng Việt (trừ khi người dùng yêu cầu ngôn ngữ khác)${provinceContext}`;
}

function formatTime(date) {
  return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

function makeMessage(role, content) {
  return { role, content, time: new Date() };
}

const INITIAL_MESSAGE = makeMessage(
  "assistant",
  "Xin chào! Tôi là Trợ Lý Du Lịch Việt Nam 🇻🇳\n\nTôi có thể giúp bạn khám phá:\n• Quán ăn ngon, nhà hàng đặc sản\n• Địa điểm du lịch hấp dẫn\n• Văn hóa & lễ hội địa phương\n\nBạn muốn tìm hiểu về tỉnh thành nào?"
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const AIRobotIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  const provinceSlug = location.pathname.startsWith("/province/")
    ? location.pathname.slice("/province/".length).split("?")[0]
    : null;
  const province = provinceSlug ? provinces.find((p) => p.slug === provinceSlug) : null;
  const provinceName = province?.name || null;

  const showSuggestions = messages.length === 1 && !isLoading;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
  };

  const sendMessage = useCallback(async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMsg = makeMessage("user", trimmed);
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
    setIsLoading(true);

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
      setMessages((prev) => [...prev, makeMessage("assistant", stripMarkdown(raw))]);
    } catch (err) {
      console.error("[AI Chat] Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        makeMessage("assistant", `Xin lỗi, đã xảy ra lỗi: ${err.message}`)
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, provinceName]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClear = () => {
    setMessages([makeMessage("assistant", INITIAL_MESSAGE.content)]);
    setInput("");
  };

  return (
    <div className="ai-chat-widget">
      {isOpen && (
        <div className="ai-chat-panel" role="dialog" aria-label="Trợ lý du lịch AI">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-header-left">
              <div className="ai-chat-header-avatar">
                <span>🇻🇳</span>
              </div>
              <div className="ai-chat-header-text">
                <div className="ai-chat-header-name">Trợ Lý Du Lịch AI</div>
                <div className="ai-chat-header-status">
                  <span className="ai-chat-status-dot" />
                  Sẵn sàng tư vấn
                </div>
              </div>
            </div>
            <div className="ai-chat-header-actions">
              <button className="ai-chat-header-btn" onClick={handleClear} title="Xóa cuộc trò chuyện" aria-label="Xóa cuộc trò chuyện">
                <TrashIcon />
              </button>
              <button className="ai-chat-header-btn ai-chat-header-btn--close" onClick={() => setIsOpen(false)} aria-label="Đóng chat">
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Context bar */}
          {provinceName && (
            <div className="ai-chat-context-bar">
              <span aria-hidden="true">📍</span>
              <span className="ai-chat-context-label">Đang xem:</span>
              <strong className="ai-chat-context-name">{provinceName}</strong>
              <span className="ai-chat-context-sep">·</span>
              <span className="ai-chat-context-hint">Hỏi về ẩm thực &amp; du lịch nơi này!</span>
            </div>
          )}

          {/* Messages */}
          <div className="ai-chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`ai-chat-msg-row ai-chat-msg-row--${msg.role}`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {msg.role === "assistant" && (
                  <div className="ai-chat-msg-avatar" aria-hidden="true">🤖</div>
                )}
                <div className="ai-chat-msg-body">
                  <div className={`ai-chat-bubble ai-chat-bubble--${msg.role}`}>
                    {msg.content.split("\n").map((line, j, arr) => (
                      <span key={j}>
                        {line}
                        {j < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                  {msg.time && (
                    <div className={`ai-chat-time ai-chat-time--${msg.role}`}>
                      {formatTime(msg.time)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="ai-chat-msg-row ai-chat-msg-row--assistant">
                <div className="ai-chat-msg-avatar" aria-hidden="true">🤖</div>
                <div className="ai-chat-msg-body">
                  <div className="ai-chat-bubble ai-chat-bubble--assistant ai-chat-bubble--typing">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips */}
          {showSuggestions && (
            <div className="ai-chat-suggestions">
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  className="ai-chat-chip"
                  onClick={() => sendMessage(s)}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="ai-chat-input-section">
            <div className="ai-chat-input-wrap">
              <textarea
                ref={inputRef}
                className="ai-chat-input"
                value={input}
                onChange={(e) => { setInput(e.target.value); autoResize(e); }}
                onKeyDown={handleKeyDown}
                placeholder="Hỏi về ẩm thực, địa điểm du lịch..."
                rows={1}
                disabled={isLoading}
                aria-label="Nhập câu hỏi"
              />
              <button
                className="ai-chat-send"
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                aria-label="Gửi"
              >
                <SendIcon />
              </button>
            </div>
            <div className="ai-chat-input-hint">
              <span>↵ Enter gửi &nbsp;·&nbsp; Shift+Enter xuống dòng</span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        className={`ai-chat-toggle${isOpen ? " is-open" : ""}`}
        onClick={() => setIsOpen((p) => !p)}
        aria-label={isOpen ? "Đóng trợ lý" : "Mở trợ lý du lịch AI"}
      >
        <span className="ai-chat-toggle-icon">
          {isOpen ? <CloseIcon /> : <AIRobotIcon />}
        </span>
        {!isOpen && <span className="ai-chat-toggle-pulse" />}
      </button>
    </div>
  );
}
