using AutoMapper;
using WebApplication1.Application.DTOs.ProductDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;

namespace WebApplication1.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IProvinceRepository _provinceRepository;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository productRepository, IProvinceRepository provinceRepository, IMapper mapper)
    {
        _productRepository = productRepository;
        _provinceRepository = provinceRepository;
        _mapper = mapper;
    }

    public async Task<List<ProductDto>> GetAllAsync(CancellationToken cancellationToken)
    {
        var products = await _productRepository.GetAllAsync(cancellationToken);
        return _mapper.Map<List<ProductDto>>(products);
    }

    public async Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        return product is null ? null : _mapper.Map<ProductDto>(product);
    }

    public async Task<List<ProductDto>> GetByProvinceIdAsync(Guid provinceId, CancellationToken cancellationToken)
    {
        var products = await _productRepository.GetByProvinceIdAsync(provinceId, cancellationToken);
        return _mapper.Map<List<ProductDto>>(products);
    }

    public async Task<ProductDto> CreateAsync(ProductCreateDto dto, CancellationToken cancellationToken)
    {
        var province = await _provinceRepository.GetByIdAsync(dto.ProvinceId, cancellationToken);
        if (province is null)
        {
            throw new InvalidOperationException("Province not found.");
        }

        var product = _mapper.Map<Product>(dto);
        product.Id = Guid.NewGuid();
        await _productRepository.AddAsync(product, cancellationToken);
        return _mapper.Map<ProductDto>(product);
    }

    public async Task<ProductDto?> UpdateAsync(Guid id, ProductUpdateDto dto, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        if (product is null)
        {
            return null;
        }

        var province = await _provinceRepository.GetByIdAsync(dto.ProvinceId, cancellationToken);
        if (province is null)
        {
            throw new InvalidOperationException("Province not found.");
        }

        _mapper.Map(dto, product);
        await _productRepository.UpdateAsync(product, cancellationToken);
        return _mapper.Map<ProductDto>(product);
    }

    public async Task<bool> DeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        if (product is null)
        {
            return false;
        }

        await _productRepository.DeleteAsync(product, cancellationToken);
        return true;
    }
}
