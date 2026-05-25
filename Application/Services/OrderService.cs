using AutoMapper;
using WebApplication1.Application.DTOs.OrderDTOs;
using WebApplication1.Application.Interfaces.Repositories;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;
using WebApplication1.Domain.Enums;

namespace WebApplication1.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public OrderService(
        IOrderRepository orderRepository,
        IProductRepository productRepository,
        IUserRepository userRepository,
        IMapper mapper)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<OrderDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetByIdAsync(id, cancellationToken);
        return order is null ? null : _mapper.Map<OrderDto>(order);
    }

    public async Task<List<OrderDto>> GetByUserIdAsync(Guid userId, CancellationToken cancellationToken)
    {
        var orders = await _orderRepository.GetByUserIdAsync(userId, cancellationToken);
        return _mapper.Map<List<OrderDto>>(orders);
    }

    public async Task<OrderDto?> GetByIdForUserAsync(Guid id, Guid userId, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetByIdForUserAsync(id, userId, cancellationToken);
        return order is null ? null : _mapper.Map<OrderDto>(order);
    }

    public async Task<OrderDto> CreateAsync(Guid? userId, OrderCreateDto dto, CancellationToken cancellationToken)
    {
        var resolvedUserId = userId ?? dto.UserId;
        if (!resolvedUserId.HasValue)
        {
            throw new InvalidOperationException("User is required.");
        }

        var user = await _userRepository.GetByIdAsync(resolvedUserId.Value, cancellationToken);
        if (user is null)
        {
            throw new InvalidOperationException("User not found.");
        }

        if (dto.Items.Count == 0)
        {
            throw new InvalidOperationException("Order items are required.");
        }

        var order = new Order
        {
            Id = Guid.NewGuid(),
            UserId = user.Id,
            Status = OrderStatus.Pending,
            CreatedAt = DateTime.UtcNow
        };

        var items = new List<OrderItem>();
        foreach (var item in dto.Items)
        {
            var product = await _productRepository.GetByIdAsync(item.ProductId, cancellationToken);
            if (product is null)
            {
                throw new InvalidOperationException("Product not found.");
            }

            if (product.Stock < item.Quantity)
            {
                throw new InvalidOperationException("Insufficient stock.");
            }

            product.Stock -= item.Quantity;
            await _productRepository.UpdateAsync(product, cancellationToken);

            items.Add(new OrderItem
            {
                Id = Guid.NewGuid(),
                OrderId = order.Id,
                ProductId = product.Id,
                ProductName = product.Name,
                UnitPrice = product.Price,
                Quantity = item.Quantity
            });
        }

        order.Items = items;
        order.TotalAmount = items.Sum(i => i.UnitPrice * i.Quantity);

        await _orderRepository.AddAsync(order, cancellationToken);
        return _mapper.Map<OrderDto>(order);
    }

    public async Task<OrderDto?> UpdateStatusAsync(Guid id, OrderStatusUpdateDto dto, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetByIdAsync(id, cancellationToken);
        if (order is null)
        {
            return null;
        }

        order.Status = dto.Status;
        await _orderRepository.UpdateAsync(order, cancellationToken);
        return _mapper.Map<OrderDto>(order);
    }
}
