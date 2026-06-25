import React from 'react';
import { motion } from 'framer-motion';

export default function VideoRenderer({ data }) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: data?.backgroundColor || '#000000' }}>
      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {data?.title && (
            <h2 style={{ fontSize: '2.5rem', color: data?.backgroundColor === '#000000' ? '#fff' : '#333', marginBottom: '30px' }}>
              {data.title}
            </h2>
          )}
          
          <div style={{ 
            position: 'relative', 
            paddingBottom: '56.25%', 
            height: 0, 
            overflow: 'hidden', 
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            {data?.videoUrl ? (
              <iframe 
                src={data.videoUrl} 
                title={data?.title || 'Video'}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            ) : (
              <div style={{ 
                position: 'absolute', 
                top: 0, left: 0, 
                width: '100%', height: '100%', 
                backgroundColor: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                Chưa có link video
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
