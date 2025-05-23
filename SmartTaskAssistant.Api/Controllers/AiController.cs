// using Microsoft.AspNetCore.Mvc;

// [ApiController]
// [Route("api/[controller]")]
// public class AiController : ControllerBase
// {
//     private readonly IHttpClientFactory _httpClientFactory;
//     private readonly IConfiguration _config;

//     public AiController(IHttpClientFactory httpClientFactory, IConfiguration config)
//     {
//         _httpClientFactory = httpClientFactory;
//         _config = config;
//     }

//     [HttpPost("summary")]
//     public async Task<IActionResult> GetSummary([FromBody] List<string> tasks)
//     {
//         string openAiKey = _config["OpenAI:ApiKey"];
//         string prompt = $"Summarize today's tasks: {string.Join(", ", tasks)}";

//         var client = _httpClientFactory.CreateClient();
//         client.DefaultRequestHeaders.Add("Authorization", $"Bearer {openAiKey}");

//         var response = await client.PostAsJsonAsync("https://api.openai.com/v1/chat/completions", new
//         {
//             model = "gpt-3.5-turbo",
//             messages = new[]
//             {
//                 new { role = "user", content = prompt }
//             }
//         });

//         var result = await response.Content.ReadAsStringAsync();
//         return Ok(result); // Later: Parse content only
//     }
// }
