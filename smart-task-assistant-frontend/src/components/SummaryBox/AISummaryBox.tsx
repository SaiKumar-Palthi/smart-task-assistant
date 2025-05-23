// src/components/AISummaryBox.tsx
import React from 'react';

interface Props {
    summary: string;
}

const AISummaryBox: React.FC<Props> = ({ summary }) => {
    return (
        <div className="summary-box">
            <div className="summary-box-title">AI Summary</div>
            <div className="summary-box-content">
                {summary ? summary : 'No AI summary available.'}
            </div>
        </div>
    );
};

export default AISummaryBox;
