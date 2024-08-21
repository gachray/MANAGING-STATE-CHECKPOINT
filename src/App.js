import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles/styles.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'
    const [sort, setSort] = useState('date'); // 'date', 'priority'
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
    };

    const deleteTask = (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    };

    const toggleComplete = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true; // 'all'
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sort === 'date') {
            // Ensure dueDate is compared as Date
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sort === 'priority') {
            return a.priority - b.priority;
        }
        return 0;
    });

    return (
        <div className="app">
            <h1>TO-DO LIST</h1>
            <TaskForm
                onSubmit={editTask ? (updatedTask) => {
                    setTasks(tasks.map(task =>
                        task.id === updatedTask.id ? updatedTask : task
                    ));
                    setEditTask(null);
                } : addTask}
                initialTask={editTask || { name: '', description: '', priority: 1, dueDate: '' }}
            />
            <div className="controls">
                <label>
                    Filter:
                    <select value={filter} onChange={handleFilterChange}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </label>
                <label>
                    Sort by:
                    <select value={sort} onChange={handleSortChange}>
                        <option value="date">Date</option>
                        <option value="priority">Priority</option>
                    </select>
                </label>
            </div>
            <TaskList
                tasks={sortedTasks}
                onEdit={setEditTask}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
            />
        </div>
    );
};

export default App;
