import { useState, useEffect } from 'react';
import './App.css';
import './animations.css';
import ParticlesBackground from './components/ParticlesBackground';
import AnimatedLogo from './components/AnimatedLogo';
import InteractiveBackground from './components/InteractiveBackground';
import SkillProgress from './components/SkillProgress';
import FloatingActionButton from './components/FloatingActionButton';
import CVUpload from './components/CVUpload';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import IrisIcon from './components/IrisIcon';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaCode, 
  FaServer, 
  FaDatabase, 
  FaRobot,
  FaExternalLinkAlt,
  FaDownload,
  FaMoon,
  FaSun,
  FaPlay,
  FaRocket,
  FaCloud,
  FaDollarSign,
  FaBrain,
  FaStar,
  FaMagic,
  FaBars,
  FaTimes
} from 'react-icons/fa';

// IRIS - Ibrahim's Intelligent Response & Insight System
const getCreativeResponse = (input) => {
  const lowerInput = input.toLowerCase();
  
  // Greetings & Introduction
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
    return [
      `⚡ **IRIS Online**

Hello! I'm IRIS - iMusa's Intelligent Response & Insight System.

🔹 **Current Status**: Gemini API warming up
🔹 **Capabilities**: Full conversation mode
🔹 **Purpose**: Your guide to iMusa's digital world

What would you like to explore today?`,

      `✨ **Welcome to IRIS**

Hi there! I'm iMusa's AI companion, designed to provide insights and assistance.

**About Me:**
• Advanced conversational AI
• Powered by Google Gemini
• Specialized in tech discussions
• Always ready to help

How can I assist you?`,

      `✨ **IRIS Activated**

Greetings! I'm your intelligent interface to Ibrahim's portfolio.

**Quick Menu:**
→ Ask about Ibrahim's work
→ Explore technical skills  
→ Discuss projects
→ Get contact information

What interests you most?`
    ];
  }
  
  // About iMusa/IRIS
  if (lowerInput.includes('who') && (lowerInput.includes('you') || lowerInput.includes('ibrahim') || lowerInput.includes('musa') || lowerInput.includes('imusa') || lowerInput.includes('iris'))) {
    return [
      `👨‍💻 **About iMusa**

**Role**: Backend Engineer & AI Systems Builder
**Specialty**: FinTech systems, fraud detection, and intelligent AI assistants

**Core Philosophy:**
• End-to-end delivery: idea → code → deployment → live system
• Scalable architecture with real-world impact
• AI should augment human capabilities

**Proven Impact**: Multiple live AI systems serving real users! 🚀`,

      `🎯 **iMusa's Professional Identity**

**Primary Expertise:**
→ Backend Engineering (Java Spring Boot, Python FastAPI)
→ AI Systems Development & Deployment
→ FinTech & Fraud Detection Systems
→ Data Science & Machine Learning

**Approach:**
• System design & scalable architecture
• Production-ready code with proper testing
• Agile delivery with continuous improvement
• Mentorship & collaborative development

**Mission**: Building intelligent systems that solve real-world problems`,

      `💡 **Meet the Engineer**

**iMusa** - Backend Engineer + AI Systems Builder

**Technical Foundation:**
├── Backend: Java Spring Boot, Python FastAPI, SQL/MySQL
├── AI/ML: Machine Learning, Data Science (Python, R), Big Data (Hadoop)
├── Cloud: Vercel, AWS/GCP/Azure, Docker/Kubernetes
└── Systems: Fraud detection, payment infrastructure, microservices

**Live Deployments:**
• IRIS AI Assistant • Smart AI Research Assistant
• AI Email Reply Generator • PTDF AI Chat (ptdf.vercel.app)

**Vision**: Intelligent systems that feel natural and solve real problems`
    ];
  }
  
  // Technical Skills
  if (lowerInput.includes('skill') || lowerInput.includes('technology') || lowerInput.includes('tech')) {
    return [
      `🛠️ **Technical Arsenal**

**🖥️ Programming & Backend Engineering:**
• Java (Spring Boot) – backend services, SOAP/REST APIs, microservices
• Python (FastAPI, ML integration) – fraud detection systems
• SQL/MySQL – database design, migrations, Dockerized setups
• Docker & Docker Compose – containerization, multi-service orchestration
• Kubernetes – container orchestration knowledge
• Git & GitHub – repo management, CI/CD workflows

**🤖 AI & Data Science:**
• Machine Learning (Python, R) – model training, fraud detection
• AI Chat Systems – multiple deployed assistants
• Data Science – statistical modeling, analysis
• Big Data Technologies – Hadoop (certified)
• Generative AI Integration – LLM-based assistants

*Backend Engineer + AI Systems Builder with FinTech expertise*`,

      `⚡ **Core Specializations**

**Backend Engineering:**
┌─ Java Spring Boot – enterprise-grade backend services
├─ Python FastAPI – high-performance API development
├─ SQL/MySQL – robust database architecture
├─ Docker/Kubernetes – scalable containerization
└─ CI/CD Pipelines – automated deployment workflows

**AI Systems Built & Deployed:**
→ IRIS AI Assistant (this conversation!)
→ Smart AI Research Assistant
→ AI Email Reply Generator  
→ PTDF AI Chat Assistance (ptdf.vercel.app)

**Cloud & Deployment:**
• Vercel – live AI system deployments
• AWS/GCP/Azure – scalable infrastructure
• Production monitoring & debugging

**Philosophy**: End-to-end delivery from idea → code → deployment → live system`,

      `🎯 **Advanced Capabilities**

**System Design & Architecture:**
• Scalable backend systems
• Payment infrastructure design
• Microservices architecture
• Fraud detection system integration

**Data Science & ML:**
• Machine Learning model training
• Statistical modeling & analysis
• Big Data processing (Hadoop certified)
• R & Python for data science

**Software Engineering Practices:**
• Testing & Automation
• Agile/Scrum methodologies
• Code review & peer programming
• Production debugging & logging

**Unique Combination**: Backend engineering + AI/ML + FinTech domain expertise

*Proven track record: Multiple live AI systems deployed and running*`
    ];
  }
  
  // Projects & Portfolio
  if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('portfolio')) {
    return [
      `🚀 **Live Project Showcase**

**AI Systems (Deployed & Running):**
┌─ IRIS AI Assistant
│  └─ This intelligent conversation system
├─ Smart AI Research Assistant
│  └─ Research automation & analysis
├─ AI Email Reply Generator
│  └─ Automated email response system
└─ PTDF AI Chat Assistance
   └─ Live at ptdf.vercel.app

**Backend & FinTech Systems:**
• **Fraud Detection System** - ML backend integration
• **Payment Infrastructure** - Scalable architecture design
• **Microservices Architecture** - Enterprise-grade systems

*Real systems solving real problems for real users*`,

      `💼 **Production Systems Portfolio**

**AI & ML Deployments:**
• **IRIS AI Assistant** - Advanced conversational AI (this system!)
• **Smart AI Research Assistant** - Intelligent research automation
• **AI Email Reply Generator** - Production email automation
• **PTDF AI Chat** - Live intelligent assistance system

**Backend Engineering Projects:**
• **Fraud Detection System** - Python/ML backend integration
• **Payment Infrastructure** - Scalable system architecture
• **Enterprise APIs** - Java Spring Boot microservices
• **Database Systems** - SQL/MySQL with Docker deployment

**Key Achievements:**
→ Multiple live AI systems serving users
→ Production-grade backend architectures
→ FinTech domain expertise
→ End-to-end system delivery

**Impact**: Real business value through intelligent automation`,

      `🎯 **Engineering Excellence**

**Delivery Approach:**
1. **Problem Analysis** - Deep understanding of business needs
2. **System Design** - Scalable architecture planning
3. **Development** - Clean, maintainable code
4. **Testing & QA** - Automated testing & validation
5. **Deployment** - Production-ready systems
6. **Monitoring** - Performance optimization & debugging

**Current Focus:**
• AI system deployment & optimization
• FinTech & fraud detection systems
• Microservices architecture
• Cloud-native development

**Specialization**: Backend Engineer + AI Systems Builder with proven FinTech expertise

*From idea to production: Building systems that create measurable impact*`
    ];
  }
  
  // Contact & Collaboration
  if (lowerInput.includes('contact') || lowerInput.includes('hire') || lowerInput.includes('work together')) {
    return [
      `📧 **Let's Connect**

**Ready to collaborate?**

**Contact Information:**
• Email: musaibrahim0028@yahoo.com
• Response time: Within 24 hours
• Available for: Full-time, contract, consulting

**What I Bring:**
→ Technical expertise & creativity
→ Problem-solving mindset
→ Collaborative approach
→ Passion for excellence

**Let's build something amazing together!**`,

      `🤝 **Collaboration Opportunities**

**I'm excited to work on:**
• Full-stack web applications
• AI integration projects
• UI/UX improvements
• System architecture design
• Technical consulting

**My Commitment:**
├── Quality code & documentation
├── Clear communication
├── Timely delivery
└── Continuous improvement

**Ready to discuss your next project?**
*Drop me a line - I love talking tech!*`,

      `💬 **Get In Touch**

**Available For:**
• Full-stack development
• AI system integration  
• Technical architecture
• Code reviews & consulting
• Innovative project collaboration

**Communication Style:**
→ Clear & professional
→ Regular progress updates
→ Open to feedback
→ Solution-oriented

**Contact**: musaibrahim0028@yahoo.com
*Let's turn your ideas into digital reality!*`
    ];
  }
  
  // React & Frontend
  if (lowerInput.includes('react') || lowerInput.includes('frontend')) {
    return [
      `⚛️ **React Expertise**

**Why React?**
• Component-based architecture
• Reusable, maintainable code
• Rich ecosystem & community
• Perfect for interactive UIs

**My React Arsenal:**
├── Hooks & Context API
├── State management (Redux/Zustand)
├── Framer Motion animations
├── TypeScript integration
└── Performance optimization

**Philosophy**: Components should be like LEGO blocks - perfectly crafted and infinitely combinable`,

      `🎨 **Frontend Mastery**

**Development Approach:**
1. **Design System First** - Consistent, scalable components
2. **Performance Focus** - Optimized loading & interactions  
3. **Accessibility** - Inclusive design principles
4. **Mobile-First** - Responsive across all devices

**Tools & Technologies:**
• React 18+ with modern patterns
• TypeScript for type safety
• Framer Motion for animations
• CSS-in-JS & styled components

*Creating interfaces that users love to interact with*`,

      `✨ **UI/UX Philosophy**

**Core Principles:**
→ **Intuitive**: Users shouldn't need instructions
→ **Responsive**: Works beautifully on any device
→ **Performant**: Fast loading, smooth interactions
→ **Accessible**: Inclusive for all users

**React Specializations:**
• Custom hooks for reusable logic
• Component composition patterns
• State management strategies
• Animation & micro-interactions

**Goal**: Make complex functionality feel effortless`
    ];
  }
  
  // Backend & Java
  if (lowerInput.includes('backend') || lowerInput.includes('spring') || lowerInput.includes('java') || lowerInput.includes('python') || lowerInput.includes('fastapi')) {
    return [
      `☕ **Backend Engineering Excellence**

**Java Spring Boot Mastery:**
• Enterprise backend services & microservices
• SOAP/REST API integration & design
• Database integration with SQL/MySQL
• Dockerized deployments & orchestration
• CI/CD pipeline automation

**Python FastAPI Expertise:**
• High-performance API development
• ML integration for fraud detection systems
• Async processing & real-time capabilities
• Production-ready deployment strategies

**Philosophy**: Scalable, maintainable systems that solve real business problems`,

      `🏗️ **Production System Architecture**

**Backend Technology Stack:**
┌─ Java Spring Boot → Enterprise services, microservices, SOAP/REST APIs
├─ Python FastAPI → ML integration, fraud detection backends
├─ SQL/MySQL → Database design, migrations, Dockerized setups
├─ Docker/Kubernetes → Container orchestration, multi-service deployment
└─ Git/GitHub → CI/CD workflows, automated testing & deployment

**Real-World Applications:**
• Fraud Detection System (backend + ML integration)
• Payment Infrastructure Design
• AI Chat System Backends (multiple live deployments)
• Microservices Architecture

*Building production systems that handle real traffic and solve real problems*`,

      `⚙️ **Enterprise-Grade Development**

**System Design Capabilities:**
→ Scalable backend architecture
→ Payment infrastructure design
→ Fraud detection system integration
→ Microservices orchestration

**Development Practices:**
• Testing & Automation (automated test execution)
• Agile/Scrum methodologies
• Code review & peer programming
• Production debugging & logging
• Docker logs & error tracing

**Proven Delivery:**
• End-to-end project delivery: idea → code → deployment → live system
• Multiple AI systems deployed and running in production
• FinTech domain expertise with fraud detection systems

**Impact**: Real systems serving real users with measurable business value`
    ];
  }
  
  // AI & Technology
  if (lowerInput.includes('ai') || lowerInput.includes('gemini') || lowerInput.includes('chatbot') || lowerInput.includes('iris') || lowerInput.includes('machine learning') || lowerInput.includes('ml')) {
    return [
      `🤖 **AI Systems Builder**

**Live AI Systems Deployed:**
• **IRIS AI Assistant** - This intelligent conversation system
• **Smart AI Research Assistant** - Research automation tool
• **AI Email Reply Generator** - Automated email responses
• **PTDF AI Chat Assistance** - Live at ptdf.vercel.app

**Technical Expertise:**
→ Machine Learning (Python, R) - model training & deployment
→ Generative AI Integration - LLM-based assistants
→ Data Science - statistical modeling & analysis
→ Big Data Technologies - Hadoop (certified)

**Philosophy**: AI systems that solve real problems for real users`,

      `🧠 **Machine Learning & Data Science**

**ML Engineering Capabilities:**
├── Model Training & Deployment (Python, R)
├── Fraud Detection ML Service (production system)
├── Statistical Modeling & Analysis
├── Big Data Processing (Hadoop certified)
└── AI Chat System Architecture

**Real-World Applications:**
• **Fraud Detection System** - ML backend integration
• **AI Chat Assistants** - Multiple live deployments
• **Data Analysis Systems** - Statistical modeling
• **Intelligent Automation** - LLM-powered tools

**Cloud Deployment:**
• Vercel - live AI system hosting
• AWS/GCP/Azure - scalable AI infrastructure
• Production monitoring & optimization

*Building AI systems that create measurable business value*`,

      `🌟 **AI Development Philosophy**

**Core Approach:**
• End-to-end AI system delivery
• Production-ready deployment strategies
• Real-world problem solving focus
• Ethical AI implementation

**Technical Stack:**
→ Python/R for ML model development
→ FastAPI for AI service backends
→ Cloud deployment for scalability
→ Integration with existing systems

**Proven Track Record:**
• Multiple AI assistants deployed and serving users
• Fraud detection system with ML integration
• Data science projects with statistical modeling
• Big Data processing capabilities (Hadoop certified)

**Vision**: Intelligent systems that augment human capabilities and solve complex business problems

*IRIS represents the culmination of AI system building expertise*`
    ];
  }
  
  // Coffee & Culture
  // FinTech & Fraud Detection
  if (lowerInput.includes('fintech') || lowerInput.includes('fraud') || lowerInput.includes('payment') || lowerInput.includes('financial')) {
    return [
      `💰 **FinTech & Fraud Detection Expertise**

**Fraud Detection System:**
• **Backend Architecture** - Python FastAPI with ML integration
• **Machine Learning** - Model training for fraud pattern detection
• **Real-time Processing** - Live transaction analysis
• **Database Design** - Optimized for high-volume financial data

**Payment Infrastructure:**
• **System Architecture** - Scalable payment processing design
• **Security Implementation** - Financial-grade security protocols
• **API Integration** - SOAP/REST payment gateway connections
• **Compliance** - Financial industry standards & regulations

**Technical Stack:**
├── Python FastAPI - High-performance fraud detection APIs
├── Machine Learning - Fraud pattern recognition models
├── SQL/MySQL - Financial data management
└── Docker/Kubernetes - Scalable deployment

*Building secure, scalable financial systems that protect real money*`,

      `🔒 **Financial Systems Engineering**

**Domain Expertise:**
→ Fraud detection algorithm development
→ Payment processing system architecture
→ Financial data security & compliance
→ High-volume transaction processing

**Real-World Impact:**
• **Fraud Detection System** - Live ML-powered fraud prevention
• **Payment Infrastructure** - Scalable financial transaction processing
• **Security Implementation** - Financial-grade data protection
• **Performance Optimization** - High-throughput financial systems

**Key Capabilities:**
• Machine Learning for fraud pattern detection
• Real-time transaction analysis & scoring
• Secure payment gateway integration
• Financial data compliance & auditing

**Philosophy**: Financial systems require the highest standards of security, reliability, and performance

*Protecting financial transactions through intelligent system design*`,

      `📊 **Data Science in Finance**

**Financial ML Applications:**
• **Fraud Detection Models** - Pattern recognition & anomaly detection
• **Risk Assessment** - Statistical modeling for financial risk
• **Transaction Analysis** - Big data processing for financial insights
• **Predictive Analytics** - Financial trend analysis & forecasting

**Technical Implementation:**
├── Python/R - Statistical modeling & ML development
├── Big Data (Hadoop) - Large-scale financial data processing
├── SQL/MySQL - Financial database optimization
└── Cloud Deployment - Scalable financial system hosting

**Proven Results:**
• Live fraud detection system with ML backend
• Payment infrastructure handling real transactions
• Financial data analysis with actionable insights
• Compliance with financial industry standards

**Vision**: Intelligent financial systems that protect users while enabling seamless transactions

*Combining AI/ML expertise with financial domain knowledge*`
    ];
  }

  if (lowerInput.includes('coffee') || lowerInput.includes('☕')) {
    return [
      `☕ **Coffee & Code Culture**

**The Developer's Fuel:**
• Coffee powers innovation
• Best algorithms born over espresso
• Debugging sessions need caffeine
• Code reviews pair well with lattes

**Fun Stats:**
→ Lines of code per cup: ~247
→ Bugs fixed per coffee break: ~3.7
→ Features implemented per pot: ~1.2

**Philosophy**: Great software, like great coffee, requires patience, skill, and the right blend of ingredients`,

      `🌟 **Caffeine-Driven Development**

**Coffee Preferences:**
• **Morning**: Strong espresso for focus
• **Afternoon**: Smooth latte for creativity  
• **Evening**: Decaf for late-night coding
• **Debugging**: Whatever's strongest!

**Coffee-Code Correlation:**
├── Better coffee = cleaner code
├── Fresh beans = fresh ideas
├── Perfect brew = perfect logic
└── Shared coffee = better teamwork

*What's your favorite coding fuel?*`,

      `💡 **The Coffee Connection**

**Why Coffee & Code Go Together:**
1. **Ritual**: Creates focus & routine
2. **Energy**: Sustained concentration
3. **Creativity**: Stimulates problem-solving
4. **Community**: Shared developer culture

**Coffee Shop Coding:**
• Background noise aids concentration
• Change of scenery sparks creativity
• Social energy boosts motivation
• WiFi enables remote productivity

**Truth**: The best code is written between the first sip and the last drop`
    ];
  }
  
  // Default responses
  return [
    `🎭 **IRIS Analysis**

**Query**: "${input}"
**Status**: Processing with creative intelligence

**Insight**: While my Gemini core is initializing, I can share that Ibrahim specializes in turning complex challenges into elegant solutions.

**Suggestion**: Try asking about:
• Technical skills & expertise
• Project portfolio & work
• Collaboration opportunities
• Development philosophy

*What specific aspect interests you most?*`,

    `🚀 **Creative Mode Active**

**Topic**: "${input}"
**Response**: Engaging creative intelligence protocols

Ibrahim's approach to "${input}" would likely involve:
→ Deep problem analysis
→ User-centered design thinking
→ Technical excellence
→ Innovative solutions

**Next Steps**: 
• Explore specific technical aspects
• Discuss implementation strategies  
• Review related portfolio projects

*How can I provide more targeted insights?*`,

    `🚀 **IRIS Insight Engine**

**Processing**: "${input}"
**Mode**: Creative conversation while Gemini API loads

**Context**: This relates to Ibrahim's expertise in building intelligent, user-focused solutions that bridge technology and human needs.

**Available Topics:**
├── Technical architecture & design
├── Full-stack development approach
├── AI integration strategies
└── Project collaboration methods

*Which direction would you like to explore?*`
  ];
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeSection]);

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
  };

  const handleSplashComplete = () => {
    setTimeout(() => setShowSplash(false), 300);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to add AI messages one by one with typing effect
  const addMessagesSequentially = async (responses) => {
    setIsTyping(true);
    
    for (let i = 0; i < responses.length; i++) {
      // Add typing delay before each message
      await new Promise(resolve => setTimeout(resolve, 1000 + (i * 500)));
      
      const aiMessage = {
        content: responses[i],
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      
      // Scroll to bottom after each message
      setTimeout(() => {
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      }, 100);
    }
    
    setIsTyping(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      content: inputValue,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Connect to your deployed backend on Render
      const response = await fetch('https://gemini-ai-chatbot-9nde.onrender.com/api/qna/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: currentInput }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse JSON response from Gemini API
        
        // Extract text from Gemini API response structure
        let aiResponseText = '';
        if (data.candidates && data.candidates.length > 0) {
          const candidate = data.candidates[0];
          if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
            aiResponseText = candidate.content.parts[0].text;
          }
        }
        
        // Fallback if response structure is unexpected
        if (!aiResponseText) {
          aiResponseText = "I received your message, but there was an issue processing the response format.";
        }
        
        // For single Gemini API response, add it directly
        const aiMessage = {
          content: aiResponseText,
          sender: 'ai',
          timestamp: new Date().toISOString(),
        };
        
        setIsTyping(true);
        // Add a typing delay for realism
        setTimeout(() => {
          setMessages((prev) => [...prev, aiMessage]);
          setIsTyping(false);
          
          // Scroll to bottom
          setTimeout(() => {
            const chatMessages = document.querySelector('.chat-messages');
            if (chatMessages) {
              chatMessages.scrollTop = chatMessages.scrollHeight;
            }
          }, 100);
        }, 1500);
      } else {
        throw new Error(`Backend error: ${response.status}`);
      }
    } catch (error) {
      console.error('API Error:', error);
      
      // Creative AI Assistant responses while backend is warming up
      const creativeResponses = getCreativeResponse(currentInput);
      
      // Use sequential display for multiple creative responses
      await addMessagesSequentially(creativeResponses);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <ParticlesBackground />
      <InteractiveBackground />
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="portfolio-content"
        >
          <header className="portfolio-header">
            <div className="logo-section">
              <AnimatedLogo />
            </div>
            <nav className="portfolio-nav">
              <ul>
                <li 
                  className={activeSection === 'home' ? 'active' : ''} 
                  onClick={() => setActiveSection('home')}
                >
                  Home
                </li>
                <li 
                  className={activeSection === 'projects' ? 'active' : ''} 
                  onClick={() => setActiveSection('projects')}
                >
                  Projects
                </li>
                <li 
                  className={activeSection === 'skills' ? 'active' : ''} 
                  onClick={() => setActiveSection('skills')}
                >
                  Skills
                </li>
                <li 
                  className={activeSection === 'cv' ? 'active' : ''} 
                  onClick={() => setActiveSection('cv')}
                >
                  CV
                </li>
                <li 
                  className={activeSection === 'iris' ? 'active' : ''} 
                  onClick={() => setActiveSection('iris')}
                >
                  <IrisIcon size={18} /> Iris AI Assistance
                </li>
                <li 
                  className={activeSection === 'fraud' ? 'active' : ''} 
                  onClick={() => setActiveSection('fraud')}
                >
                  🛡️ Fraud Portal
                </li>
              </ul>
            </nav>
            <div className="header-actions">
              <button 
                className="theme-toggle"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeSection === 'home' && (
              <motion.section 
                key="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="hero-section"
              >
                <div className="hero-content">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    <h1 className="gradient-text">Backend Engineer & AI Systems Builder</h1>
                  </motion.div>
                  <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Specializing in FinTech systems, fraud detection, and intelligent AI assistants. 
                    Building production-grade systems that solve real-world problems.
                  </motion.p>
                  <motion.div 
                    className="cta-buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <button className="primary-btn hover-lift" onClick={() => setActiveSection('projects')}>
                      <FaRocket /> View Projects
                    </button>
                    <button className="outline-btn hover-lift" onClick={() => setActiveSection('cv')}>
                      <FaDownload /> CV Section
                    </button>
                    <button className="outline-btn hover-lift" onClick={() => setActiveSection('chat')}>
                      <FaPlay /> Try IRIS AI
                    </button>
                  </motion.div>
                </div>
                <motion.div 
                  className="social-links"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <a href="https://github.com/musa347?tab=repositories" target="_blank" rel="noopener noreferrer" className="social-btn hover-lift">
                    <FaGithub /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/musaibrahim/" target="_blank" rel="noopener noreferrer" className="social-btn hover-lift">
                    <FaLinkedin /> LinkedIn
                  </a>
                  <a href="mailto:musaibrahim0028@yahoo.com" className="social-btn hover-lift">
                    <FaEnvelope /> Email
                  </a>
                </motion.div>
              </motion.section>
            )}

            {activeSection === 'projects' && (
              <motion.section 
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="projects-section"
              >
                <motion.h2 
                  className="section-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Featured Projects
                </motion.h2>
                <motion.p
                  className="section-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Real-world projects showcasing Backend Engineering, AI Systems, FinTech, and Microservices expertise
                </motion.p>
                <div className="projects-grid">
                  <motion.div 
                    className="project-card hover-lift"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="project-content">
                      <h3>🛡️ Fraud Detection System</h3>
                      <p>A real-time fraud detection API using Machine Learning to identify suspicious financial transactions. Features FastAPI backend with Spring Boot service integration, ML prediction models, and comprehensive logging system.</p>
                      <div className="tech-stack">
                        <span>Python</span>
                        <span>FastAPI</span>
                        <span>Spring Boot</span>
                        <span>Machine Learning</span>
                        <span>Java</span>
                      </div>
                      <div className="project-links">
                        <a href="https://github.com/musa347/fraud-detection" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> ML API
                        </a>
                        <a href="https://github.com/musa347/fraud-detection-backend" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Backend Service
                        </a>
                        <a href="https://fraudportal.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaExternalLinkAlt /> Live Portal
                        </a>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="project-card hover-lift"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="project-content">
                      <h3>📊 G-Stat Microservices Platform</h3>
                      <p>Scalable, secure backend system simulating national statistical data ingestion and delivery. Built with microservices architecture, API Gateway, Kafka messaging, and comprehensive data processing pipeline.</p>
                      <div className="tech-stack">
                        <span>Java</span>
                        <span>Spring Boot</span>
                        <span>Microservices</span>
                        <span>Kafka</span>
                        <span>API Gateway</span>
                      </div>
                      <div className="project-links">
                        <a href="https://github.com/musa347/G-Stat-Microservices-Platform" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Platform
                        </a>
                        <a href="https://github.com/musa347/gdp-data-frontend" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Frontend
                        </a>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="project-card hover-lift"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="project-content">
                      <h3>🤖 Iris AI Chat Assistance</h3>
                      <p>Sophisticated chat interface with real-time AI responses, integrated with Google's Gemini API. Features Spring Boot backend deployed on Render, message history, typing indicators, and live AI processing.</p>
                      <div className="tech-stack">
                        <span>Java</span>
                        <span>Spring Boot</span>
                        <span>Gemini API</span>
                        <span>React</span>
                        <span>Render</span>
                      </div>
                      <div className="project-links">
                        <a href="https://iriss.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaExternalLinkAlt /> Live Portal
                        </a>
                        <a href="https://github.com/musa347/IRIS-frontend-" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Frontend Repo
                        </a>
                        <a href="https://github.com/musa347/gemini-ai-chatbot" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Backend Repo
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="project-card hover-lift"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="project-content">
                      <h3>🧠 Lexora.ai - Job Application Toolkit</h3>
                      <p>AI-powered job application toolkit that generates ATS-optimized résumés, tailored cover letters, and cold outreach emails. Uses advanced AI to match user profiles with job requirements.</p>
                      <div className="tech-stack">
                        <span>AI/ML</span>
                        <span>NLP</span>
                        <span>Resume Optimization</span>
                        <span>ATS Integration</span>
                        <span>Automation</span>
                      </div>
                      <div className="project-links">
                        <a href="https://github.com/musa347/Lexora.ai" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Source Code
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="project-card hover-lift"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="project-content">
                      <h3>📧 AI Email Reply Generator</h3>
                      <p>Intelligent email reply generation system using Gemini API. Spring Boot backend that analyzes incoming emails and generates contextually appropriate responses with professional tone and accuracy.</p>
                      <div className="tech-stack">
                        <span>Java</span>
                        <span>Spring Boot</span>
                        <span>Gemini API</span>
                        <span>NLP</span>
                        <span>Email Processing</span>
                      </div>
                      <div className="project-links">
                        <a href="https://github.com/musa347/AI-Email-Reply-Generator" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Source Code
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="project-card hover-lift"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="project-content">
                      <h3>🔬 Smart AI Research Assistant</h3>
                      <p>AI-powered research assistant that summarizes multiple texts and documents. Built with Spring Boot and Spring AI, featuring intelligent text analysis, summarization algorithms, and research workflow automation.</p>
                      <div className="tech-stack">
                        <span>Java</span>
                        <span>Spring Boot</span>
                        <span>Spring AI</span>
                        <span>Text Analysis</span>
                        <span>Summarization</span>
                      </div>
                      <div className="project-links">
                        <a href="https://github.com/musa347/Smart-AI-Research-Assistance" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Source Code
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="project-card hover-lift"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="project-content">
                      <h3>🏢 Employee Tracking System</h3>
                      <p>Comprehensive employee management system built from ground up using Spring Boot 3, Spring MVC, Spring Security 6, and Thymeleaf. Features secure authentication, role-based access, and MySQL database integration.</p>
                      <div className="tech-stack">
                        <span>Java</span>
                        <span>Spring Boot 3</span>
                        <span>Spring Security 6</span>
                        <span>Thymeleaf</span>
                        <span>MySQL</span>
                      </div>
                      <div className="project-links">
                        <a href="https://github.com/musa347/Employee-Tracking-System" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Source Code
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="project-card hover-lift"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="project-content">
                      <h3>🏦 Java Banking Application</h3>
                      <p>Simple yet robust banking application with core functionalities including account creation, balance inquiries, deposits, and withdrawals. Built with Spring Boot and following banking industry best practices.</p>
                      <div className="tech-stack">
                        <span>Java</span>
                        <span>Spring Boot</span>
                        <span>Banking APIs</span>
                        <span>Financial Logic</span>
                        <span>Security</span>
                      </div>
                      <div className="project-links">
                        <a href="https://github.com/musa347/Java-Springboot-Banking-App" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Source Code
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="project-card hover-lift"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                  >
                    <div className="project-content">
                      <h3>🔧 Microservices Job Platform</h3>
                      <p>Scalable job application platform built with microservices architecture. Features Job, Company, and Review services with Eureka Service Registry, Docker containerization, and RabbitMQ message broker integration.</p>
                      <div className="tech-stack">
                        <span>Java</span>
                        <span>Microservices</span>
                        <span>Docker</span>
                        <span>RabbitMQ</span>
                        <span>Eureka</span>
                      </div>
                      <div className="project-links">
                        <a href="https://github.com/musa347/Spring-Boot-Job-Application" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Main Platform
                        </a>
                        <a href="https://github.com/musa347/Job-Microservice" target="_blank" rel="noopener noreferrer" className="project-link">
                          <FaGithub /> Job Service
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {activeSection === 'skills' && (
              <motion.section 
                key="skills"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="skills-section"
              >
                <motion.h2 
                  className="section-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  Technical Skills
                </motion.h2>
                <motion.p
                  className="section-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Backend Engineering • AI Systems • FinTech • Production Deployments
                </motion.p>

                <div className="skills-container">
                  <motion.div 
                    className="skill-category"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="skill-icon"><FaServer /></div>
                    <h3>Backend Engineering</h3>
                    <div className="skill-progress-list">
                      <SkillProgress skill="Java / Spring Boot" percentage={95} delay={400} icon="☕" />
                      <SkillProgress skill="Python / FastAPI" percentage={90} delay={500} icon="🐍" />
                      <SkillProgress skill="SQL / MySQL" percentage={90} delay={600} icon="🗄️" />
                      <SkillProgress skill="Docker / Kubernetes" percentage={85} delay={700} icon="🐳" />
                      <SkillProgress skill="SOAP/REST APIs" percentage={95} delay={800} icon="🔗" />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="skill-category"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="skill-icon"><FaRobot /></div>
                    <h3>AI & Machine Learning</h3>
                    <div className="skill-progress-list">
                      <SkillProgress skill="Machine Learning (Python, R)" percentage={90} delay={500} icon="🤖" />
                      <SkillProgress skill="Data Science & Analytics" percentage={85} delay={600} icon="📊" />
                      <SkillProgress skill="Big Data (Hadoop)" percentage={80} delay={700} icon="🏔️" />
                      <SkillProgress skill="AI Chat Systems" percentage={95} delay={800} icon="💬" />
                      <SkillProgress skill="Generative AI Integration" percentage={90} delay={900} icon="✨" />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="skill-category"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="skill-icon"><FaCloud /></div>
                    <h3>Cloud & DevOps</h3>
                    <div className="skill-progress-list">
                      <SkillProgress skill="Vercel Deployment" percentage={95} delay={600} icon="▲" />
                      <SkillProgress skill="AWS / GCP / Azure" percentage={80} delay={700} icon="☁️" />
                      <SkillProgress skill="CI/CD Pipelines" percentage={85} delay={800} icon="🔄" />
                      <SkillProgress skill="Git & GitHub" percentage={95} delay={900} icon="🐙" />
                      <SkillProgress skill="Production Monitoring" percentage={85} delay={1000} icon="📈" />
                    </div>
                  </motion.div>

                  <motion.div 
                    className="skill-category"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="skill-icon"><FaDollarSign /></div>
                    <h3>FinTech & Systems</h3>
                    <div className="skill-progress-list">
                      <SkillProgress skill="Fraud Detection Systems" percentage={90} delay={700} icon="🛡️" />
                      <SkillProgress skill="Payment Infrastructure" percentage={85} delay={800} icon="💳" />
                      <SkillProgress skill="System Architecture" percentage={90} delay={900} icon="🏗️" />
                      <SkillProgress skill="Testing & Automation" percentage={85} delay={1000} icon="🧪" />
                      <SkillProgress skill="Agile / Scrum" percentage={90} delay={1100} icon="🔄" />
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {activeSection === 'cv' && (
              <motion.section 
                key="cv"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="cv-section"
              >
                <CVUpload />
              </motion.section>
            )}

            {activeSection === 'fraud' && (
              <motion.section 
                key="fraud"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="fraud-section"
              >
                <motion.h2 
                  className="section-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  🛡️ Fraud Detection Portal
                </motion.h2>
                <motion.p
                  className="section-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Deployed end-to-end fraud detection system with ML scoring and API integrations.
                </motion.p>
                <div className="fraud-actions">
                  <a href="https://fraudportal.vercel.app/" target="_blank" rel="noopener noreferrer" className="primary-btn hover-lift">
                    <FaExternalLinkAlt /> Open Live Portal
                  </a>
                  <a href="https://github.com/musa347/fraud-detection" target="_blank" rel="noopener noreferrer" className="outline-btn hover-lift">
                    <FaGithub /> ML API
                  </a>
                  <a href="https://github.com/musa347/fraud-detection-backend" target="_blank" rel="noopener noreferrer" className="outline-btn hover-lift">
                    <FaGithub /> Backend Service
                  </a>
                </div>
              </motion.section>
            )}

            {activeSection === 'iris' && (
              <motion.section 
                key="iris"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="fraud-section"
              >
                <motion.h2 
                  className="section-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <IrisIcon size={28} /> Iris AI Assistance
                </motion.h2>
                <motion.p
                  className="section-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Deployed standalone IRIS frontend with Gemini-powered chat experience.
                </motion.p>
                <div className="fraud-actions">
                  <a href="https://iriss.vercel.app/" target="_blank" rel="noopener noreferrer" className="primary-btn hover-lift">
                    <FaExternalLinkAlt /> Open Live Portal
                  </a>
                  <a href="https://github.com/musa347/IRIS-frontend-" target="_blank" rel="noopener noreferrer" className="outline-btn hover-lift">
                    <FaGithub /> Frontend Repo
                  </a>
                  <a href="https://github.com/musa347/gemini-ai-chatbot" target="_blank" rel="noopener noreferrer" className="outline-btn hover-lift">
                    <FaGithub /> Backend Repo
                  </a>
                </div>
              </motion.section>
            )}

            {activeSection === 'chat' && (
              <motion.section 
                key="chat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="iris-ai-section"
              >
                <motion.h2 
                  className="section-title"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <IrisIcon size={32} /> IRIS AI
                </motion.h2>
                <motion.p
                  className="section-subtitle"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Experience my AI-powered chat interface with real-time responses
                </motion.p>
                
                <motion.div 
                  className="chat-container"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="chat-header">
                    <h2><IrisIcon size={28} /> IRIS - AI Assistant</h2>
                    <p>Intelligent Response & Insight System • Powered by Gemini API</p>
                  </div>

                  <div className="chat-messages">
                    {messages.length === 0 ? (
                      <motion.div
                        className="welcome-message float-in"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <div>
                          <h3><IrisIcon size={24} /> IRIS - Intelligent Response & Insight System</h3>
                          <p>
                            Welcome! I'm iMusa's AI companion, designed to provide intelligent insights and assistance. 
                            Powered by Google's Gemini API with structured, easy-to-read responses.
                          </p>
                          <p>
                            <strong>Try asking about:</strong><br/>
                            • Technical skills & expertise<br/>
                            • Project portfolio & work<br/>
                            • Collaboration opportunities<br/>
                            • Development philosophy
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          className={`message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          <div className="message-content">
                            <div className="message-header">
                              <span className="sender-label">{msg.sender === 'user' ? 'You' : <><IrisIcon size={16} /> IRIS</>}</span>
                              <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p>{msg.content}</p>
                          </div>
                        </motion.div>
                      ))
                    )}

                    {(isLoading || isTyping) && (
                      <motion.div
                        className="ai-message typing-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="message-content">
                          <div className="message-header">
                            <span className="sender-label"><IrisIcon size={16} /> IRIS</span>
                            <span className="timestamp">typing...</span>
                          </div>
                          <div className="typing-indicator">
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="chat-input-container">
                    <form onSubmit={handleSubmit} className="chat-input">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type your message here..."
                        disabled={isLoading || isTyping}
                      />
                      <button
                        type="submit"
                        className="send-button ripple-effect"
                        disabled={isLoading || isTyping || !inputValue.trim()}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22 2L11 13"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M22 2L15 22L11 13L2 9L22 2Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                </motion.div>
              </motion.section>
            )}
          </AnimatePresence>

          <footer className="portfolio-footer">
            <div className="footer-content">
              <p>© {new Date().getFullYear()} Ibrahim Musa. All rights reserved.</p>
              <div className="footer-links">
                <a href="#" className="footer-link">GitHub</a>
                <a href="#" className="footer-link">LinkedIn</a>
                <a href="#" className="footer-link">Twitter</a>
                <a href="#" className="footer-link">Contact</a>
              </div>
            </div>
          </footer>

          {/* Floating Action Button */}
          <FloatingActionButton 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
        </motion.div>
      )}
    </div>
  );
}

export default App;