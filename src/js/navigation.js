// Navigation functionality
class Navigation {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.backdrop = document.getElementById('backdrop');
        this.menuToggle = document.getElementById('menuToggle');
        this.closeSidebar = document.getElementById('closeSidebar');
        this.navItems = document.querySelectorAll('.nav-item');
        this.pages = document.querySelectorAll('.page');
        
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        this.menuToggle?.addEventListener('click', () => this.openSidebar());
        this.closeSidebar?.addEventListener('click', () => this.closeSidebarMenu());
        this.backdrop?.addEventListener('click', () => this.closeSidebarMenu());
        
        // Navigation items
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNavClick(e));
        });
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }
    
    openSidebar() {
        this.sidebar.classList.add('open');
        this.backdrop.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    closeSidebarMenu() {
        this.sidebar.classList.remove('open');
        this.backdrop.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    handleNavClick(e) {
        e.preventDefault();
        const clickedItem = e.currentTarget;
        const targetPage = clickedItem.dataset.page;
        
        // Update active nav item
        this.navItems.forEach(item => item.classList.remove('active'));
        clickedItem.classList.add('active');
        
        // Show target page
        this.showPage(targetPage);
        
        // Close mobile sidebar
        if (window.innerWidth < 992) {
            this.closeSidebarMenu();
        }
    }
    
    showPage(pageId) {
        // Hide all pages
        this.pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            targetPage.classList.add('fade-in');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                targetPage.classList.remove('fade-in');
            }, 300);
        }
    }
    
    handleResize() {
        if (window.innerWidth >= 992) {
            this.closeSidebarMenu();
        }
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});

// Export for module use
export default Navigation;