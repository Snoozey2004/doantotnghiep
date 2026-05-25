using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Domain.Entities;
using WebApplication1.Infrastructure.Data;

public class ProductImportService : IProductImportService
{
    private readonly AppDbContext _context;

    public ProductImportService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ImportResultDto> ImportAsync(IFormFile file)
    {
        var result = new ImportResultDto();

        using var stream = new MemoryStream();
        await file.CopyToAsync(stream);
        stream.Position = 0;

        using var workbook = new XLWorkbook(stream);
        var sheet = workbook.Worksheet(1);

        var rows = sheet.RangeUsed().RowsUsed().Skip(1);

        var products = new List<Product>();

        foreach (var row in rows)
        {
            try
            {
                var slug = row.Cell(5).GetString();

                var province = await _context.Provinces
                    .FirstOrDefaultAsync(x => x.Slug == slug);

                if (province == null)
                {
                    result.Failed++;
                    result.Errors.Add($"Row {row.RowNumber()}: ProvinceSlug not found");
                    continue;
                }

                var product = new Product
                {
                    Id = Guid.NewGuid(),
                    Name = row.Cell(1).GetString(),
                    Description = row.Cell(2).GetString(),
                    Price = row.Cell(3).GetValue<decimal>(),
                    Stock = row.Cell(4).GetValue<int>(),
                    ProvinceId = province.Id,
                    ImageUrl = row.Cell(6).GetString()
                };

                products.Add(product);
                result.Success++;
            }
            catch (Exception ex)
            {
                result.Failed++;
                result.Errors.Add($"Row {row.RowNumber()}: {ex.Message}");
            }
        }

        _context.Products.AddRange(products);
        await _context.SaveChangesAsync();

        result.Total = result.Success + result.Failed;

        return result;
    }
}