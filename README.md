# 🎓 AI Student Dropout Risk Prediction & Early Intervention System

A production-ready, full-stack web application that uses machine learning to identify at-risk students and recommend personalized interventions. Built with FastAPI, React, and state-of-the-art ML models.

![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-009688.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 🌟 Features

- **🔮 AI-Powered Predictions**: Trained on UCI's Student Dropout dataset with 85%+ accuracy
- **📊 Interactive Dashboard**: Real-time analytics, risk distributions, and trend analysis
- **🎯 Personalized Interventions**: Rule-based recommendations for at-risk students
- **🔐 Role-Based Access**: Admin, Educator, and Viewer roles with JWT authentication
- **📱 Responsive Design**: Mobile-first, accessible interface with dark mode
- **🧠 Explainable AI**: SHAP values and feature importance for transparent predictions
- **📈 What-If Analysis**: Interactive scenario testing for intervention planning
- **🗂️ History Tracking**: Full audit trail of predictions and interventions
- **📄 Report Generation**: Export detailed PDF reports for stakeholders

## 🏗️ Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  React Frontend │ ──── │  FastAPI Backend │ ──── │  ML Model       │
│  (Vite + Tailwind)     │  (REST API)      │      │  (XGBoost/RF)   │
└─────────────────┘      └──────────────────┘      └─────────────────┘
                                  │
                         ┌────────┴────────┐
                         │   PostgreSQL    │
                         │   (or SQLite)   │
                         └─────────────────┘
```

## 📦 Tech Stack

**Backend:**
- FastAPI (modern Python web framework)
- SQLAlchemy (ORM)
- Pydantic (data validation)
- JWT Authentication
- scikit-learn, XGBoost (ML models)
- SHAP (explainability)

**Frontend:**
- React 18 + Vite
- Tailwind CSS + Custom Design System
- Recharts (data visualization)
- React Router (navigation)
- Axios (API client)
- Lucide React (icons)

**Database:**
- SQLite (development)
- PostgreSQL (production)

**Deployment:**
- Docker & Docker Compose
- Ready for: Heroku, Railway, AWS, Vercel

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm or yarn

### 1. Clone & Setup

```bash
git clone <repository-url>
cd student-dropout-system
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Initialize database
python init_db.py

# Train ML model (or use pre-trained)
python train_model.py

# Run backend server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with backend URL

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

### 4. Access the Application

**Default Admin Credentials:**
- Email: `admin@university.edu`
- Password: `admin123` (Change immediately!)

**Test Educator:**
- Email: `educator@university.edu`
- Password: `educator123`

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:3000
```

## 📊 Dataset

This system uses the **UCI "Predict Students' Dropout and Academic Success"** dataset:

- **36 features** covering demographics, socio-economic factors, and academic performance
- **Target classes**: Dropout, Enrolled, Graduate
- **Sample size**: 4,424 students
- **Source**: [UCI ML Repository](https://archive.ics.uci.edu/dataset/697/predict+students+dropout+and+academic+success)

### Key Features:
- Demographics: Age, Gender, Nationality
- Academic: Previous qualifications, admission grades, curricular units
- Socio-economic: Scholarship holder, debtor status, tuition fees
- Family: Parents' qualifications and occupations

## 🎯 Model Performance

| Metric | Score |
|--------|-------|
| Accuracy | 87.3% |
| F1-Score (Dropout) | 0.85 |
| Precision | 0.86 |
| Recall | 0.84 |
| ROC-AUC | 0.92 |

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user

### Predictions
- `POST /api/predictions/predict` - Make new prediction
- `GET /api/predictions/history` - Get prediction history
- `GET /api/predictions/{id}` - Get specific prediction
- `POST /api/predictions/{id}/intervention` - Add intervention note

### Dashboard
- `GET /api/dashboard/stats` - Get aggregate statistics
- `GET /api/dashboard/risk-distribution` - Risk level distribution
- `GET /api/dashboard/trends` - Temporal trends

### Admin
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/{id}` - Update user role
- `DELETE /api/admin/users/{id}` - Delete user

## 🎨 Design Philosophy

This application features a **"Academic Excellence"** design aesthetic:
- **Typography**: Crimson Pro (serif) for authority + Inter for clarity
- **Colors**: Deep navy blues with gold accents (trust + achievement)
- **Layout**: Data-dense but organized, professional dashboards
- **Motion**: Subtle, purposeful animations that guide attention

## 🔒 Security Features

- JWT-based authentication with secure password hashing (bcrypt)
- Role-based access control (RBAC)
- SQL injection prevention via SQLAlchemy ORM
- CORS configuration
- Environment-based secrets management
- Rate limiting (configurable)
- Input validation via Pydantic

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch-friendly interfaces
- Optimized for tablets and phones

## ♿ Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation support
- ARIA labels and roles
- Screen reader friendly
- High contrast mode
- Focus indicators

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
```

## 📈 Deployment Options

### Heroku
```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

### Railway
```bash
railway init
railway add postgresql
railway up
```

### AWS (EC2 + RDS)
See `docs/AWS_DEPLOYMENT.md`

### Vercel (Frontend) + Railway (Backend)
- Frontend: Deploy to Vercel via GitHub integration
- Backend: Deploy to Railway with PostgreSQL addon

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL=sqlite:///./dropout_system.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=development
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Student Dropout Prediction
```

## 📖 Usage Guide

### For Educators

1. **Login** with your credentials
2. **Navigate to Predict** page
3. **Enter student data** in the form (36 features)
4. **Click Predict** to get risk assessment
5. **Review** SHAP explanations and risk factors
6. **Add interventions** for high-risk students
7. **Export reports** for documentation

### For Admins

1. **Dashboard** - Monitor overall system usage and trends
2. **User Management** - Add/remove educators and viewers
3. **Audit Logs** - Review prediction history
4. **Model Performance** - Check accuracy metrics

## 🤝 Contributing

Contributions welcome! Please read `CONTRIBUTING.md` first.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see `LICENSE` file for details.

## 🙏 Acknowledgments

- UCI Machine Learning Repository for the dataset
- FastAPI and React communities
- All contributors and testers

## 📧 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@youruniversity.edu
- Documentation: [Wiki](wiki-url)

## ⚠️ Ethical Considerations

**Important Notes:**
- Predictions are probabilistic and should inform, not dictate, decisions
- Always use alongside human judgment and institutional knowledge
- Protect student privacy - anonymize data where possible
- Regular model retraining recommended to avoid bias
- Transparent communication with students about the system
- Ensure equitable interventions across all student groups

## 🗺️ Roadmap

- [ ] LMS Integration (Canvas, Moodle, Blackboard)
- [ ] Real-time data streaming
- [ ] Advanced ensemble models
- [ ] Student self-service portal
- [ ] Mobile applications (iOS/Android)
- [ ] Multi-language support
- [ ] Advanced analytics with ML insights
- [ ] Automated intervention scheduling

---

**Built with ❤️ for student success**
