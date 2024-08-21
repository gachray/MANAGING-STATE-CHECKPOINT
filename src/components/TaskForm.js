import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialTask }) => {
    const [task, setTask] = useState(initialTask);
    const [error, setError] = useState('');

    useEffect(() => {
        setTask(initialTask);
    }, [initialTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.dueDate) {
            setError('Please provide a due date.');
            return;
        }
        setError('');
        onSubmit(task);
        setTask({ name: '', description: '', priority: 1, dueDate: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={task.name}
                onChange={handleChange}
                placeholder="Task Name"
                required
            />
            <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Task Description"
            />
            <input
                type="number"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                placeholder="Priority"
                min="1"
                max="5"
            />
            <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">Save Task</button>
        </form>
    );
};

export default TaskForm;
