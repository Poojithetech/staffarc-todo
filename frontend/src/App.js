import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import './App.css';

const API_URL = 'http://127.0.0.1:8000/api/tasks/';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  // 1. FETCH TASKS (R - Read)
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks from the API. Ensure the Django server is running.');
      setLoading(false);
      console.error(err);
    }
  };

  // 2. CREATE TASK (C - Create)
  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTaskTitle.trim()) return;

    try {
      const response = await axios.post(API_URL, {
        title: newTaskTitle,
        description: newTaskDesc,
        completed: false,
      });
      setTasks([response.data, ...tasks]);
      setNewTaskTitle('');
      setNewTaskDesc('');
    } catch (err) {
      setError('Failed to create task.');
      console.error(err);
    }
  };

  // 3. TOGGLE TASK COMPLETION (U - Update)
  const handleToggleTask = async (id, completedStatus) => {
    try {
      const response = await axios.patch(`${API_URL}${id}/`, {
        completed: completedStatus,
      });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
    } catch (err) {
      setError('Failed to update task status.');
      console.error(err);
    }
  };

  // 4. DELETE TASK (D - Delete)
  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div className="App" style={{color: '#4CAF50'}}>Loading tasks...</div>;

  return (
    <div className="App" style={styles.appContainer}>
      <header style={styles.header}>
        <h1 style={styles.mainTitle}>StaffArc ToDo List</h1>
      </header>

      {error && <div style={styles.errorMessage}>⚠️ {error}</div>}

      {/* Task Creation Form */}
      <div className="task-form" style={styles.formContainer}>
        <h2 style={{color: '#0056b3'}}>Add New Task</h2>
        <form onSubmit={handleCreateTask} style={styles.form}>
            <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Task Title (Required)"
                required
                style={styles.input}
            />
            <textarea
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
                placeholder="Description (Optional)"
                rows="3"
                style={styles.textarea}
            />
            <button type="submit" style={styles.submitButton}>Add Task</button>
        </form>
      </div>

      {/* Task List */}
      <div className="task-list" style={styles.listContainer}>
        {tasks.length === 0 ? (
          <p style={{color: '#6c757d'}}>You have no tasks yet. Use the form above to add one!</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
    appContainer: {
        backgroundColor: '#f4f7f6', // Light background
        minHeight: '100vh',
        paddingBottom: '50px'
    },
    header: {
        backgroundColor: '#007bff', // Primary blue header
        padding: '20px',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    mainTitle: {
        marginBottom: '0',
    },
    errorMessage: {
        color: '#dc3545',
        backgroundColor: '#f8d7da',
        padding: '10px',
        borderRadius: '4px',
        maxWidth: '600px',
        margin: '20px auto',
        border: '1px solid #f5c6cb'
    },
    formContainer: {
        marginBottom: '40px',
        padding: '30px',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '30px auto',
        backgroundColor: 'white',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '16px',
    },
    textarea: {
        padding: '12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '16px',
        resize: 'vertical',
    },
    submitButton: {
        backgroundColor: '#28a745', // Green for Submit
        color: 'white',
        border: 'none',
        padding: '14px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '18px',
        transition: 'background-color 0.2s',
    },
    listContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
};

export default App;