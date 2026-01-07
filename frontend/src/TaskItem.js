import React, { useState } from 'react';

function TaskItem({ task, handleTaskUpdate, handleTaskDelete }) {

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [newDescription, setNewDescription] = useState(task.description);
    // NEW: State for estimated hours (convert to string for input field)
    const [newHours, setNewHours] = useState(task.estimated_hours.toString());

    const handleToggleCompleted = () => {
        handleTaskUpdate(task.id, { completed: !task.completed });
    };

    const handleSaveEdit = async () => {
        if (!newTitle.trim()) {
            alert("Task title cannot be empty!");
            return;
        }

        const updatedTaskData = {
            title: newTitle.trim(),
            description: newDescription.trim(),
            completed: task.completed,
            // NEW: Include the updated estimated_hours field
            estimated_hours: parseFloat(newHours) || 0,
        };

        try {
            await handleTaskUpdate(task.id, updatedTaskData);
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving task:", error);
            alert("Failed to save task update.");
        }
    };

    const renderEditButton = () => {
        if (isEditing) {
            return (
                <button onClick={handleSaveEdit} className="save-btn" title="Save Changes">
                    💾 Save
                </button>
            );
        }
        return (
            <button onClick={() => setIsEditing(true)} className="edit-btn" title="Edit Task">
                ✏️ Edit
            </button>
        );
    }


    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>

            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleCompleted}
                disabled={isEditing}
            />

            <div className="task-content">
                {isEditing ? (
                    // --- EDIT MODE: Render Input Fields ---
                    <>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Task Title"
                            className="edit-title-input"
                        />
                        <textarea
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                            placeholder="Description (Optional)"
                            className="edit-description-input"
                        />
                         {/* NEW: Input for Estimated Hours */}
                         <input
                            type="number"
                            step="0.01"
                            value={newHours}
                            onChange={(e) => setNewHours(e.target.value)}
                            placeholder="Estimated Hours"
                            className="edit-hours-input"
                        />
                    </>
                ) : (
                    // --- VIEW MODE: Render Text Display ---
                    <>
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-description">{task.description}</p>
                        {/* NEW: Display Estimated Hours */}
                        {task.estimated_hours > 0 && (
                            <p className="task-hours">
                                ⏳ Estimated Time: {task.estimated_hours} hours
                            </p>
                        )}
                    </>
                )}
            </div>

            <div className="task-actions">
                {renderEditButton()}
                <button
                    onClick={() => handleTaskDelete(task.id)}
                    className="delete-btn"
                    disabled={isEditing}
                >
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;