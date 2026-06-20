import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout.jsx";
import { analyticsApi } from "../api/analyticsApi";

export default function AdminContentStatistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await analyticsApi.contentStats({ provinceId: null });
        setStats(data);
        setError("");
      } catch (err) {
        setError("Không tải được thống kê nội dung.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: 24, textAlign: "center" }}>Đang tải thống kê...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div style={{ padding: 24, color: "red" }}>{error}</div>
      </AdminLayout>
    );
  }

  if (!stats) {
    return (
      <AdminLayout>
        <div style={{ padding: 24 }}>Không có dữ liệu thống kê.</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <h1>Thống kê nội dung</h1>
          <p>Phân tích chi tiết nội dung theo danh mục, loại phương tiện và khu vực.</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Tổng bài viết</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: 8, color: "#0066cc" }}>
            {stats.totalPostCount}
          </div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Tổng phương tiện</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: 8, color: "#00a86b" }}>
            {stats.totalMediaCount}
          </div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Bài viết nổi bật</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: 8, color: "#ff6b6b" }}>
            {stats.featuredPostCount}
          </div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontSize: "0.875rem", color: "#64748b" }}>Phương tiện nổi bật</div>
          <div style={{ fontSize: "2rem", fontWeight: "bold", marginTop: 8, color: "#ffa500" }}>
            {stats.featuredMediaCount}
          </div>
        </div>
      </div>

      {/* Posts by Category */}
      {Object.keys(stats.postsByCategory).length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
            Bài viết theo danh mục
          </div>
          <div style={{ padding: "16px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
              {Object.entries(stats.postsByCategory).map(([category, count]) => (
                <div
                  key={category}
                  style={{
                    padding: 12,
                    backgroundColor: "#f0f4f8",
                    borderRadius: 4,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontWeight: 600, color: "#333" }}>{count}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{category}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Media by Type */}
      {Object.keys(stats.mediaByType).length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
            Phương tiện theo loại
          </div>
          <div style={{ padding: "16px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
              {Object.entries(stats.mediaByType).map(([mediaType, count]) => (
                <div
                  key={mediaType}
                  style={{
                    padding: 12,
                    backgroundColor: "#f0f4f8",
                    borderRadius: 4,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontWeight: 600, color: "#333" }}>{count}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{mediaType}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Provinces by Region */}
      {Object.keys(stats.provincesByRegion).length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
            Tỉnh/thành theo khu vực
          </div>
          <div style={{ padding: "16px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
              {Object.entries(stats.provincesByRegion).map(([region, count]) => (
                <div
                  key={region}
                  style={{
                    padding: 12,
                    backgroundColor: "#f0f4f8",
                    borderRadius: 4,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontWeight: 600, color: "#333" }}>{count}</div>
                  <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>{region}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Featured vs Normal */}
      {Object.keys(stats.featuredVsNormal).length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
            Nội dung nổi bật so với bình thường
          </div>
          <div style={{ padding: "16px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
              {Object.entries(stats.featuredVsNormal).map(([label, count]) => {
                const labelVN = label
                  .replace("Featured Posts", "Bài viết nổi bật")
                  .replace("Normal Posts", "Bài viết bình thường")
                  .replace("Featured Media", "Phương tiện nổi bật")
                  .replace("Normal Media", "Phương tiện bình thường");

                return (
                  <div
                    key={label}
                    style={{
                      padding: 12,
                      backgroundColor: label.includes("Featured") ? "#fff3cd" : "#d4edda",
                      borderRadius: 4,
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "#333" }}>{count}</div>
                    <div style={{ fontSize: 13, color: "#555", marginTop: 4 }}>{labelVN}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Content per Province */}
      {Object.keys(stats.contentPerProvince).length > 0 && (
        <div className="card">
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #e2e8f0", fontWeight: 600 }}>
            Số lượng nội dung theo tỉnh/thành
          </div>
          <div style={{ padding: "16px 24px", maxHeight: 400, overflowY: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {Object.entries(stats.contentPerProvince)
                .sort(([, a], [, b]) => b - a)
                .map(([province, count]) => (
                  <div
                    key={province}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: 4,
                      borderLeft: "4px solid #0066cc",
                    }}
                  >
                    <div>{province}</div>
                    <div style={{ fontWeight: 600, color: "#0066cc" }}>{count}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 24, color: "#64748b", fontSize: 12 }}>
        Cập nhật lúc: {new Date(stats.generatedAt).toLocaleString("vi-VN")}
      </div>
    </AdminLayout>
  );
}
