import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBannerRenderer({ data }) {
  return (
    <section 
      className="infographic-hero"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${data?.image || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#fff',
        padding: '120px 20px',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 
          style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800', textShadow: '2px 2px 8px rgba(0,0,0,0.5)' }}
          dangerouslySetInnerHTML={{ __html: data?.title || 'Tiêu đề sản phẩm' }}
        />
        <div 
          className="ck-html-content"
          style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}
          dangerouslySetInnerHTML={{ __html: data?.description || 'Mô tả ngắn gọn về sản phẩm, mang lại cảm giác hấp dẫn và thu hút người xem ngay từ cái nhìn đầu tiên.' }} 
        />
      </motion.div>
    </section>
  );
}
