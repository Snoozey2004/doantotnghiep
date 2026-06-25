import React from 'react';
import { motion } from 'framer-motion';

export default function CTARenderer({ data }) {
  return (
    <section style={{ padding: '80px 20px', backgroundColor: data?.backgroundColor || '#d2691e', color: '#fff', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: '700' }}>
            {data?.title || 'Kêu gọi hành động'}
          </h2>
          <div 
            style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 }}
            dangerouslySetInnerHTML={{ __html: data?.content || 'Khuyến khích người dùng mua hàng hoặc trải nghiệm ngay hôm nay!' }}
          />
          <a 
            href={data?.buttonLink || '#'} 
            style={{ 
              display: 'inline-block', 
              padding: '15px 40px', 
              backgroundColor: '#fff', 
              color: '#d2691e', 
              fontSize: '1.2rem', 
              fontWeight: 'bold', 
              borderRadius: '50px', 
              textDecoration: 'none',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {data?.buttonText || 'Mua Ngay'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
