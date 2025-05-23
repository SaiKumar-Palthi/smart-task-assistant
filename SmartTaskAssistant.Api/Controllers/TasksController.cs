// using Microsoft.AspNetCore.Mvc;
// using SmartTaskAssistant.API.Data;
// using SmartTaskAssistant.API.Models;

// [ApiController]
// [Route("api/[controller]")]
// public class TasksController : ControllerBase
// {
//     private readonly AppDbContext _context;

//     public TasksController(AppDbContext context)
//     {
//         _context = context;
//     }

//     [HttpGet]
//     public IActionResult GetTasks() => Ok(_context.Tasks.ToList());

//     [HttpGet("{id}")]
//     public IActionResult GetTask(int id)
//     {
//         var task = _context.Tasks.Find(id);
//         if (task == null) return NotFound();
//         return Ok(task);
//     }

//     [HttpPost]
//     public IActionResult AddTask([FromBody] TaskItem task)
//     {
//         _context.Tasks.Add(task);
//         _context.SaveChanges();
//         return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
//     }

//     [HttpPut("{id}")]
//     public IActionResult UpdateTask(int id, [FromBody] TaskItem updatedTask)
//     {
//         var task = _context.Tasks.Find(id);
//         if (task == null) return NotFound();

//         task.Title = updatedTask.Title;
//         task.Status = updatedTask.Status;
//         task.DueDate = updatedTask.DueDate;
//         task.Notes = updatedTask.Notes;

//         _context.SaveChanges();
//         return NoContent();
//     }
// }
