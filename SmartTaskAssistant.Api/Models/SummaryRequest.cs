namespace SmartTaskAssistant.API.Models
{
    public class SummaryRequest
    {
        public List<TaskItem> Tasks { get; set; } = new();
    }
}
