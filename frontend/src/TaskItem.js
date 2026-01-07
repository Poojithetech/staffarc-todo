import React, { useState } from 'react';

// This component expects task data, and two handler functions from the parent (App.js)
function TaskItem({ task, handleTaskUpdate, handleTaskDelete }) {

    // State Management for Edit Mode and content while editing
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [newDescription, setNewDescription] = useState(task.description);

    // Handler for toggling the completed status (existing functionality)
    const handleToggleCompleted = () => {
        handleTaskUpdate(task.id, { completed: !task.completed });
    };

    // Handler for saving the new title/description via PATCH
    const handleSaveEdit = async () => {
        // Validation: Ensure the title is not empty before saving
        if (!newTitle.trim()) {
            alert("Task title cannot be empty!");
            return;
        }

        // Prepare the updated data payload
        const updatedTaskData = {
            title: newTitle.trim(),
            description: newDescription.trim(),
            completed: task.completed, // Keep the existing completed status
        };

        try {
            // Call the parent handler to send the PATCH request to Django
            await handleTaskUpdate(task.id, updatedTaskData);

            // Exit edit mode on success
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving task:", error);
            alert("Failed to save task update.");
        }
    };

    // Function to render either the Edit or Save button
    const renderEditButton = () => {
        if (isEditing) {
            // If in Edit Mode, show the Save button
            return (
                <button
                    onClick={handleSaveEdit}
                    className="save-btn"
                    title="Save Changes"
                >
                    💾 Save
                </button>
            );
        }
        // If in View Mode, show the Edit button
        return (
            <button
                onClick={() => setIsEditing(true)}
                className="edit-btn"
                title="Edit Task"
            >
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
                disabled={isEditing} // Prevent toggling while editing the text
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
                    </>
                ) : (
                    // --- VIEW MODE: Render Text Display ---
                    <>
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-description">{task.description}</p>
                    </>
                )}
            </div>

            <div className="task-actions">
                {/* The Edit/Save button will appear here */}
                {renderEditButton()}

                <button
                    onClick={() => handleTaskDelete(task.id)}
                    className="delete-btn"
                    disabled={isEditing} // Cannot delete while editing
                >
                    🗑️ Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;