import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <div className="task-item" style={styles.taskItem}>
            {/* Checkbox to toggle completion status */}
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id, !task.completed)}
                style={styles.checkbox}
            />

            {/* Title and date */}
            <div style={styles.content}>
                <span style={{ ...styles.title, ...(task.completed ? styles.completed : {}) }}>
                    {task.completed ? '✅ ' : '❌ '} {task.title}
                </span>
                <small style={styles.date}>Created: {new Date(task.date_created).toLocaleDateString()}</small>
            </div>

            {/* Delete Button */}
            <button
                onClick={() => onDelete(task.id)}
                style={styles.deleteButton}
            >
                🗑️ Delete
            </button>
        </div>
    );
};

const styles = {
    taskItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '20px 25px',
        border: '1px solid #444',
        borderRadius: '10px',
        marginBottom: '15px',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '600px',
        backgroundColor: '#2d2d2d', /* Secondary BG */
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.5)', /* 3D Shadow */
    },
    checkbox: {
        marginRight: '25px',
        minWidth: '24px',
        minHeight: '24px',
        cursor: 'pointer',
        accentColor: '#ff69b4', /* Pink accent for checkbox */
    },
    content: {
        flexGrow: 1,
        textAlign: 'left',
    },
    title: {
        fontSize: '18px',
        display: 'block',
        color: '#ffffff', /* White text */
        fontWeight: '600',
    },
    completed: {
        textDecoration: 'line-through',
        color: '#888', /* Greyed out when complete */
        fontWeight: 'normal'
    },
    date: {
        color: '#aaa',
        fontSize: '12px',
        marginTop: '5px'
    },
    deleteButton: {
        backgroundColor: '#cc0000', /* Deep Red for Delete */
        color: 'white',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '20px',
        fontSize: '14px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
        transition: 'background-color 0.2s, transform 0.1s',
    }
};

export default TaskItem;