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
    
    // Initialize page-specific functionality
    initializeEditTemplate();
    initializeInputFields();
});

// Edit Template functionality
function initializeEditTemplate() {
    // Setup back button functionality
    const backButton = document.getElementById('backToTable');
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Navigate back to table page
            const tableNavItem = document.querySelector('[data-page="table"]');
            if (tableNavItem) {
                tableNavItem.click();
            }
        });
    }
    
    // Setup save button functionality for Edit Template page
    const saveButton = document.getElementById('saveTemplate');
    const templateNameInput = document.getElementById('templateName');
    
    if (saveButton && templateNameInput) {
        saveButton.addEventListener('click', () => {
            const templateName = templateNameInput.value.trim();
            
            if (!templateName) {
                if (window.DashboardUtils) {
                    window.DashboardUtils.showNotification(
                        'Please enter a template name before saving.',
                        'warning'
                    );
                }
                templateNameInput.focus();
                return;
            }
            
            // Save template notification
            if (window.DashboardUtils) {
                window.DashboardUtils.showNotification(
                    `Template "${templateName}" saved successfully!`,
                    'success'
                );
            }
        });
        
        // Save on Enter key
        templateNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveButton.click();
            }
        });
    }
}

// Input Fields functionality
function initializeInputFields() {
    // Setup save button functionality for Input Fields demo page
    const saveDemoButton = document.getElementById('saveTemplateDemo');
    const templateNameDemoInput = document.getElementById('templateNameDemo');
    
    if (saveDemoButton && templateNameDemoInput) {
        saveDemoButton.addEventListener('click', () => {
            const templateName = templateNameDemoInput.value.trim();
            
            if (!templateName) {
                if (window.DashboardUtils) {
                    window.DashboardUtils.showNotification(
                        'Please enter a template name before saving.',
                        'warning'
                    );
                }
                templateNameDemoInput.focus();
                return;
            }
            
            // Save template notification for demo
            if (window.DashboardUtils) {
                window.DashboardUtils.showNotification(
                    `Demo: Template "${templateName}" saved successfully!`,
                    'success'
                );
            }
        });
        
        // Save on Enter key for demo
        templateNameDemoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                saveDemoButton.click();
            }
        });
    }
    
    // Setup file upload functionality
    initializeFileUpload();
    
    // Setup address functionality
    initializeAddressSection();
}

// File Upload functionality
function initializeFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('templateFileInput');
    const uploadProgress = document.getElementById('uploadProgress');
    const uploadedFile = document.getElementById('uploadedFile');
    const removeFileBtn = document.getElementById('removeFile');
    
    if (uploadArea && fileInput) {
        // Click to browse files
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });
        
        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, unhighlight, false);
        });
        
        // Handle dropped files
        uploadArea.addEventListener('drop', handleDrop, false);
        
        // Handle file input change
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
        
        // Remove file functionality
        if (removeFileBtn) {
            removeFileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                resetUpload();
            });
        }
    }
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    function highlight(e) {
        uploadArea.classList.add('dragover');
    }
    
    function unhighlight(e) {
        uploadArea.classList.remove('dragover');
    }
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            
            // Validate file type
            const allowedTypes = ['.json', '.xml', '.txt'];
            const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
            
            if (!allowedTypes.includes(fileExtension)) {
                if (window.DashboardUtils) {
                    window.DashboardUtils.showNotification(
                        'Please select a valid file type (.json, .xml, .txt)',
                        'error'
                    );
                }
                return;
            }
            
            // Validate file size (10MB limit)
            const maxSize = 10 * 1024 * 1024; // 10MB in bytes
            if (file.size > maxSize) {
                if (window.DashboardUtils) {
                    window.DashboardUtils.showNotification(
                        'File size must be less than 10MB',
                        'error'
                    );
                }
                return;
            }
            
            uploadFile(file);
        }
    }
    
    function uploadFile(file) {
        // Show progress
        uploadProgress.style.display = 'block';
        uploadProgress.querySelector('.upload-filename').textContent = file.name;
        
        // Simulate upload progress
        let progress = 0;
        const progressBar = uploadProgress.querySelector('.progress-bar');
        const progressText = uploadProgress.querySelector('.upload-percentage');
        
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            progressText.textContent = Math.round(progress) + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    showUploadedFile(file);
                }, 500);
            }
        }, 100);
    }
    
    function showUploadedFile(file) {
        // Hide progress
        uploadProgress.style.display = 'none';
        
        // Show uploaded file info
        uploadedFile.style.display = 'block';
        uploadedFile.querySelector('.uploaded-filename').textContent = file.name;
        uploadedFile.querySelector('.uploaded-filesize').textContent = formatFileSize(file.size);
        
        // Hide upload area
        uploadArea.style.display = 'none';
        
        // Show success notification
        if (window.DashboardUtils) {
            window.DashboardUtils.showNotification(
                `File "${file.name}" uploaded successfully!`,
                'success'
            );
        }
    }
    
    function resetUpload() {
        // Reset file input
        fileInput.value = '';
        
        // Hide uploaded file info and progress
        uploadedFile.style.display = 'none';
        uploadProgress.style.display = 'none';
        
        // Show upload area
        uploadArea.style.display = 'block';
        
        // Reset progress bar
        const progressBar = uploadProgress.querySelector('.progress-bar');
        const progressText = uploadProgress.querySelector('.upload-percentage');
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Address Section functionality
function initializeAddressSection() {
    const validateAddressBtn = document.getElementById('validateAddress');
    const getCoordinatesBtn = document.getElementById('getCoordinates');
    const clearAddressBtn = document.getElementById('clearAddress');
    
    const streetInput = document.getElementById('street');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const zipcodeInput = document.getElementById('zipcode');
    const latInput = document.getElementById('lat');
    const longInput = document.getElementById('long');
    
    if (validateAddressBtn) {
        validateAddressBtn.addEventListener('click', () => {
            const address = getAddressString();
            if (!address) {
                if (window.DashboardUtils) {
                    window.DashboardUtils.showNotification(
                        'Please enter at least street and city to validate address.',
                        'warning'
                    );
                }
                return;
            }
            
            // Simulate address validation
            if (window.DashboardUtils) {
                window.DashboardUtils.showNotification(
                    'Address validation completed successfully!',
                    'success'
                );
            }
        });
    }
    
    if (getCoordinatesBtn) {
        getCoordinatesBtn.addEventListener('click', () => {
            const address = getAddressString();
            if (!address) {
                if (window.DashboardUtils) {
                    window.DashboardUtils.showNotification(
                        'Please enter an address to get coordinates.',
                        'warning'
                    );
                }
                return;
            }
            
            // Simulate geocoding - in real app, you'd use a geocoding service
            const mockLat = (Math.random() * 180 - 90).toFixed(6);
            const mockLong = (Math.random() * 360 - 180).toFixed(6);
            
            if (latInput) latInput.value = mockLat;
            if (longInput) longInput.value = mockLong;
            
            if (window.DashboardUtils) {
                window.DashboardUtils.showNotification(
                    'Coordinates retrieved successfully!',
                    'success'
                );
            }
        });
    }
    
    if (clearAddressBtn) {
        clearAddressBtn.addEventListener('click', () => {
            // Clear all address fields
            if (streetInput) streetInput.value = '';
            if (cityInput) cityInput.value = '';
            if (stateInput) stateInput.value = '';
            if (zipcodeInput) zipcodeInput.value = '';
            if (latInput) latInput.value = '';
            if (longInput) longInput.value = '';
            
            if (window.DashboardUtils) {
                window.DashboardUtils.showNotification(
                    'Address fields cleared.',
                    'info'
                );
            }
        });
    }
    
    function getAddressString() {
        const street = streetInput?.value.trim() || '';
        const city = cityInput?.value.trim() || '';
        const state = stateInput?.value.trim() || '';
        const zipcode = zipcodeInput?.value.trim() || '';
        
        if (!street && !city) return '';
        
        return [street, city, state, zipcode].filter(Boolean).join(', ');
    }
    
    // Validate coordinate inputs
    [latInput, longInput].forEach(input => {
        if (input) {
            input.addEventListener('blur', (e) => {
                const value = parseFloat(e.target.value);
                const isLat = input === latInput;
                
                if (!isNaN(value)) {
                    if (isLat && (value < -90 || value > 90)) {
                        if (window.DashboardUtils) {
                            window.DashboardUtils.showNotification(
                                'Latitude must be between -90 and 90 degrees.',
                                'warning'
                            );
                        }
                        e.target.focus();
                    } else if (!isLat && (value < -180 || value > 180)) {
                        if (window.DashboardUtils) {
                            window.DashboardUtils.showNotification(
                                'Longitude must be between -180 and 180 degrees.',
                                'warning'
                            );
                        }
                        e.target.focus();
                    }
                }
            });
        }
    });
}

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

// Export for module use
export default DashboardApp;