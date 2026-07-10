using Microsoft.EntityFrameworkCore;
using WebApplication1.Application.DTOs.OrderDTOs;
using WebApplication1.Application.Interfaces.Services;
using WebApplication1.Domain.Entities;
using WebApplication1.Domain.Enums;
using WebApplication1.Infrastructure.Data;

namespace WebApplication1.Application.Services;

public class OrderService : IOrderService
{
    private readonly AppDbContext _context;

    public OrderService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<OrderDto>> CreateOrdersAsync(CreateOrderDto request, Guid? customerId)
    {
        // 1. Lấy thông tin các ProductOffer
        var offerIds = request.Items.Select(i => i.ProductOfferId).ToList();
        var offers = await _context.ProductOffers
            .Include(o => o.Seller)
            .Include(o => o.Product)
            .Where(o => offerIds.Contains(o.Id))
            .ToListAsync();

        var createdOrders = new List<Order>();

        // 2. Nhóm sản phẩm theo người bán (Seller)
        var itemsBySeller = request.Items
            .Select(i => new { DtoItem = i, Offer = offers.FirstOrDefault(o => o.Id == i.ProductOfferId) })
            .Where(x => x.Offer != null)
            .GroupBy(x => x.Offer!.SellerId)
            .ToList();

        foreach (var sellerGroup in itemsBySeller)
        {
            var sellerId = sellerGroup.Key;
            
            var order = new Order
            {
                Id = Guid.NewGuid(),
                OrderDate = DateTime.UtcNow,
                Status = OrderStatus.Pending,
                ShippingName = request.ShippingName,
                ShippingAddress = request.ShippingAddress,
                ShippingPhone = request.ShippingPhone,
                Notes = request.Notes,
                CustomerId = customerId,
                SellerId = sellerId,
                TotalAmount = 0
            };

            foreach (var item in sellerGroup)
            {
                var offer = item.Offer!;
                var quantity = item.DtoItem.Quantity;

                // Kiểm tra tồn kho
                if (offer.StockQuantity < quantity)
                {
                    throw new InvalidOperationException($"Sản phẩm {offer.Product.Name} từ gian hàng {offer.ShopName} không đủ số lượng tồn kho (còn {offer.StockQuantity}).");
                }

                // Trừ tồn kho
                offer.StockQuantity -= quantity;

                var orderItem = new OrderItem
                {
                    Id = Guid.NewGuid(),
                    OrderId = order.Id,
                    ProductOfferId = offer.Id,
                    ProductName = offer.Product.Name,
                    UnitPrice = offer.Price,
                    Quantity = quantity
                };

                order.TotalAmount += orderItem.UnitPrice * orderItem.Quantity;
                order.Items.Add(orderItem);
            }

            _context.Orders.Add(order);
            createdOrders.Add(order);
        }

        await _context.SaveChangesAsync();

        return createdOrders.Select(MapToDto).ToList();
    }

    public async Task<List<OrderDto>> GetOrdersForCustomerAsync(Guid customerId)
    {
        var orders = await _context.Orders
            .Include(o => o.Seller)
            .Include(o => o.Items)
            .ThenInclude(i => i.ProductOffer)
            .ThenInclude(po => po.Product)
            .Where(o => o.CustomerId == customerId)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return orders.Select(MapToDto).ToList();
    }

    public async Task<List<OrderDto>> GetOrdersForSellerAsync(Guid sellerId)
    {
        var orders = await _context.Orders
            .Include(o => o.Customer)
            .Include(o => o.Items)
            .ThenInclude(i => i.ProductOffer)
            .ThenInclude(po => po.Product)
            .Where(o => o.SellerId == sellerId)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return orders.Select(MapToDto).ToList();
    }

    public async Task<OrderDto?> GetOrderByIdAsync(Guid id)
    {
        var order = await _context.Orders
            .Include(o => o.Customer)
            .Include(o => o.Seller)
            .Include(o => o.Items)
            .ThenInclude(i => i.ProductOffer)
            .ThenInclude(po => po.Product)
            .FirstOrDefaultAsync(o => o.Id == id);

        return order == null ? null : MapToDto(order);
    }

    public async Task<bool> UpdateOrderStatusAsync(Guid orderId, OrderStatus status, Guid userId, UserRole role)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
        if (order == null) return false;

        bool isAdmin = role == UserRole.Admin;
        bool isSeller = order.SellerId == userId;
        bool isCustomerCancelling = order.CustomerId == userId && status == OrderStatus.Cancelled && (order.Status == OrderStatus.Pending || order.Status == OrderStatus.Processing);

        if (!isAdmin && !isSeller && !isCustomerCancelling)
        {
            return false;
        }

        order.Status = status;
        await _context.SaveChangesAsync();
        return true;
    }

    private static OrderDto MapToDto(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            OrderDate = order.OrderDate,
            Status = order.Status,
            TotalAmount = order.TotalAmount,
            ShippingName = order.ShippingName,
            ShippingAddress = order.ShippingAddress,
            ShippingPhone = order.ShippingPhone,
            Notes = order.Notes,
            CustomerId = order.CustomerId,
            CustomerName = order.Customer?.FullName,
            SellerId = order.SellerId,
            SellerName = order.Seller?.FullName ?? string.Empty,
            Items = order.Items.Select(i => new OrderItemDto
            {
                Id = i.Id,
                ProductId = i.ProductOffer?.ProductId ?? Guid.Empty, // Map from offer if needed
                ProductName = i.ProductName,
                ProductImageUrl = i.ProductOffer?.Product?.ImageUrl ?? string.Empty,
                UnitPrice = i.UnitPrice,
                Quantity = i.Quantity
            }).ToList()
        };
    }
}
