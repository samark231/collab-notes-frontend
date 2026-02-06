# 🎨 Collaborative Notes App - Frontend

The frontend interface for the Collaborative Notes App. Built with React and Vite, it features a responsive dashboard, a real-time editor, and visual indicators for collaboration.

## 🚀 Tech Stack
- **Framework:** React (Vite)
- **State Management:** Zustand (w/ Persistence)
- **HTTP Client:** Axios
- **Real-Time:** Socket.io-client
- **Styling:** CSS Modules / Standard CSS

---

## ⚙️ Setup & Installation

### 1. Installation
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env` file in the root of the frontend folder.  
**Note:** Variables must start with `VITE_` to be exposed to the browser.

```env
# URL of your Backend API
# For Local Development:
VITE_API_BASE_URL=http://localhost:5000/api

# For Production (Render/Netlify):
# VITE_API_BASE_URL=https://your-backend-app.onrender.com/api
```

### 3. Running the App
```bash
# Start Development Server
npm run dev
```

App runs on: http://localhost:5173

---

## 🏗 Architecture & Key Components

- `store/authStore.js`: Handles Login, Signup, and storing the User object.
- `store/JournalStore.js`: Manages the list of notes and CRUD operations.
- `store/socketStore.js`: Manages the WebSocket connection.
- `components/home/AddJournal.jsx`: The main editor component. It contains the logic for emitting socket events when the user types.
- `components/home/JournalCard.jsx`: Displays note summaries with **Red Dot (Owner)** and **Green Dot (Shared)** indicators.

---

## 🚢 Deployment (Render Static Site)

This project is configured for deployment as a Static Site (SPA).

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Rewrite Rule:** Since this is a React SPA, you must configure your host to redirect all traffic to `index.html`.

  - **Render:** Add a Rewrite Rule → `Source /*` → `Destination /index.html`
  - **Netlify:** Add a `_redirects` file in `public/` containing:
    ```
    /* /index.html 200
    ```

---

## 🐛 Troubleshooting

### "Socket.io connection failed / CORS Error"
- Ensure your Backend `.env` allows the frontend URL in the CORS configuration.
- Ensure your Frontend `.env` points to the correct Backend URL (check for trailing slashes).

### "Updates not syncing"
- Check if you are listed as a **VIEWER**. Viewers are blocked from emitting socket updates.
- Check the browser console for WebSocket connection failed errors.