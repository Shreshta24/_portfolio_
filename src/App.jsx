import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [birdPosition, setBirdPosition] = useState({ x: -100, y: 200 });
  const [wingsFlapping, setWingsFlapping] = useState(false);
  const [showName, setShowName] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [birdSize, setBirdSize] = useState(1);

  useEffect(() => {
    // Start animation sequence
    const sequence = async () => {
      // Step 1: Bird flies in from left to center
      await flyTo(400, 200, 2000);
      setAnimationStep(1);
      
      // Step 2: Bird flutters wings
      setWingsFlapping(true);
      setBirdSize(1.2); // Slightly enlarge when fluttering
      await wait(1500);
      
      // Step 3: Show name
      setShowName(true);
      await wait(2000);
      
      // Step 4: Fly to right side
      setWingsFlapping(false);
      setBirdSize(1);
      setAnimationStep(2);
      await flyTo(1200, 200, 1500);
      
      // Step 5: Wait and show portfolio
      await wait(1000);
      setShowPortfolio(true);
    };

    setTimeout(() => {
      sequence();
    }, 500);
  }, []);

  const flyTo = async (targetX, targetY, duration) => {
    const startX = birdPosition.x;
    const startY = birdPosition.y;
    const startTime = Date.now();
    
    return new Promise(resolve => {
      const animate = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Smooth easing
        const ease = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        
        setBirdPosition({
          x: startX + (targetX - startX) * ease,
          y: startY + (targetY - startY) * ease
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };
      
      animate();
    });
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const restartAnimation = () => {
    setBirdPosition({ x: -100, y: 200 });
    setWingsFlapping(false);
    setShowName(false);
    setAnimationStep(0);
    setShowPortfolio(false);
    setBirdSize(1);
    
    setTimeout(() => {
      const sequence = async () => {
        await flyTo(400, 200, 2000);
        setAnimationStep(1);
        setWingsFlapping(true);
        setBirdSize(1.2);
        await wait(1500);
        setShowName(true);
        await wait(2000);
        setWingsFlapping(false);
        setBirdSize(1);
        setAnimationStep(2);
        await flyTo(1200, 200, 1500);
        await wait(1000);
        setShowPortfolio(true);
      };
      sequence();
    }, 500);
  };

  return (
    <div className="portfolio-container">
      {/* Sky Background */}
      <div className="sky">
        {/* Animated Clouds */}
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
        <div className="sun"></div>
        
        {/* Flying Bird */}
        <div 
          className="bird-container"
          style={{
            transform: `translate(${birdPosition.x}px, ${birdPosition.y}px) scale(${birdSize})`,
          }}
        >
          {/* Bird Body */}
          <div className="bird-body">
            <div className="bird-head">
              <div className="bird-eye"></div>
              <div className="bird-beak"></div>
            </div>
            <div className="bird-tail"></div>
          </div>
          
          {/* Wings */}
          <div className={`bird-wing left ${wingsFlapping ? 'flapping' : ''}`}></div>
          <div className={`bird-wing right ${wingsFlapping ? 'flapping' : ''}`}></div>
        </div>

        {/* Name Display at Center */}
        {showName && (
          <div className="name-display">
            <h1 className="name">SHRESHTA BRIJESH</h1>
            <h2 className="title">Creative Developer</h2>
            <div className="name-sparkle"></div>
          </div>
        )}
      </div>

      {/* Portfolio Content */}
      {showPortfolio && (
        <div className="portfolio-content">
          <div className="portfolio-header">
            <div className="bird-in-corner">🐦</div>
            <h1>Welcome to My Creative Space</h1>
            <p className="subtitle">Where code meets creativity</p>
          </div>
          
          <div className="portfolio-grid">
            <div className="portfolio-card">
              <div className="card-icon">👨‍💻</div>
              <h3>About Me</h3>
              <p>I am a Computer Science student with knowledge in programming, databases, data science fundamentals, and web development. I have experience working with Java, Python, SQL, and building simple applications and user interfaces. I am a curious, disciplined learner who enjoys solving problems, writing clean code, and continuously improving my skills.</p>
            </div>
            
        <div className="portfolio-card">
          <div className="card-icon">⚡</div>
          <h3>Technical Skills</h3>

          <p><strong>Languages:</strong></p>
          <div className="skills-list span">
            <span>C</span>
            <span>Java</span>
            <span>Python</span>
            <span>JavaScript</span>
            <span>HTML</span>
            <span>CSS</span>
          </div>

          <p><strong>Frameworks & Libraries:</strong></p>
          <div className="skills-list span">
            <span>React</span>
            <span>Node.js</span>
            <span>Express</span>
            <span>Flask</span>
            <span>SQLAlchemy</span>
          </div>

          <p><strong>Databases:</strong></p>
          <div className="skills-list span">
            <span>SQLite</span>
            <span>MySQL</span>
            <span>MongoDB</span>
            <span>Oracle</span>
          </div>
        </div>

            
            <div className="portfolio-card">
  <div className="card-icon">🚀</div>
  <h3>Projects</h3>

  <div className="projects-list">
    <div className="project-item">
      <h4>Real-Time Chat Application</h4>
      <p>Built using WebSockets and Node.js for instant messaging</p>
    </div>

    <div className="project-item">
      <h4>Gesture-Controlled Carnatic Swara Player</h4>
      <p>Hand gesture recognition using OpenCV and MediaPipe</p>
    </div>

    <div className="project-item">
      <h4>Educational Platform</h4>
      <p>Web-based platform for managing learning content and users</p>
    </div>

    <div className="project-item">
      <h4>Hospital Management System</h4>
      <p>Backend system using Flask and SQLAlchemy for patient and staff management</p>
    </div>

    <div className="project-item">
      <h4>Vehicle Parking Management App</h4>
      <p>Flask-based application with SQLAlchemy for parking slot tracking</p>
    </div>

    <div className="project-item">
      <h4>Netflix Movie Prediction</h4>
      <p>Data analysis and prediction using Pandas and NumPy</p>
    </div>
  </div>
</div>

<div className="portfolio-card">
  <div className="card-icon">🎓</div>
  <h3>Internships & Certifications</h3>

  <div className="projects-list">
    <div className="project-item">
      <h4>IBM SkillsBuild – Winter Certification Program</h4>
      <p>Data Analytics: Turning Data into Decisions using Python</p>
    </div>

    <div className="project-item">
      <h4>Proxenix – Web Development Internship</h4>
      <p>2-month internship focused on frontend and backend web technologies</p>
    </div>

    <div className="project-item">
      <h4>Techmagi – Data Science & Machine Learning Internship</h4>
      <p>Worked on data analysis, model building, and real-world datasets</p>
    </div>
  </div>
</div>

            
            <div className="portfolio-card">
              <div className="card-icon">📱</div>
              <h3>Contact</h3>
              <div className="contact-info">
                <p>shreshta.brijesh@gmail.com</p>
                <p>+91 9961270451</p>
                <div className="social-links">
                  <span>
                      <a href="https://github.com/Shreshta24" target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </span>
                    <span>
                      <a href="https://www.linkedin.com/in/shreshta-brijesh-5b97192b4/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                      </a>
                    </span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}
      
    </div>
  );
};

export default App;