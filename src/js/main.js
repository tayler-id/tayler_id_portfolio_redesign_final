/**
 * Main JavaScript for Tayler.id Portfolio Website
 * Handles animations, interactions, and the AI assistant integration
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize variables
  let logoParticleSystem;
  let aiAssistant;
  
  // Initialize the site
  initSite();
  
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
        color: i % 2 === 0 ? '#ff4d5a' : '#00e5ff',
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
      console.error('Logo particle container not found');
      return;
    }
    
    // Initialize the logo particle system
    logoParticleSystem = new LogoParticleSystem(
      'logo-particle-container',
      'assets/images/logo.png'
    );
    
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
        gradient.addColorStop(0, '#ff4d5a');
        gradient.addColorStop(1, '#00e5ff');
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
      console.error('AI assistant elements not found');
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
      fetch('https://backend-polished-glitter-7421.fly.dev/api/chat', { // Updated to Fly.io URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
      })
      .then(response => {
        if (!response.ok) {
          // Try to parse error message from backend if available
          return response.json().then(errData => {
            throw new Error(errData.error || `HTTP error! status: ${response.status}`);
          }).catch(() => {
            // Fallback if error response is not JSON
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
        // After API call finishes (success or error), set mode based on panel state
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
      
      // Scroll to bottom
      aiAssistantMessages.scrollTop = aiAssistantMessages.scrollHeight;
    }
    
    // Generate AI response (simple implementation)
    function generateAIResponse(message) {
      // Convert to lowercase for easier matching
      const lowerMessage = message.toLowerCase();
      
      // Simple response logic
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "Hello! I'm Tayler's AI assistant. How can I help you today?";
      } else if (lowerMessage.includes('help')) {
        return "I can help you learn more about Tayler's work, skills, or projects. What would you like to know?";
      } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
        return "Tayler has worked on several impressive projects, including an AI-driven health app, enterprise design systems, and UX analytics tools. You can find more details in the Projects section.";
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('hire')) {
        return "You can contact Tayler via email at hello@tayler.id or use the contact form in the Contact section.";
      } else if (lowerMessage.includes('skill') || lowerMessage.includes('experience')) {
        return "Tayler is a Senior UX Designer & Frontend Developer with over 8 years of experience, specializing in AI-driven interfaces, design systems, and health applications.";
      } else {
        return "Thanks for your message! I'll make sure Tayler gets it. Is there anything specific about UX design or frontend development you'd like to know?";
      }
    }
    
    // Send message on button click
    aiAssistantSend.addEventListener('click', sendMessage);
    
    // Send message on Enter key
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
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
      console.error('GSAP is not loaded');
      return;
    }
    
    // Hero section animations
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroCta = document.querySelector('.hero__cta');
    
    if (heroTitle && heroSubtitle && heroCta) {
      const heroTimeline = gsap.timeline({ delay: 0.5 });
      
      heroTimeline
        .from(heroTitle.querySelectorAll('.hero__title-line'), {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        })
        .from(heroSubtitle, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.4')
        .from(heroCta.children, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        }, '-=0.4');
    }
    
    // Animate section headers on scroll
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
  }
  
  /**
   * Initialize scroll effects
   */
  function initScrollEffects() {
    // Check if GSAP ScrollTrigger is loaded
    if (typeof ScrollTrigger === 'undefined') {
      console.error('GSAP ScrollTrigger is not loaded');
      return;
    }
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Header show/hide on scroll
    const header = document.querySelector('.header');
    
    if (header) {
      let lastScrollTop = 0;
      
      window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down
          header.classList.add('hidden');
        } else {
          // Scrolling up
          header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
      });
    }
    
    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out'
      });
    });
    
    // Animate skills categories on scroll
    const skillsCategories = document.querySelectorAll('.skills__category');
    
    skillsCategories.forEach((category, index) => {
      gsap.from(category, {
        scrollTrigger: {
          trigger: category,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out'
      });
    });
    
    // Animate case studies on scroll
    const caseStudies = document.querySelectorAll('.case-study');
    
    caseStudies.forEach((study, index) => {
      gsap.from(study, {
        scrollTrigger: {
          trigger: study,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power3.out'
      });
    });
  }
  
  /**
   * Initialize navigation
   */
  function initNavigation() {
    // Get navigation elements
    const navLinks = document.querySelectorAll('.nav__link');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    // Add active class to nav links on scroll
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      
      // Get all sections
      const sections = document.querySelectorAll('section');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Remove active class from all links
          navLinks.forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active class to current section link
          const currentLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
          if (currentLink) {
            currentLink.classList.add('active');
          }
        }
      });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Mobile menu toggle
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
        
        // Get form fields
        const nameField = contactForm.querySelector('#name');
        const emailField = contactForm.querySelector('#email');
        const subjectField = contactForm.querySelector('#subject');
        const messageField = contactForm.querySelector('#message');
        
        // Validate form fields
        let isValid = true;
        
        if (!nameField.value.trim()) {
          isValid = false;
          showError(nameField, 'Please enter your name');
        } else {
          clearError(nameField);
        }
        
        if (!emailField.value.trim()) {
          isValid = false;
          showError(emailField, 'Please enter your email');
        } else if (!isValidEmail(emailField.value.trim())) {
          isValid = false;
          showError(emailField, 'Please enter a valid email');
        } else {
          clearError(emailField);
        }
        
        if (!subjectField.value.trim()) {
          isValid = false;
          showError(subjectField, 'Please enter a subject');
        } else {
          clearError(subjectField);
        }
        
        if (!messageField.value.trim()) {
          isValid = false;
          showError(messageField, 'Please enter a message');
        } else {
          clearError(messageField);
        }
        
        // If form is valid, submit it
        if (isValid) {
          // In a real implementation, this would submit the form to a server
          // For now, we'll just show a success message
          const formContainer = contactForm.parentElement;
          
          if (formContainer) {
            formContainer.innerHTML = `
              <div class="contact__success">
                <h3>Message Sent!</h3>
                <p>Thank you for your message. I'll get back to you as soon as possible.</p>
              </div>
            `;
          }
        }
      });
    }
    
    // Helper functions for form validation
    function showError(field, message) {
      // Remove existing error message
      clearError(field);
      
      // Add error class to field
      field.classList.add('error');
      
      // Create error message
      const errorElement = document.createElement('div');
      errorElement.classList.add('form-error');
      errorElement.textContent = message;
      
      // Insert error message after field
      field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    function clearError(field) {
      // Remove error class from field
      field.classList.remove('error');
      
      // Remove error message
      const errorElement = field.parentNode.querySelector('.form-error');
      if (errorElement) {
        errorElement.remove();
      }
    }
    
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
});
