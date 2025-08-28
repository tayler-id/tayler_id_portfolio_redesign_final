// OnboardIQ Demo - Common JavaScript Functions
// Based on actual implementation specs with performance optimizations

// Global state management
let currentUser = null;
let apiCache = new Map();

// Initialize demo
document.addEventListener('DOMContentLoaded', function() {
    initializeDemo();
});

async function initializeDemo() {
    try {
        // Load user info
        await loadUserInfo();
        
        // Initialize animations if on main content
        if (document.querySelector('.fade-in')) {
            initializeAnimations();
        }
        
        // Initialize tooltips
        initializeTooltips();
        
    } catch (error) {
        console.error('Demo initialization failed:', error);
        showToast('Demo initialization failed. Some features may not work properly.', 'error');
    }
}

// User Management
async function loadUserInfo() {
    try {
        const response = await fetch('/api/auth/user');
        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            updateUserDisplay();
        } else {
            // Redirect to login if not authenticated
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
}

function updateUserDisplay() {
    if (currentUser) {
        const userNameEl = document.getElementById('user-name');
        if (userNameEl) {
            userNameEl.textContent = currentUser.name || currentUser.username;
        }
        
        // Show/hide admin features
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => {
            el.style.display = currentUser.role === 'admin' ? 'block' : 'none';
        });
    }
}

async function logout() {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        currentUser = null;
        window.location.href = '/login';
    } catch (error) {
        console.error('Logout error:', error);
        showToast('Logout failed', 'error');
    }
}

// API Helper Functions
async function apiRequest(url, options = {}) {
    const cacheKey = `${options.method || 'GET'}_${url}`;
    
    // Check cache for GET requests (except real-time data)
    if (!options.method || options.method === 'GET') {
        if (apiCache.has(cacheKey)) {
            const cached = apiCache.get(cacheKey);
            if (Date.now() - cached.timestamp < 60000) { // 1 minute cache
                return cached.data;
            }
        }
    }
    
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Cache successful GET requests
        if (!options.method || options.method === 'GET') {
            apiCache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
        }
        
        return data;
    } catch (error) {
        console.error('API request error:', error);
        showToast(`API Error: ${error.message}`, 'error');
        throw error;
    }
}

// Animation System - Hardware Accelerated
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Observe elements for animation
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });
}

// Performance-optimized animation utilities
function animateElement(element, animation, duration = 300) {
    return new Promise(resolve => {
        element.style.animation = `${animation} ${duration}ms ease`;
        element.addEventListener('animationend', () => {
            element.style.animation = '';
            resolve();
        }, { once: true });
    });
}

// Filtering System - Optimized with Sets for O(1) lookup
class FilterManager {
    constructor() {
        this.filters = new Map();
        this.activeFilters = new Set();
        this.callbacks = [];
    }
    
    addFilter(name, filterFn) {
        this.filters.set(name, filterFn);
    }
    
    setFilterValue(name, value) {
        if (value && value !== '' && value !== 'all') {
            this.activeFilters.add(name);
        } else {
            this.activeFilters.delete(name);
        }
        this.applyFilters();
    }
    
    applyFilters() {
        this.callbacks.forEach(callback => callback(this.activeFilters));
    }
    
    onFilterChange(callback) {
        this.callbacks.push(callback);
    }
}

// Dropdown System
class DropdownManager {
    constructor(element) {
        this.element = element;
        this.toggle = element.querySelector('.dropdown-toggle');
        this.menu = element.querySelector('.dropdown-menu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });
        
        // Close on outside click
        document.addEventListener('click', () => {
            this.closeMenu();
        });
        
        this.menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }
    
    openMenu() {
        this.menu.classList.add('show');
        this.isOpen = true;
        
        // Animate dropdown appearance
        this.menu.style.opacity = '0';
        this.menu.style.transform = 'translateY(-10px)';
        
        requestAnimationFrame(() => {
            this.menu.style.transition = 'all 150ms ease';
            this.menu.style.opacity = '1';
            this.menu.style.transform = 'translateY(0)';
        });
    }
    
    closeMenu() {
        if (!this.isOpen) return;
        
        this.menu.style.opacity = '0';
        this.menu.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            this.menu.classList.remove('show');
            this.isOpen = false;
        }, 150);
    }
}

// Toast Notification System
function showToast(message, type = 'success', duration = 5000) {
    const container = document.getElementById('toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="flex justify-between items-start gap-4">
            <div class="flex items-start gap-3">
                <div class="toast-icon">${getToastIcon(type)}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="removeToast(this.parentElement.parentElement)">×</button>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    
    requestAnimationFrame(() => {
        toast.style.transition = 'all 300ms ease';
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    });
    
    // Auto-remove
    setTimeout(() => {
        removeToast(toast);
    }, duration);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1100;
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: none;
    `;
    document.body.appendChild(container);
    return container;
}

function removeToast(toast) {
    toast.style.transform = 'translateX(100%)';
    toast.style.opacity = '0';
    
    setTimeout(() => {
        if (toast.parentElement) {
            toast.parentElement.removeChild(toast);
        }
    }, 300);
}

function getToastIcon(type) {
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// Loading State Management
function setLoadingState(element, loading = true) {
    if (loading) {
        element.classList.add('loading');
        element.style.pointerEvents = 'none';
    } else {
        element.classList.remove('loading');
        element.style.pointerEvents = '';
    }
}

// Tooltip System
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        let tooltip = null;
        
        element.addEventListener('mouseenter', () => {
            const text = element.getAttribute('data-tooltip');
            if (!text) return;
            
            tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = text;
            tooltip.style.cssText = `
                position: absolute;
                background: var(--color-gray-800);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                white-space: nowrap;
                z-index: 1000;
                opacity: 0;
                transform: translateY(10px);
                transition: all 150ms ease;
                pointer-events: none;
            `;
            
            document.body.appendChild(tooltip);
            
            // Position tooltip
            const rect = element.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            tooltip.style.left = `${rect.left + (rect.width - tooltipRect.width) / 2}px`;
            tooltip.style.top = `${rect.top - tooltipRect.height - 8}px`;
            
            // Animate in
            requestAnimationFrame(() => {
                tooltip.style.opacity = '1';
                tooltip.style.transform = 'translateY(0)';
            });
        });
        
        element.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    if (tooltip.parentElement) {
                        tooltip.parentElement.removeChild(tooltip);
                    }
                }, 150);
                tooltip = null;
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Export for use in other modules
window.DemoCommon = {
    FilterManager,
    DropdownManager,
    apiRequest,
    showToast,
    setLoadingState,
    animateElement,
    debounce,
    throttle,
    formatDate,
    escapeHtml,
    logout,
    currentUser: () => currentUser
};