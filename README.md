# ECWC RH Industrial Project Management System

A comprehensive web-based system for managing industrial projects, human resources, attendance tracking, and overtime control.

## 🚀 Live Demo
**Deployed on Render**: [Your Live URL Here]

## 📋 Features
- **Production Planning & Reporting**: Daily, Weekly, and Monthly plans and reports
- **HR Management**: Monthly attendance tracking with real-time status updates
- **Overtime Control**: Automated overtime calculations with hourly rate management
- **Role-Based Access Control**: 
  - Presenter: Create and submit forms
  - Reviewer: Review and approve/reject submissions
  - Finance: View approved overtime for payment processing
  - HR: Manage attendance and employee records
  - Store Man: Validate submissions
  - Viewer: Read-only access

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3 (Tailwind CSS), Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: SQLite (local/dev), PostgreSQL ready (production)
- **Deployment**: Render

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- Git installed

### Local Development
```bash
# Clone the repository
git clone https://github.com/HAYRDIN/frontend.git
cd frontend

# Install dependencies
npm install

# Start the server
npm start

# Open browser to http://localhost:3000
```

## 🔐 Default Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Presenter | `presenter1` | `presenter123` |
| Reviewer | `reviewer` | `reviewer123` |
| Finance | `finance` | `finance123` |
| HR | `hr` | `hr123` |
| Store Man | `storeman` | `store123` |
| Viewer | `viewer` | `viewer123` |

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to Render.

### Quick Deploy to Render
1. Fork/clone this repository
2. Create a Render account
3. Connect your GitHub repository
4. Render will auto-deploy using `render.yaml`

## 📚 Documentation

### Project Structure
```
frontend/
├── backend/           # Node.js backend
│   ├── server.js     # Express server
│   ├── database.js   # Database setup
│   └── package.json  # Backend dependencies
├── css/              # Stylesheets
├── js/               # Frontend JavaScript
│   ├── views/       # Page views
│   ├── api.js       # API client
│   └── utils.js     # Utilities
├── index.html        # Main entry point
├── package.json      # Root package config
└── render.yaml       # Render deployment config
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
ISC

## 👤 Author
ECWC Development Team

---
Made with ❤️ for efficient project management
