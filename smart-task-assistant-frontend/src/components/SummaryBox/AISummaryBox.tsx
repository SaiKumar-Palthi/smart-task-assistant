// src/components/AISummaryBox.tsx
import React from 'react';
import './SummaryBox.css'; // optional: for custom styles
import type { AISummary } from '../../interfaces/AISummaryBox.interface';

// Utility to parse numbered list from summary text
const parseSummaryToList = (summary: string): string[] => {
    // Matches lines like "1. **Task:** Description" or "2. Task"
    return summary
        .split(/\n|(?=\d+\.\s)/)
        .map(item => item.trim().replace(/^\d+\.\s*/, '').replace(/\*{1,2}/g, ' ')) // Remove leading numbers and all * or **
        .filter(Boolean);
};

const AISummaryBox: React.FC<{ aisummary: AISummary }> = ({ aisummary }) => {
    const summaryItems = parseSummaryToList(aisummary.summary);

    return (
        <div className="summary-box">
            <div className="summary-box-title">AI Summary</div>
            <div className="summary-box-title-row">
                {aisummary.title && (
                    <span className="summary-box-title-label">Title:</span>
                )} {aisummary.title}
            </div>
            <div className="summary-box-content">
                {summaryItems.length > 0 ? (
                    <ol className="summary-list">
                        {summaryItems.map((item, index) => {
                            const match = item.match(/^(.+?:)\s*(.*)$/);
                            return (
                                <li key={index}>
                                    {match ? (
                                        <>
                                            <strong>{match[1]}</strong> {match[2]}
                                        </>
                                    ) : (
                                        item
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                ) : (
                    <p>No AI summary available.</p>
                )}
            </div>
        </div>
    );
};

export default AISummaryBox;

