import React from 'react';
import { motion } from 'framer-motion';

export default function RestaurantListRenderer({ data }) {
  const { marginTop, marginBottom, textColor, textAlign, visibility } = data || {};
  const visibilityClass = visibility === 'mobile' ? 'hidden-desktop' : visibility === 'desktop' ? 'hidden-mobile' : '';
  const items = data?.restaurants || [];

  return (
    <div className={visibilityClass} style={{
      marginTop: marginTop !== undefined ? `${marginTop}px` : undefined,
      marginBottom: marginBottom !== undefined ? `${marginBottom}px` : undefined,
      color: textColor,
      textAlign: textAlign
    }}>
      <section style={{ padding: '30px 20px', backgroundColor: data?.backgroundColor || '#fafafa' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            {data?.title && <h2 style={{ fontSize: '2.5rem', color: textColor || '#333', marginBottom: '15px' }}>{data.title}</h2>}
            {data?.description && <p style={{ fontSize: '1.1rem', color: textColor || '#666', maxWidth: '800px', margin: '0 auto' }}>{data.description}</p>}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {items.map((item, index) => {
              const mapUrl = item.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address || item.name || '')}`;
              return (
                <motion.article
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer'
                  }}
                  whileHover={{ y: -5, boxShadow: '0 15px 40px rgba(0,0,0,0.12)' }}
                  onClick={() => window.open(mapUrl, '_blank')}
                >
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={typeof item.image === 'object' ? (item.image.url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5') : (item.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5')}
                      alt={item.name || 'Restaurant image'}
                      style={{ width: '100%', height: '100%', objectFit: typeof item.image === 'object' ? item.image.scale : 'cover', objectPosition: typeof item.image === 'object' ? item.image.focalPoint : 'center' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      padding: '8px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}>
                      📍
                    </div>
                  </div>
                  <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.4rem', color: textColor || '#222', marginBottom: '10px', marginTop: 0 }}>{item.name || 'Tên quán'}</h3>
                    <p style={{ fontSize: '1rem', color: textColor || '#666', lineHeight: '1.5', margin: 0, display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ marginTop: '3px' }}>🗺️</span>
                      {item.address || 'Địa chỉ quán'}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '15px', textAlign: 'right' }}>
                      <span style={{ color: '#1890ff', fontSize: '0.95rem', fontWeight: 'bold' }}>Xem bản đồ →</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
