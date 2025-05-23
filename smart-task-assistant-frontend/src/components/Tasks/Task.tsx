import React from "react";
import type { Task} from "../../interfaces/Task.interface";

export interface TaskProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, onToggle, onDelete }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
                borderBottom: "1px solid #eee",
                background: task.completed ? "#f0f0f0" : "#fff",
            }}
        >
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle && onToggle()}
                style={{ marginRight: "12px" }}
            />
            <span
                style={{
                    flex: 1,
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#888" : "#222",
                }}
            >
                {task.title}
            </span>
            <button
                onClick={() => onDelete && onDelete()}
                style={{
                    marginLeft: "12px",
                    background: "transparent",
                    border: "none",
                    color: "#d00",
                    cursor: "pointer",
                }}
                aria-label="Delete task"
            >
                &#10005;
            </button>
        </div>
    );
};

export default TaskComponent;