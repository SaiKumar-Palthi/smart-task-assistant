import React, { useEffect, useState } from 'react';
import SummaryBox from '../SummaryBox/SummaryBox';
import NaturalLanguageInput from '../NaturalLanguageInput/NaturalLanguageInput';
import TaskList from '../Tasks/TaskList';
import type { Task } from '../../interfaces/Task.interface';
import { TaskService } from '../../services/TaskService';
import AISummaryBox from '../SummaryBox/AISummaryBox';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiSummary, setAISummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Load tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await TaskService.getTasks();
        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (title: string) => {
    try {
      const newTask = await TaskService.createTask({
        title,
        description: '',
        dueDate: undefined,
        status: 'Pending',
        completed: false,
      });
      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    try {
      const updated = await TaskService.updateTask(id, {
        completed: !task.completed,
        status: !task.completed ? 'Completed' : 'Pending',
      });
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await TaskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };
  const fetchAISummary = async () => {
    try {
        setLoadingSummary(true);
        const response = await fetch('https://localhost:7168/api/ai/summary', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tasks }) // wrap inside { tasks }
    });


      if (!response.ok) throw new Error('Failed to fetch summary');

      const result = await response.text(); // or .json() if your endpoint returns JSON
      setAISummary(result);
    } catch (error) {
      console.error('Error fetching AI summary:', error);
      setAISummary('Failed to generate summary.');
    } finally {
      setLoadingSummary(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Smart Task Assistant</h1>
      <SummaryBox
        total={tasks.length}
        completed={tasks.filter((t) => t.completed).length}
        pending={tasks.filter((t) => !t.completed).length}
      />
      <button onClick={fetchAISummary} disabled={loadingSummary}>
        {loadingSummary ? 'Generating Summary...' : 'Generate AI Summary'}
      </button>
      {aiSummary && <AISummaryBox summary={aiSummary} />}
      
      <NaturalLanguageInput onAddTask={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

export default Dashboard;
