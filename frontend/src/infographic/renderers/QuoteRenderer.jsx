import React from 'react';
import { motion } from 'framer-motion';

export default function QuoteRenderer({ data }) {
  const { marginTop, marginBottom, textColor, textAlign, visibility } = data || {};
  const visibilityClass = visibility === 'mobile' ? 'hidden-desktop' : visibility === 'desktop' ? 'hidden-mobile' : '';
  return (
    <div className={visibilityClass} style={{
      marginTop: marginTop !== undefined ? `${marginTop}px` : undefined,
      marginBottom: marginBottom !== undefined ? `${marginBottom}px` : undefined,
      color: textColor,
      textAlign: textAlign
    }}>
      <section style={{ padding: '30px 20px', backgroundColor: data?.backgroundColor || '#8b4513', color: textColor || '#fff' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div style={{ fontSize: '4rem', opacity: 0.3, marginBottom: '-20px', lineHeight: 1 }}>"</div>
            <div
              style={{ fontSize: '1.8rem', fontStyle: 'italic', fontWeight: '300', lineHeight: '1.6', marginBottom: '20px' }}
              dangerouslySetInnerHTML={{ __html: data?.content || 'Trích dẫn hay...' }}
            />
            <div style={{ fontSize: '1.2rem', fontWeight: '600', color: textColor || '#f4ecd8' }}>
              - {data?.author || 'Tác giả'} -
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
