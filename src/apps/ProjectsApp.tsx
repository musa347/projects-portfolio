import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaMobileAlt, FaServer, FaLaptopCode } from 'react-icons/fa';

type Project = {
  id: number;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  githubUrl?: string;
  demoUrl?: string;
  technologies?: string[];
  techStack?: string[];
  category?: 'web' | 'mobile' | 'backend' | 'fullstack';
  links?: { label: string; url: string }[];
};

const ProjectsApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Fraud Detection System',
      description: 'A real-time fraud detection API using Machine Learning to identify suspicious financial transactions. Features FastAPI backend with Spring Boot service integration, ML prediction models, and comprehensive logging system.',
      techStack: ["Python", "FastAPI", "Spring Boot", "Machine Learning", "Java"],
      links: [
        { label: "ML API", url: "https://github.com/musa347/fraud-detection" },
        { label: "Backend Service", url: "https://github.com/musa347/fraud-detection-backend" },
        { label: "Live Portal", url: "https://fraudportal.vercel.app/" }
      ]
    },
    {
      id: 2,
      title: 'G-Stat Microservices Platform',
      description: 'Scalable, secure backend system simulating national statistical data ingestion and delivery. Built with microservices architecture, API Gateway, Kafka messaging, and comprehensive data processing pipeline.',
      techStack: ["Java", "Spring Boot", "Microservices", "Kafka", "API Gateway"],
      links: [
        { label: "Platform", url: "https://github.com/musa347/G-Stat-Microservices-Platform" },
        { label: "Frontend", url: "https://github.com/musa347/gdp-data-frontend" }
      ]
    },
    {
      id: 3,
      title: 'Iris AI Chat Assistance',
      description: 'Sophisticated chat interface with real-time AI responses, integrated with Google\'s Gemini API. Features Spring Boot backend deployed on Render, message history, typing indicators, and live AI processing.',
      techStack: ["Java", "Spring Boot", "Gemini API", "React", "Render"],
      links: [
        { label: "Live Portal", url: "https://iriss.vercel.app/" },
        { label: "Frontend Repo", url: "https://github.com/musa347/IRIS-frontend-" },
        { label: "Backend Repo", url: "https://github.com/musa347/gemini-ai-chatbot" }
      ]
    },
    {
      id: 4,
      title: 'Lexora.ai - Job Application Toolkit',
      description: 'AI-powered job application toolkit that generates ATS-optimized résumés, tailored cover letters, and cold outreach emails. Uses advanced AI to match user profiles with job requirements.',
      techStack: ["AI/ML", "NLP", "Resume Optimization", "ATS Integration", "Automation"],
      links: [
        { label: "Source Code", url: "https://github.com/musa347/Lexora.ai" }
      ]
    },
    {
      id: 5,
      title: 'AI Email Reply Generator',
      description: 'Intelligent email reply generation system using Gemini API. Spring Boot backend that analyzes incoming emails and generates contextually appropriate responses with professional tone and accuracy.',
      techStack: ["Java", "Spring Boot", "Gemini API", "NLP", "Email Processing"],
      links: [
        { label: "Source Code", url: "https://github.com/musa347/AI-Email-Reply-Generator" }
      ]
    },
    {
      id: 6,
      title: 'Smart AI Research Assistant',
      description: 'AI-powered research assistant that summarizes multiple texts and documents. Built with Spring Boot and Spring AI, featuring intelligent text analysis, summarization algorithms, and research workflow automation.',
      techStack: ["Java", "Spring Boot", "Spring AI", "Text Analysis", "Summarization"],
      links: [
        { label: "Source Code", url: "https://github.com/musa347/Smart-AI-Research-Assistance" }
      ]
    },
    {
      id: 7,
      title: 'Employee Tracking System',
      description: 'Comprehensive employee management system built from ground up using Spring Boot 3, Spring MVC, Spring Security 6, and Thymeleaf. Features secure authentication, role-based access, and MySQL database integration.',
      techStack: ["Java", "Spring Boot 3", "Spring Security 6", "Thymeleaf", "MySQL"],
      links: [
        { label: "Source Code", url: "https://github.com/musa347/Employee-Tracking-System" }
      ]
    },
    {
      id: 8,
      title: 'Java Banking Application',
      description: 'Simple yet robust banking application with core functionalities including account creation, balance inquiries, deposits, and withdrawals. Built with Spring Boot and following banking industry best practices.',
      techStack: ["Java", "Spring Boot", "Banking APIs", "Financial Logic", "Security"],
      links: [
        { label: "Source Code", url: "https://github.com/musa347/Java-Springboot-Banking-App" }
      ]
    },
    {
      id: 9,
      title: 'Microservices Job Platform',
      description: 'Scalable job application platform built with microservices architecture. Features Job, Company, and Review services with Eureka Service Registry, Docker containerization, and RabbitMQ message broker integration.',
      techStack: ["Java", "Microservices", "Docker", "RabbitMQ", "Eureka"],
      links: [
        { label: "Main Platform", url: "https://github.com/musa347/Spring-Boot-Job-Application" },
        { label: "Job Service", url: "https://github.com/musa347/Job-Microservice" }
      ]
    },
    {
      id: 10,
      title: 'PR Review Assistant',
      description: 'GitHub PR review workflow using Checkstyle and SpotBugs to enforce coding standards and catch issues automatically.',
      techStack: ["GitHub Actions", "Checkstyle", "SpotBugs", "Static Analysis"],
      links: [
        { label: "Source Code", url: "https://github.com/musa347/pr-review-assistant" }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', icon: <FaLaptopCode /> },
    { id: 'web', name: 'Web Apps', icon: <FaCode /> },
    { id: 'mobile', name: 'Mobile Apps', icon: <FaMobileAlt /> },
    { id: 'backend', name: 'Backend', icon: <FaServer /> },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (project.tags || []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="window-content">
      <div className="window-body">
        <div className="projects-container">
          <header className="projects-header">
            <h2>My Projects</h2>
            <p>Showcasing my latest work and contributions</p>
            
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </header>

          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => openProjectModal(project)}
                >
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <div className="project-overlay">
                      <div className="project-links">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="project-link"
                          >
                            <FaGithub />
                          </a>
                        )}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="project-link"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p className="project-description">
                      {project.description.length > 100
                        ? `${project.description.substring(0, 100)}...`
                        : project.description}
                    </p>
                    <div className="project-tags">
                      {(project.techStack || []).slice(0, 3).map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                      {project.techStack && project.techStack.length > 3 && (
                        <span className="tag-more">+{project.techStack.length - 3}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="no-projects">
                <p>No projects found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          >
            <motion.div
              className="project-modal"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={closeProjectModal}>
                &times;
              </button>
              
              <div className="modal-content">
                <div className="modal-image">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>
                
                <div className="modal-details">
                  <h2>{selectedProject.title}</h2>
                  <p className="project-description">{selectedProject.description}</p>
                  
                  <div className="project-meta">
                    <div className="project-links">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                        >
                          <FaGithub /> View on GitHub
                        </a>
                      )}
                      {selectedProject.demoUrl && (
                        <a
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          <FaExternalLinkAlt /> Live Demo
                        </a>
                      )}
                    </div>
                    
                    <div className="technologies">
                      <h4>Technologies Used</h4>
                      <div className="tech-tags">
                        {(selectedProject.technologies ?? []).map((tech, index) => (
                          <span key={index} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .window-content {
          height: 100%;
          overflow-y: auto;
          padding: 16px;
          color: var(--text-color);
        }
        
        .window-body {
          height: 100%;
        }
        
        .projects-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .projects-header {
          margin-bottom: 30px;
          text-align: center;
        }
        
        .projects-header h2 {
          margin: 0 0 10px;
          font-size: 1.8rem;
          color: var(--heading-color);
        }
        
        .projects-header p {
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        
        .search-bar {
          margin: 20px 0;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .search-input {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          background: var(--input-bg);
          color: var(--text-color);
          font-size: 0.95rem;
          transition: border-color 0.2s;
        }
        
        .search-input:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 0 2px rgba(var(--accent-rgb), 0.2);
        }
        
        .category-tabs {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin: 20px 0 30px;
        }
        
        .category-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1px solid var(--border-color);
          background: var(--button-bg);
          color: var(--button-text);
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        
        .category-tab:hover {
          background: var(--button-hover-bg);
        }
        
        .category-tab.active {
          background: var(--accent-color);
          color: white;
          border-color: var(--accent-color);
        }
        
        .category-icon {
          font-size: 1rem;
        }
        
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 25px;
          padding: 10px 0;
        }
        
        .project-card {
          background: var(--card-bg);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }
        
        .project-image {
          position: relative;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
          overflow: hidden;
        }
        
        .project-image img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .project-card:hover .project-overlay {
          opacity: 1;
        }
        
        .project-links {
          display: flex;
          gap: 15px;
        }
        
        .project-link {
          color: white;
          background: rgba(255, 255, 255, 0.2);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        
        .project-link:hover {
          background: var(--accent-color);
          transform: translateY(-2px);
        }
        
        .project-info {
          padding: 18px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .project-info h3 {
          margin: 0 0 10px;
          font-size: 1.2rem;
          color: var(--heading-color);
        }
        
        .project-description {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 15px;
          line-height: 1.5;
          flex: 1;
        }
        
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: auto;
        }
        
        .tag, .tag-more {
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 12px;
          background: var(--tag-bg);
          color: var(--tag-text);
        }
        
        .tag-more {
          background: var(--accent-light);
          color: var(--accent-color);
        }
        
        .no-projects {
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px 20px;
          color: var(--text-muted);
        }
        
        /* Project Modal Styles */
        .project-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          backdrop-filter: blur(5px);
        }
        
        .project-modal {
          background: var(--modal-bg);
          border-radius: 10px;
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .close-modal {
          position: absolute;
          top: 15px;
          right: 15px;
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: var(--text-muted);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }
        
        .close-modal:hover {
          background: var(--button-hover-bg);
          color: var(--text-color);
        }
        
        .modal-content {
          display: flex;
          flex-direction: column;
        }
        
        .modal-image {
          height: 300px;
          overflow: hidden;
        }
        
        .modal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .modal-details {
          padding: 30px;
        }
        
        .modal-details h2 {
          margin: 0 0 15px;
          color: var(--heading-color);
          font-size: 1.8rem;
        }
        
        .project-meta {
          margin-top: 25px;
        }
        
        .project-links {
          display: flex;
          gap: 15px;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.2s ease;
          text-decoration: none;
          font-size: 0.95rem;
        }
        
        .btn-primary {
          background: var(--accent-color);
          color: white;
          border: 1px solid var(--accent-color);
        }
        
        .btn-primary:hover {
          background: var(--accent-dark);
          transform: translateY(-2px);
        }
        
        .btn-outline {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-color);
        }
        
        .btn-outline:hover {
          background: var(--button-hover-bg);
          transform: translateY(-2px);
        }
        
        .technologies h4 {
          margin: 0 0 12px;
          font-size: 1.1rem;
          color: var(--heading-color);
        }
        
        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .tech-tag {
          background: var(--tag-bg);
          color: var(--tag-text);
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.8rem;
        }
        
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          
          .modal-content {
            flex-direction: column;
          }
          
          .modal-image {
            height: 200px;
          }
          
          .modal-details {
            padding: 20px;
          }
          
          .project-links {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
            justify-content: center;
          }
        }
        
        @media (max-width: 480px) {
          .category-tabs {
            justify-content: flex-start;
            overflow-x: auto;
            padding-bottom: 10px;
            -webkit-overflow-scrolling: touch;
          }
          
          .category-tab {
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsApp;