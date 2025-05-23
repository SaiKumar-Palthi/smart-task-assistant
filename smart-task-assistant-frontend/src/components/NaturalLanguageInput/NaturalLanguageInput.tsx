import React, { useState } from 'react';
import './NaturalLanguageInput.css';

interface Props {
  onAddTask: (title: string) => void;
}

const NaturalLanguageInput: React.FC<Props> = ({ onAddTask }) => {
  const [text, setText] = useState<string>('');

  const handleSubmit = () => {
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };

return (
    <div className="nli-container">
        <input
            className="nli-input"
            type="text"
            placeholder="What do you want to do today?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
            className="nli-submit-btn"
            onClick={handleSubmit}
            disabled={!text.trim()}
        >
            Add Task
        </button>
    </div>
);
};
export default NaturalLanguageInput;
