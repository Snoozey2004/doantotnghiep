using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers;

/// <summary>
/// Proxy AI chat: frontend gọi /api/ai/chat (KHÔNG kèm key). Backend tự gắn API key
/// (cất ở appsettings — không lộ ra trình duyệt) + ép model, rồi forward sang Google.
/// </summary>
[ApiController]
[Route("api/ai")]
public class AiChatController : ControllerBase
{
    private readonly IHttpClientFactory _httpFactory;
    private readonly IConfiguration _config;

    public AiChatController(IHttpClientFactory httpFactory, IConfiguration config)
    {
        _httpFactory = httpFactory;
        _config = config;
    }

    [HttpPost("chat")]
    public async Task<IActionResult> Chat([FromBody] JsonElement body, CancellationToken cancellationToken)
    {
        var apiKey = _config["Ai:ApiKey"];
        var model = _config["Ai:Model"] ?? "gemini-2.0-flash";
        var url = _config["Ai:BaseUrl"]
            ?? "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            return StatusCode(500, new { message = "AI API key chưa được cấu hình ở server (Ai:ApiKey)." });
        }

        if (!body.TryGetProperty("messages", out var messagesEl) || messagesEl.ValueKind != JsonValueKind.Array)
        {
            return BadRequest(new { message = "Thiếu 'messages' trong body." });
        }

        // Ép model + tham số ở server; chỉ nhận messages từ frontend.
        var payload = new JsonObject
        {
            ["model"] = model,
            ["messages"] = JsonNode.Parse(messagesEl.GetRawText()),
            ["max_tokens"] = 1024,
            ["temperature"] = 0.7,
        };

        var client = _httpFactory.CreateClient();
        using var request = new HttpRequestMessage(HttpMethod.Post, url)
        {
            Content = new StringContent(payload.ToJsonString(), Encoding.UTF8, "application/json"),
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        HttpResponseMessage response;
        try
        {
            response = await client.SendAsync(request, cancellationToken);
        }
        catch (Exception ex)
        {
            return StatusCode(502, new { message = "Không gọi được dịch vụ AI.", detail = ex.Message });
        }

        var respBody = await response.Content.ReadAsStringAsync(cancellationToken);
        // Trả nguyên response (giữ shape choices[].message.content) + đúng status code.
        return new ContentResult
        {
            Content = respBody,
            ContentType = "application/json",
            StatusCode = (int)response.StatusCode,
        };
    }
}
