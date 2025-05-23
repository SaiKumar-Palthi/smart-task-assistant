using Microsoft.EntityFrameworkCore;
using SmartTaskAssistant.API.Models;

namespace SmartTaskAssistant.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
}
