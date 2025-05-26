# 🧠 Smart Task Assistant

Smart Task Assistant is a simple yet powerful personal task manager built using React + TypeScript. It allows users to quickly create, view, and manage tasks in a minimal UI, with task data persisted locally or synced via backend APIs. It now supports **AI-powered summaries using Gemini**.

---

## 🚀 Tech Stack

| Layer       | Tech Used                           |
|-------------|-------------------------------------|
| Frontend    | React (with TypeScript)             |
| Styling     | Plain CSS (Minimal UI)              |
| State Mgmt  | React Hooks (`useState`, `useEffect`) |
| Utilities   | LocalStorage, UUID Generator        |
| Backend     | .NET Core Web API                   |
| AI/NLP      | Gemini (Google)                     |

---

## 🎯 Features

- ✅ Add tasks via natural language input (simple input field)
- 🗂️ View all tasks in a clean list format
- 🔁 Toggle task completion
- 🧹 Delete tasks
- 💾 Persist data with `localStorage` or backend
- 📅 Track created date and status
- 📊 Summary overview (total tasks vs completed)
- 🤖 **AI Summary Generator** using Gemini for natural language insights

---

## ▶️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/smart-task-assistant.git
cd smart-task-assistant
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project

```bash
npm run dev    # if using Vite
# OR
npm start      # if using Create React App
```

---

## 🧠 Learnings & Concepts Covered

- **React with TypeScript**: Usage of `tsx` components and custom types
- **Local Storage**: Client-side persistence with browser’s localStorage
- **React Hooks**:
  - `useState` for task state
  - `useEffect` for syncing localStorage
- **Component Architecture**: Clean separation of UI, logic, and data
- **Type Safety**: Leveraging TypeScript for better development experience
- **Backend Integration**: 
  - API communication using `.NET Core Web API`
  - RESTful principles and async data sync
- **NLP/AISummary**: Generating actionable summaries using **Gemini API**

---

## 🌟 What’s Next?

- 📱 Responsive design for mobile view
- 🔎 Task filtering (by status/date)
- 🔐 User authentication and multi-user support
- 📈 Analytics Dashboard for task insights

---

## 🧑‍💻 Author

Palthi Sai Kumar – Full-Stack Developer  

---

> Built with 💙 for productivity and learning.
