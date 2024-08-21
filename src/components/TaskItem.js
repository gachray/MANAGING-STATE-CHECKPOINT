import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-details">
                <h3>{task.name}</h3>
                <p>{task.description}</p>
                <p>Priority: {task.priority}</p>
                <p>Due Date: {task.dueDate}</p>
            </div>
            <div className="task-actions">
                <button onClick={() => onToggleComplete(task.id)}>
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button onClick={() => onEdit(task)}>
                    Edit
                </button>
                <button onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
