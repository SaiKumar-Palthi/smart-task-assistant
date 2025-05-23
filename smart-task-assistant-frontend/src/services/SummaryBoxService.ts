import axios from "axios";

export interface SummaryService {
    total: number;
    completed: number;
    pending: number;
}

const API_BASE_URL = 'https://localhost:7168/api/ai/summary';

export const SummaryService = {
    // ...existing methods...

    async getTaskSummary(): Promise<SummaryService> {
        const response = await axios.get<SummaryService>(`${API_BASE_URL}/summary`);
        return response.data;
    }
};
