import React, { useEffect, useState } from 'react';
import SummaryBox from '../SummaryBox/SummaryBox';
import NaturalLanguageInput from '../NaturalLanguageInput/NaturalLanguageInput';
import TaskList from '../Tasks/TaskList';
import type { Task } from '../../interfaces/Task.interface';
import { TaskService } from '../../services/TaskService';
import {SummaryBoxService } from '../../services/SummaryBoxService';
import AISummaryBox from '../SummaryBox/AISummaryBox';
import './Dashboard.css';
import type { AISummary } from '../../interfaces/AISummaryBox.interface';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiSummary, setAISummary] = useState<AISummary>({ summary: '', title: '' });
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
        ...task,
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
    setLoadingSummary(true);
    try {
      const summaryResponse = await SummaryBoxService.fetchAISummary(tasks);
      setAISummary({
        summary: summaryResponse?.summary ?? '',
        title: summaryResponse?.title ?? '',
      });
    } catch (error) {
      console.error('Error fetching AI summary:', error);
      setAISummary({
        summary: 'Failed to generate summary.',
        title: '',
      });
    } finally {
      setLoadingSummary(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard dashboard-container">
      <h1>Smart Task Assistant</h1>

      <SummaryBox
        total={tasks.length}
        completed={tasks.filter((t) => t.completed).length}
        pending={tasks.filter((t) => !t.completed).length}
      />

      <button
        className="dashboard-ai-summary-btn"
        onClick={fetchAISummary}
        disabled={loadingSummary}
      >
        {loadingSummary ? 'Generating Summary...' : 'Generate AI Summary'}
      </button>

      {aiSummary && <AISummaryBox aisummary={aiSummary} />}

      <NaturalLanguageInput onAddTask={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};

export default Dashboard;
