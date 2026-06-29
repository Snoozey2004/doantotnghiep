import React from 'react';
import { motion } from 'framer-motion';

export default function ImageLeftTextRightRenderer({ data }) {
  const { marginTop, marginBottom, textColor, textAlign, visibility } = data || {};
  const visibilityClass = visibility === 'mobile' ? 'hidden-desktop' : visibility === 'desktop' ? 'hidden-mobile' : '';
  return (
    <div className={visibilityClass} style={{
      marginTop: marginTop !== undefined ? `${marginTop}px` : undefined,
      marginBottom: marginBottom !== undefined ? `${marginBottom}px` : undefined,
      color: textColor,
      textAlign: textAlign
    }}>
      <section style={{ padding: '30px 20px', backgroundColor: data?.backgroundColor || '#fafafa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '40px' }}>
          <motion.div
            style={{ flex: '1 1 400px' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={typeof data?.image === 'object' ? (data.image.url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c') : (data?.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c')}
              alt={data?.title || 'Hình ảnh sản phẩm'}
              style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', objectFit: typeof data?.image === 'object' ? data.image.scale : 'cover', objectPosition: typeof data?.image === 'object' ? data.image.focalPoint : 'center', maxHeight: '500px' }}
            />
          </motion.div>
          <motion.div
            style={{ flex: '1 1 400px' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2.5rem', color: textColor || '#8b4513', marginBottom: '20px' }}>
              {data?.title || 'Tiêu đề phần nội dung'}
            </h2>
            <div
              style={{ fontSize: '1.1rem', lineHeight: '1.8', color: textColor || '#555' }}
              dangerouslySetInnerHTML={{ __html: data?.content || 'Mô tả chi tiết về đặc điểm, tính chất hoặc câu chuyện liên quan đến sản phẩm.' }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
