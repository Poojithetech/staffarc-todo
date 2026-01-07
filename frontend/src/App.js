/*
 * STAFFARC Black & Blush ToDo App Styles
 * Complete CSS file including core theme and edit feature styles.
 */

:root {
    --color-black: #1a1a1a;
    --color-dark-gray: #2c2c2c;
    --color-light-gray: #d3d3d3;
    --color-blush: #ff69b4;
    --color-white: #f8f8f8;
    --color-success: #4CAF50;
    --color-danger: #f44336;
}

/* --- Global Reset and Body Styling (Black & Blush Theme) --- */
body, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--color-black); /* Deep black background */
    color: var(--color-light-gray); /* Light text for high contrast */
}

/* --- App Container --- */
.App {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    min-height: 100vh;
}

.app-title {
    color: var(--color-blush);
    margin-bottom: 30px;
    font-size: 2.5em;
    font-weight: 700;
    letter-spacing: 1px;
}

.todo-container {
    background-color: var(--color-dark-gray);
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 650px;
}

/* --- Task Input Form --- */
.task-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
}

.task-form input[type="text"],
.task-form textarea {
    padding: 12px;
    border: 1px solid var(--color-blush);
    border-radius: 6px;
    background-color: var(--color-black);
    color: var(--color-white);
    font-size: 1em;
}

.task-form input[type="text"]::placeholder,
.task-form textarea::placeholder {
    color: #888;
}

.task-form button {
    background-color: var(--color-blush);
    color: var(--color-black);
    padding: 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.2s;
}

.task-form button:hover {
    background-color: #ff85c0;
}

/* --- Task List and Item Styling --- */
.task-list {
    list-style: none;
    padding: 0;
}

.task-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-black);
    padding: 15px 20px;
    border-radius: 8px;
    margin-bottom: 10px;
    transition: background-color 0.2s, opacity 0.3s;
    border-left: 5px solid var(--color-blush);
}

.task-item:hover {
    background-color: #383838;
}

.task-item.completed {
    opacity: 0.6;
    border-left: 5px solid var(--color-success);
}

.task-item.completed h3,
.task-item.completed p {
    text-decoration: line-through;
    color: #999;
}

.task-content {
    flex-grow: 1;
    margin-left: 15px;
    margin-right: 20px;
}

.task-content h3 {
    margin: 0 0 4px 0;
    font-size: 1.1em;
    color: var(--color-white);
}

.task-content p {
    margin: 0;
    font-size: 0.9em;
    color: var(--color-light-gray);
}

/* Checkbox Styling */
.task-item input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-blush);
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    outline: none;
    flex-shrink: 0;
}

.task-item input[type="checkbox"]:checked {
    background-color: var(--color-blush);
    border-color: var(--color-blush);
}

.task-item input[type="checkbox"]:checked::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--color-black);
    font-size: 14px;
    font-weight: bold;
}

/* --- Action Buttons (Delete, Edit, Save) --- */
.task-actions {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.task-actions button {
    border: none;
    padding: 8px 12px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s ease, transform 0.1s ease;
    font-weight: 600;
}

/* Delete Button */
.task-actions .delete-btn {
    background-color: var(--color-danger); /* Red */
    color: var(--color-white);
}

.task-actions .delete-btn:hover {
    background-color: #e53935;
    transform: translateY(-1px);
}

/* --- Styles for New Edit Functionality --- */

/* Input fields replacing the title and description in edit mode */
.task-content .edit-title-input {
    font-size: 1.1em;
    font-weight: bold;
    color: var(--color-white);
    background: var(--color-dark-gray); /* Lighter than task item background */
    border: 1px solid var(--color-blush);
    padding: 5px;
    margin-bottom: 5px;
    width: 90%;
    display: block;
}

.task-content .edit-description-input {
    font-size: 0.9em;
    color: var(--color-light-gray);
    background: var(--color-dark-gray);
    border: 1px solid #444;
    padding: 5px;
    resize: vertical;
    min-height: 40px;
    width: 90%;
    display: block;
}

/* Edit Button (Blush accent) */
.task-actions .edit-btn {
    background-color: var(--color-blush);
    color: var(--color-black);
}

.task-actions .edit-btn:hover {
    background-color: #ff85c0;
    transform: translateY(-1px);
}

/* Save Button (Success color) */
.task-actions .save-btn {
    background-color: var(--color-success);
    color: var(--color-white);
}

.task-actions .save-btn:hover {
    background-color: #6aab70;
    transform: translateY(-1px);
}

/* Style for disabled inputs/buttons while editing */
input[disabled], button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Error Handling */
.error-message {
    color: var(--color-danger);
    margin-top: 20px;
    font-size: 1.1em;
}