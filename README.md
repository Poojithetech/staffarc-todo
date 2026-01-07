# 🌸 STAFFARC Full-Stack Mini Project – Project Execution README

## Black & Blush ToDo Application

This repository contains a **full-stack ToDo application** developed as part of the **STAFFARC Full-Stack Developer Internship Assignment**. The project strictly follows the given problem statement and demonstrates a complete **CRUD-based web application** using **React** (frontend) and **Django REST Framework (DRF)** (backend).

---

## 1️⃣ Project Overview

**Theme:** ToDo List / Task Management

The application allows users to:

* Create new tasks
* View all existing tasks
* Update task details or completion status
* Delete tasks

Each task contains a **required title**, an **optional description**, and a **completed status**. Data is stored persistently using **SQLite**, ensuring it remains available across server restarts.

---

## 2️⃣ Tech Stack and Tools

### Technologies Used

* **Frontend:** React (Create React App)
* **Backend:** Django + Django REST Framework (DRF)
* **API Communication:** Axios
* **Database:** SQLite
* **Styling:** Custom CSS (Black & Blush dark theme)
* **CORS Handling:** django-cors-headers

### AI Tools Used

* **Gemini (Google AI)** was used to:

  * Assist in debugging Django REST Framework errors
  * Generate initial React component boilerplate
  * Provide guidance for custom CSS styling

> All AI-generated suggestions were reviewed, understood, and adapted before use.

---

## 3️⃣ Setup Instructions

### A. Backend Setup (Django)

**Requirements:** Python 3.10+

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at: **[http://localhost:8000](http://localhost:8000)**

---

### B. Frontend Setup (React)

**Requirements:** Node.js and npm

```bash
cd frontend
npm install
npm start
```

Frontend runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 4️⃣ API Documentation (Short)

Base URL: `/api/tasks/`

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | `/api/tasks/`      | Retrieve all tasks      |
| POST   | `/api/tasks/`      | Create a new task       |
| PATCH  | `/api/tasks/<id>/` | Update an existing task |
| DELETE | `/api/tasks/<id>/` | Delete a task           |

### Example Request Body

```json
{
  "title": "Buy milk",
  "description": "From nearby store",
  "completed": false
}
```

---

## 5️⃣ Project Execution Steps

### Day 1 – Backend Development

* Created Django project and application
* Defined Task model
* Implemented CRUD APIs using DRF ViewSets and Serializers
* Configured SQLite database
* Enabled CORS using django-cors-headers

### Day 2 – Frontend Development & Integration

* Created React application
* Built components for listing, creating, updating, and deleting tasks
* Integrated backend APIs using Axios
* Implemented basic validation and user feedback
* Applied Black & Blush dark theme styling

### Challenges Faced

* Difficulty creating `.gitignore` file in PowerShell
* Resolved by using the correct PowerShell file creation command

---

## 6️⃣ How to Use the App

1. Start the Django backend server
2. Start the React frontend server
3. Open a browser and go to **[http://localhost:3000](http://localhost:3000)**
4. Create a new task using the input form
5. Toggle task completion using the checkbox
6. Editing the task by clicking on the edit option and saving the changes
7. A time estimation block is provided to complete the task
8. Delete tasks using the delete button

---

## 7️⃣ Future Improvements

* Edit task title and description
* Filter tasks by completed / pending status
* Add user authentication
* Improve UI animations and notifications

---

## ✅ Submission Confirmation

This project satisfies all requirements outlined in the **STAFFARC Full-Stack Mini Project Assignment**, including CRUD functionality, persistent storage, API integration, and proper documentation.

