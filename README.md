# Dashboard Admin Template

A modern, responsive Bootstrap 5 dashboard template built with SASS and vanilla JavaScript. This template provides a clean and professional interface for admin panels, analytics dashboards, and data management applications.

## 🚀 Features

### Core Features
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Bootstrap 5**: Built on the latest Bootstrap framework for modern UI components
- **SASS Architecture**: Organized SASS structure with variables, mixins, and modular styling
- **Interactive Charts**: Chart.js integration for data visualization
- **Data Tables**: Sortable and searchable data tables with pagination
- **Single Page Application**: Client-side navigation without page reloads
- **Mobile-First**: Optimized for mobile devices with collapsible sidebar

### UI Components
- **Sidebar Navigation**: Collapsible sidebar with active state management
- **Statistics Cards**: Animated stat cards with trend indicators
- **Search Functionality**: Global search with real-time filtering
- **Notification System**: Toast notifications for user feedback
- **User Profile**: User avatar and profile information display
- **Loading States**: Visual loading indicators for better UX

### Pages Included
- **Dashboard**: Overview with statistics cards and charts
- **Analytics**: Placeholder for advanced analytics (ready for customization)
- **Data Table**: Interactive table with sorting, searching, and pagination
- **Charts**: Dedicated charts page (ready for customization)
- **Users**: User management page (ready for customization)
- **Settings**: Application settings page (ready for customization)

## 📁 Project Structure

```
dashboard-admin/
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── styles/
│   └── main.scss          # Main SASS stylesheet
├── js/
│   ├── main.js            # Core application logic
│   ├── navigation.js      # Navigation and routing
│   ├── charts.js          # Chart initialization and data
│   └── table.js           # Data table functionality
└── README.md              # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd dashboard-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Alternative Setup (Static Files)
If you prefer to use static files without a build process:

1. Open `index.html` directly in your browser
2. All dependencies are loaded via CDN
3. SASS compilation would need to be handled separately

## 🎨 Customization

### SASS Variables
The template uses a comprehensive SASS variable system for easy customization:

```scss
// Color Palette
$colors: (
  primary: #3b82f6,
  secondary: #6b7280,
  success: #059669,
  danger: #dc2626,
  // ... more colors
);

// Spacing System
$spacing: (
  xs: 0.25rem,
  sm: 0.5rem,
  md: 0.75rem,
  // ... more spacing values
);
```

### Customizing Colors
1. Edit the `$colors` map in `styles/main.scss`
2. Use the `color()` function throughout your styles
3. Rebuild the project to see changes

### Adding New Pages
1. Add a new page div in `index.html`:
   ```html
   <div id="new-page" class="page">
     <!-- Your content here -->
   </div>
   ```

2. Add navigation item in the sidebar:
   ```html
   <a href="#" class="nav-item" data-page="new-page">
     <i class="fas fa-icon"></i>
     <span>New Page</span>
   </a>
   ```

3. The navigation system will automatically handle the routing

## 📊 Charts Integration

The template includes Chart.js for data visualization:

```javascript
// Example chart configuration
const chartConfig = {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Revenue',
      data: [12, 19, 3, 5, 2, 3],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
};
```

## 📱 Responsive Breakpoints

The template uses Bootstrap 5's responsive breakpoints:

- **xs**: < 576px (Extra small devices)
- **sm**: ≥ 576px (Small devices)
- **md**: ≥ 768px (Medium devices)
- **lg**: ≥ 992px (Large devices)
- **xl**: ≥ 1200px (Extra large devices)
- **xxl**: ≥ 1400px (Extra extra large devices)

## 🔧 JavaScript Architecture

### Core Classes
- **DashboardApp**: Main application controller
- **NavigationManager**: Handles page routing and sidebar
- **ChartManager**: Manages chart initialization and updates
- **TableManager**: Handles data table functionality

### Utility Functions
```javascript
// Global utilities available
DashboardUtils.formatCurrency(1234.56); // "$1,234.56"
DashboardUtils.formatDate('2023-12-25'); // "Dec 25, 2023"
DashboardUtils.showNotification('Success!', 'success');
```

## 🎯 Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Features Used**: ES6+, CSS Grid, Flexbox, CSS Custom Properties

## 📦 Dependencies

### Production Dependencies
- **Bootstrap 5.3.0**: UI framework
- **Font Awesome 6.4.0**: Icon library
- **Chart.js**: Data visualization library

### Development Dependencies
- **Vite**: Build tool and development server
- **SASS**: CSS preprocessor
- **TypeScript**: Type checking (configured)
- **ESLint**: Code linting

## 🚀 Performance Features

- **Lazy Loading**: Charts and heavy components load on demand
- **Debounced Search**: Optimized search with debouncing
- **CSS Animations**: Hardware-accelerated transitions
- **Minimal JavaScript**: Vanilla JS for better performance
- **CDN Assets**: External libraries loaded from CDN

## 🔒 Security Considerations

- **XSS Protection**: All user inputs are properly sanitized
- **CSRF Ready**: Template structure supports CSRF token integration
- **Content Security Policy**: Compatible with strict CSP headers
- **No Inline Scripts**: All JavaScript is in external files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the code comments
- Review the example implementations in each JavaScript file
