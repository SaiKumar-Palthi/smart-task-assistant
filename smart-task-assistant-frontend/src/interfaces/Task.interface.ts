type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
    id: string; // GUID
    title: string;
    description: string;
    status: TaskStatus;
    createdDate: string;
    dueDate?: string;
    completed: boolean;
}

