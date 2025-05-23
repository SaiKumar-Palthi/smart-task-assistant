public class ChatCompletionRequestMessage
{
    public string Role { get; set; } = null!;
    public string Content { get; set; } = null!;
}

public class ChatCompletionRequest
{
    public string Model { get; set; } = "gpt-3.5-turbo";
    public List<ChatCompletionRequestMessage> Messages { get; set; } = new();
    public int Max_tokens { get; set; } = 200;
}

public class ChatCompletionResponseChoice
{
    public int Index { get; set; }
    public ChatCompletionRequestMessage Message { get; set; } = null!;
    public string Finish_reason { get; set; } = null!;
}

public class ChatCompletionResponse
{
    public string Id { get; set; } = null!;
    public string Object { get; set; } = null!;
    public int Created { get; set; }
    public List<ChatCompletionResponseChoice> Choices { get; set; } = new();
    public object Usage { get; set; } = null!;
}
