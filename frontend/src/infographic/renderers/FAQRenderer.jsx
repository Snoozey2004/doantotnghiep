import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQRenderer({ data }) {
  const faqs = data?.items || [
    { question: 'Câu hỏi 1?', answer: 'Trả lời câu hỏi 1' },
    { question: 'Câu hỏi 2?', answer: 'Trả lời câu hỏi 2' }
  ];
  
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ padding: '80px 20px', backgroundColor: data?.backgroundColor || '#fafafa' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        {data?.title && (
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#8b4513', marginBottom: '50px' }}>
            {data.title}
          </h2>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              viewport={{ once: true }}
              style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}
            >
              <button 
                onClick={() => toggleFaq(idx)}
                style={{ width: '100%', textAlign: 'left', padding: '20px', fontSize: '1.2rem', fontWeight: '600', color: '#333', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                {faq.question}
                <span style={{ fontSize: '1.5rem', transform: openIndex === idx ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>+</span>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div style={{ padding: '0 20px 20px', color: '#666', lineHeight: '1.6' }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
