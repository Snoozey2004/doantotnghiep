import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/src/contexts/AuthContext";

const WARNING_TIME_BEFORE_EXPIRY = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function TokenExpirationManager() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [warningTimeout, setWarningTimeout] = useState(null);
  const [expiryTimeout, setExpiryTimeout] = useState(null);
  const [countdownInterval, setCountdownInterval] = useState(null);

  const handleLogout = useCallback(() => {
    setShowWarning(false);
    logout();
    navigate("/login?reason=session_expired", { replace: true });
  }, [logout, navigate]);

  const handleExtendSession = useCallback(() => {
    setShowWarning(false);
    // Refresh the token by re-fetching user data or doing a no-op request
    // This keeps the session alive
    const expiresAt = localStorage.getItem("tokenExpiresAt");
    if (expiresAt) {
      const newExpiresAt = new Date(expiresAt).getTime();
      const now = Date.now();
      const timeUntilWarning = newExpiresAt - now - WARNING_TIME_BEFORE_EXPIRY;

      // Clear existing timeouts
      if (warningTimeout) clearTimeout(warningTimeout);
      if (expiryTimeout) clearTimeout(expiryTimeout);
      if (countdownInterval) clearInterval(countdownInterval);

      // Reset timeouts for the extended session
      if (timeUntilWarning > 0) {
        const newWarningTimeout = setTimeout(() => {
          setShowWarning(true);
          // Start countdown
          const interval = setInterval(() => {
            const remaining = newExpiresAt - Date.now();
            setTimeRemaining(Math.max(0, remaining));
            if (remaining <= 0) {
              clearInterval(interval);
            }
          }, 1000);
          setCountdownInterval(interval);
        }, timeUntilWarning);
        setWarningTimeout(newWarningTimeout);
      } else {
        setShowWarning(true);
      }

      const newExpiryTimeout = setTimeout(() => {
        handleLogout();
      }, newExpiresAt - now);
      setExpiryTimeout(newExpiryTimeout);
    }
  }, [warningTimeout, expiryTimeout, countdownInterval, handleLogout]);

  // Initialize token expiration checks when user logs in
  useEffect(() => {
    if (!user) {
      setShowWarning(false);
      if (warningTimeout) clearTimeout(warningTimeout);
      if (expiryTimeout) clearTimeout(expiryTimeout);
      if (countdownInterval) clearInterval(countdownInterval);
      return;
    }

    const expiresAt = localStorage.getItem("tokenExpiresAt");
    if (!expiresAt) return;

    const expiryTime = new Date(expiresAt).getTime();
    const now = Date.now();
    const timeUntilExpiry = expiryTime - now;

    // If token already expired, logout immediately
    if (timeUntilExpiry <= 0) {
      handleLogout();
      return;
    }

    // Calculate when to show warning (5 minutes before expiry)
    const timeUntilWarning = timeUntilExpiry - WARNING_TIME_BEFORE_EXPIRY;

    // Local variables for timers so cleanup can safely reference them
    let newWarningTimeout = null;
    let newExpiryTimeout = null;
    let localInterval = null;

    // Set warning timeout
    if (timeUntilWarning > 0) {
      newWarningTimeout = setTimeout(() => {
        setShowWarning(true);
        // Start countdown
        localInterval = setInterval(() => {
          const remaining = expiryTime - Date.now();
          setTimeRemaining(Math.max(0, remaining));
          if (remaining <= 0) {
            clearInterval(localInterval);
          }
        }, 1000);
        setCountdownInterval(localInterval);
      }, timeUntilWarning);
      setWarningTimeout(newWarningTimeout);
    } else {
      // Less than 5 minutes left, show warning immediately
      setShowWarning(true);
      localInterval = setInterval(() => {
        const remaining = expiryTime - Date.now();
        setTimeRemaining(Math.max(0, remaining));
        if (remaining <= 0) {
          clearInterval(localInterval);
        }
      }, 1000);
      setCountdownInterval(localInterval);
    }

    // Set logout timeout
    newExpiryTimeout = setTimeout(() => {
      handleLogout();
    }, timeUntilExpiry);
    setExpiryTimeout(newExpiryTimeout);

    // Cleanup function
    return () => {
      if (newWarningTimeout) clearTimeout(newWarningTimeout);
      if (newExpiryTimeout) clearTimeout(newExpiryTimeout);
      if (localInterval) clearInterval(localInterval);
    };
  }, [user, handleLogout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (warningTimeout) clearTimeout(warningTimeout);
      if (expiryTimeout) clearTimeout(expiryTimeout);
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [warningTimeout, expiryTimeout, countdownInterval]);

  if (!showWarning) return null;

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "32px",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ fontSize: "24px", marginBottom: "16px" }}>⏱️</div>
        <h2 style={{ marginBottom: "12px", color: "#333" }}>Phiên làm việc sắp hết hạn</h2>
        <p style={{ color: "#666", marginBottom: "20px", fontSize: "14px" }}>
          Phiên làm việc của bạn sẽ hết hạn trong{" "}
          <strong style={{ color: "#ff6b6b" }}>
            {minutes}:{String(seconds).padStart(2, "0")}
          </strong>
        </p>
        <p style={{ color: "#999", marginBottom: "24px", fontSize: "13px" }}>
          Nhấp "Tiếp tục" để kéo dài phiên làm việc hoặc bạn sẽ bị đăng xuất tự động.
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={handleLogout}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#f5f5f5",
              color: "#333",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#e8e8e8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
          >
            Đăng xuất
          </button>
          <button
            onClick={handleExtendSession}
            style={{
              flex: 1,
              padding: "10px 16px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#0066cc",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0052a3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#0066cc")}
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}
