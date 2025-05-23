using Microsoft.EntityFrameworkCore;
using SmartTaskAssistant.API.Data;
using SmartTaskAssistant.API.Models;
using Microsoft.Extensions.Options;
using OpenAI;
using OpenAI.Chat;
using OpenAI.Models;





var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<SmartTaskAssistant.API.Data.AppDbContext>(options =>
    options.UseSqlite("Data Source=tasks.db"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
builder.Services.Configure<OpenAIConfig>(builder.Configuration.GetSection("OpenAI"));

var app = builder.Build();

app.UseCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

// GET all tasks
app.MapGet("/api/tasks", async (AppDbContext db) =>
    await db.Tasks.ToListAsync());

// GET task by id
app.MapGet("/api/tasks/{id}", async (AppDbContext db, Guid id) =>
    await db.Tasks.FindAsync(id) is TaskItem task
        ? Results.Ok(task)
        : Results.NotFound());

// POST a new task
app.MapPost("/api/tasks", async (AppDbContext db, TaskItem task) =>
{
    task.Id = Guid.NewGuid(); // Generate GUID
    task.CreatedDate = DateTime.UtcNow;
    db.Tasks.Add(task);
    await db.SaveChangesAsync();
    return Results.Created($"/api/tasks/{task.Id}", task);
});

// PUT (update) an existing task
app.MapPut("/api/tasks/{id}", async (AppDbContext db, Guid id, TaskItem updatedTask) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    task.Title = updatedTask.Title;
    task.Description = updatedTask.Description;
    task.Status = updatedTask.Status;
    task.DueDate = updatedTask.DueDate;
    task.Completed = updatedTask.Completed;

    await db.SaveChangesAsync();
    return Results.Ok(task);
});

// DELETE a task
app.MapDelete("/api/tasks/{id}", async (AppDbContext db, Guid id) =>
{
    var task = await db.Tasks.FindAsync(id);
    if (task is null) return Results.NotFound();

    db.Tasks.Remove(task);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

//app.MapGet("/api/tasks/summary", async (SmartTaskAssistantDbContext db) =>
//{
//    var tasks = await db.Tasks.ToListAsync();
//    var total = tasks.Count;
//    var completed = tasks.Count(t => t.Completed);
//    var pending = total - completed;

//    return Results.Ok(new { total, completed, pending });
//});

app.MapPost("/api/ai/summary", async (SummaryRequest request, IConfiguration config, IHttpClientFactory httpClientFactory) =>
{
    var apiKey = config["OpenAI:ApiKey"];
    if (string.IsNullOrEmpty(apiKey))
        return Results.Problem("OpenAI API key is missing in configuration.");

    var taskDetails = string.Join("\n", request.Tasks.Select(t =>
        $"- {t.Title} ({t.Status}) - {(t.Completed ? "✅ Completed" : "⏳ Incomplete")}"));

    var messages = new List<ChatCompletionRequestMessage>
    {
        new ChatCompletionRequestMessage { Role = "system", Content = "You are a helpful assistant that summarizes tasks clearly and concisely." },
        new ChatCompletionRequestMessage { Role = "user", Content = $"Summarize the following tasks:\n{taskDetails}" }
    };

    var chatRequest = new ChatCompletionRequest
    {
        Model = "gpt-3.5-turbo",
        Messages = messages,
        Max_tokens = 200
    };

    var client = httpClientFactory.CreateClient();
    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiKey);

    var response = await client.PostAsJsonAsync("https://api.openai.com/v1/chat/completions", chatRequest);

    if (!response.IsSuccessStatusCode)
    {
        var error = await response.Content.ReadAsStringAsync();
        return Results.Problem($"OpenAI API request failed: {error}");
    }

    var completionResponse = await response.Content.ReadFromJsonAsync<ChatCompletionResponse>();

    var summary = completionResponse?.Choices.FirstOrDefault()?.Message.Content ?? "No summary returned";

    return Results.Ok(new { summary });
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
