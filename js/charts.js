// Chart functionality using Chart.js
class ChartManager {
    constructor() {
        this.charts = {};
        this.init();
    }
    
    init() {
        // Wait for Chart.js to load
        if (typeof Chart !== 'undefined') {
            this.initializeCharts();
        } else {
            // Retry after a short delay if Chart.js isn't loaded yet
            setTimeout(() => this.init(), 100);
        }
    }
    
    initializeCharts() {
        this.createLineChart();
        this.createBarChart();
        this.createAreaChart();
        this.createPieChart();
    }
    
    createLineChart() {
        const ctx = document.getElementById('lineChart');
        if (!ctx) return;
        
        const data = [
            { name: 'Jan', value: 4000, previous: 2400 },
            { name: 'Feb', value: 3000, previous: 1398 },
            { name: 'Mar', value: 2000, previous: 9800 },
            { name: 'Apr', value: 2780, previous: 3908 },
            { name: 'May', value: 1890, previous: 4800 },
            { name: 'Jun', value: 2390, previous: 3800 },
            { name: 'Jul', value: 3490, previous: 4300 }
        ];
        
        this.charts.lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.name),
                datasets: [
                    {
                        label: 'Current',
                        data: data.map(d => d.value),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: '#3b82f6',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Previous',
                        data: data.map(d => d.previous),
                        borderColor: '#e5e7eb',
                        backgroundColor: 'rgba(229, 231, 235, 0.1)',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'white',
                        titleColor: '#1f2937',
                        bodyColor: '#6b7280',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `$${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: '#f0f0f0',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    createBarChart() {
        const ctx = document.getElementById('barChart');
        if (!ctx) return;
        
        const data = [
            { name: 'Jan', sales: 4000, target: 3500 },
            { name: 'Feb', sales: 3000, target: 2800 },
            { name: 'Mar', sales: 2000, target: 2200 },
            { name: 'Apr', sales: 2780, target: 2600 },
            { name: 'May', sales: 1890, target: 2000 },
            { name: 'Jun', sales: 2390, target: 2300 },
            { name: 'Jul', sales: 3490, target: 3200 }
        ];
        
        this.charts.barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(d => d.name),
                datasets: [
                    {
                        label: 'Sales',
                        data: data.map(d => d.sales),
                        backgroundColor: '#3b82f6',
                        borderRadius: 4,
                        borderSkipped: false
                    },
                    {
                        label: 'Target',
                        data: data.map(d => d.target),
                        backgroundColor: '#e5e7eb',
                        borderRadius: 4,
                        borderSkipped: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'white',
                        titleColor: '#1f2937',
                        bodyColor: '#6b7280',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: '#f0f0f0',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 12
                            },
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    createAreaChart() {
        const ctx = document.getElementById('areaChart');
        if (!ctx) return;
        
        const data = [
            { name: 'Jan', users: 4000, sessions: 2400 },
            { name: 'Feb', users: 3000, sessions: 1398 },
            { name: 'Mar', users: 2000, sessions: 2800 },
            { name: 'Apr', users: 2780, sessions: 3908 },
            { name: 'May', users: 1890, sessions: 4800 },
            { name: 'Jun', users: 2390, sessions: 3800 },
            { name: 'Jul', users: 3490, sessions: 4300 }
        ];
        
        this.charts.areaChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.name),
                datasets: [
                    {
                        label: 'Users',
                        data: data.map(d => d.users),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Sessions',
                        data: data.map(d => d.sessions),
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'white',
                        titleColor: '#1f2937',
                        bodyColor: '#6b7280',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: '#f0f0f0',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: '#f0f0f0',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#6b7280',
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
    
    createPieChart() {
        const ctx = document.getElementById('pieChart');
        if (!ctx) return;
        
        const data = [
            { name: 'Desktop', value: 45, color: '#3b82f6' },
            { name: 'Mobile', value: 35, color: '#10b981' },
            { name: 'Tablet', value: 15, color: '#f59e0b' },
            { name: 'Other', value: 5, color: '#ef4444' }
        ];
        
        this.charts.pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.map(d => d.name),
                datasets: [{
                    data: data.map(d => d.value),
                    backgroundColor: data.map(d => d.color),
                    borderWidth: 0,
                    cutout: '60%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            },
                            color: '#6b7280'
                        }
                    },
                    tooltip: {
                        backgroundColor: 'white',
                        titleColor: '#1f2937',
                        bodyColor: '#6b7280',
                        borderColor: '#e5e7eb',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}%`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Method to destroy all charts (useful for cleanup)
    destroyCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    }
    
    // Method to resize charts (useful for responsive behavior)
    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.resize();
        });
    }
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChartManager();
});

// Handle window resize for chart responsiveness
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.chartResizeTimeout);
    window.chartResizeTimeout = setTimeout(() => {
        if (window.chartManager) {
            window.chartManager.resizeCharts();
        }
    }, 250);
});