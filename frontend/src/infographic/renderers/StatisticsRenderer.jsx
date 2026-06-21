import React from 'react';
import { motion } from 'framer-motion';

export default function StatisticsRenderer({ data }) {
  const stats = data?.items || [
    { label: 'Năm lịch sử', value: '100+' },
    { label: 'Thành phần', value: '100%' },
    { label: 'Đánh giá', value: '5/5' }
  ];

  return (
    <section style={{ padding: '60px 20px', backgroundColor: data?.backgroundColor || '#f4ecd8' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {data?.title && (
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#8b4513', marginBottom: '40px' }}>
            {data.title}
          </h2>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              style={{ flex: '1 1 200px', textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
            >
              <div style={{ fontSize: '3rem', fontWeight: '800', color: '#d2691e', marginBottom: '10px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1.1rem', color: '#666', fontWeight: '500' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
