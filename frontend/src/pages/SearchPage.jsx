import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import searchApi from '../api/searchApi';
import '../styles/search.css';

const CATEGORIES = [
  { value: 'History', label: 'Lịch sử' },
  { value: 'Culture', label: 'Văn hóa' },
  { value: 'Tourism', label: 'Du lịch' },
  { value: 'Cuisine', label: 'Ẩm thực' },
  { value: 'Festival', label: 'Lễ hội' }
];
const REGIONS = [
  { value: 'North', label: 'Miền Bắc' },
  { value: 'Central', label: 'Miền Trung' },
  { value: 'South', label: 'Miền Nam' }
];
const CONTENT_TYPES = [
  { value: 'All', label: 'Tất cả' },
  { value: 'Province', label: 'Tỉnh/Thành' },
  { value: 'Post', label: 'Bài viết' },
  { value: 'Media', label: 'Media' },
  { value: 'Product', label: 'Sản phẩm' }
];
const MEDIA_TYPES = [
  { value: 'Image', label: 'Hình ảnh' },
  { value: 'Video', label: 'Video' }
];

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

  // Filter states
  const [filters, setFilters] = useState({
    region: searchParams.get('region') || '',
    category: searchParams.get('category') || '',
    contentType: searchParams.get('contentType') || 'All',
    mediaType: searchParams.get('mediaType') || '',
    tags: searchParams.get('tags') || ''
  });

  useEffect(() => {
    if (isComposing) {
      return;
    }

    const urlKeyword = searchParams.get('keyword') || searchParams.get('q') || '';
    setKeyword((prev) => (prev === urlKeyword ? prev : urlKeyword));
  }, [searchParams, isComposing]);

  // Fetch suggestions while typing
  useEffect(() => {
    if (isComposing) {
      setShowSuggestions(false);
      return;
    }

    if (keyword.length > 1) {
      const timer = setTimeout(async () => {
        try {
          const suggestions = await searchApi.getSuggestions(keyword);
          setSuggestions(suggestions || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      }, 300);
      return () => clearTimeout(timer);
    }

    setSuggestions([]);
    setShowSuggestions(false);
  }, [keyword, isComposing]);

  // Perform search
  useEffect(() => {
    if (isComposing) {
      return;
    }

    const performSearch = async () => {
      const trimmedKeyword = keyword.trim();
      if (!trimmedKeyword) {
        setResults([]);
        setTotalCount(0);
        return;
      }

      const requestId = latestSearchRequestRef.current + 1;
      latestSearchRequestRef.current = requestId;

      setLoading(true);
      try {
        const data = await searchApi.search({
          keyword: trimmedKeyword,
          region: filters.region,
          category: filters.category,
          mediaType: filters.mediaType,
          contentType: filters.contentType,
          tags: filters.tags,
          page: currentPage,
          pageSize: 10
        });

        if (requestId !== latestSearchRequestRef.current) {
          return;
        }

        setResults(data.results || []);
        setTotalCount(data.totalCount || 0);
        setShowSuggestions(false);

        // Update URL with search params
        const params = new URLSearchParams({
          keyword: trimmedKeyword,
          ...(filters.region ? { region: filters.region } : {}),
          ...(filters.category ? { category: filters.category } : {}),
          ...(filters.contentType && filters.contentType !== 'All' ? { contentType: filters.contentType } : {}),
          ...(filters.mediaType ? { mediaType: filters.mediaType } : {}),
          ...(filters.tags ? { tags: filters.tags } : {}),
          ...(currentPage > 1 ? { page: String(currentPage) } : {})
        });
        setSearchParams(params);
      } catch (error) {
        if (requestId !== latestSearchRequestRef.current) {
          return;
        }

        console.error('Search error:', error);
        setResults([]);
        setTotalCount(0);
      } finally {
        if (requestId === latestSearchRequestRef.current) {
          setLoading(false);
        }
      }
    };

    performSearch();
  }, [keyword, filters, currentPage, setSearchParams, isComposing]);

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setShowSuggestions(false);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      region: '',
      category: '',
      contentType: 'All',
      mediaType: '',
      tags: ''
    });
    setCurrentPage(1);
  };

  const getTotalPages = () => {
    return Math.ceil(totalCount / 10);
  };

  const handleItemClick = (item) => {
    if (item.itemType === 'Province') {
      navigate(`/province/${item.id}`);
    } else if (item.itemType === 'Post') {
      navigate(`/post/${item.id}`);
    }
  };

  return (
    <MainLayout>
      <div className="search-page">
        <div className="search-header">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm tỉnh thành, bài viết, media và nhiều nội dung khác..."
              value={keyword}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={(e) => {
                setIsComposing(false);
                setKeyword(e.currentTarget.value);
              }}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="search-content">
          {/* Filter Panel */}
          <aside className="search-filters">
            <h3>Bộ lọc</h3>

            {/* Content Type Filter */}
            <div className="filter-group">
              <label>Loại nội dung</label>
              <select
                value={filters.contentType}
                onChange={(e) => handleFilterChange('contentType', e.target.value)}
              >
                {CONTENT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Region Filter */}
            <div className="filter-group">
              <label>Khu vực</label>
              <select
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
              >
                <option value="">Tất cả khu vực</option>
                {REGIONS.map(region => (
                  <option key={region.value} value={region.value}>{region.label}</option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <label>Chủ đề</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">Tất cả chủ đề</option>
                {CATEGORIES.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>

            {/* Media Type Filter */}
            <div className="filter-group">
              <label>Loại media</label>
              <select
                value={filters.mediaType}
                onChange={(e) => handleFilterChange('mediaType', e.target.value)}
              >
                <option value="">Tất cả media</option>
                {MEDIA_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Tags Filter */}
            <div className="filter-group">
              <label>Thẻ (phân tách bằng dấu phẩy)</label>
              <input
                type="text"
                value={filters.tags}
                onChange={(e) => handleFilterChange('tags', e.target.value)}
                placeholder="ví dụ: cultural, historic"
              />
            </div>

            <button className="btn-clear-filters" onClick={handleClearFilters}>
              Xóa bộ lọc
            </button>
          </aside>

          {/* Results */}
          <main className="search-results">
            {loading && <div className="loading">Đang tìm kiếm...</div>}

            {!loading && results.length === 0 && keyword.trim() && (
              <div className="no-results">
                Không tìm thấy kết quả cho "{keyword}"
              </div>
            )}

            {!loading && !keyword.trim() && (
              <div className="empty-search">
                Bắt đầu nhập để tìm kiếm tỉnh thành, bài viết, media và nhiều nội dung khác.
              </div>
            )}

            {results.length > 0 && (
              <>
                <div className="results-info">
                  Tìm thấy {totalCount} kết quả cho "{keyword}"
                </div>

                <div className="results-list">
                  {results.map((item) => (
                    <div
                      key={item.id}
                      className="search-result-item"
                      onClick={() => handleItemClick(item)}
                    >
                      {item.imageUrl && (
                        <div className="result-image">
                          <img src={item.imageUrl} alt={item.title} />
                        </div>
                      )}
                      {item.videoUrl && !item.imageUrl && (
                        <div className="result-video">
                          <video src={item.videoUrl} />
                        </div>
                      )}

                      <div className="result-content">
                        <div className="result-header">
                          <h3 className="result-title">{item.title}</h3>
                          <span className={`result-type type-${item.itemType.toLowerCase()}`}>
                            {item.itemType}
                          </span>
                        </div>

                        {item.category && (
                          <span className="result-category">{item.category}</span>
                        )}

                        {item.region && (
                          <span className="result-region">{item.region}</span>
                        )}

                        <p className="result-description">
                          {item.description ? item.description.substring(0, 150) : 'No description available'}...
                        </p>

                        {item.tags && (
                          <div className="result-tags">
                            {item.tags.split(',').slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="tag">{tag.trim()}</span>
                            ))}
                          </div>
                        )}

                        <div className="result-meta">
                          {item.isHighlighted && (
                            <span className="badge-highlighted">★ Featured</span>
                          )}
                          <span className="relevance">
                            Relevance: {item.relevanceScore}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {getTotalPages() > 1 && (
                  <div className="pagination">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Trước
                    </button>
                    <span>Trang {currentPage} / {getTotalPages()}</span>
                    <button
                      disabled={currentPage === getTotalPages()}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Sau
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchPage;
