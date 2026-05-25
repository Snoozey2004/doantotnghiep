public interface IProductImportService
{
    Task<ImportResultDto> ImportAsync(IFormFile file);
}