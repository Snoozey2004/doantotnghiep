import React from 'react';
import { motion } from 'framer-motion';

export default function QuoteRenderer({ data }) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: data?.backgroundColor || '#8b4513', color: '#fff' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div style={{ fontSize: '4rem', opacity: 0.3, marginBottom: '-20px', lineHeight: 1 }}>"</div>
          <p style={{ fontSize: '1.8rem', fontStyle: 'italic', fontWeight: '300', lineHeight: '1.6', marginBottom: '20px' }}>
            {data?.content || 'Một câu trích dẫn hay ho về ẩm thực, văn hóa hoặc sản phẩm.'}
          </p>
          <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#f4ecd8' }}>
            - {data?.author || 'Tác giả'} -
          </div>
        </motion.div>
      </div>
    </section>
  );
}
