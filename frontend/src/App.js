import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure your CSS is linked here
import TaskItem from './TaskItem';

// Set the base URL for the Django API
const API_URL = "http://localhost:8000/api/tasks/";

function App() {
    const [taskList, setTaskList] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [error, setError] = useState(null);

    // --- 1. FETCH (Read) ---
    const fetchTasks = async () => {
        try {
            const response = await axios.get(API_URL);
            setTaskList(response.data);
            setError(null);
        } catch (err) {
            console.error("Error fetching data:", err);
            // Display connection error to the user
            setError("Cannot connect to Django Backend. Ensure the server is running on http://localhost:8000.");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // --- 2. CREATE ---
    const handleTaskCreate = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) {
            alert("Task title cannot be empty.");
            return;
        }

        const taskData = {
            title: newTaskTitle.trim(),
            description: newTaskDescription.trim(),
            completed: false,
        };

        try {
            const response = await axios.post(API_URL, taskData);
            // Add the new task to the local state
            setTaskList([...taskList, response.data]);
            // Clear input fields
            setNewTaskTitle('');
            setNewTaskDescription('');
            setError(null);
        } catch (err) {
            console.error("Error creating task:", err);
            setError("Failed to create task. Check network/server status.");
        }
    };

    // --- 3. UPDATE (Used for Toggle and Full Edit) ---
    const handleTaskUpdate = async (id, updatedData) => {
        try {
            const response = await axios.patch(`${API_URL}${id}/`, updatedData);

            // Update the task list in state with the modified task
            setTaskList(taskList.map(task =>
                task.id === id ? response.data : task
            ));
            setError(null);
        } catch (err) {
            console.error("Error updating task:", err);
            setError("Failed to update task. Check network/server status.");
        }
    };

    // --- 4. DELETE ---
    const handleTaskDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }

        try {
            await axios.delete(`${API_URL}${id}/`);
            // Remove the task from the local state
            setTaskList(taskList.filter(task => task.id !== id));
            setError(null);
        } catch (err) {
            console.error("Error deleting task:", err);
            setError("Failed to delete task. Check network/server status.");
        }
    };

    return (
        <div className="App">
            <h1 className="app-title">Black & Blush ToDo List</h1>

            <div className="todo-container">
                {/* Display connection error if present */}
                {error && <div className="error-message">{error}</div>}

                {/* Task Creation Form */}
                <form className="task-form" onSubmit={handleTaskCreate}>
                    <input
                        type="text"
                        placeholder="Task Title (Required)"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description (Optional)"
                        value={newTaskDescription}
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                    />
                    <button type="submit">Add Task</button>
                </form>

                {/* Task List Display */}
                <ul className="task-list">
                    {taskList.length > 0 ? (
                        taskList.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                handleTaskUpdate={handleTaskUpdate}
                                handleTaskDelete={handleTaskDelete}
                            />
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#888' }}>
                            No tasks found. Add a new one above!
                        </p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default App;