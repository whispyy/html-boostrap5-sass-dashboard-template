// Table functionality
class TableManager {
    constructor() {
        this.tableBody = document.getElementById('tableBody');
        this.searchInput = document.getElementById('tableSearch');
        this.tableInfo = document.getElementById('tableInfo');
        this.sortHeaders = document.querySelectorAll('[data-sort]');
        this.perPageSelect = document.getElementById('perPageSelect');
        this.selectAllCheckbox = document.getElementById('selectAll');
        this.bulkActionsBar = document.getElementById('bulkActionsBar');
        this.selectedCount = document.getElementById('selectedCount');
        
        this.currentSort = { field: 'name', direction: 'asc' };
        this.searchTerm = '';
        this.perPage = 10;
        this.currentPage = 1;
        this.selectedRows = new Set();
        
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
            this.currentPage = 1; // Reset to first page on search
            this.renderTable();
        });
        
        // Sort functionality
        this.sortHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const field = header.dataset.sort;
                this.handleSort(field);
            });
        });
        
        // Per page selector
        this.perPageSelect?.addEventListener('change', (e) => {
            this.perPage = parseInt(e.target.value);
            this.currentPage = 1; // Reset to first page when changing per page
            this.renderTable();
        });
        
        // Select all checkbox
        this.selectAllCheckbox?.addEventListener('change', (e) => {
            this.handleSelectAll(e.target.checked);
        });
        
        // Bulk action buttons
        document.getElementById('bulkExport')?.addEventListener('click', () => {
            this.bulkExport();
        });
        
        document.getElementById('bulkChangeStatus')?.addEventListener('click', () => {
            this.bulkChangeStatus();
        });
        
        document.getElementById('bulkDelete')?.addEventListener('click', () => {
            this.bulkDelete();
        });
        
        document.getElementById('clearSelection')?.addEventListener('click', () => {
            this.clearSelection();
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
        
        // Calculate pagination
        const totalItems = sortedData.length;
        const totalPages = Math.ceil(totalItems / this.perPage);
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = Math.min(startIndex + this.perPage, totalItems);
        const paginatedData = sortedData.slice(startIndex, endIndex);
        
        if (!this.tableBody) return;
        
        this.tableBody.innerHTML = '';
        
        paginatedData.forEach(row => {
            const tr = document.createElement('tr');
            const isSelected = this.selectedRows.has(row.id);
            
            if (isSelected) {
                tr.classList.add('selected');
            }
            
            tr.innerHTML = `
                <td class="checkbox-column">
                    <input type="checkbox" class="table-checkbox row-checkbox" data-id="${row.id}" ${isSelected ? 'checked' : ''}>
                </td>
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
            
            // Add checkbox event listener
            const checkbox = tr.querySelector('.row-checkbox');
            checkbox.addEventListener('change', (e) => {
                this.handleRowSelection(row.id, e.target.checked);
            });
            
            this.tableBody.appendChild(tr);
        });
        
        // Update select all checkbox state
        this.updateSelectAllState();
        
        // Update bulk actions bar
        this.updateBulkActionsBar();
        
        // Update table info
        if (this.tableInfo) {
            const showingStart = totalItems > 0 ? startIndex + 1 : 0;
            const showingEnd = endIndex;
            this.tableInfo.textContent = `${showingStart}-${showingEnd} of ${totalItems}`;
        }
    }
    
    handleRowSelection(id, isChecked) {
        if (isChecked) {
            this.selectedRows.add(id);
        } else {
            this.selectedRows.delete(id);
        }
        
        // Update row styling
        const row = this.tableBody.querySelector(`[data-id="${id}"]`)?.closest('tr');
        if (row) {
            row.classList.toggle('selected', isChecked);
        }
        
        this.updateSelectAllState();
        this.updateBulkActionsBar();
    }
    
    handleSelectAll(isChecked) {
        const filteredData = this.filterData();
        const sortedData = this.sortData(filteredData);
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = Math.min(startIndex + this.perPage, sortedData.length);
        const paginatedData = sortedData.slice(startIndex, endIndex);
        
        paginatedData.forEach(row => {
            if (isChecked) {
                this.selectedRows.add(row.id);
            } else {
                this.selectedRows.delete(row.id);
            }
        });
        
        this.renderTable();
    }
    
    updateSelectAllState() {
        if (!this.selectAllCheckbox) return;
        
        const filteredData = this.filterData();
        const sortedData = this.sortData(filteredData);
        const startIndex = (this.currentPage - 1) * this.perPage;
        const endIndex = Math.min(startIndex + this.perPage, sortedData.length);
        const paginatedData = sortedData.slice(startIndex, endIndex);
        
        const allSelected = paginatedData.length > 0 && paginatedData.every(row => this.selectedRows.has(row.id));
        const someSelected = paginatedData.some(row => this.selectedRows.has(row.id));
        
        this.selectAllCheckbox.checked = allSelected;
        this.selectAllCheckbox.indeterminate = someSelected && !allSelected;
    }
    
    updateBulkActionsBar() {
        const count = this.selectedRows.size;
        
        if (count > 0) {
            this.bulkActionsBar.style.display = 'block';
            this.selectedCount.textContent = `${count} item${count > 1 ? 's' : ''} selected`;
        } else {
            this.bulkActionsBar.style.display = 'none';
        }
    }
    
    clearSelection() {
        this.selectedRows.clear();
        this.renderTable();
    }
    
    bulkExport() {
        const selectedData = this.sampleData.filter(row => this.selectedRows.has(row.id));
        
        if (selectedData.length === 0) return;
        
        // Convert to CSV format
        const headers = ['Name', 'Email', 'Role', 'Status', 'Last Login', 'Revenue'];
        const csvContent = [
            headers.join(','),
            ...selectedData.map(row => [
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
        a.download = `selected-data-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
    
    bulkChangeStatus() {
        const selectedData = this.sampleData.filter(row => this.selectedRows.has(row.id));
        
        if (selectedData.length === 0) return;
        
        // Toggle status for all selected items
        selectedData.forEach(row => {
            const index = this.sampleData.findIndex(item => item.id === row.id);
            if (index !== -1) {
                this.sampleData[index].status = this.sampleData[index].status === 'Active' ? 'Inactive' : 'Active';
            }
        });
        
        this.renderTable();
        alert(`Status changed for ${selectedData.length} item${selectedData.length > 1 ? 's' : ''}`);
    }
    
    bulkDelete() {
        const count = this.selectedRows.size;
        
        if (count === 0) return;
        
        if (confirm(`Are you sure you want to delete ${count} item${count > 1 ? 's' : ''}?`)) {
            this.sampleData = this.sampleData.filter(row => !this.selectedRows.has(row.id));
            this.selectedRows.clear();
            this.renderTable();
            alert(`${count} item${count > 1 ? 's' : ''} deleted successfully`);
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