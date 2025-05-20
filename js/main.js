/**
 * Main JavaScript for Tayler.id Portfolio Website
 * 
 * This script handles the main functionality of the website including:
 * - Loading screen animations
 * - Smooth scrolling
 * - Navigation interactions
 * - AI Assistant functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize AI Assistant
    initAIAssistant();
});

/**
 * Initialize loading screen animations
 */
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingText = document.querySelector('.loading-text');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Update text
            loadingText.textContent = 'Ready!';
            
            // Hide loading screen after a short delay
            setTimeout(() => {
                gsap.to(loadingScreen, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        loadingScreen.style.display = 'none';
                        initPageAnimations();
                    }
                });
            }, 500);
        }
        
        // Update loading bar
        loadingBar.style.width = `${progress}%`;
    }, 150);
}

/**
 * Initialize page animations after loading
 */
function initPageAnimations() {
    // Animate header
    gsap.from('header', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Animate hero content
    const heroTitle = document.querySelectorAll('.hero-title-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from(heroTitle, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        })
        .from(heroSubtitle, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4')
        .from(heroCta, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.4');
    
    // Animate AI assistant toggle
    gsap.from('.ai-assistant-toggle', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
        ease: 'back.out(1.7)'
    });
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize AI Assistant functionality
 */
function initAIAssistant() {
    const aiToggle = document.querySelector('.ai-assistant-toggle');
    const aiPanel = document.querySelector('.ai-assistant-panel');
    const closeButton = document.querySelector('.close-assistant');
    const input = document.querySelector('.ai-assistant-input input');
    const sendButton = document.querySelector('.send-message');
    const messagesContainer = document.querySelector('.ai-assistant-messages');
    
    // Toggle AI panel
    aiToggle.addEventListener('click', () => {
        aiPanel.classList.toggle('active');
        
        if (aiPanel.classList.contains('active')) {
            input.focus();
        }
    });
    
    // Close AI panel
    closeButton.addEventListener('click', () => {
        aiPanel.classList.remove('active');
    });
    
    // Handle sending messages
    const sendMessage = () => {
        const message = input.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            
            // Clear input
            input.value = '';
            
            // Simulate AI thinking
            setTimeout(() => {
                // Add AI response
                handleAIResponse(message);
            }, 1000);
        }
    };
    
    // Send button click
    sendButton.addEventListener('click', sendMessage);
    
    // Enter key press
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.innerHTML = `<p>${text}</p>`;
        messagesContainer.appendChild(messageElement);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Handle AI response
    function handleAIResponse(userMessage) {
        // Simple response logic (would be replaced with actual AI in production)
        let response = '';
        
        // Convert to lowercase for easier matching
        const message = userMessage.toLowerCase();
        
        // Check for common questions/keywords
        if (message.includes('hello') || message.includes('hi')) {
            response = "Hello! I'm Tayler's AI assistant. How can I help you today?";
        } else if (message.includes('contact') || message.includes('get in touch')) {
            response = "You can contact Tayler via email at contact@tayler.id or use the contact form in the Contact section.";
        } else if (message.includes('project') || message.includes('work')) {
            response = "Tayler specializes in UX Design and Frontend Development, with a focus on AI-driven interfaces and health applications. Check out the Projects section to see examples of recent work.";
        } else if (message.includes('skill') || message.includes('expertise')) {
            response = "Tayler's core skills include UX Design (user research, information architecture, prototyping), Frontend Development (HTML/CSS/JS, responsive design), and AI Integration (conversational interfaces, recommendation systems).";
        } else if (message.includes('experience') || message.includes('background')) {
            response = "Tayler has over 8 years of experience creating intuitive, accessible, and engaging digital experiences, with a particular focus on AI-driven interfaces, design systems, and health applications.";
        } else if (message.includes('design') || message.includes('ux')) {
            response = "Tayler's design approach combines user-centered principles with clean, efficient code to build products that people love to use. This includes user research, information architecture, interaction design, prototyping, and accessibility considerations.";
        } else {
            response = "Thanks for your message! I'll make sure Tayler gets it. In the meantime, feel free to explore the portfolio or ask me anything specific about Tayler's work and expertise.";
        }
        
        // Add AI response
        addMessage(response, 'assistant');
    }
    
    // Add initial welcome message
    addMessage("Hi there! I'm Tayler's AI assistant. How can I help you today?", 'assistant');
}

// Handle scroll events for animations
window.addEventListener('scroll', () => {
    // Add scroll-based animations here
    // This will be expanded as more sections are added
});

// Handle resize events
window.addEventListener('resize', () => {
    // Handle responsive adjustments here
});

// Remember returning visitors
document.addEventListener('DOMContentLoaded', () => {
    // Check if user has visited before
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    
    if (hasVisitedBefore) {
        // Custom welcome for returning visitors
        const aiMessages = document.querySelector('.ai-assistant-messages');
        aiMessages.innerHTML = '';
        
        const welcomeBackMessage = document.createElement('div');
        welcomeBackMessage.classList.add('message', 'assistant');
        welcomeBackMessage.innerHTML = '<p>Welcome back! It\'s great to see you again. How can I help you today?</p>';
        aiMessages.appendChild(welcomeBackMessage);
    } else {
        // Set flag for future visits
        localStorage.setItem('hasVisitedBefore', 'true');
    }
});
