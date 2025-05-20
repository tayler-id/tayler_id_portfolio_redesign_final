/**
 * Enhanced Logo Particle System
 * Transforms the user's logo into an interactive 3D particle system
 * with advanced animation effects and AI assistant integration
 */

class LogoParticleSystem {
  constructor(containerId, logoPath) {
    this.containerId = containerId;
    this.logoPath = logoPath;
    this.particles = [];
    this.particleCount = 15000; // Reverted to original value to make it "light again"
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.container = null;
    this.width = 0;
    this.height = 0;
    this.logoPoints = [];
    this.particleSystem = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.targetRotation = { x: 0, y: 0 };
    this.currentRotation = { x: 0, y: 0 };
    this.interactionMode = 'idle'; // idle, active, speaking, reacting
    this.colors = {
      primary: new THREE.Color(0xff4d5a), // Reverted to original pink/red
      secondary: new THREE.Color(0x00e5ff),
      neutral: new THREE.Color(0xffffff)
    };
    this.clock = new THREE.Clock();
    this.noiseOffset = 0;
    this.noiseStrength = 0;
    this.targetNoiseStrength = 0;
    
    // Initialize the system
    this.init();
    this.loadLogo();
  }
  
  init() {
    // Get container
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with ID ${this.containerId} not found`);
      return;
    }
    
    // Set dimensions
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    
    // Create scene
    this.scene = new THREE.Scene();
    
    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      40, // Reduced FOV from 75 to make logo appear larger
      this.width / this.height,
      1,
      10000
    );
    this.camera.position.z = 2500; // Increased from 2000 to pull camera even further back
    
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    this.scene.add(directionalLight);
    
    // Add event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this)); // Changed from this.container
    this.container.addEventListener('click', this.onClick.bind(this));
    this.container.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
    this.container.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
    this.container.addEventListener('mouseleave', this.onMouseLeave.bind(this)); // Added mouseleave listener
    
    // Start animation loop
    this.animate();
  }
  
  loadLogo() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image to canvas
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Extract points from image
      this.extractPointsFromImage(data, canvas.width, canvas.height);
      
      // Create particle system
      this.createParticleSystem();
    };
    
    img.onerror = () => {
      console.error(`Failed to load logo from ${this.logoPath}`);
      // Create a fallback particle system
      this.createFallbackParticleSystem();
    };
    
    img.src = this.logoPath;
  }
  
  extractPointsFromImage(data, width, height) {
    const points = [];
    const threshold = 128; // Threshold for considering a pixel as part of the logo
    const sampleRate = 1; // Sample every nth pixel (increase for performance)
    
    for (let y = 0; y < height; y += sampleRate) {
      for (let x = 0; x < width; x += sampleRate) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];
        
        // If pixel is not transparent (part of the logo)
        if (alpha > threshold) {
          // Normalize coordinates to center the logo
          const xNorm = (x / width - 0.5) * 1200; // Reduced from 1400
          const yNorm = (y / height - 0.5) * -1200; // Reduced from -1400 (and flips Y axis)
          
          points.push({
            x: xNorm,
            y: yNorm,
            z: 0,
            originalX: xNorm,
            originalY: yNorm,
            originalZ: 0
          });
        }
      }
    }
    
    // If we have more points than our particle count, sample them
    if (points.length > this.particleCount) {
      const step = Math.floor(points.length / this.particleCount);
      this.logoPoints = points.filter((_, index) => index % step === 0).slice(0, this.particleCount);
    } else {
      this.logoPoints = points;
      
      // If we have fewer points than our particle count, duplicate some
      while (this.logoPoints.length < this.particleCount) {
        const randomIndex = Math.floor(Math.random() * points.length);
        const point = { ...points[randomIndex] };
        
        // Add slight variation
        point.x += (Math.random() - 0.5) * 10;
        point.y += (Math.random() - 0.5) * 10;
        point.z += (Math.random() - 0.5) * 10;
        
        this.logoPoints.push(point);
      }
    }
  }
  
  createFallbackParticleSystem() {
    // Create a simple particle system if logo loading fails
    this.logoPoints = [];
    
    // Create a circular pattern
    for (let i = 0; i < this.particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 300;
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 100;
      
      this.logoPoints.push({
        x,
        y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z
      });
    }
    
    // Create particle system
    this.createParticleSystem();
  }
  
  createParticleSystem() {
    // Create geometry
    const geometry = new THREE.BufferGeometry();
    
    // Create arrays for position and color
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);
    const sizes = new Float32Array(this.particleCount);
    
    // Ensure colors are properly defined
    const primaryColor = this.colors.primary || new THREE.Color(0xff4d5a);
    
    // Fill arrays
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const point = this.logoPoints[i] || { x: 0, y: 0, z: 0 };
      
      // Position
      positions[i3] = point.x;
      positions[i3 + 1] = point.y;
      positions[i3 + 2] = point.z;
      
      // Color - default to primary color with fallback
      colors[i3] = primaryColor.r;
      colors[i3 + 1] = primaryColor.g;
      colors[i3 + 2] = primaryColor.b;
      
      // Size - vary slightly for more natural look
      sizes[i] = Math.random() * 3 + 2;
    }
    
    // Add attributes to geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create shader material for better performance and effects
    const material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: this.createParticleTexture() },
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        
        void main() {
          gl_FragColor = vec4(vColor, 1.0) * texture2D(pointTexture, gl_PointCoord);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true
    });
    
    // Create particle system
    this.particleSystem = new THREE.Points(geometry, material);
    this.scene.add(this.particleSystem);
    
    // Store reference to positions and colors for animation
    this.positions = positions;
    this.colors = colors;
    this.sizes = sizes;
    
    // Create target arrays for morphing
    this.targetPositions = new Float32Array(this.particleCount * 3);
    this.targetColors = new Float32Array(this.particleCount * 3);
    this.targetSizes = new Float32Array(this.particleCount);
    
    // Ensure colors are properly defined
    const primaryColor2 = this.colors.primary || new THREE.Color(0xff4d5a);
    
    // Initialize target positions to logo shape
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const point = this.logoPoints[i] || { x: 0, y: 0, z: 0 };
      
      this.targetPositions[i3] = point.originalX;
      this.targetPositions[i3 + 1] = point.originalY;
      this.targetPositions[i3 + 2] = point.originalZ;
      
      // Target color - default to primary with fallback
      this.targetColors[i3] = primaryColor2.r;
      this.targetColors[i3 + 1] = primaryColor2.g;
      this.targetColors[i3 + 2] = primaryColor2.b;
      
      // Target size - default to current size
      this.targetSizes[i] = sizes[i];
    }
  }
  
  createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2
    );
    
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }
  
  morphToLogoShape() {
    // Ensure colors are properly defined
    const primaryColor = this.colors.primary || new THREE.Color(0xff4d5a);
    
    // Set target positions to original logo shape
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const point = this.logoPoints[i] || { x: 0, y: 0, z: 0 };
      
      this.targetPositions[i3] = point.originalX;
      this.targetPositions[i3 + 1] = point.originalY;
      this.targetPositions[i3 + 2] = point.originalZ;
      
      // Set target color to primary with fallback
      this.targetColors[i3] = primaryColor.r;
      this.targetColors[i3 + 1] = primaryColor.g;
      this.targetColors[i3 + 2] = primaryColor.b;
      
      // Set target size to original size
      this.targetSizes[i] = Math.random() * 3 + 2;
    }
    
    // Set noise strength
    this.targetNoiseStrength = 0;
  }
  
  morphToActiveState() {
    // Ensure colors are properly defined
    const primaryColor = this.colors.primary || new THREE.Color(0xff4d5a);
    const secondaryColor = this.colors.secondary || new THREE.Color(0x00e5ff);
    
    // Create a 3D formation that expands the logo
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const point = this.logoPoints[i] || { x: 0, y: 0, z: 0 };
      
      // Add depth to the logo by varying Z based on position
      const distanceFromCenter = Math.sqrt(
        point.originalX * point.originalX + 
        point.originalY * point.originalY
      );
      
      const zOffset = Math.sin(distanceFromCenter * 0.01) * 150;
      
      this.targetPositions[i3] = point.originalX * 1.2;
      this.targetPositions[i3 + 1] = point.originalY * 1.2;
      this.targetPositions[i3 + 2] = zOffset;
      
      // Gradient color based on position
      const t = (point.originalY + 400) / 800; // Normalize to 0-1
      
      // Create a new color for each particle to avoid reference issues
      const color = new THREE.Color();
      color.r = primaryColor.r + (secondaryColor.r - primaryColor.r) * t;
      color.g = primaryColor.g + (secondaryColor.g - primaryColor.g) * t;
      color.b = primaryColor.b + (secondaryColor.b - primaryColor.b) * t;
      
      this.targetColors[i3] = color.r;
      this.targetColors[i3 + 1] = color.g;
      this.targetColors[i3 + 2] = color.b;
      
      // Increase size for more visual impact
      this.targetSizes[i] = Math.random() * 4 + 3;
    }
    
    // Set noise strength
    this.targetNoiseStrength = 0.2;
  }
  
  morphToSpeakingState() {
    // Ensure colors are properly defined
    const primaryColor = this.colors.primary || new THREE.Color(0xff4d5a);
    const secondaryColor = this.colors.secondary || new THREE.Color(0x00e5ff);
    
    // Create a dynamic speaking animation
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const point = this.logoPoints[i] || { x: 0, y: 0, z: 0 };
      
      // Focus animation on lower part of logo (mouth/mustache area)
      const isMouthArea = point.originalY < 0;
      const scaleFactor = isMouthArea ? 1.3 : 1.1;
      
      this.targetPositions[i3] = point.originalX * scaleFactor;
      this.targetPositions[i3 + 1] = point.originalY * scaleFactor;
      this.targetPositions[i3 + 2] = isMouthArea ? 
        Math.sin(Date.now() * 0.01 + i * 0.1) * 80 : 
        point.originalZ;
      
      // Pulsing color effect
      const pulseIntensity = 0.5 + Math.sin(Date.now() * 0.005) * 0.5;
      
      // Create a new color for each particle to avoid reference issues
      const color = new THREE.Color();
      color.r = primaryColor.r + (secondaryColor.r - primaryColor.r) * pulseIntensity;
      color.g = primaryColor.g + (secondaryColor.g - primaryColor.g) * pulseIntensity;
      color.b = primaryColor.b + (secondaryColor.b - primaryColor.b) * pulseIntensity;
      
      this.targetColors[i3] = color.r;
      this.targetColors[i3 + 1] = color.g;
      this.targetColors[i3 + 2] = color.b;
      
      // Vary size based on position
      this.targetSizes[i] = isMouthArea ? 
        Math.random() * 5 + 3 : 
        Math.random() * 3 + 2;
    }
    
    // Set noise strength
    this.targetNoiseStrength = 0.4;
  }
  
  reactToMessage(message) {
    // Ensure colors are properly defined
    const neutralColor = this.colors.neutral || new THREE.Color(0xffffff);
    const secondaryColor = this.colors.secondary || new THREE.Color(0x00e5ff);
    
    // Create a ripple effect through the particles
    const now = Date.now();
    
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      const point = this.logoPoints[i] || { x: 0, y: 0, z: 0 };
      
      // Calculate distance from center
      const distanceFromCenter = Math.sqrt(
        point.originalX * point.originalX + 
        point.originalY * point.originalY
      );
      
      // Create ripple effect
      const ripple = Math.sin(distanceFromCenter * 0.01 - now * 0.002) * 80;
      
      this.targetPositions[i3] = point.originalX * 1.4;
      this.targetPositions[i3 + 1] = point.originalY * 1.4;
      this.targetPositions[i3 + 2] = ripple;
      
      // Emotional color response based on message sentiment
      // This is a placeholder - in a real implementation, you'd analyze the message
      const excitementLevel = message.length / 100; // Simple proxy for excitement
      const t = Math.min(1, excitementLevel);
      
      // Create a new color for each particle to avoid reference issues
      const color = new THREE.Color();
      color.r = neutralColor.r + (secondaryColor.r - neutralColor.r) * t;
      color.g = neutralColor.g + (secondaryColor.g - neutralColor.g) * t;
      color.b = neutralColor.b + (secondaryColor.b - neutralColor.b) * t;
      
      this.targetColors[i3] = color.r;
      this.targetColors[i3 + 1] = color.g;
      this.targetColors[i3 + 2] = color.b;
      
      // Increase size for more visual impact
      this.targetSizes[i] = Math.random() * 5 + 3;
    }
    
    // Set noise strength
    this.targetNoiseStrength = 0.6;
  }

  onMouseLeave() {
    // Reset rotation targets
    this.targetRotation.x = 0;
    this.targetRotation.y = 0;

    // Optionally, revert to idle state
    if (this.interactionMode !== 'idle') {
      this.setMode('idle');
    }
  }
  
  onWindowResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.width, this.height);
  }
  
  onMouseMove(event) {
    const rect = this.container.getBoundingClientRect();
    const mouseXInContainer = event.clientX - rect.left;
    const mouseYInContainer = event.clientY - rect.top;

    // Check if mouse is over the container
    if (mouseXInContainer >= 0 && mouseXInContainer <= rect.width && 
        mouseYInContainer >= 0 && mouseYInContainer <= rect.height) {
      
      // Calculate mouse position in normalized device coordinates relative to the container
      this.mouse.x = (mouseXInContainer / rect.width) * 2 - 1;
      this.mouse.y = -(mouseYInContainer / rect.height) * 2 + 1;
      
      // Update target rotation based on mouse position
      this.targetRotation.y = this.mouse.x * 0.8;
      this.targetRotation.x = this.mouse.y * 0.5;
    } else {
      // If mouse is not over the container, the onMouseLeave event on this.container will handle reset.
    }
  }
  
  onTouchStart(event) {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      const rect = this.container.getBoundingClientRect();
      const touchXInContainer = touch.clientX - rect.left;
      const touchYInContainer = touch.clientY - rect.top;

      if (touchXInContainer >= 0 && touchXInContainer <= rect.width &&
          touchYInContainer >= 0 && touchYInContainer <= rect.height) {
        
        this.mouse.x = (touchXInContainer / rect.width) * 2 - 1;
        this.mouse.y = -(touchYInContainer / rect.height) * 2 + 1;
        
        // Update target rotation based on touch position
        this.targetRotation.y = this.mouse.x * 0.8;
        this.targetRotation.x = this.mouse.y * 0.5;
      }
    }
  }
  
  onTouchMove(event) {
    if (event.touches.length === 1) {
      const touch = event.touches[0];
      const rect = this.container.getBoundingClientRect();
      const touchXInContainer = touch.clientX - rect.left;
      const touchYInContainer = touch.clientY - rect.top;

      if (touchXInContainer >= 0 && touchXInContainer <= rect.width &&
          touchYInContainer >= 0 && touchYInContainer <= rect.height) {
        
        this.mouse.x = (touchXInContainer / rect.width) * 2 - 1;
        this.mouse.y = -(touchYInContainer / rect.height) * 2 + 1;
        
        // Update target rotation based on touch position
        this.targetRotation.y = this.mouse.x * 0.8;
        this.targetRotation.x = this.mouse.y * 0.5;
      }
    }
  }
  
  onClick() {
    // Toggle between idle and active states
    if (this.interactionMode === 'idle') {
      this.interactionMode = 'active';
      this.morphToActiveState();
    } else if (this.interactionMode === 'active') {
      this.interactionMode = 'speaking';
      this.morphToSpeakingState();
    } else {
      this.interactionMode = 'idle';
      this.morphToLogoShape();
    }
  }
  
  setMode(mode, message = '') {
    this.interactionMode = mode;
    
    switch (mode) {
      case 'idle':
        this.morphToLogoShape();
        break;
      case 'active':
        this.morphToActiveState();
        break;
      case 'speaking':
        this.morphToSpeakingState();
        break;
      case 'reacting':
        this.reactToMessage(message);
        break;
    }
  }
  
  applyNoise() {
    if (!this.particleSystem) return;
    
    const positions = this.particleSystem.geometry.attributes.position.array;
    const time = this.clock.getElapsedTime();
    this.noiseOffset += 0.01;
    
    // Smooth interpolation of noise strength
    this.noiseStrength += (this.targetNoiseStrength - this.noiseStrength) * 0.05;
    
    if (this.noiseStrength > 0) {
      for (let i = 0; i < this.particleCount; i++) {
        const i3 = i * 3;
        
        // Apply simplex noise
        const noiseX = this.simplex3(
          positions[i3] * 0.01, 
          positions[i3 + 1] * 0.01, 
          time * 0.5
        ) * this.noiseStrength * 20;
        
        const noiseY = this.simplex3(
          positions[i3] * 0.01 + 100, 
          positions[i3 + 1] * 0.01, 
          time * 0.5
        ) * this.noiseStrength * 20;
        
        const noiseZ = this.simplex3(
          positions[i3] * 0.01, 
          positions[i3 + 1] * 0.01 + 100, 
          time * 0.5
        ) * this.noiseStrength * 20;
        
        // Apply noise to positions
        positions[i3] += noiseX;
        positions[i3 + 1] += noiseY;
        positions[i3 + 2] += noiseZ;
      }
      
      this.particleSystem.geometry.attributes.position.needsUpdate = true;
    }
  }
  
  // Simple 3D simplex noise implementation
  simplex3(x, y, z) {
    // Simple noise function for demonstration
    return Math.sin(x * 10 + this.noiseOffset) * 
           Math.cos(y * 10 + this.noiseOffset) * 
           Math.sin(z * 10 + this.noiseOffset) * 0.5;
  }
  
  hash(n) {
    return n % 12;
  }
  
  dot(g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
  }
  
  // Gradient vectors for 3D simplex noise
  grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
  ];
  
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    
    if (!this.particleSystem) {
      return;
    }
    
    // Update time uniform for shader
    if (this.particleSystem.material.uniforms) {
      this.particleSystem.material.uniforms.time.value = this.clock.getElapsedTime();
    }
    
    // Update rotation with smooth interpolation
    this.currentRotation.x += (this.targetRotation.x - this.currentRotation.x) * 0.05;
    this.currentRotation.y += (this.targetRotation.y - this.currentRotation.y) * 0.05;
    
    this.particleSystem.rotation.x = this.currentRotation.x;
    this.particleSystem.rotation.y = this.currentRotation.y;
    
    // Update speaking animation if in speaking mode
    if (this.interactionMode === 'speaking') {
      this.morphToSpeakingState();
    }
    
    // Apply noise to particles
    this.applyNoise();
    
    // Update particle positions with smooth interpolation
    const positions = this.particleSystem.geometry.attributes.position.array;
    const colors = this.particleSystem.geometry.attributes.color.array;
    const sizes = this.particleSystem.geometry.attributes.size.array;
    
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      
      // Update positions
      positions[i3] += (this.targetPositions[i3] - positions[i3]) * 0.02;
      positions[i3 + 1] += (this.targetPositions[i3 + 1] - positions[i3 + 1]) * 0.02;
      positions[i3 + 2] += (this.targetPositions[i3 + 2] - positions[i3 + 2]) * 0.02;
      
      // Update colors
      colors[i3] += (this.targetColors[i3] - colors[i3]) * 0.05;
      colors[i3 + 1] += (this.targetColors[i3 + 1] - colors[i3 + 1]) * 0.05;
      colors[i3 + 2] += (this.targetColors[i3 + 2] - colors[i3 + 2]) * 0.05;
      
      // Update sizes
      sizes[i] += (this.targetSizes[i] - sizes[i]) * 0.05;
    }
    
    this.particleSystem.geometry.attributes.position.needsUpdate = true;
    this.particleSystem.geometry.attributes.color.needsUpdate = true;
    this.particleSystem.geometry.attributes.size.needsUpdate = true;
    
    // Render scene
    this.renderer.render(this.scene, this.camera);
  }
}
