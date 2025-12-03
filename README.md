# WIE TSYP Web App

A MERN stack web application for testing and managing the WIE TSYP backend API. The app matches the theme and design of the mobile application.

## Features

- 🎨 **Matching Theme**: Uses the same color scheme as the mobile app (purple primary #300F49)
- 👥 **User Management**: Full CRUD operations for users
- 👶 **Kids Management**: Full CRUD operations for kids with filtering by user
- 🧪 **API Testing**: Interactive API testing interface
- 📊 **Dashboard**: Overview of users, kids, and API status
- 🎯 **Modern UI**: Clean, responsive design with styled-components

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Axios** - HTTP client
- **Styled Components** - CSS-in-JS styling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (optional):
```env
VITE_API_URL=http://localhost:3000/api
```

If not set, it defaults to `http://localhost:3000/api`.

## Running the App

### Development mode:
```bash
npm run dev
```

The app will start on `http://localhost:3001` (or next available port).

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

## Make Sure Backend is Running

Before using the web app, ensure the backend server is running:

```bash
cd ../wie_tsyp_backend
npm run dev
```

The backend should be running on `http://localhost:3000` (or the port specified in your backend `.env`).

## Pages

- **Dashboard** (`/`) - Overview with statistics and API status
- **Users** (`/users`) - Manage users (create, read, update, delete)
- **Kids** (`/kids`) - Manage kids with user filtering
- **API Test** (`/api-test`) - Interactive API testing interface

## Project Structure

```
wie_tsyp13_web_app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Layout.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Input.jsx
│   ├── pages/           # Page components
│   │   ├── Dashboard.jsx
│   │   ├── Users.jsx
│   │   ├── Kids.jsx
│   │   └── ApiTest.jsx
│   ├── services/        # API service layer
│   │   └── api.js
│   ├── theme/           # Theme configuration
│   │   ├── colors.js
│   │   └── globalStyles.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Color Theme

The app uses the same color scheme as the mobile app:

- **Primary**: #300F49 (Dark Purple)
- **Secondary**: #9C27B0 (Purple)
- **Accent**: #E91E63 (Pink)
- **Background**: #FAFBFC (Light Gray)
- **Success**: #4CAF50 (Green)
- **Error**: #F44336 (Red)

## API Endpoints Tested

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Kids
- `GET /api/kids` - Get all kids
- `GET /api/kids/:id` - Get kid by ID
- `GET /api/kids/users/:userId/kids` - Get kids by user ID
- `POST /api/kids` - Create kid
- `PUT /api/kids/:id` - Update kid
- `DELETE /api/kids/:id` - Delete kid

### Health
- `GET /api/health` - Check API status

## License

ISC

