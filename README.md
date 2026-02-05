# Real-Time Chat Application (MERN + WebSockets)

A real-time chat application inspired by WhatsApp / Slack, built using the MERN stack with **Socket.IO** for real-time communication and **MongoDB** for message persistence.

---

## 🚀 Features

### Core Features
- Real-time one-to-one private messaging
- Real-time global & room-based chats
- Persistent chat history using MongoDB
- Image and file sharing
- User authentication (Register & Login)
- Responsive UI (Desktop-first)
- Socket.IO based two-way communication

### WhatsApp-like Capabilities
- Left sidebar with chat list
- Right panel with selected chat
- Messages visible only for selected conversation
- Inline image preview (not just download)
- File download support for non-image files

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Socket.IO Client
- Axios
- HTML, CSS (Flexbox-based layout)

### Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB (Mongoose)

---

## 📂 Project Structure

```bash
realtime-chat-app/
│
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── PrivateChatBox.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Message.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Chat.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                      # Node + Express backend
│   ├── models/
│   │   ├── User.js
│   │   ├── Message.js
│   │   └── Chat.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── chatRoutes.js
│   │   └── uploadRoutes.js
│   ├── socket/
│   │   └── socket.js
│   ├── uploads/                 # Uploaded files/images
│   ├── server.js
│   └── package.json
│
├── README.md
└── README.pdf

│ ├── server.js
│ └── package.json

```

---

## ⚙️ Local Setup Instructions

### ✅ Prerequisites

Make sure the following are installed:

| Software  | Version |
|----------|---------|
| Node.js  | v18.x or above |
| npm      | v9.x or above |
| MongoDB  | v6.x (local) |
| Browser  | Chrome / Edge |

---

## 📌 Step-by-Step Guide: From ZIP Download to Local Execution

### STEP 1: Download the Project ZIP
1. Download the project ZIP file (shared via email / GitHub / Drive)
2. Save it to your system (example: Desktop)
Example:
realtime-chat-app.zip

---

### STEP 2: Extract the ZIP File
1. Right-click on the ZIP file
2. Click **Extract All**
3. Choose a location (example: Desktop)
4. Click **Extract**

You will get a folder like:
realtime-chat-app/


---

### STEP 3: Open Project in VS Code
1. Open **Visual Studio Code**
2. Click **File → Open Folder**
3. Select the extracted folder: `realtime-chat-app`
4. Click **Open**

---

### STEP 4: Verify Project Structure
Inside the project folder, you should see:

```bash
realtime-chat-app/
├── client/
├── server/
├── README.md
└── README.pdf
```

---

## 🔧 Backend Setup

### STEP 5: Install Backend Dependencies
1. Open VS Code Terminal (`Ctrl + `)
2. Navigate to backend folder:
```bash
cd server
```
Install dependencies:
```bash
npm install
```
### STEP 6: Start MongoDB (IMPORTANT)

#### Option A: MongoDB Local Service (Recommended)
1. Make sure MongoDB is running

Check using:
```bash
mongosh
```

### STEP 7: Start Backend Server
1. Open VS Code terminal
2. Make sure you are inside the `server` folder
3. Start the backend server

Command:
```bash
node server.js
```

You should see output like:
```bash
MongoDB connected
Server running on 5000
```
### STEP 8: Install Frontend Dependencies
1. Open a **NEW terminal** in VS Code
2. Navigate to the `client` folder
3. Install frontend dependencies

Commands:
```bash
cd client
npm install
```

### STEP 9: Start Frontend Server
1. Make sure you are inside the `client` folder
2. Start the frontend development server

Command:
```bash
npm run dev
```

You will see output like:
```bash
Local: http://localhost:5173
```

### STEP 10: Open the Application
1. Open your browser (Chrome / Edge)
2. Go to the below URL

Example:
```text
http://localhost:5173
```

### STEP 11: Register Users (IMPORTANT FOR CHAT)
1. Go to the **Register** page  
2. Create **User A**  
3. Open another browser / incognito window  
4. Register **User B**

Example:
```text
User A → Chrome Normal Window
User B → Chrome Incognito Window
```

### STEP 12: Login & Start Chat
1. Login as **User A**
2. Open the Chat page
3. Login as **User B** (in another browser)
4. Click each other’s name from the sidebar
5. Send messages, images, and files

Example:
```text
User A ↔ User B (Real-time Messaging)
```

### STEP 13: Stop Servers
To stop servers safely:

1. Stop backend server
2. Stop frontend server

Example:
```text
Backend terminal  → Ctrl + C
Frontend terminal → Ctrl + C
```

## 📌 Notes
- Backend runs on port: **5000**
- Frontend runs on port: **5173**
- MongoDB must be running before starting backend


## 👨‍💻 Author
Gottimukkala Syamuel Raj
