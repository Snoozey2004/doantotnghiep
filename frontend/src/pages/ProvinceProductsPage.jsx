import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import provinces from '../data/provinceData';
import { productApi } from '../api/productApi';

export default function ProvinceProductsPage() {
  const { slug } = useParams();
  const province = provinces.find(p => p.slug === slug);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productApi.getByProvinceSlug(slug);
        if (Array.isArray(res)) {
          setSpecialties(res);
        } else if (res && res.data) {
          setSpecialties(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [slug]);

  if (!province) {
    return (
      <MainLayout>
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          Không tìm thấy tỉnh thành này.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={{ padding: '80px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '3rem', color: '#8b4513', marginBottom: '20px' }}>
            Đặc sản {province.name}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666' }}>
            Khám phá những món ăn và sản vật làm nên tên tuổi của vùng đất này.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải danh sách đặc sản...</div>
        ) : specialties.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '50px' }}>
            Chưa có thông tin đặc sản cho tỉnh/thành phố này.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {specialties.map((item, index) => (
              <div key={index} style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {item.imageUrl || item.image ? (
                  <img 
                    src={item.imageUrl || item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ width: '100%', height: '200px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                    <span>Chưa có hình ảnh</span>
                  </div>
                )}
                
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.5rem', color: '#333', margin: '0 0 10px 0' }}>{item.name}</h3>
                  <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                    {item.description || 'Đặc sản nổi tiếng đang chờ bạn khám phá chi tiết.'}
                  </p>
                  {item.slug && (
                    <Link 
                      to={`/province/${slug}/dac-san/${item.slug}`}
                      style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#d2691e', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}
                    >
                      Xem chi tiết
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
