/**
 * Main JavaScript for Tayler.id Portfolio Website
 * Handles animations, interactions, and the AI assistant integration
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize variables
  let logoParticleSystem;
  // let aiAssistant; // aiAssistant variable is declared but not used globally. Removed.
  
  // Initialize the site
  initSite();
  initializePasswordProtection(); // Call password protection after site init
  
  /**
   * Initialize the site
   */
  function initSite() {
    // Show preloader
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 2000);
    
    // Initialize logo particle system in preloader
    initPreloaderLogo();
    
    // Initialize main logo particle system
    initLogoParticleSystem();
    
    // Initialize AI assistant
    initAIAssistant();
    
    // Initialize animations
    initAnimations();
    
    // Initialize scroll effects
    initScrollEffects();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize theme toggle
    initThemeToggle();
  }
  
  /**
   * Initialize the preloader logo
   */
  function initPreloaderLogo() {
    // Simple animation for preloader logo
    const preloaderLogo = document.getElementById('preloader-logo');
    if (!preloaderLogo) return;
    
    // Create a simple canvas animation for the preloader
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 150;
    preloaderLogo.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: Math.random() * 3 + 1,
        color: i % 2 === 0 ? '#0D4A33' : '#1D976C',
        velocity: {
          x: (Math.random() - 0.5) * 3,
          y: (Math.random() - 0.5) * 3
        }
      });
    }
    
    // Animate particles
    function animatePreloader() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.velocity.x *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.velocity.y *= -1;
        }
        
        // Gradually move towards center
        particle.velocity.x += (canvas.width / 2 - particle.x) * 0.0005;
        particle.velocity.y += (canvas.height / 2 - particle.y) * 0.0005;
      });
      
      requestAnimationFrame(animatePreloader);
    }
    
    animatePreloader();
  }
  
  /**
   * Initialize the logo particle system
   */
  function initLogoParticleSystem() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
      console.error('Three.js is not loaded');
      return;
    }
    
    // Check if container exists
    const container = document.getElementById('logo-particle-container');
    if (!container) {
      // console.error('Logo particle container not found'); // This logs on case study pages, so commenting out for now
      return;
    }
    
    // Initialize the logo particle system
    logoParticleSystem = new LogoParticleSystem(
      'logo-particle-container',
      'assets/images/logo.png' // Path relative to index.html
    );
    
    // Make it globally accessible for theme switching
    window.logoParticleSystem = logoParticleSystem;
    
    // Initialize the AI assistant avatar
    const aiAssistantAvatar = document.getElementById('ai-assistant-avatar');
    if (aiAssistantAvatar) {
      // Create a smaller version of the particle system for the AI assistant
      const canvas = document.createElement('canvas');
      canvas.width = 50;
      canvas.height = 50;
      aiAssistantAvatar.appendChild(canvas);
      
      // We'll use a simpler version for the avatar
      const ctx = canvas.getContext('2d');
      
      function drawAvatarLogo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw a gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0D4A33');
        gradient.addColorStop(1, '#1D976C');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw pulsing circle
        const time = Date.now() * 0.001;
        const size = 20 + Math.sin(time) * 5;
        
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
        
        requestAnimationFrame(drawAvatarLogo);
      }
      
      drawAvatarLogo();
    }
  }
  
  /**
   * Initialize the AI assistant
   */
  function initAIAssistant() {
    // Get AI assistant elements
    const aiAssistantElement = document.querySelector('.ai-assistant');
    const aiAssistantToggle = document.querySelector('.ai-assistant__toggle');
    const aiAssistantClose = document.querySelector('.ai-assistant__close');
    const aiAssistantInput = document.querySelector('.ai-assistant__input-field');
    const aiAssistantSend = document.querySelector('.ai-assistant__send');
    const aiAssistantMessages = document.querySelector('.ai-assistant__messages');
    
    if (!aiAssistantElement || !aiAssistantToggle || !aiAssistantClose || 
        !aiAssistantInput || !aiAssistantSend || !aiAssistantMessages) {
      // console.error('AI assistant elements not found'); // Can be missing on some pages
      return;
    }
    
    // Toggle AI assistant panel
    aiAssistantToggle.addEventListener('click', () => {
      aiAssistantElement.classList.toggle('active');
      
      // Update particle system mode
      if (logoParticleSystem) {
        if (aiAssistantElement.classList.contains('active')) {
          logoParticleSystem.setMode('active');
        } else {
          logoParticleSystem.setMode('idle');
        }
      }
    });
    
    // Close AI assistant panel
    aiAssistantClose.addEventListener('click', () => {
      aiAssistantElement.classList.remove('active');
      
      // Update particle system mode
      if (logoParticleSystem) {
        logoParticleSystem.setMode('idle');
      }
    });
    
    // Send message
    function sendMessage() {
      const message = aiAssistantInput.value.trim();
      if (!message) return;
      
      // Add user message to chat
      addMessage(message, 'user');
      
      // Clear input
      aiAssistantInput.value = '';
      
      // Update particle system mode for user's message
      if (logoParticleSystem) {
        logoParticleSystem.setMode('reacting', message);
        // Transition to 'speaking' to indicate processing/AI response generation
        logoParticleSystem.setMode('speaking');
      }
      
      // Call the backend API
      fetch('https://backend-polished-glitter-7421.fly.dev/api/chat', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errData => {
            throw new Error(errData.error || `HTTP error! status: ${response.status}`);
          }).catch(() => {
            throw new Error(`HTTP error! status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.response) {
          addMessage(data.response, 'assistant');
        } else {
          addMessage("Sorry, I received an unexpected response.", 'assistant');
        }
      })
      .catch(error => {
        console.error('Error calling chat API:', error);
        addMessage(`Sorry, an error occurred: ${error.message}`, 'assistant');
      })
      .finally(() => {
        if (logoParticleSystem) {
          if (aiAssistantElement.classList.contains('active')) {
            logoParticleSystem.setMode('active');
          } else {
            logoParticleSystem.setMode('idle');
          }
        }
      });
    }
    
    // Add message to chat
    function addMessage(text, sender) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('ai-assistant__message');
      messageElement.classList.add(`ai-assistant__message--${sender}`);
      
      const messageText = document.createElement('p');
      messageText.textContent = text;
      
      messageElement.appendChild(messageText);
      aiAssistantMessages.appendChild(messageElement);
      
      aiAssistantMessages.scrollTop = aiAssistantMessages.scrollHeight;
    }
        
    aiAssistantSend.addEventListener('click', sendMessage);
    
    aiAssistantInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  /**
   * Initialize animations
   */
  function initAnimations() {
    if (typeof gsap === 'undefined') {
      console.error('GSAP is not loaded');
      return;
    }
    
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroCta = document.querySelector('.hero__cta');
    
    if (heroTitle && heroSubtitle && heroCta) {
      const heroTimeline = gsap.timeline({ delay: 0.5 });
      heroTimeline
        .from(heroTitle.querySelectorAll('.hero__title-line'), { y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' })
        .from(heroSubtitle, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from(heroCta.children, { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.4');
    }
    
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
      gsap.from(header, { scrollTrigger: { trigger: header, start: 'top 80%', toggleActions: 'play none none none' }, y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' });
    });
  }
  
  /**
   * Initialize scroll effects
   */
  function initScrollEffects() {
    if (typeof ScrollTrigger === 'undefined') {
      // console.error('GSAP ScrollTrigger is not loaded'); // Can be missing on some pages
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    
    const header = document.querySelector('.header');
    if (header) {
      let lastScrollTop = 0;
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          header.classList.add('hidden');
        } else {
          header.classList.remove('hidden');
        }
        lastScrollTop = scrollTop;
      });
    }
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 80%', toggleActions: 'play none none none' }, y: 50, opacity: 0, duration: 0.8, delay: index * 0.2, ease: 'power3.out' });
    });
    
    const skillsCategories = document.querySelectorAll('.skills__category');
    skillsCategories.forEach((category, index) => {
      gsap.from(category, { scrollTrigger: { trigger: category, start: 'top 80%', toggleActions: 'play none none none' }, y: 50, opacity: 0, duration: 0.8, delay: index * 0.2, ease: 'power3.out' });
    });
    
    const caseStudies = document.querySelectorAll('.case-study'); // For the list on index.html
    caseStudies.forEach((study, index) => {
      gsap.from(study, { scrollTrigger: { trigger: study, start: 'top 80%', toggleActions: 'play none none none' }, y: 50, opacity: 0, duration: 0.8, delay: index * 0.2, ease: 'power3.out' });
    });
  }
  
  /**
   * Initialize navigation
   */
  function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section[id]'); // Ensure sections have IDs
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Adjusted offset
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          const currentLink = document.querySelector(`.nav__link[href$="#${sectionId}"]`); // More robust selector
          if (currentLink) currentLink.classList.add('active');
        }
      });
    });
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        // Check if it's an internal page link or an external/different page link
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
          }
        }
        // Allow default behavior for links to other pages (e.g. work/case-study.html)
        if (nav.classList.contains('active')) { // Close mobile menu on click
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
      });
    });
    
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
      });
    }
  }
  
  /**
   * Initialize form validation
   */
  function initFormValidation() {
    const contactForm = document.querySelector('.contact__form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameField = contactForm.querySelector('#name');
        const emailField = contactForm.querySelector('#email');
        const subjectField = contactForm.querySelector('#subject');
        const messageField = contactForm.querySelector('#message');
        let isValid = true;

        // Validation logic (showError, clearError, isValidEmail assumed to be defined elsewhere or added)
        if (!nameField.value.trim()) { isValid = false; /* showError(nameField, '...'); */ } else { /* clearError(nameField); */ }
        if (!emailField.value.trim()) { isValid = false; /* showError(emailField, '...'); */ } else if (typeof isValidEmail === 'function' && !isValidEmail(emailField.value.trim())) { isValid = false; /* showError(emailField, '...'); */ } else { /* clearError(emailField); */ }
        if (!subjectField.value.trim()) { isValid = false; /* showError(subjectField, '...'); */ } else { /* clearError(subjectField); */ }
        if (!messageField.value.trim()) { isValid = false; /* showError(messageField, '...'); */ } else { /* clearError(messageField); */ }
        
        if (isValid) {
          const formContainer = contactForm.parentElement;
          if (formContainer) {
            formContainer.innerHTML = `<div class="contact__success"><h3>Message Sent!</h3><p>Thank you for your message. I'll get back to you as soon as possible.</p></div>`;
          }
        }
      });
    }
    // isValidEmail and error display helpers would be here or in a separate utility file
    // For brevity, not re-including full showError/clearError/isValidEmail if they are complex
  }

  /**
   * Initialize Theme Toggle
   */
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle button state
    updateThemeToggleState(savedTheme);
    
    // Add click handler
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Update theme
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Update toggle button state
      updateThemeToggleState(newTheme);
      
      // Directly update particle system colors with slight delay to ensure DOM is updated
      setTimeout(() => {
        if (window.logoParticleSystem) {
          console.log('Updating particle colors to theme:', newTheme);
          window.logoParticleSystem.updateThemeColors();
          window.logoParticleSystem.updateParticleColors();
        } else {
          console.log('logoParticleSystem not found on window');
        }
      }, 10);
    });
  }
  
  /**
   * Update theme toggle button state
   */
  function updateThemeToggleState(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const sunIcon = themeToggle.querySelector('.theme-toggle__sun');
    const moonIcon = themeToggle.querySelector('.theme-toggle__moon');
    
    if (theme === 'dark') {
      themeToggle.classList.add('theme-toggle--dark');
      if (sunIcon) sunIcon.style.opacity = '1';
      if (moonIcon) moonIcon.style.opacity = '0';
    } else {
      themeToggle.classList.remove('theme-toggle--dark');
      if (sunIcon) sunIcon.style.opacity = '0';
      if (moonIcon) moonIcon.style.opacity = '1';
    }
  }
  
  /**
   * Initialize Password Protection
   */
  function initializePasswordProtection() {
    const correctPassword = "taylerID2025"; 
    const overlay = document.getElementById('password-overlay');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const passwordError = document.getElementById('password-error');
    const mainContentElements = Array.from(document.body.children).filter(el => 
        !el.classList.contains('password-overlay') && !el.classList.contains('preloader')
    );

    function showMainContent() {
      if (overlay) overlay.style.display = 'none';
      mainContentElements.forEach(el => {
        el.classList.remove('content-hidden-by-password');
      });
    }
    
    if (sessionStorage.getItem('isPasswordVerified') === 'true') {
      showMainContent();
      return; 
    } else {
      // Content is hidden by CSS class 'content-hidden-by-password' on body or main container
      // Overlay is shown by default CSS if content is hidden
      if (overlay) overlay.style.display = 'flex'; // Ensure overlay is visible
    }

    if (!overlay || !passwordInput || !passwordSubmit || !passwordError) {
      console.warn('Password protection UI elements not found. Site may remain locked.');
      // Potentially hide everything if prompt cannot be shown
      document.body.style.visibility = 'hidden'; // Drastic fallback
      alert('Error: Password prompt cannot be displayed.');
      return;
    }
    
    passwordError.style.display = 'none'; // Ensure error is hidden initially

    const handlePasswordSubmit = () => {
      if (passwordInput.value === correctPassword) {
        sessionStorage.setItem('isPasswordVerified', 'true');
        showMainContent();
        passwordError.style.display = 'none';
      } else {
        passwordError.style.display = 'block';
        passwordInput.value = '';
        passwordInput.focus();
      }
    };
    
    passwordSubmit.addEventListener('click', handlePasswordSubmit);

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handlePasswordSubmit();
        }
    });
  }

});

// OnboardIQ Demo Launcher Function (Global)
function launchOnboardIQDemo() {
  const btn = document.getElementById('onboard-iq-demo-btn');
  const originalText = btn.innerHTML;
  
  // Set loading state
  btn.innerHTML = '⏳ Checking demo server...';
  btn.disabled = true;
  
  // Check if demo server is running
  fetch('http://localhost:3333/health')
    .then(response => {
      if (response.ok) {
        // Server is running, open demo
        btn.innerHTML = '🚀 Launching demo...';
        setTimeout(() => {
          window.open('http://localhost:3333', '_blank');
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 1000);
      } else {
        showDemoServerError(btn, originalText);
      }
    })
    .catch(error => {
      // Server likely not running
      showDemoServerError(btn, originalText);
    });
}

function showDemoServerError(btn, originalText) {
  // Create modal for demo server instructions
  const modal = document.createElement('div');
  modal.id = 'demo-server-modal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  `;
  
  modal.innerHTML = `
    <div style="
      background: white;
      border-radius: 16px;
      padding: 2rem;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    ">
      <h3 style="color: #ef4444; margin-bottom: 1rem; font-size: 1.5rem;">
        ⚠️ Demo Server Required
      </h3>
      <p style="margin-bottom: 1.5rem; color: #666; line-height: 1.6;">
        The OnboardIQ demo server needs to be running to experience the live platform.
        This showcases the actual working implementation with contact management and platform features.
      </p>
      <div style="
        background: #f8fafc;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;
        text-align: left;
        border-left: 4px solid #1D976C;
      ">
        <strong style="color: #1D976C;">To start the demo server:</strong><br>
        <code style="
          background: #e2e8f0;
          padding: 4px 8px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.875rem;
          display: block;
          margin: 0.5rem 0;
        ">cd onboard-iq-demo && npm start</code>
        <small style="color: #666;">Then refresh and try again</small>
      </div>
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button onclick="launchOnboardIQDemo(); closeDemoModal();" style="
          background: linear-gradient(135deg, #1D976C, #059669);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        ">🔄 Try Again</button>
        <button onclick="closeDemoModal()" style="
          background: transparent;
          color: #1D976C;
          border: 2px solid #1D976C;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        ">Close</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Reset button
  btn.innerHTML = originalText;
  btn.disabled = false;
}

function closeDemoModal() {
  const modal = document.getElementById('demo-server-modal');
  if (modal) {
    modal.remove();
  }
}
