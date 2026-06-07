import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
  LineChart, Line, CartesianGrid, ReferenceLine,
} from "recharts";

const ethnicData = [
  { name: "Việt Nam", value: 54 },
  { name: "Lào", value: 49 },
  { name: "Thái Lan", value: 35 },
  { name: "Campuchia", value: 20 },
];

const cultureData = [
  { name: "Di sản lịch sử", value: 35 },
  { name: "Dân tộc", value: 20 },
  { name: "Làng nghề", value: 15 },
  { name: "Lễ hội", value: 18 },
  { name: "Ẩm thực", value: 12 },
];

const PIE_COLORS = ["#b45309", "#d97706", "#92400e", "#a16207", "#78350f"];

const unescoData = [
  { name: "Di sản thế giới", value: 8 },
  { name: "Di sản phi vật thể", value: 15 },
  { name: "Di sản tư liệu", value: 9 },
];

const touristData = [
  { year: "2019", value: 18.0 },
  { year: "2020", value: 3.5 },
  { year: "2021", value: 0.2 },
  { year: "2022", value: 3.5 },
  { year: "2023", value: 12.6 },
  { year: "2024", value: 17.6 },
  { year: "2025", value: 21.2 },
];

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  if (percent < 0.05) return null;
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="home-chart-tooltip">
      <span className="home-chart-tooltip-label">{label}</span>
      <span className="home-chart-tooltip-value">{payload[0].value} dân tộc</span>
    </div>
  );
};

const CustomUnescoTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="home-chart-tooltip">
      <span className="home-chart-tooltip-label">{label}</span>
      <span className="home-chart-tooltip-value">{payload[0].value} di sản</span>
    </div>
  );
};

const CustomLineTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="home-chart-tooltip">
      <span className="home-chart-tooltip-label">{label}</span>
      <span className="home-chart-tooltip-value">Khách quốc tế &nbsp;{payload[0].value}M</span>
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="home-chart-tooltip">
      <span className="home-chart-tooltip-label">{payload[0].name}</span>
      <span className="home-chart-tooltip-value">Tỷ trọng &nbsp;{payload[0].value}%</span>
    </div>
  );
};

export default function HomeCharts() {
  const [pieAnimating, setPieAnimating] = useState(true);

  return (
    <section className="home-section home-charts-section">
      <div className="container">
        <div className="section-heading section-heading--center">
          <span className="section-kicker">Thống kê</span>
          <h2>Số Liệu Văn Hóa Việt Nam</h2>
        </div>
        <div className="home-charts-grid">
          <motion.div
            className="home-chart-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="home-chart-title">Đa dạng dân tộc tại Đông Nam Á</h3>
            <p className="home-chart-subtitle">Số lượng dân tộc ở một số quốc gia Đông Nam Á</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ethnicData} margin={{ left: 0, right: 16, top: 12, bottom: 8 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 13, fill: "#5c4a32" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#8a7a68" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 65]}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(180,83,9,0.06)" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
                  {ethnicData.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "#b45309" : `rgba(180,83,9,${0.75 - i * 0.12})`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="home-chart-highlights">
              <h4 className="home-chart-highlights-title">Điểm nổi bật</h4>
              <ul className="home-chart-highlights-list">
                <li>Việt Nam có 54 dân tộc, đứng đầu khu vực về sự đa dạng dân tộc.</li>
                <li>Lào có 49 dân tộc, với nhiều nhóm thiểu số sinh sống ở vùng cao.</li>
                <li>Thái Lan có 35 dân tộc, người Thái chiếm đa số với khoảng 75% dân số.</li>
                <li>Campuchia có 20 dân tộc, người Khmer chiếm khoảng 90% dân số cả nước.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="home-chart-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="home-chart-title">Các yếu tố tạo nên bản sắc Việt Nam</h3>
            <p className="home-chart-subtitle">Tỷ trọng các thành tố văn hóa đặc trưng</p>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cultureData}
                  cx="50%"
                  cy="45%"
                  outerRadius={105}
                  innerRadius={48}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                  isAnimationActive={pieAnimating}
                  animationBegin={400}
                  animationDuration={800}
                  animationEasing="ease-out"
                  onAnimationEnd={() => setPieAnimating(false)}
                >
                  {cultureData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={9}
                  formatter={(value) => (
                    <span style={{ fontSize: 13, color: "#5c4a32" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="home-chart-highlights">
              <h4 className="home-chart-highlights-title">Điểm nổi bật</h4>
              <ul className="home-chart-highlights-list">
                <li>Di sản lịch sử (35%): hàng nghìn di tích, nhiều công trình được UNESCO vinh danh.</li>
                <li>Lễ hội (18%): hơn 8.000 lễ hội dân gian diễn ra mỗi năm trên cả nước.</li>
                <li>Dân tộc (20%): 54 dân tộc cùng chung sống, mỗi dân tộc mang bản sắc riêng biệt.</li>
                <li>Làng nghề (15%): hàng nghìn làng nghề truyền thống lưu giữ kỹ thuật thủ công lâu đời.</li>
                <li>Ẩm thực (12%): phong phú và đặc trưng theo từng vùng miền Bắc – Trung – Nam.</li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            className="home-chart-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <h3 className="home-chart-title">Di sản UNESCO Việt Nam</h3>
            <p className="home-chart-subtitle">Số lượng di sản được UNESCO công nhận theo loại hình</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={unescoData} layout="vertical" margin={{ left: 8, right: 32, top: 8, bottom: 8 }}>
                <XAxis type="number" tick={{ fontSize: 12, fill: "#8a7a68" }} axisLine={false} tickLine={false} domain={[0, 18]} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fontSize: 13, fill: "#5c4a32" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomUnescoTooltip />} cursor={{ fill: "rgba(180,83,9,0.06)" }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={32}>
                  {unescoData.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "#b45309" : i === 1 ? "#d97706" : "#92400e"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="home-chart-highlights">
              <h4 className="home-chart-highlights-title">Điểm nổi bật</h4>
              <ul className="home-chart-highlights-list">
                <li>Di sản thế giới (8): Vịnh Hạ Long, Cố đô Huế, Hội An, Mỹ Sơn, Tràng An, Phong Nha-Kẻ Bàng, Hoàng thành Thăng Long, Thành nhà Hồ.</li>
                <li>Di sản phi vật thể (15): Nhã nhạc cung đình Huế, Ca trù, Quan họ, Đờn ca tài tử, Tín ngưỡng thờ Mẫu và nhiều loại hình khác.</li>
                <li>Di sản tư liệu (9): Mộc bản triều Nguyễn, Bia đá Văn Miếu, Châu bản triều Nguyễn cùng các tài liệu quý hiếm.</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="home-chart-card home-chart-card--wide"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <h3 className="home-chart-title">Tăng trưởng khách du lịch quốc tế đến Việt Nam</h3>
            <p className="home-chart-subtitle">Giai đoạn 2019–2025 (triệu lượt khách)</p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={touristData} margin={{ left: 0, right: 24, top: 12, bottom: 8 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(155,138,112,0.2)" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 13, fill: "#5c4a32" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#8a7a68" }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 25]}
                  ticks={[0, 6, 12, 18, 24]}
                />
                <Tooltip content={<CustomLineTooltip />} cursor={{ stroke: "rgba(180,83,9,0.3)", strokeWidth: 1 }} />
                <ReferenceLine y={0} stroke="rgba(155,138,112,0.3)" />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#b45309"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#b45309", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#b45309", stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="home-chart-highlights">
              <h4 className="home-chart-highlights-title">Điểm nổi bật</h4>
              <ul className="home-chart-highlights-list">
                <li>2019: đạt kỷ lục khoảng 18 triệu lượt khách quốc tế trước đại dịch.</li>
                <li>2020–2021: giảm mạnh do COVID-19 và các biện pháp hạn chế đi lại toàn cầu.</li>
                <li>2023: phục hồi lên 12,6 triệu lượt, tương đương khoảng 70% mức năm 2019.</li>
                <li>2024: đạt 17,6 triệu lượt, gần bằng mức trước dịch.</li>
                <li>2025: vượt mốc 21 triệu lượt, lập kỷ lục mới của ngành du lịch Việt Nam.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
