// Main application initialization and utilities
class DashboardApp {
    constructor() {
        this.isLoading = false;
        this.init();
    }
    
    init() {
        this.setupGlobalEventListeners();
        this.setupNotifications();
        this.setupSearch();
        this.checkBrowserSupport();
    }
    
    setupGlobalEventListeners() {
        // Handle escape key to close mobile sidebar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const sidebar = document.getElementById('sidebar');
                const backdrop = document.getElementById('backdrop');
                if (sidebar?.classList.contains('open')) {
                    sidebar.classList.remove('open');
                    backdrop?.classList.remove('show');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Handle click outside search to clear focus
        document.addEventListener('click', (e) => {
            const searchInputs = document.querySelectorAll('.search-input');
            searchInputs.forEach(input => {
                if (!input.contains(e.target) && !e.target.classList.contains('search-input')) {
                    input.blur();
                }
            });
        });
        
        // Handle form submissions (prevent default for demo)
        document.addEventListener('submit', (e) => {
            e.preventDefault();
            this.showNotification('Form submission prevented in demo mode', 'info');
        });
    }
    
    setupNotifications() {
        // Create notification container if it doesn't exist
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                max-width: 400px;
            `;
            document.body.appendChild(container);
        }
    }
    
    setupSearch() {
        // Global search functionality (header search)
        const headerSearch = document.querySelector('.header .search-input');
        if (headerSearch) {
            headerSearch.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                if (query.length > 2) {
                    this.performGlobalSearch(query);
                }
            });
        }
    }
    
    performGlobalSearch(query) {
        // This is a placeholder for global search functionality
        // In a real application, this would search across all data
        console.log('Performing global search for:', query);
        
        // Example: highlight matching navigation items
        const navItems = document.querySelectorAll('.nav-item span');
        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.backgroundColor = '#fef3c7';
                setTimeout(() => {
                    item.style.backgroundColor = '';
                }, 2000);
            }
        });
    }
    
    showNotification(message, type = 'info', duration = 5000) {
        const container = document.getElementById('notification-container');
        if (!container) return;
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        // Add icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        const colors = {
            success: '#059669',
            error: '#dc2626',
            warning: '#d97706',
            info: '#3b82f6'
        };
        
        notification.innerHTML = `
            <i class="${icons[type]}" style="color: ${colors[type]}; font-size: 18px;"></i>
            <span style="flex: 1; color: #374151;">${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; color: #6b7280; cursor: pointer; padding: 4px;">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }
    
    checkBrowserSupport() {
        // Check for required features
        const requiredFeatures = [
            'fetch',
            'Promise',
            'localStorage',
            'addEventListener'
        ];
        
        const unsupportedFeatures = requiredFeatures.filter(feature => 
            !(feature in window) && !(feature in document)
        );
        
        if (unsupportedFeatures.length > 0) {
            this.showNotification(
                'Some features may not work properly in this browser. Please update to a modern browser.',
                'warning',
                10000
            );
        }
    }
    
    // Utility methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
    
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(date));
    }
    
    debounce(func, wait) {
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
    
    // Loading state management
    setLoading(element, isLoading) {
        if (isLoading) {
            element.classList.add('loading');
            element.style.position = 'relative';
        } else {
            element.classList.remove('loading');
        }
    }
    
    // Local storage utilities
    saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return false;
        }
    }
    
    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return null;
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.dashboardApp = new DashboardApp();
    
    // Show welcome notification
    setTimeout(() => {
        window.dashboardApp.showNotification(
            'Welcome to your dashboard! All features are fully functional.',
            'success'
        );
    }, 1000);
});

// Handle page visibility changes (pause/resume functionality)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Dashboard paused');
    } else {
        console.log('Dashboard resumed');
        // Refresh data when page becomes visible again
        if (window.tableManager) {
            window.tableManager.renderTable();
        }
    }
});

// Export utilities for global use
window.DashboardUtils = {
    formatCurrency: (amount) => window.dashboardApp?.formatCurrency(amount) || `$${amount}`,
    formatDate: (date) => window.dashboardApp?.formatDate(date) || date,
    showNotification: (message, type, duration) => window.dashboardApp?.showNotification(message, type, duration)
};