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

## 🎨 Styling

- CSS Modules for component styling
- CSS Variables for theme management
- Responsive design
- Material Design principles
- Dark mode support (partial)

## 📦 Scripts

```json
{
  "dev": "vite", // Start dev server
  "build": "tsc -b && vite build", // Build for production
  "preview": "vite preview", // Preview production build
  "lint": "eslint ." // Run linter
}
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tsconfig.app.json` - App-specific TS config
- `tsconfig.node.json` - Node-specific TS config
- `eslint.config.js` - ESLint configuration

## 📝 Naming Conventions

- **Components**: PascalCase (`CourseCard.tsx`)
- **Types**: PascalCase in `.ts` files (`Course`, `User`)
- **Data**: camelCase (`courseData`, `studentCourseData`)
- **CSS Classes**: kebab-case (`course-card`, `nav-link`)
- **Folders**: PascalCase for components, camelCase for others

## 🚧 Development Guidelines

1. **Import order**: React → Third-party → Internal → Styles
2. **Type safety**: Always define types for props and data
3. **Component structure**: Logic → Render → Export
4. **CSS organization**: Global variables → Component-specific styles
5. **File naming**: Component name = File name

## 🐛 Troubleshooting

### Port already in use

```bash
# Change port in vite.config.ts or
npm run dev -- --port 3000
```

### TypeScript errors

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### CSS not loading

- Check import path
- Ensure CSS variables are imported in `index.css`
- Verify file names match import statements (case-sensitive)

### Module not found errors

- Check folder capitalization (Data vs data)
- Ensure all imports use correct paths
- Restart dev server after moving files

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com)

## 📄 License

Copyright © 2024 ITS Team. All rights reserved.

## 👨‍💻 Contributors

- Frontend Development Team - Initial work

## 📞 Contact

- Email: support@its.com
- Website: https://its.edu.vn

---

**Made with ❤️ by ITS Development Team**

### Module not found errors

- Check folder capitalization (Data vs data)
- Ensure all imports use correct paths
- Restart dev server after moving files

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router](https://reactrouter.com)

## 📄 License

Copyright © 2024 ITS Team. All rights reserved.

## 👨‍💻 Contributors

- Frontend Development Team - Initial work

## 📞 Contact

- Email: support@its.com
- Website: https://its.edu.vn

---

**Made with ❤️ by ITS Development Team**
