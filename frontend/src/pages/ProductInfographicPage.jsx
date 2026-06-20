import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import BlockRenderer from '../infographic/renderers/BlockRenderer';
import { productInfographicApi } from '../infographic/services/productInfographicApi';
import '../styles/ProductInfographicPage.css';

export default function ProductInfographicPage() {
  const { provinceSlug, productSlug } = useParams();
  const [infographic, setInfographic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfographic = async () => {
      try {
        setLoading(true);
        const res = await productInfographicApi.getByProductSlug(productSlug);
        setInfographic(res.data);
      } catch (err) {
        console.error("Failed to load infographic:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInfographic();
  }, [productSlug]);

  if (loading) {
    return (
      <MainLayout>
        <div style={{ padding: '100px 20px', textAlign: 'center', fontSize: '1.2rem' }}>
          Đang tải thông tin đặc sản...
        </div>
      </MainLayout>
    );
  }

  if (!infographic || !infographic.blocks || infographic.blocks.length === 0) {
    return (
      <MainLayout>
        <div style={{ padding: '100px 20px', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
          Thông tin chi tiết về đặc sản này đang được cập nhật. Vui lòng quay lại sau!
        </div>
      </MainLayout>
    );
  }

  // Sắp xếp blocks theo SortOrder
  const sortedBlocks = [...infographic.blocks].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <MainLayout>
      <div className="product-infographic-page">
        {sortedBlocks.map(block => {
          if (block.isVisible === false) return null;
          
          let parsedData = {};
          try {
            parsedData = block.dataJson ? JSON.parse(block.dataJson) : {};
          } catch (e) {}

          return (
            <BlockRenderer 
              key={block.id} 
              block={{ ...block, data: parsedData }} 
            />
          );
        })}
      </div>
    </MainLayout>
  );
}
