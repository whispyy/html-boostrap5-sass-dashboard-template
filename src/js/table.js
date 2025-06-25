// Table functionality
class TableManager {
    constructor() {
        this.tableBody = document.getElementById('tableBody');
        this.searchInput = document.getElementById('tableSearch');
        this.tableInfo = document.getElementById('tableInfo');
        this.sortHeaders = document.querySelectorAll('[data-sort]');
        
        this.currentSort = { field: 'name', direction: 'asc' };
        this.searchTerm = '';
        
        this.sampleData = [
            { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15', revenue: 12500 },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14', revenue: 8900 },
            { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive', lastLogin: '2024-01-10', revenue: 15600 },
            { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-16', revenue: 7200 },
            { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15', revenue: 18900 },
            { id: 6, name: 'Diana Davis', email: 'diana@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-12', revenue: 5400 }
        ];
        
        this.init();
    }
    
    init() {
        // Search functionality
        this.searchInput?.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.renderTable();
        });
        
        // Sort functionality
        this.sortHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const field = header.dataset.sort;
                this.handleSort(field);
            });
        });
        
        // Initial render
        this.renderTable();
    }
    
    handleSort(field) {
        if (this.currentSort.field === field) {
            this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            this.currentSort.field = field;
            this.currentSort.direction = 'asc';
        }
        
        this.updateSortIcons();
        this.renderTable();
    }
    
    updateSortIcons() {
        this.sortHeaders.forEach(header => {
            const icon = header.querySelector('.sort-icon');
            const field = header.dataset.sort;
            
            header.classList.remove('sorted');
            icon.className = 'fas fa-sort sort-icon';
            
            if (field === this.currentSort.field) {
                header.classList.add('sorted');
                icon.className = this.currentSort.direction === 'asc' 
                    ? 'fas fa-sort-up sort-icon' 
                    : 'fas fa-sort-down sort-icon';
            }
        });
    }
    
    filterData() {
        return this.sampleData.filter(item => {
            const searchFields = [item.name, item.email, item.role].join(' ').toLowerCase();
            return searchFields.includes(this.searchTerm);
        });
    }
    
    sortData(data) {
        return [...data].sort((a, b) => {
            const aValue = a[this.currentSort.field];
            const bValue = b[this.currentSort.field];
            
            let comparison = 0;
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                comparison = aValue.localeCompare(bValue);
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                comparison = aValue - bValue;
            }
            
            return this.currentSort.direction === 'asc' ? comparison : -comparison;
        });
    }
    
    renderTable() {
        const filteredData = this.filterData();
        const sortedData = this.sortData(filteredData);
        
        if (!this.tableBody) return;
        
        this.tableBody.innerHTML = '';
        
        sortedData.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="user-cell">
                        <div class="user-cell-avatar">${row.name.charAt(0)}</div>
                        <div class="user-cell-name">${row.name}</div>
                    </div>
                </td>
                <td>${row.email}</td>
                <td>
                    <span class="badge badge-${row.role.toLowerCase()}">${row.role}</span>
                </td>
                <td>
                    <span class="badge badge-${row.status.toLowerCase()}">${row.status}</span>
                </td>
                <td>${row.lastLogin}</td>
                <td>$${row.revenue.toLocaleString()}</td>
            `;
            this.tableBody.appendChild(tr);
        });
        
        // Update table info
        if (this.tableInfo) {
            this.tableInfo.textContent = `Showing ${sortedData.length} of ${this.sampleData.length} results`;
        }
    }
    
    // Method to add new data (for future use)
    addData(newData) {
        this.sampleData.push({
            id: this.sampleData.length + 1,
            ...newData
        });
        this.renderTable();
    }
    
    // Method to update existing data (for future use)
    updateData(id, updatedData) {
        const index = this.sampleData.findIndex(item => item.id === id);
        if (index !== -1) {
            this.sampleData[index] = { ...this.sampleData[index], ...updatedData };
            this.renderTable();
        }
    }
    
    // Method to delete data (for future use)
    deleteData(id) {
        this.sampleData = this.sampleData.filter(item => item.id !== id);
        this.renderTable();
    }
    
    // Method to export data (for future use)
    exportData() {
        const filteredData = this.filterData();
        const sortedData = this.sortData(filteredData);
        
        // Convert to CSV format
        const headers = ['Name', 'Email', 'Role', 'Status', 'Last Login', 'Revenue'];
        const csvContent = [
            headers.join(','),
            ...sortedData.map(row => [
                row.name,
                row.email,
                row.role,
                row.status,
                row.lastLogin,
                row.revenue
            ].join(','))
        ].join('\n');
        
        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'table-data.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}

// Initialize table when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.tableManager = new TableManager();
    
    // Add export functionality to export button
    const exportBtn = document.querySelector('.btn-primary');
    if (exportBtn && exportBtn.textContent.includes('Export')) {
        exportBtn.addEventListener('click', () => {
            window.tableManager.exportData();
        });
    }
});

// Export for module use
export default TableManager;