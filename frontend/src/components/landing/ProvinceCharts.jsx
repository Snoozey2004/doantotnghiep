import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
} from "recharts";

const BAR_COLOR = "#b45309";

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
const PIE_COLORS = ["#b45309", "#d97706", "#92400e", "#fbbf24"];

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="province-chart-tooltip">
      <span className="province-chart-tooltip-label">{label}</span>
      <span className="province-chart-tooltip-value">{payload[0].value} di tích</span>
    </div>
  );
};

const CustomPieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="province-chart-tooltip">
      <span className="province-chart-tooltip-label">{payload[0].name}</span>
      <span className="province-chart-tooltip-value">Tỷ trọng &nbsp;{payload[0].value}%</span>
    </div>
  );
};


export default function ProvinceCharts({ province }) {
  const { barChart, pieChart } = province.charts || {};
  const [pieAnimating, setPieAnimating] = useState(true);
  if (!barChart && !pieChart) return null;

  return (
    <section className="province-section province-charts-section">
      <div className="container">
        <div className="province-section-heading">
          <span className="province-section-kicker">Dữ liệu thống kê</span>
          <h2 className="province-section-title">Bức Tranh Văn Hóa Qua Con Số</h2>
        </div>

        <div className="province-charts-grid">
          {barChart && (
            <motion.div
              className="province-chart-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="province-chart-title">{barChart.title}</h3>
              <p className="province-chart-subtitle">{barChart.subtitle}</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barChart.data} layout="vertical" margin={{ left: 8, right: 24, top: 8, bottom: 8 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 13, fill: "#5c4a32" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(180,83,9,0.07)" }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
                    {barChart.data.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? BAR_COLOR : `rgba(180,83,9,${0.75 - i * 0.12})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {pieChart && (
            <motion.div
              className="province-chart-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h3 className="province-chart-title">{pieChart.title}</h3>
              <p className="province-chart-subtitle">{pieChart.subtitle}</p>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieChart.data}
                    cx="50%"
                    cy="45%"
                    outerRadius={100}
                    innerRadius={42}
                    dataKey="value"
                    labelLine={false}
                    label={renderCustomLabel}
                    isAnimationActive={pieAnimating}
                    animationBegin={400}
                    animationDuration={800}
                    animationEasing="ease-out"
                    onAnimationEnd={() => setPieAnimating(false)}
                  >
                    {pieChart.data.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={9}
                    formatter={(value) => <span style={{ fontSize: 13, color: "#5c4a32" }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
