
 Amego, is an AI-driven task management system with automated call and SMS reminders. Users can create tasks with a title, description, mobile number, and due date via a React.js frontend and a Node.js/Express backend using MongoDB. The system continuously monitors due dates and sends an SMS reminder one hour before the deadline and makes an automated call 30 minutes before the due time using Twilio API. Authentication is handled through JWT tokens, ensuring secure access. Users can update reminders, mark tasks as complete, and view task history. The time is stored and processed in IST format for consistency. The project is deployed on Render, with Git used for version control. Tasks marked as complete update with the current timestamp. This system ensures efficient task tracking and timely reminders for users. 

 # AI Receptionist - Full Stack Application  

This is a *full-stack AI Receptionist* project consisting of:  
- *Backend:* Node.js, Express, MongoDB, Twilio  
- *Frontend:* React.js  

It allows users to *schedule tasks, receive automated reminders (SMS & calls), and manage appointments*.

---

## 📌 Features
### 🔹 *Backend*
- User authentication (JWT-based)
- Task scheduling with automated reminders (SMS & Calls)
- Twilio integration for SMS and voice calls
- MongoDB for data storage
- Cron jobs for scheduled task execution

### 🔹 *Frontend*
- React.js UI for task management  
- User authentication (Login/Register)  
- Task creation, editing, and deletion  
- Integration with backend API  
