import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineRenderer({ data }) {
  const steps = data?.steps || [
    { year: 'Bước 1', title: 'Chuẩn bị nguyên liệu', description: 'Chọn lọc nguyên liệu tươi ngon nhất.' },
    { year: 'Bước 2', title: 'Chế biến', description: 'Chế biến theo công thức gia truyền.' },
    { year: 'Bước 3', title: 'Hoàn thành', description: 'Trình bày và thưởng thức.' }
  ];

  return (
    <section style={{ padding: '80px 20px', backgroundColor: data?.backgroundColor || '#ffffff' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {data?.title && (
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#8b4513', marginBottom: '50px' }}>
            {data.title}
          </h2>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              style={{ display: 'flex', gap: '20px', backgroundColor: '#fafafa', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #d2691e' }}
            >
              <div style={{ flexShrink: 0, width: '100px', fontWeight: '700', color: '#d2691e', fontSize: '1.2rem' }}>
                {step.year}
              </div>
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.4rem' }}>{step.title}</h3>
                <div 
                  style={{ margin: 0, color: '#666', lineHeight: '1.6' }}
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
