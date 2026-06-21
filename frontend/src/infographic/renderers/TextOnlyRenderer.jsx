import React from 'react';
import { motion } from 'framer-motion';

export default function TextOnlyRenderer({ data }) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: data?.backgroundColor || '#ffffff' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {data?.title && (
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#8b4513', marginBottom: '30px' }}>
              {data.title}
            </h2>
          )}
          <div 
            style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}
            dangerouslySetInnerHTML={{ __html: data?.content?.replace(/\n/g, '<br />') || 'Nội dung chi tiết sẽ hiển thị ở đây.' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
