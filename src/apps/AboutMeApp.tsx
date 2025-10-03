import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCode, FaServer, FaDatabase, FaRobot } from 'react-icons/fa';

const SkillProgress = ({ skill, percentage, icon, delay = 0 }: { skill: string, percentage: number, icon: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      className="skill-progress-item"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.6 }}
    >
      <div className="skill-header">
        <div className="skill-info">
          {icon && <span className="skill-icon">{icon}</span>}
          <span className="skill-name">{skill}</span>
        </div>
        <span className="skill-percentage">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            delay: (delay + 200) / 1000,
            duration: 1.2,
            ease: "easeOut"
          }}
        />
      </div>
    </motion.div>
  );
};


const AboutMeApp: React.FC = () => {
  const skills = [
    { name: 'Frontend', level: 90, icon: <FaCode />, color: '#3498db' },
    { name: 'Backend', level: 85, icon: <FaServer />, color: '#2ecc71' },
    { name: 'Database', level: 80, icon: <FaDatabase />, color: '#e74c3c' },
    { name: 'AI/ML', level: 75, icon: <FaRobot />, color: '#9b59b6' },
  ];

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <FaTwitter />, url: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: <FaEnvelope />, url: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <div className="window-content">
      <div className="window-body">
        <div className="about-me-container">
          <motion.div 
            className="profile-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="avatar">IM</div>
            <div className="profile-info">
              <h2>Ibrahim Musa</h2>
              <p className="title">Senior Software Engineer</p>
            </div>
          </motion.div>

          <div className="content-section">
            <motion.div 
              className="bio-section"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3>About Me</h3>
              <p>
                Hello! I'm a passionate software engineer with expertise in building modern web applications.
                I love solving complex problems and creating intuitive user experiences. With several years of
                experience in the industry, I've worked on various projects ranging from small startups to
                large-scale enterprise applications.
              </p>
              <p>
                When I'm not coding, you can find me contributing to open-source projects, writing technical
                articles, or exploring new technologies. I'm always eager to learn and share my knowledge
                with the developer community.
              </p>
            </motion.div>

            <motion.div 
              className="skills-section"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3>Skills</h3>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <SkillProgress
                    key={skill.name}
                    skill={skill.name}
                    percentage={skill.level}
                    icon={skill.icon}
                    delay={index * 150}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="social-section"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3>Connect With Me</h3>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-label">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .window-content {
          height: 100%;
          overflow-y: auto;
          padding: 16px;
          color: var(--text-color);
        }
        
        .window-body { height: 100%; }
        .about-me-container { max-width: 900px; margin: 0 auto; padding: 20px; }
        .profile-header { display: flex; align-items: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color); }
        .avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #3498db, #9b59b6); display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: bold; margin-right: 20px; }
        .profile-info h2 { margin: 0 0 5px; font-size: 1.8rem; color: var(--heading-color); }
        .title { margin: 0; color: var(--text-muted); font-size: 1rem; }
        .content-section { display: grid; gap: 30px; }
        h3 { margin: 0 0 15px; font-size: 1.3rem; color: var(--heading-color); position: relative; padding-bottom: 8px; }
        h3::after { content: ''; position: absolute; bottom: 0; left: 0; width: 50px; height: 3px; background: var(--accent-color); border-radius: 2px; }
        p { line-height: 1.6; margin: 0 0 15px; color: var(--text-color); }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px; }
        .skill-item { margin-bottom: 15px; }
        .skill-header { display: flex; align-items: center; margin-bottom: 8px; }
        .skill-icon { margin-right: 10px; font-size: 1.2rem; }
        .skill-name { flex: 1; font-weight: 500; color: var(--text-color); }
        .skill-percent { color: var(--text-muted); font-size: 0.9rem; }
        .skill-bar { height: 6px; background: var(--border-color); border-radius: 3px; overflow: hidden; }
        .skill-level { height: 100%; border-radius: 3px; }
        .social-links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }
        .social-link { display: inline-flex; align-items: center; padding: 8px 16px; background: var(--button-bg); color: var(--button-text); text-decoration: none; border-radius: 6px; transition: all 0.2s ease; font-size: 0.9rem; }
        .social-link:hover { background: var(--button-hover-bg); transform: translateY(-2px); }
        .social-icon { margin-right: 8px; font-size: 1rem; }
        @media (max-width: 768px) { .profile-header { flex-direction: column; text-align: center; } .avatar { margin: 0 0 15px; } .skills-grid { grid-template-columns: 1fr; } .social-links { justify-content: center; } }
      `}</style>
    </div>
  );
};

export default AboutMeApp;