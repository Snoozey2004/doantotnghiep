import React from 'react';
import { motion } from 'framer-motion';

export default function TextImageTextRenderer({ data }) {
  const { topText, image, bottomText, marginTop, marginBottom, textColor, textAlign, backgroundColor, visibility } = data || {};
  const visibilityClass = visibility === 'mobile' ? 'hidden-desktop' : visibility === 'desktop' ? 'hidden-mobile' : '';

  // Extract focalPoint and scale if image is an object
  let imgUrl = '';
  let imgScale = 'cover';
  let imgFocal = 'center';
  if (typeof image === 'string') {
    imgUrl = image;
  } else if (image && image.url) {
    imgUrl = image.url;
    imgScale = image.scale || 'cover';
    imgFocal = image.focalPoint || 'center';
  }

  return (
    <div className={visibilityClass} style={{
      marginTop: marginTop !== undefined ? `${marginTop}px` : undefined,
      marginBottom: marginBottom !== undefined ? `${marginBottom}px` : undefined,
      color: textColor,
      textAlign: textAlign || 'left'
    }}>
      <style>{`
        .text-image-text-layout {
          display: flex;
          flex-direction: column;
          gap: 30px;
          align-items: center;
        }
        @media (min-width: 768px) {
          .text-image-text-layout {
            flex-direction: row;
            justify-content: center;
            align-items: stretch;
            gap: 40px;
          }
          .text-image-text-col {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .text-image-text-img {
            flex: 1.5;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      `}</style>
      <section style={{ padding: '40px 20px', backgroundColor: backgroundColor || '#ffffff' }}>
        <div className="container text-image-text-layout" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {topText && (
            <motion.div
              className="text-image-text-col"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div dangerouslySetInnerHTML={{ __html: topText }} style={{ lineHeight: '1.6' }} />
            </motion.div>
          )}

          {imgUrl && (
            <motion.div
              className="text-image-text-img"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            >
              <img 
                src={imgUrl} 
                alt="Illustration" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '600px', 
                  objectFit: imgScale, 
                  objectPosition: imgFocal, 
                  display: 'block' 
                }} 
              />
            </motion.div>
          )}

          {bottomText && (
            <motion.div
              className="text-image-text-col"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div dangerouslySetInnerHTML={{ __html: bottomText }} style={{ lineHeight: '1.6' }} />
            </motion.div>
          )}

        </div>
      </section>
    </div>
  );
}
