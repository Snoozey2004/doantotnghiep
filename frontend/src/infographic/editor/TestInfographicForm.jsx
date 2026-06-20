import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

export default function TestInfographicForm() {
  const [slug, setSlug] = useState('pho-ha-noi');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (slug) {
      navigate(`/test-editor?slug=${slug}`);
    }
  };

  return (
    <MainLayout>
      <div style={{ padding: '50px 20px', maxWidth: '600px', margin: '0 auto' }}>
        <h2>Test Infographic Editor</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <input 
            type="text" 
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Nhập product slug (VD: pho-ha-noi)"
            style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#d2691e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Mở Editor
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
