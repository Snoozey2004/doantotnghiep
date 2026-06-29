import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBannerRenderer({ data }) {
  const { marginTop, marginBottom, textColor, textAlign, visibility, backgroundColor } = data || {};
  const visibilityClass = visibility === 'mobile' ? 'hidden-desktop' : visibility === 'desktop' ? 'hidden-mobile' : '';
  
  const bgColor = backgroundColor || '#4A2B1D';
  const align = textAlign || 'left';
  
  let gradientStr;
  let flexJustify;
  let textAlignment = align;
  
  if (align === 'left') {
    gradientStr = `linear-gradient(90deg, ${bgColor} 0%, ${bgColor} 45%, transparent 100%)`;
    flexJustify = 'flex-start';
  } else if (align === 'right') {
    gradientStr = `linear-gradient(270deg, ${bgColor} 0%, ${bgColor} 45%, transparent 100%)`;
    flexJustify = 'flex-end';
  } else {
    gradientStr = `linear-gradient(0deg, rgba(0,0,0,0.5), rgba(0,0,0,0.6))`;
    flexJustify = 'center';
  }

  return (
    <div className={visibilityClass} style={{ 
      marginTop: marginTop !== undefined ? `${marginTop}px` : undefined, 
      marginBottom: marginBottom !== undefined ? `${marginBottom}px` : undefined, 
    }}>
      <section 
        className="infographic-hero"
        style={{
          backgroundImage: `${gradientStr}, url(${typeof data?.image === 'object' ? (data.image.url || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1') : (data?.image || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1')})`,
          backgroundSize: typeof data?.image === 'object' ? data.image.scale : 'cover',
          backgroundPosition: typeof data?.image === 'object' ? data.image.focalPoint : 'center',
          backgroundAttachment: 'fixed',
          color: textColor || '#fff',
          padding: '100px 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: flexJustify,
          position: 'relative',
          minHeight: '400px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            maxWidth: align === 'center' ? '800px' : '600px',
            textAlign: textAlignment,
            width: '100%'
          }}
        >
          <h1 
            style={{ fontSize: '3.5rem', marginBottom: '20px', fontWeight: '800', textShadow: align === 'center' ? '2px 2px 8px rgba(0,0,0,0.5)' : 'none' }}
            dangerouslySetInnerHTML={{ __html: data?.title || 'Tiêu đề sản phẩm' }}
          />
          <div 
            className="ck-html-content"
            style={{ fontSize: '1.2rem', lineHeight: '1.6', textShadow: align === 'center' ? '1px 1px 4px rgba(0,0,0,0.5)' : 'none' }}
            dangerouslySetInnerHTML={{ __html: data?.description || 'Mô tả ngắn gọn về sản phẩm, mang lại cảm giác hấp dẫn và thu hút người xem ngay từ cái nhìn đầu tiên.' }} 
          />
        </motion.div>
      </section>
    </div>
  );
}
