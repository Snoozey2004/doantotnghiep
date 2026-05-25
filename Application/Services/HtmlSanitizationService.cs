using System.Text.RegularExpressions;
using WebApplication1.Application.Interfaces.Services;

namespace WebApplication1.Application.Services;

public class HtmlSanitizationService : IHtmlSanitizationService
{
    private static readonly HashSet<string> AllowedTags = new(StringComparer.OrdinalIgnoreCase)
    {
        // Text formatting
        "p", "br", "hr", "div", "span",
        // Headings
        "h1", "h2", "h3", "h4", "h5", "h6",
        // Text style
        "b", "strong", "i", "em", "u", "s", "sub", "sup", "mark", "code", "pre",
        // Lists
        "ul", "ol", "li", "dl", "dt", "dd",
        // Links and media
        "a", "img",
        // Tables
        "table", "thead", "tbody", "tfoot", "tr", "td", "th",
        // Quotes
        "blockquote",
        // Other semantic tags
        "figure", "figcaption", "section", "article"
    };

    private static readonly HashSet<string> AllowedAttributes = new(StringComparer.OrdinalIgnoreCase)
    {
        "href", "src", "alt", "title", "class", "id", "style",
        "width", "height", "target", "rel", "data-*"
    };

    private static readonly HashSet<string> DangerousProtocols = new(StringComparer.OrdinalIgnoreCase)
    {
        "javascript", "data", "vbscript", "file", "about"
    };

    public string Sanitize(string? html)
    {
        if (string.IsNullOrWhiteSpace(html))
        {
            return string.Empty;
        }

        // Remove script tags and their content
        html = RemoveScriptTags(html);

        // Remove event handlers
        html = RemoveEventHandlers(html);

        // Remove dangerous attributes
        html = RemoveDangerousAttributes(html);

        // Remove non-whitelisted tags but keep content
        html = RemoveDisallowedTags(html);

        // Encode potentially dangerous content
        html = EncodeDangerousContent(html);

        // Remove dangerous protocols from URLs
        html = RemoveDangerousProtocols(html);

        return html.Trim();
    }

    public bool IsValidHtml(string? html)
    {
        if (string.IsNullOrWhiteSpace(html))
        {
            return true;
        }

        // Check for balanced tags
        if (!HasBalancedTags(html))
        {
            return false;
        }

        // Check for malicious patterns
        if (ContainsMaliciousPatterns(html))
        {
            return false;
        }

        return true;
    }

    private static string RemoveScriptTags(string html)
    {
        // Remove <script> tags and content
        html = Regex.Replace(html, @"<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>", "", RegexOptions.IgnoreCase);

        // Remove event handlers like onclick, onload, etc.
        return html;
    }

    private static string RemoveEventHandlers(string html)
    {
        // Remove all event handlers (on* attributes)
        var eventPatterns = new[]
        {
            @"\s*on\w+\s*=\s*[""'][^""']*[""']",
            @"\s*on\w+\s*=\s*[^\s>]*"
        };

        foreach (var pattern in eventPatterns)
        {
            html = Regex.Replace(html, pattern, "", RegexOptions.IgnoreCase);
        }

        return html;
    }

    private static string RemoveDangerousAttributes(string html)
    {
        // Remove style attributes (can contain malicious code)
        html = Regex.Replace(html, @"\s*style\s*=\s*[""'][^""']*[""']", "", RegexOptions.IgnoreCase);

        // Remove expression() in style
        html = Regex.Replace(html, @"expression\s*\([^)]*\)", "", RegexOptions.IgnoreCase);

        return html;
    }

    private static string RemoveDisallowedTags(string html)
    {
        // Match all tags
        var tagPattern = @"</?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>";
        var matches = Regex.Matches(html, tagPattern);

        foreach (Match match in matches)
        {
            var tagName = match.Groups[1].Value;
            if (!AllowedTags.Contains(tagName))
            {
                // Remove the tag but keep content
                html = html.Replace(match.Value, "");
            }
        }

        return html;
    }

    private static string EncodeDangerousContent(string html)
    {
        // Encode potentially dangerous HTML entities
        html = html.Replace("&", "&amp;");
        html = html.Replace("<", "&lt;");
        html = html.Replace(">", "&gt;");
        html = html.Replace("\"", "&quot;");
        html = html.Replace("'", "&#39;");

        // Decode back allowed tags
        foreach (var tag in AllowedTags)
        {
            // Decode opening tags
            html = html.Replace($"&lt;{tag}&gt;", $"<{tag}>");
            html = html.Replace($"&lt;{tag} ", $"<{tag} ");

            // Decode self-closing tags
            html = html.Replace($"&lt;{tag}/&gt;", $"<{tag}/>");

            // Decode closing tags
            html = html.Replace($"&lt;/{tag}&gt;", $"</{tag}>");
        }

        return html;
    }

    private static string RemoveDangerousProtocols(string html)
    {
        // Remove href and src with dangerous protocols
        var urlPattern = @"(?:href|src)\s*=\s*[""']([^""']*)[""']";
        html = Regex.Replace(html, urlPattern, (match) =>
        {
            var url = match.Groups[1].Value;
            var protocol = url.Split(':')[0].ToLowerInvariant();

            if (DangerousProtocols.Contains(protocol))
            {
                return ""; // Remove the attribute
            }

            return match.Value;
        }, RegexOptions.IgnoreCase);

        return html;
    }

    private static bool HasBalancedTags(string html)
    {
        var openTags = Regex.Matches(html, @"<([a-zA-Z][a-zA-Z0-9]*)\b");
        var closeTags = Regex.Matches(html, @"</([a-zA-Z][a-zA-Z0-9]*)\b");

        if (openTags.Count != closeTags.Count)
        {
            return false;
        }

        return true;
    }

    private static bool ContainsMaliciousPatterns(string html)
    {
        var maliciousPatterns = new[]
        {
            @"<iframe",
            @"<embed",
            @"<object",
            @"javascript:",
            @"vbscript:",
            @"<link",
            @"<meta",
            @"<base",
            @"<form"
        };

        foreach (var pattern in maliciousPatterns)
        {
            if (Regex.IsMatch(html, pattern, RegexOptions.IgnoreCase))
            {
                return true;
            }
        }

        return false;
    }
}
