using System.ComponentModel.DataAnnotations;

namespace SmartTaskAssistant.API.Models;

public class TaskItem
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Required]
        public string Status { get; set; } = "Pending"; // Could be "Pending", "In Progress", "Completed"

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        public DateTime? DueDate { get; set; }

        public bool Completed { get; set; } = false;
    }
