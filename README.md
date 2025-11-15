# ITS (Intelligent Tutoring System) - Frontend

An intelligent education management system built with React + TypeScript + Vite.

## 🚀 Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **React Router DOM** - Routing
- **CSS Modules** - Styling
- **Material Icons** - Icon Library
- **Google Fonts** - Typography

## 📋 System Requirements

- Node.js >= 16.0.0
- npm >= 7.0.0 or yarn >= 1.22.0

## 🛠️ Installation & Setup

### 1. Clone repository

```bash
git clone <repository-url>
cd ITS_FE
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Run development server

```bash
npm run dev
# or
yarn dev
```

Application will run at: `http://localhost:5173`

### 4. Build for production

```bash
npm run build
# or
yarn build
```

### 5. Preview production build

```bash
npm run preview
# or
yarn preview
```

## 👥 Demo Accounts

The system provides 3 types of demo accounts:

### Admin

- Email: `admin@its.com`
- Password: `admin123`
- Access: Full system management

### Instructor

- Email: `instructor@its.com`
- Password: `instructor123`
- Access: Course, lesson, and quiz management

### Student

- Email: `student@its.com`
- Password: `student123`
- Access: Learning and course viewing

## 📁 Project Structure

```
ITS_FE/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page wrappers
│   ├── contexts/           # React contexts
│   ├── types/              # TypeScript types
│   ├── Data/               # Mock data
│   ├── styles/             # Global styles
│   ├── App.tsx             # Main app component
│   ├── index.tsx           # Entry point
│   └── index.css           # Global styles
│
├── public/                 # Static assets
├── dist/                   # Build output
├── node_modules/           # Dependencies
├── index.html              # HTML template
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite config
└── README.md               # This file
```

## 🎯 Key Features

### Admin Dashboard

- User management (CRUD)
- System permissions
- Analytics overview
- Data export

### Instructor Dashboard

- Course management
- Lesson content creation and editing
- Quiz and assessment creation
- Student progress tracking
- Video and document upload

### Student Dashboard

- Course listing
- Online learning
- Quiz taking
- Personal progress tracking

## 🔐 Authentication Flow

1. User logs in at `/login`
2. System authenticates and stores info in `localStorage`
3. `AuthContext` manages login state
4. `ProtectedRoute` protects routes requiring authentication
5. User is redirected based on role:
   - Admin → `/admin`
   - Instructor → `/instructor`
   - Student → `/student`

## 🛣️ Routes

```
/                           → Redirect to /login
/login                      → Login page
/admin                      → Admin dashboard (Protected)
/instructor                 → Instructor dashboard (Protected)
/instructor/course/:id      → Course content management (Protected)
/instructor/course/:id/quiz/create → Quiz creation (Protected)
```
