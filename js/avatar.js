/**
 * Interactive 3D Particle Avatar with AI Assistant
 * 
 * This script creates a WebGL-powered 3D particle system that forms an interactive
 * avatar which responds to user interaction and integrates with the AI assistant.
 */

class ParticleAvatar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        this.isActive = false;
        this.isListening = false;
        this.particleCount = 15000;
        this.particleSize = 2;
        
        this.colors = {
            primary: new THREE.Color(0xff4d5a),
            secondary: new THREE.Color(0x00e5ff),
            neutral: new THREE.Color(0xffffff)
        };
        
        this.init();
        this.setupEventListeners();
        this.animate();
    }
    
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 2000);
        this.camera.position.z = 800;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        
        // Create particle system
        this.createParticles();
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        this.scene.add(directionalLight);
    }
    
    createParticles() {
        // Create geometry
        this.geometry = new THREE.BufferGeometry();
        
        // Create particle positions, colors, and sizes
        this.positions = new Float32Array(this.particleCount * 3);
        this.colors = new Float32Array(this.particleCount * 3);
        this.sizes = new Float32Array(this.particleCount);
        this.originalPositions = new Float32Array(this.particleCount * 3);
        this.targetPositions = new Float32Array(this.particleCount * 3);
        
        // Create a sphere of particles
        const radius = 200;
        
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Create random positions within a sphere
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            this.positions[i3] = x;
            this.positions[i3 + 1] = y;
            this.positions[i3 + 2] = z;
            
            // Store original positions for animations
            this.originalPositions[i3] = x;
            this.originalPositions[i3 + 1] = y;
            this.originalPositions[i3 + 2] = z;
            
            // Set target positions (initially same as original)
            this.targetPositions[i3] = x;
            this.targetPositions[i3 + 1] = y;
            this.targetPositions[i3 + 2] = z;
            
            // Set colors (gradient from primary to secondary)
            const color = new THREE.Color();
            color.lerpColors(
                new THREE.Color(0xff4d5a),
                new THREE.Color(0x00e5ff),
                Math.random()
            );
            
            this.colors[i3] = color.r;
            this.colors[i3 + 1] = color.g;
            this.colors[i3 + 2] = color.b;
            
            // Set sizes (slightly randomized)
            this.sizes[i] = this.particleSize * (0.5 + Math.random());
        }
        
        // Add attributes to geometry
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));
        this.geometry.setAttribute('size', new THREE.BufferAttribute(this.sizes, 1));
        
        // Create material
        const material = new THREE.PointsMaterial({
            size: this.particleSize,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        // Create particle system
        this.particles = new THREE.Points(this.geometry, material);
        this.scene.add(this.particles);
    }
    
    setupEventListeners() {
        // Mouse move event
        window.addEventListener('mousemove', (event) => {
            this.targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
            this.targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Touch move event
        window.addEventListener('touchmove', (event) => {
            if (event.touches.length > 0) {
                this.targetMouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
                this.targetMouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
            }
        });
        
        // Resize event
        window.addEventListener('resize', () => {
            this.width = this.container.offsetWidth;
            this.height = this.container.offsetHeight;
            
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            
            this.renderer.setSize(this.width, this.height);
        });
        
        // AI assistant toggle event
        const aiToggle = document.querySelector('.ai-assistant-toggle');
        const aiPanel = document.querySelector('.ai-assistant-panel');
        
        aiToggle.addEventListener('click', () => {
            aiPanel.classList.toggle('active');
            this.isActive = aiPanel.classList.contains('active');
            
            if (this.isActive) {
                this.morphToActiveState();
            } else {
                this.morphToDefaultState();
            }
        });
        
        // AI assistant close event
        const closeButton = document.querySelector('.close-assistant');
        closeButton.addEventListener('click', () => {
            aiPanel.classList.remove('active');
            this.isActive = false;
            this.morphToDefaultState();
        });
        
        // AI assistant input events
        const input = document.querySelector('.ai-assistant-input input');
        const sendButton = document.querySelector('.send-message');
        
        input.addEventListener('focus', () => {
            this.isListening = true;
            this.pulseEffect();
        });
        
        input.addEventListener('blur', () => {
            this.isListening = false;
        });
        
        // Send message event
        const sendMessage = () => {
            const message = input.value.trim();
            if (message) {
                this.handleUserMessage(message);
                input.value = '';
            }
        };
        
        sendButton.addEventListener('click', sendMessage);
        
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    handleUserMessage(message) {
        // Add user message to chat
        const messagesContainer = document.querySelector('.ai-assistant-messages');
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('message', 'user');
        userMessageElement.innerHTML = `<p>${message}</p>`;
        messagesContainer.appendChild(userMessageElement);
        
        // Trigger avatar reaction
        this.reactToMessage();
        
        // Simulate AI response (in a real implementation, this would call an API)
        setTimeout(() => {
            this.respondToMessage(message);
        }, 1000);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    respondToMessage(message) {
        // Simple response logic (would be replaced with actual AI in production)
        let response = '';
        
        if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
            response = "Hello! I'm Tayler's AI assistant. How can I help you today?";
        } else if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('get in touch')) {
            response = "You can contact Tayler via email at contact@tayler.id or use the contact form in the Contact section.";
        } else if (message.toLowerCase().includes('project') || message.toLowerCase().includes('work')) {
            response = "Tayler specializes in UX Design and Frontend Development, with a focus on AI-driven interfaces and health applications. Check out the Projects section to see examples of recent work.";
        } else if (message.toLowerCase().includes('skill') || message.toLowerCase().includes('expertise')) {
            response = "Tayler's core skills include UX Design (user research, information architecture, prototyping), Frontend Development (HTML/CSS/JS, responsive design), and AI Integration (conversational interfaces, recommendation systems).";
        } else {
            response = "Thanks for your message! I'll make sure Tayler gets it. In the meantime, feel free to explore the portfolio or ask me anything specific about Tayler's work and expertise.";
        }
        
        // Add AI response to chat
        const messagesContainer = document.querySelector('.ai-assistant-messages');
        const aiMessageElement = document.createElement('div');
        aiMessageElement.classList.add('message', 'assistant');
        aiMessageElement.innerHTML = `<p>${response}</p>`;
        messagesContainer.appendChild(aiMessageElement);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    morphToActiveState() {
        // Transform particles into a more compact, attentive formation
        const radius = 150;
        const tightness = 1.5;
        
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Get original position
            const x = this.originalPositions[i3];
            const y = this.originalPositions[i3 + 1];
            const z = this.originalPositions[i3 + 2];
            
            // Calculate distance from center
            const distance = Math.sqrt(x * x + y * y + z * z);
            
            // Calculate new position (pulled toward center)
            this.targetPositions[i3] = x * (radius / distance) * tightness;
            this.targetPositions[i3 + 1] = y * (radius / distance) * tightness;
            this.targetPositions[i3 + 2] = z * (radius / distance) * tightness;
        }
    }
    
    morphToDefaultState() {
        // Return particles to their original positions
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            this.targetPositions[i3] = this.originalPositions[i3];
            this.targetPositions[i3 + 1] = this.originalPositions[i3 + 1];
            this.targetPositions[i3 + 2] = this.originalPositions[i3 + 2];
        }
    }
    
    reactToMessage() {
        // Create a ripple effect when user sends a message
        const positions = this.geometry.attributes.position.array;
        
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Get current position
            const x = positions[i3];
            const y = positions[i3 + 1];
            const z = positions[i3 + 2];
            
            // Calculate distance from center
            const distance = Math.sqrt(x * x + y * y + z * z);
            
            // Push particles outward temporarily
            this.targetPositions[i3] = x * 1.3;
            this.targetPositions[i3 + 1] = y * 1.3;
            this.targetPositions[i3 + 2] = z * 1.3;
        }
        
        // Return to active state after animation
        setTimeout(() => {
            if (this.isActive) {
                this.morphToActiveState();
            } else {
                this.morphToDefaultState();
            }
        }, 500);
    }
    
    pulseEffect() {
        // Create subtle pulsing effect when listening
        if (!this.isListening) return;
        
        const positions = this.geometry.attributes.position.array;
        const pulseFactor = 1.05 + 0.05 * Math.sin(Date.now() * 0.003);
        
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Get current target position
            const x = this.targetPositions[i3];
            const y = this.targetPositions[i3 + 1];
            const z = this.targetPositions[i3 + 2];
            
            // Apply pulse
            positions[i3] = x * pulseFactor;
            positions[i3 + 1] = y * pulseFactor;
            positions[i3 + 2] = z * pulseFactor;
        }
        
        this.geometry.attributes.position.needsUpdate = true;
        
        // Continue pulsing if still listening
        if (this.isListening) {
            requestAnimationFrame(() => this.pulseEffect());
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Smooth mouse movement
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;
        
        // Rotate based on mouse position
        this.particles.rotation.x = this.mouseY * 0.5;
        this.particles.rotation.y = this.mouseX * 0.5;
        
        // Update particle positions
        const positions = this.geometry.attributes.position.array;
        
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;
            
            // Smoothly interpolate toward target positions
            positions[i3] += (this.targetPositions[i3] - positions[i3]) * 0.02;
            positions[i3 + 1] += (this.targetPositions[i3 + 1] - positions[i3 + 1]) * 0.02;
            positions[i3 + 2] += (this.targetPositions[i3 + 2] - positions[i3 + 2]) * 0.02;
        }
        
        this.geometry.attributes.position.needsUpdate = true;
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize particle avatar when page loads
window.addEventListener('load', () => {
    // Wait for loading screen to complete
    setTimeout(() => {
        const avatar = new ParticleAvatar('avatar-container');
    }, 2000);
});
