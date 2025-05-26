import axios from "axios";
import type { AISummary, SummaryService } from "../interfaces/AISummaryBox.interface";

const API_BASE_URL = 'https://localhost:7168/api';

export const SummaryBoxService = {
    async getTaskSummary(): Promise<SummaryService> {
        const response = await axios.get<SummaryService>(`${API_BASE_URL}/tasks/summary`);
        return response.data;
    },

    async fetchAISummary(tasks: any[]): Promise<AISummary> {
        try {
            const response = await fetch(`${API_BASE_URL}/ai/summary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tasks })
            });

            if (!response.ok) throw new Error('Failed to fetch summary');

            const result = await response.json();
            // Ensure result is of type AISummaryResponse
            return {
                title: result.title,
                summary: result.summary
            } as AISummary;
        } catch (error) {
            console.error('Error fetching AI summary:', error);
            // Return a default AISummaryResponse object in case of error
            return {
                title: 'Error',
                summary: 'Failed to fetch AI summary.'
            };
        }
    }
};