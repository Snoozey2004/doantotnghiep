import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import searchApi from '../api/searchApi';
import { landingConfigApi } from '../api/landingConfigApi';
import localProvinces from '../data/provinceData';
import '../styles/search.css';

const PROVINCE_SLUGS_ORDERED = [
  'ha-noi', 'hai-phong', 'hue', 'da-nang', 'can-tho', 'ho-chi-minh',
  'cao-bang', 'dien-bien', 'lai-chau', 'lao-cai', 'son-la', 'lang-son',
  'tuyen-quang', 'thai-nguyen', 'phu-tho', 'quang-ninh', 'bac-ninh',
  'hung-yen', 'ninh-binh', 'thanh-hoa', 'nghe-an', 'ha-tinh', 'quang-tri',
  'quang-ngai', 'gia-lai', 'khanh-hoa', 'lam-dong', 'dak-lak', 'dong-nai',
  'tay-ninh', 'dong-thap', 'vinh-long', 'an-giang', 'ca-mau'
];

const PROVINCE_REGION_MAP = {
  'ha-noi': 'North', 'hai-phong': 'North', 'cao-bang': 'North', 'dien-bien': 'North',
  'lai-chau': 'North', 'lao-cai': 'North', 'son-la': 'North', 'lang-son': 'North',
  'tuyen-quang': 'North', 'thai-nguyen': 'North', 'phu-tho': 'North',
  'quang-ninh': 'North', 'bac-ninh': 'North', 'hung-yen': 'North', 'ninh-binh': 'North',
  'hue': 'Central', 'da-nang': 'Central', 'thanh-hoa': 'Central', 'nghe-an': 'Central',
  'ha-tinh': 'Central', 'quang-tri': 'Central', 'quang-ngai': 'Central',
  'gia-lai': 'Central', 'khanh-hoa': 'Central', 'lam-dong': 'Central', 'dak-lak': 'Central',
  'ho-chi-minh': 'South', 'can-tho': 'South', 'dong-nai': 'South', 'tay-ninh': 'South',
  'dong-thap': 'South', 'vinh-long': 'South', 'an-giang': 'South', 'ca-mau': 'South'
};

const provinceMap = new Map(localProvinces.map(p => [p.slug, p]));

function normalizeVi(str) {
  if (!str) return '';
  return str.toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'd');
}

function buildLocalProvinceResults(filters = {}, keyword = '') {
  if (filters.contentType && filters.contentType !== 'Province') return [];
  const normKw = normalizeVi(keyword.trim());
  return PROVINCE_SLUGS_ORDERED
    .filter(slug => !filters.region || PROVINCE_REGION_MAP[slug] === filters.region)
    .map((slug, index) => {
      const p = provinceMap.get(slug);
      if (!p) return null;
      if (normKw) {
        const haystack = normalizeVi([p.name, p.description, p.slogan].join(' '));
        if (!haystack.includes(normKw)) return null;
      }
      return {
        id: slug,
        itemType: 'Province',
        slug: p.slug,
        title: p.name,
        description: p.description,
        imageUrl: typeof p.heroImage === 'string' ? p.heroImage : null,
        isHighlighted: false,
        relevanceScore: normKw ? (normalizeVi(p.name).includes(normKw) ? 100 : 60) : 100 - index,
        region: PROVINCE_REGION_MAP[slug] || null,
        category: null,
        tags: null
      };
    }).filter(Boolean)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

const CATEGORIES = [
  { value: 'History', label: 'Lịch sử', icon: '🏛' },
  { value: 'Culture', label: 'Văn hóa', icon: '🎭' },
  { value: 'Tourism', label: 'Du lịch', icon: '🗺' },
  { value: 'Cuisine', label: 'Ẩm thực', icon: '🍜' },
  { value: 'Festival', label: 'Lễ hội', icon: '🎊' }
];
const REGIONS = [
  { value: 'North', label: 'Miền Bắc' },
  { value: 'Central', label: 'Miền Trung' },
  { value: 'South', label: 'Miền Nam' }
];
const CONTENT_TYPES = [
  { value: 'Province', label: 'Tỉnh/Thành' },
  { value: 'Post', label: 'Bài viết' },
  { value: 'Media', label: 'Media' },
  { value: 'Product', label: 'Sản phẩm' }
];
const MEDIA_TYPES = [
  { value: 'Image', label: 'Hình ảnh' },
  { value: 'Video', label: 'Video' }
];

const TYPE_LABELS = {
  Province: 'Tỉnh/Thành',
  Post: 'Bài viết',
  Media: 'Media',
  Product: 'Sản phẩm',
};

const REGION_LABELS = {
  North: 'Miền Bắc',
  Central: 'Miền Trung',
  South: 'Miền Nam',
};

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton-line w60" />
        <div className="skeleton-line w90" />
        <div className="skeleton-line w80" />
        <div className="skeleton-line w40" />
      </div>
    </div>
  );
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [loading, setLoading] = useState(false);
  const latestSearchRequestRef = useRef(0);
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const inputRef = useRef(null);
  const [bgMap, setBgMap] = useState({});

  const [filters, setFilters] = useState({
    region: searchParams.get('region') || '',
    category: searchParams.get('category') || '',
    contentType: searchParams.get('contentType') || 'Province',
    mediaType: searchParams.get('mediaType') || '',
    tags: searchParams.get('tags') || ''
  });

  const activeFilterCount = [
    filters.region,
    filters.category,
    filters.mediaType,
    filters.tags
  ].filter(Boolean).length;

  useEffect(() => {
    landingConfigApi.getBackgrounds()
      .then((list) => {
        const map = {};
        (list || []).forEach((item) => { if (item.slug && item.backgroundUrl) map[item.slug] = item.backgroundUrl; });
        setBgMap(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isComposing) return;
    const urlKeyword = searchParams.get('keyword') || searchParams.get('q') || '';
    setKeyword((prev) => (prev === urlKeyword ? prev : urlKeyword));
  }, [searchParams, isComposing]);

  useEffect(() => {
    if (isComposing) { setShowSuggestions(false); return; }
    if (keyword.length > 1) {
      const timer = setTimeout(async () => {
        try {
          const s = await searchApi.getSuggestions(keyword);
          setSuggestions(s || []);
          setShowSuggestions(true);
        } catch {
          setSuggestions([]);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
    setSuggestions([]);
    setShowSuggestions(false);
  }, [keyword, isComposing]);

  useEffect(() => {
    if (isComposing) return;
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      const allLocal = buildLocalProvinceResults(filters);
      const pageSize = 10;
      const start = (currentPage - 1) * pageSize;
      // Ưu tiên ảnh heroImage tuyển chọn riêng của từng tỉnh; chỉ dùng background
      // từ backend khi tỉnh chưa có heroImage (tránh ảnh mặc định homepage.png trùng lặp).
      setResults(allLocal.slice(start, start + pageSize).map(r => ({ ...r, imageUrl: r.imageUrl || bgMap[r.slug] })));
      setTotalCount(allLocal.length);
      setShowSuggestions(false);
      setLoading(false);
      return;
    }

    // Province: search local data, no API needed
    if (!filters.contentType || filters.contentType === 'Province') {
      const allLocal = buildLocalProvinceResults(filters, trimmedKeyword);
      const pageSize = 10;
      const start = (currentPage - 1) * pageSize;
      // Ưu tiên ảnh heroImage tuyển chọn riêng của từng tỉnh; chỉ dùng background
      // từ backend khi tỉnh chưa có heroImage (tránh ảnh mặc định homepage.png trùng lặp).
      setResults(allLocal.slice(start, start + pageSize).map(r => ({ ...r, imageUrl: r.imageUrl || bgMap[r.slug] })));
      setTotalCount(allLocal.length);
      setShowSuggestions(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      const requestId = latestSearchRequestRef.current + 1;
      latestSearchRequestRef.current = requestId;
      try {
        const data = await searchApi.search({
          keyword: trimmedKeyword,
          region: filters.region,
          mediaType: filters.mediaType,
          contentType: filters.contentType,
          page: currentPage,
          pageSize: 10
        });
        if (requestId !== latestSearchRequestRef.current) return;
        setResults(data.results || []);
        setTotalCount(data.totalCount || 0);
        setShowSuggestions(false);
        const params = new URLSearchParams({
          keyword: trimmedKeyword,
          ...(filters.region ? { region: filters.region } : {}),
          ...(filters.contentType ? { contentType: filters.contentType } : {}),
          ...(filters.mediaType ? { mediaType: filters.mediaType } : {}),
          ...(currentPage > 1 ? { page: String(currentPage) } : {})
        });
        setSearchParams(params);
      } catch {
        if (requestId !== latestSearchRequestRef.current) return;
        setResults([]);
        setTotalCount(0);
      } finally {
        if (requestId === latestSearchRequestRef.current) setLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [keyword, filters, currentPage, setSearchParams, isComposing, bgMap]);

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setShowSuggestions(false);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ region: '', category: '', contentType: 'Province', mediaType: '', tags: '' });
    setCurrentPage(1);
  };

  const getTotalPages = () => Math.ceil(totalCount / 10);

  const handleItemClick = (item) => {
    if (item.itemType === 'Province') navigate(`/province/${item.slug}`);
    else if (item.itemType === 'Post') navigate(`/post/${item.id}`);
  };

  return (
    <MainLayout>
      <div className="search-page">

        {/* ── Hero search header ── */}
        <div className="search-hero">
          <div className="search-hero-inner">
            <p className="search-hero-kicker">Khám phá</p>
            <h1 className="search-hero-title">Tìm kiếm nội dung</h1>

            <div className="search-bar-wrap">
              <span className="search-icon">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <circle cx="8.5" cy="8.5" r="5.5" />
                  <line x1="13" y1="13" x2="18" y2="18" />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Tìm tỉnh thành, bài viết, ẩm thực, lễ hội..."
                value={keyword}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={(e) => { setIsComposing(false); setKeyword(e.currentTarget.value); }}
                onChange={(e) => setKeyword(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              />
              {keyword && (
                <button className="search-clear" onClick={() => { setKeyword(''); inputRef.current?.focus(); }} aria-label="Xóa">
                  <svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </button>
              )}

              {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                  {suggestions.map((s, i) => (
                    <div key={i} className="suggestion-item" onMouseDown={() => handleSuggestionClick(s)}>
                      <svg className="sug-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="6.5" cy="6.5" r="4" /><line x1="10" y1="10" x2="14" y2="14" />
                      </svg>
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Filter chips ── */}
            <div className="filter-rows">
              {/* Content type */}
              <div className="filter-row">
                <span className="filter-row-label">Loại</span>
                <div className="chip-group">
                  {CONTENT_TYPES.map(t => (
                    <button
                      key={t.value}
                      className={`chip${filters.contentType === t.value ? ' chip--active' : ''}`}
                      onClick={() => handleFilterChange('contentType', t.value)}
                    >{t.label}</button>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div className="filter-row">
                <span className="filter-row-label">Vùng</span>
                <div className="chip-group">
                  <button
                    className={`chip${!filters.region ? ' chip--active' : ''}`}
                    onClick={() => handleFilterChange('region', '')}
                  >Tất cả</button>
                  {REGIONS.map(r => (
                    <button
                      key={r.value}
                      className={`chip${filters.region === r.value ? ' chip--active' : ''}`}
                      onClick={() => handleFilterChange('region', r.value)}
                    >{r.label}</button>
                  ))}
                </div>
              </div>

{/* Media type row — only when content type is Media */}
              {filters.contentType === 'Media' && (
                <div className="filter-row">
                  <span className="filter-row-label">Media</span>
                  <div className="chip-group">
                    <button
                      className={`chip${!filters.mediaType ? ' chip--active' : ''}`}
                      onClick={() => handleFilterChange('mediaType', '')}
                    >Tất cả</button>
                    {MEDIA_TYPES.map(m => (
                      <button
                        key={m.value}
                        className={`chip${filters.mediaType === m.value ? ' chip--active' : ''}`}
                        onClick={() => handleFilterChange('mediaType', m.value)}
                      >{m.label}</button>
                    ))}
                  </div>
                </div>
              )}

              {activeFilterCount > 0 && (
                <button className="btn-clear-filters" onClick={handleClearFilters}>
                  × Xóa {activeFilterCount} bộ lọc
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Results area ── */}
        <div className="search-body">
          <div className="search-body-inner">

            {/* Results meta */}
            {!loading && results.length > 0 && (
              <div className="results-meta">
                <span className="results-count">
                  {keyword.trim()
                    ? <><strong>{totalCount.toLocaleString()}</strong> kết quả cho "<em>{keyword}</em>"</>
                    : <><strong>{totalCount}</strong> tỉnh/thành phố</>}
                </span>
              </div>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className="results-list">
                {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Empty state */}
            {!loading && results.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3>{keyword.trim() ? `Không tìm thấy kết quả cho "${keyword}"` : 'Nhập từ khóa để tìm kiếm'}</h3>
                <p>{keyword.trim() ? 'Thử thay đổi từ khóa hoặc xóa bộ lọc để tìm thêm nội dung.' : 'Tìm kiếm tỉnh thành, bài viết, ẩm thực, lễ hội và nhiều nội dung khác.'}</p>
                {activeFilterCount > 0 && (
                  <button className="btn-clear-filters-lg" onClick={handleClearFilters}>Xóa bộ lọc</button>
                )}
              </div>
            )}

            {/* Result cards */}
            {!loading && results.length > 0 && (
              <div className="results-list">
                {results.map((item) => (
                  <div key={item.id} className="result-card" onClick={() => handleItemClick(item)}>
                    {item.imageUrl ? (
                      <div className="result-card-img">
                        <img src={item.imageUrl} alt={item.title} loading="lazy" />
                      </div>
                    ) : (
                      <div className="result-card-img result-card-img--placeholder">
                        <span>{item.title?.[0] ?? '?'}</span>
                      </div>
                    )}

                    <div className="result-card-body">
                      <div className="result-card-top">
                        <span className={`result-badge type-${item.itemType?.toLowerCase()}`}>
                          {TYPE_LABELS[item.itemType] ?? item.itemType}
                        </span>
                        {item.region && <span className="result-badge result-badge--region">{REGION_LABELS[item.region] ?? item.region}</span>}
                        {item.category && <span className="result-badge result-badge--cat">{item.category}</span>}
                        {item.isHighlighted && <span className="result-badge result-badge--star">★ Nổi bật</span>}
                      </div>

                      <h3 className="result-card-title">{item.title}</h3>
                      <p className="result-card-desc">
                        {item.description ? item.description.substring(0, 160) + (item.description.length > 160 ? '…' : '') : ''}
                      </p>

                      {item.tags && (
                        <div className="result-card-tags">
                          {item.tags.split(',').slice(0, 4).map((tag, idx) => (
                            <span key={idx} className="result-tag">{tag.trim()}</span>
                          ))}
                        </div>
                      )}

                      <span className="result-card-arrow">Xem chi tiết →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {getTotalPages() > 1 && !loading && (
              <div className="pagination">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >← Trước</button>

                <div className="page-numbers">
                  {Array.from({ length: getTotalPages() }, (_, i) => i + 1)
                    .filter(p => p === 1 || p === getTotalPages() || Math.abs(p - currentPage) <= 2)
                    .reduce((acc, p, i, arr) => {
                      if (i > 0 && p - arr[i - 1] > 1) acc.push('…');
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === '…'
                        ? <span key={`ellipsis-${i}`} className="page-ellipsis">…</span>
                        : <button
                            key={p}
                            className={`page-num${p === currentPage ? ' page-num--active' : ''}`}
                            onClick={() => setCurrentPage(p)}
                          >{p}</button>
                    )
                  }
                </div>

                <button
                  className="page-btn"
                  disabled={currentPage === getTotalPages()}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >Sau →</button>
              </div>
            )}
          </div>
        </div>

      </div>
    </MainLayout>
  );
};

export default SearchPage;
