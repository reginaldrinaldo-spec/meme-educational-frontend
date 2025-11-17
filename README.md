# meme-educational-frontend
MeMe Educational Platform - React Frontend for interactive educational quizzes targeting young people (ages 6-28) with focus on Mathematics, Language, and Health/Sports education

## 🎯 Project Overview

This is the frontend application for the MeMe Educational Platform, a React-based web application designed to deliver interactive educational quizzes to young learners aged 6-28. The platform focuses on three core educational categories:

- 📐 **Wiskunde & Wetenschap** (Mathematics & Science)
- 💬 **Taal & Communicatie** (Language & Communication)
- ⚽ **Gezondheid & Sport** (Health & Sports)

## 🚀 Technology Stack

- **React.js** - Frontend framework
- **Tailwind CSS** - Styling and responsive design
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API communication
- **React Hooks** - State management

## 📋 Features

### Phase 7 (Current)
- ✅ Quiz selection interface with category filters
- ✅ Interactive quiz interface with question-by-question display
- ✅ Real-time progress tracking
- ✅ Results page with score and educational feedback
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Integration with backend API

## 🔧 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/reginaldrinaldo-spec/meme-educational-frontend.git
cd meme-educational-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
REACT_APP_API_URL=https://educational-gamification-platform.onrender.com
REACT_APP_API_TIMEOUT=10000
```

5. Start development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📁 Project Structure

```
meme-educational-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Quiz/
│   │   │   ├── QuizCard.jsx
│   │   │   ├── QuestionDisplay.jsx
│   │   │   ├── OptionButton.jsx
│   │   │   └── ProgressBar.jsx
│   │   ├── Results/
│   │   │   ├── ResultsSummary.jsx
│   │   │   └── Feedback.jsx
│   │   ├── Navigation/
│   │   │   └── Header.jsx
│   │   └── Common/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── Loading.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── QuizPage.jsx
│   │   └── ResultsPage.jsx
│   ├── services/
│   │   └── api.js
│   ├── hooks/
│   │   ├── useQuiz.js
│   │   └── useAPI.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🔗 Backend Integration

The frontend connects to the MeMe Educational Platform backend API:

**Backend Repository:** [educational-gamification-platform](https://github.com/reginaldrinaldo-spec/educational-gamification-platform)

**API Base URL:** `https://educational-gamification-platform.onrender.com`

### API Endpoints Used

- `GET /health` - Health check
- `GET /quizzes` - Retrieve all available quizzes
- `GET /quizzes/{id}/questions` - Get questions for a specific quiz

## 🎨 Design Principles

1. **Educational Focus** - All content is age-appropriate and educational
2. **User-Friendly** - Simple, intuitive interface for all age groups
3. **Responsive** - Works seamlessly on mobile, tablet, and desktop
4. **Accessible** - WCAG compliant for accessibility
5. **Performance** - Fast loading times and smooth interactions

## 📱 Responsive Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 🚀 Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload build folder to Netlify
```

### Render
```bash
# Connect GitHub repository to Render
# Set build command: npm run build
# Set publish directory: build
```

## 🔜 Roadmap

### Phase 7 (Current) - Frontend Development
- [x] Repository setup
- [ ] React project initialization
- [ ] Component development
- [ ] API integration
- [ ] Responsive design implementation
- [ ] Testing and deployment

### Phase 8 - User Management
- User registration and authentication
- Profile management
- Learning progress tracking

### Phase 9 - Gamification
- Points and rewards system
- Leaderboards
- Achievements and badges

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is part of the MeMe Educational Platform initiative.

## 📞 Contact

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for educational excellence**
