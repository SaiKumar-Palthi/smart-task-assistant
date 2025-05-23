import axios from 'axios';
import type { Task } from '../interfaces/Task.interface';

const API_BASE_URL = 'https://localhost:7168/api/tasks';

export const TaskService = {
    async getTasks(): Promise<Task[]> {
        const response = await axios.get<Task[]>(API_BASE_URL);
        return response.data;
    },

    async getTask(id: string): Promise<Task> {
        const response = await axios.get<Task>(`${API_BASE_URL}/${id}`);
        return response.data;
    },

    async createTask(task: Omit<Task, 'id' | 'createdDate'>): Promise<Task> {
        const response = await axios.post<Task>(API_BASE_URL, task);
        return response.data;
    },

    async updateTask(id: string, task: Partial<Omit<Task, 'id' | 'createdDate'>>): Promise<Task> {
        const response = await axios.put<Task>(`${API_BASE_URL}/${id}`, task);
        return response.data;
    },

    async deleteTask(id: string): Promise<void> {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
};
