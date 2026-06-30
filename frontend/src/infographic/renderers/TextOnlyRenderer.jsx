import React from 'react';
import { motion } from 'framer-motion';

export default function TextOnlyRenderer({ data }) {
  const { marginTop, marginBottom, textColor, textAlign, visibility } = data || {};
  const visibilityClass = visibility === 'mobile' ? 'hidden-desktop' : visibility === 'desktop' ? 'hidden-mobile' : '';
  return (
    <div className={visibilityClass} style={{
      marginTop: marginTop !== undefined ? `${marginTop}px` : undefined,
      marginBottom: marginBottom !== undefined ? `${marginBottom}px` : undefined,
      color: textColor,
      textAlign: textAlign
    }}>
      <section style={{ padding: '30px 20px', backgroundColor: data?.backgroundColor || '#ffffff' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {data?.title && (
              <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: textColor || '#8b4513', marginBottom: '30px' }}>
                {data.title}
              </h2>
            )}
            <div
              style={{ fontSize: '1.1rem', lineHeight: '1.8', color: textColor || '#444' }}
              dangerouslySetInnerHTML={{ __html: data?.content || 'Nội dung chi tiết sẽ hiển thị ở đây.' }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
