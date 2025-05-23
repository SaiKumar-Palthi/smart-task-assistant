import React, { useEffect, useState } from 'react';
import { SummaryService } from '../../services/SummaryBoxService';
import './SummaryBox.css';

interface Props {
  total: number;
  completed: number;
  pending: number;
}

const SummaryBox: React.FC<Props> = () => {
    const [total, setTotal] = useState(0);
    const [completed, setCompleted] = useState(0);
    const [pending, setPending] = useState(0);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summary = await SummaryService.getTaskSummary();
                setTotal(summary.total);
                setCompleted(summary.completed);
                setPending(summary.pending);
            } catch (error) {
                console.error('Failed to load task summary:', error);
            }
        };

        fetchSummary();
    }, []);

    return (
        <div className="summary-box">
            <div className="summary-box-title">Summary</div>
            <div className="summary-box-content">
                Total: {total} | Completed: {completed} | Pending: {pending}
            </div>
        </div>
    );
};

export default SummaryBox;
