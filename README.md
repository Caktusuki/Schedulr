# 📅 Schedulr

**Schedulr** is a smart scheduling and task management tool that helps users organize their work, prioritize tasks, and generate optimized schedules.  

🚀 Built as part of **GirlScript Summer of Code (GSSoC)**.  

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://schedulr-ten.vercel.app/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE.md)
[![Contributors](https://img.shields.io/github/contributors/Caktusuki/Schedulr?style=for-the-badge)](https://github.com/Caktusuki/Schedulr/graphs/contributors)

---

## ✨ Features (v1)
- 📝 Add and manage tasks with deadlines
- 🤖 Auto-generate optimized daily/weekly schedules
- 📅 Visual calendar interface
- 📄 Export schedules to PDF
- 🎨 Clean and minimal UI
- 📱 Progressive Web App (PWA) support
- 🌐 Cross-platform compatibility

---

## 🛠 Tech Stack
- **Frontend:** React 19, Tailwind CSS, React Router
- **Build Tool:** Vite
- **Backend:** Python (Flask / FastAPI) - *Coming Soon*
- **Database:** PostgreSQL / SQLite - *Coming Soon*
- **PDF Export:** ReportLab / WeasyPrint - *Coming Soon*
- **Deployment:** Vercel + Heroku

---

## 🚀 Quick Start

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### 📥 Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Caktusuki/Schedulr.git
   cd Schedulr
   ```

2. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173/`
   - You should see the Schedulr application running! 🎉

### 🔧 Available Scripts

In the `frontend` directory, you can run:

- **`npm run dev`** - Starts the development server
- **`npm run build`** - Builds the app for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

### 📁 Project Structure
```
Schedulr/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets (favicon, manifest, etc.)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # App entry point
│   ├── package.json        # Dependencies and scripts
│   └── vite.config.js      # Vite configuration
├── .github/                # GitHub workflows and templates
├── LICENSE.md              # MIT License
└── README.md              # This file
```

### 🔍 Troubleshooting

**Port already in use?**
- The dev server will automatically find the next available port
- Or specify a custom port: `npm run dev -- --port 3000`

**Dependencies not installing?**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install`

**Build errors?**
- Ensure you're using Node.js v18 or higher: `node --version`
- Check for TypeScript/ESLint errors: `npm run lint`

---

## 🤝 Contributing

We love contributions! 🎉 Here's how you can help:

### 🐛 Found a Bug?
1. Check if it's already reported in [Issues](https://github.com/Caktusuki/Schedulr/issues)
2. If not, [create a new issue](https://github.com/Caktusuki/Schedulr/issues/new/choose)

### 💡 Have a Feature Idea?
1. Check existing [Issues](https://github.com/Caktusuki/Schedulr/issues) and [Discussions](https://github.com/Caktusuki/Schedulr/discussions)
2. Create a new issue with the `enhancement` label

### 🔧 Ready to Code?
1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Schedulr.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes**
5. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```
6. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
7. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### 📝 Commit Message Guidelines
We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

---

## 📜 License
This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

---

## 💡 Project Admin
- **Vikyraj Deka** ([@Caktusuki](https://github.com/Caktusuki))

## 🙏 Contributors
Thanks to all contributors who have helped make Schedulr better!

[![Contributors](https://contrib.rocks/image?repo=Caktusuki/Schedulr)](https://github.com/Caktusuki/Schedulr/graphs/contributors)

---

## 📞 Support
- 🐛 **Issues:** [GitHub Issues](https://github.com/Caktusuki/Schedulr/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/Caktusuki/Schedulr/discussions)
- 🌟 **Star this repo** if you find it helpful!

---

**Happy Scheduling! 📅✨**
