import React from 'react';
import { motion } from 'framer-motion';

export default function FeaturesGridRenderer({ data }) {
  const items = data?.items || [];

  return (
    <section style={{ padding: '80px 20px', backgroundColor: data?.backgroundColor || '#fafafa' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          {data?.title && <h2 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '15px' }}>{data.title}</h2>}
          {data?.subtitle && <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '800px', margin: '0 auto' }}>{data.subtitle}</p>}
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {items.map((item, index) => (
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
                flexDirection: 'column'
              }}
            >
              <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c'} 
                  alt={item.title || 'Feature image'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {item.tag && (
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    left: '15px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}>
                    {item.tag}
                  </div>
                )}
              </div>
              <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#222', marginBottom: '15px', marginTop: 0 }}>{item.title || 'Tiêu đề'}</h3>
                <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6', flex: 1, margin: 0 }}>
                  {item.description || 'Mô tả chi tiết về đặc điểm này.'}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
