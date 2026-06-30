import React from 'react';
import { motion } from 'framer-motion';

export default function GalleryRenderer({ data }) {
  const { marginTop, marginBottom, textColor, textAlign, visibility } = data || {};
  const visibilityClass = visibility === 'mobile' ? 'hidden-desktop' : visibility === 'desktop' ? 'hidden-mobile' : '';
  const images = data?.images || [];

  return (
    <div className={visibilityClass} style={{
      marginTop: marginTop !== undefined ? `${marginTop}px` : undefined,
      marginBottom: marginBottom !== undefined ? `${marginBottom}px` : undefined,
      color: textColor,
      textAlign: textAlign
    }}>
      <section style={{ padding: '30px 20px', backgroundColor: data?.backgroundColor || '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            {data?.title && <h2 style={{ fontSize: '2.5rem', color: textColor || '#333', marginBottom: '10px' }}>{data.title}</h2>}
            {data?.description && <p style={{ fontSize: '1.1rem', color: textColor || '#666', maxWidth: '800px', margin: '0 auto' }}>{data.description}</p>}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {images.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  height: 'auto',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}
              >
                <img
                  src={typeof img.url === 'object' ? (img.url.url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c') : (img.url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c')}
                  alt={img.alt || 'Gallery image'}
                  style={{ width: '100%', height: '100%', objectFit: typeof img.url === 'object' ? img.url.scale : 'cover', objectPosition: typeof img.url === 'object' ? img.url.focalPoint : 'center' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
