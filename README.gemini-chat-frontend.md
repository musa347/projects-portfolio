# 🚀 Ibrahim Musa - Portfolio & AI Chat Interface

A modern, interactive portfolio website featuring an AI-powered chat interface built with React, Framer Motion, and integrated with Google's Gemini API.

## ✨ Features

### 🎨 Modern UI/UX Design
- **Glassmorphism Effects**: Beautiful frosted glass components with backdrop blur
- **Gradient Animations**: Dynamic color-shifting gradients throughout the interface
- **Interactive Particles**: Mouse-responsive particle system background
- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- **Responsive Design**: Optimized for all device sizes

### 🎭 Advanced Animations
- **Framer Motion Integration**: Smooth page transitions and micro-interactions
- **Scroll-triggered Animations**: Elements animate as they come into view
- **Hover Effects**: Interactive hover states with scale and glow effects
- **Loading Animations**: Custom loading spinners and progress bars
- **Staggered Animations**: Sequential element animations for better visual flow

### 🤖 AI Chat Interface
- **Real-time Messaging**: Instant chat responses with typing indicators
- **Backend Integration**: Connected to deployed Spring Boot backend on Render
- **Intelligent Fallback**: Creative IRIS responses when backend is warming up
- **Message History**: Persistent chat history during session
- **Responsive Chat UI**: Mobile-optimized chat interface

### 🛠️ Technical Skills Showcase
- **Interactive Progress Bars**: Animated skill level indicators
- **Technology Icons**: Visual representation of technical expertise
- **Categorized Skills**: Organized by Frontend, Backend, Database, and AI/ML
- **Hover Interactions**: Enhanced skill category interactions

### 📱 Enhanced User Experience
- **Floating Action Button**: Quick access to key features
- **Notification System**: Toast notifications for user feedback
- **Smooth Scrolling**: Buttery smooth page navigation
- **Loading States**: Comprehensive loading indicators
- **Error Handling**: Graceful error handling with user feedback

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AnimatedLogo.jsx          # Animated logo component
│   ├── ChatInput.jsx             # Chat input component
│   ├── ChatResponse.jsx          # Chat response component
│   ├── CVUpload.jsx              # CV upload and management component
│   ├── FloatingActionButton.jsx  # FAB with quick actions
│   ├── InteractiveBackground.jsx # Mouse-interactive particles
│   ├── LoadingSpinner.jsx        # Reusable loading component
│   ├── NotificationToast.jsx     # Toast notification system
│   ├── ParticlesBackground.jsx   # Particle system background
│   ├── SkillProgress.jsx         # Animated skill progress bars
│   └── SplashScreen.jsx          # Loading splash screen
├── services/
│   └── api.jsx                   # API service layer
├── LegacyApp.jsx                       # Main application component
├── LegacyApp.css                       # Main stylesheet with CSS variables
├── animations.css                # Animation library
└── main.tsx                      # Application entry point
```

## 🎯 Key Sections

### 🏠 Home Section
- Hero section with animated text and call-to-action buttons
- Social media links with hover effects
- Professional introduction with gradient text effects

### 💼 Projects Section
- **6 Featured Projects** with detailed descriptions
- Interactive project cards with hover animations
- Technology stack badges with hover effects
- Live preview and source code links
- Project categories: AI/ML, E-commerce, Analytics, Real Estate, Task Management, Music Streaming

### 🛠️ Skills Section
- **4 Skill Categories**: Frontend, Backend, Database, AI/ML
- Animated progress bars showing proficiency levels
- Technology icons and emojis for visual appeal
- Hover effects and smooth animations

### 📄 CV Section
- **Upload Interface**: Drag & drop CV upload with file validation (PDF, DOC, DOCX)
- **File Management**: Preview, download, and update CV functionality
- **File Validation**: Automatic file type and size validation (max 5MB)
- **Recruiter-Friendly**: Dedicated information section for recruiters with contact details
- **Persistent Storage**: CV saved locally for easy access
- **Responsive Design**: Mobile-optimized upload interface

### 👁️ IRIS AI Assistant Section
- Live AI chat interface powered by IRIS
- Real-time message exchange
- Typing indicators and message timestamps
- Responsive chat design
- Backend integration with intelligent IRIS fallback

## 🚀 Technologies Used

### Frontend
- **React 19** - Latest React with concurrent features
- **Framer Motion 12** - Advanced animations and transitions
- **React Icons** - Comprehensive icon library
- **CSS3** - Modern CSS with custom properties and animations
- **Vite** - Fast build tool and development server

### Backend Integration
- **Spring Boot** - Java backend framework
- **Gemini API** - Google's AI language model
- **RESTful APIs** - Standard API communication
- **Render Deployment** - Cloud hosting platform

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite** - Build tool and dev server
- **npm** - Package management

## 🎨 Design Features

### Color Palette
- **Primary**: `#2563eb` (Blue)
- **Secondary**: `#7c3aed` (Purple)
- **Accent**: `#06b6d4` (Cyan)
- **Gradients**: Dynamic multi-color gradients
- **Dark Mode**: Automatic theme switching

### Typography
- **Font Family**: Inter, system fonts
- **Font Weights**: 300-900 range
- **Responsive Sizing**: Clamp-based fluid typography
- **Text Effects**: Gradient text, glow effects, animations

### Animations
- **Entrance Animations**: Fade, slide, scale effects
- **Hover Animations**: Lift, glow, scale transformations
- **Loading Animations**: Spinners, progress bars, skeleton loading
- **Scroll Animations**: Intersection Observer-based triggers

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced tablet experience
- **Desktop**: Full-featured desktop interface
- **Breakpoints**: 480px, 768px, 1024px, 1400px

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ibrahimmusa/gemini-chat-frontend.git
   cd gemini-chat-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

The application is optimized for deployment on:
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## 🔗 Backend Integration

Your portfolio is now connected to your deployed Spring Boot backend:

**Backend URL**: `https://gemini-ai-chatbot-9nde.onrender.com`

### Features:
- **Live AI Responses**: Real-time integration with Google's Gemini API
- **Fallback System**: Intelligent IRIS responses if backend is temporarily unavailable
- **Error Handling**: Graceful error handling with user feedback
- **CORS Configured**: Properly configured for frontend communication

### API Endpoint:
```javascript
const response = await fetch('https://gemini-ai-chatbot-9nde.onrender.com/api/qna/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: currentInput }),
});
```

### Request/Response Format:
- **Request**: `{ "question": "user input" }`
- **Response**: Full Gemini API JSON response with candidates array
- **Content-Type**: `application/json` for both request and response

### Response Structure:
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "AI response text here"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP"
    }
  ],
  "usageMetadata": { ... },
  "modelVersion": "gemini-2.0-flash"
}
```

The frontend extracts the text from `response.candidates[0].content.parts[0].text`

## 🎯 Performance Optimizations

- **Code Splitting**: Dynamic imports for better loading
- **Image Optimization**: Optimized assets and lazy loading
- **CSS Optimization**: Minimal CSS with efficient selectors
- **Animation Performance**: GPU-accelerated animations
- **Bundle Size**: Optimized dependencies and tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ibrahim Musa**
- Portfolio: [https://ibrahim-musa-portfolio.vercel.app](https://ibrahim-musa-portfolio.vercel.app)
- GitHub: [@ibrahimmusa](https://github.com/ibrahimmusa)
- LinkedIn: [Ibrahim Musa](https://linkedin.com/in/ibrahim-musa-dev)
- Email: ibrahim.musa.dev@gmail.com

## 🙏 Acknowledgments

- **Framer Motion** for amazing animation capabilities
- **React Icons** for comprehensive icon library
- **Google Gemini API** for AI integration
- **Render** for reliable backend hosting
- **Vercel** for seamless frontend deployment

---

⭐ **Star this repository if you found it helpful!**