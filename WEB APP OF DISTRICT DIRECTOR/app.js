// Dashboard data from provided JSON
const dashboardData = {
  "district": "Pune",
  "user": {
    "name": "Dr. Rajesh Kumar",
    "role": "District Director",
    "id": "DD001",
    "avatar": "https://via.placeholder.com/150"
  },
  "summary": {
    "total_farms": 3000,
    "active_alerts": 26,
    "pending_incidents": 12,
    "vaccination_coverage": 83.5,
    "compliance_rate": 81.2,
    "last_updated": "2025-09-06T20:15:00Z"
  },
  "blocks": [
    {"name": "Haveli", "farms": 480, "alerts": 2, "vaccination_completion": 89, "risk_level": "low", "pending_vaccines": 8, "lat": 18.4529, "lng": 73.8267},
    {"name": "Mulshi", "farms": 320, "alerts": 4, "vaccination_completion": 76, "risk_level": "medium", "pending_vaccines": 15, "lat": 18.5679, "lng": 73.4325},
    {"name": "Maval", "farms": 290, "alerts": 1, "vaccination_completion": 94, "risk_level": "low", "pending_vaccines": 3, "lat": 18.7453, "lng": 73.4329},
    {"name": "Bhor", "farms": 510, "alerts": 8, "vaccination_completion": 68, "risk_level": "high", "pending_vaccines": 22, "lat": 18.1504, "lng": 73.8436},
    {"name": "Purandar", "farms": 500, "alerts": 3, "vaccination_completion": 85, "risk_level": "medium", "pending_vaccines": 12, "lat": 18.3408, "lng": 74.1167},
    {"name": "Khed", "farms": 285, "alerts": 2, "vaccination_completion": 91, "risk_level": "low", "pending_vaccines": 6, "lat": 18.0166, "lng": 73.3950},
    {"name": "Ambegaon", "farms": 195, "alerts": 1, "vaccination_completion": 88, "risk_level": "low", "pending_vaccines": 4, "lat": 19.0333, "lng": 73.8000},
    {"name": "Junnar", "farms": 420, "alerts": 5, "vaccination_completion": 73, "risk_level": "medium", "pending_vaccines": 18, "lat": 19.2083, "lng": 73.8750}
  ],
  "incidents": [
    {"id": "PUN001", "title": "Avian Influenza H5N1 Investigation", "status": "in-progress", "priority": "critical", "block": "Bhor", "affected_farms": 5, "assigned_officer": "Dr. Priya Patil", "due_date": "2025-09-08", "created_date": "2025-09-05", "progress": 60, "description": "Suspected H5N1 outbreak with high mortality in broiler chickens. Immediate containment measures initiated."},
    {"id": "PUN002", "title": "PPE Compliance Audit", "status": "open", "priority": "high", "block": "Mulshi", "affected_farms": 15, "assigned_officer": "Dr. Amit Kumar", "due_date": "2025-09-10", "created_date": "2025-09-06", "progress": 20, "description": "Multiple farms showing poor PPE compliance during routine inspections."},
    {"id": "PUN003", "title": "Vaccination Delay Investigation", "status": "completed", "priority": "medium", "block": "Haveli", "affected_farms": 8, "assigned_officer": "Dr. Sunita Shah", "completed_date": "2025-09-05", "created_date": "2025-09-02", "progress": 100, "description": "Investigation into delayed vaccination schedules. Supply chain issues identified and resolved."},
    {"id": "PUN004", "title": "Environmental Monitoring Alert", "status": "open", "priority": "critical", "block": "Bhor", "affected_farms": 3, "assigned_officer": "Dr. Ravi Sharma", "due_date": "2025-09-07", "created_date": "2025-09-06", "progress": 15, "description": "Temperature control systems failing in multiple poultry sheds."},
    {"id": "PUN005", "title": "African Swine Fever Screening", "status": "in-progress", "priority": "high", "block": "Junnar", "affected_farms": 7, "assigned_officer": "Dr. Meera Joshi", "due_date": "2025-09-09", "created_date": "2025-09-04", "progress": 75, "description": "Routine ASF screening following border district outbreak reports."}
  ],
  "high_risk_visitors": [
    {"farm_name": "Sunrise Poultry Farm", "block": "Bhor", "visitor_name": "Feed Supply Vendor", "entry_time": "2025-09-06T09:30:00Z", "risk_status": "critical", "compliance_check": "failed", "last_infection_zone": "Nashik (ASF)", "disinfection_completed": false},
    {"farm_name": "Green Valley Pig Farm", "block": "Mulshi", "visitor_name": "Veterinary Inspector", "entry_time": "2025-09-06T11:15:00Z", "risk_status": "medium", "compliance_check": "passed", "last_infection_zone": "None", "disinfection_completed": true},
    {"farm_name": "Modern Poultry Unit", "block": "Purandar", "visitor_name": "Equipment Maintenance", "entry_time": "2025-09-06T14:20:00Z", "risk_status": "high", "compliance_check": "pending", "last_infection_zone": "Aurangabad (H5N1)", "disinfection_completed": false},
    {"farm_name": "Heritage Broilers", "block": "Junnar", "visitor_name": "Quality Auditor", "entry_time": "2025-09-06T16:45:00Z", "risk_status": "low", "compliance_check": "passed", "last_infection_zone": "None", "disinfection_completed": true}
  ],
  "vaccination_progress": [
    {"block": "Haveli", "target_farms": 480, "completed": 427, "pending": 53, "completion_rate": 89, "vaccine_types": ["FMD", "AI", "PPR"], "next_due": "2025-09-10"},
    {"block": "Mulshi", "target_farms": 320, "completed": 243, "pending": 77, "completion_rate": 76, "vaccine_types": ["Newcastle", "PPR", "FMD"], "next_due": "2025-09-08"},
    {"block": "Maval", "target_farms": 290, "completed": 273, "pending": 17, "completion_rate": 94, "vaccine_types": ["FMD", "AI"], "next_due": "2025-09-12"},
    {"block": "Bhor", "target_farms": 510, "completed": 347, "pending": 163, "completion_rate": 68, "vaccine_types": ["AI", "Newcastle", "PPR"], "next_due": "2025-09-07"},
    {"block": "Purandar", "target_farms": 500, "completed": 425, "pending": 75, "completion_rate": 85, "vaccine_types": ["PPR", "FMD", "AI"], "next_due": "2025-09-11"},
    {"block": "Khed", "target_farms": 285, "completed": 259, "pending": 26, "completion_rate": 91, "vaccine_types": ["FMD", "Newcastle"], "next_due": "2025-09-13"},
    {"block": "Ambegaon", "target_farms": 195, "completed": 172, "pending": 23, "completion_rate": 88, "vaccine_types": ["PPR", "AI"], "next_due": "2025-09-14"},
    {"block": "Junnar", "target_farms": 420, "completed": 307, "pending": 113, "completion_rate": 73, "vaccine_types": ["Newcastle", "FMD", "PPR"], "next_due": "2025-09-09"}
  ]
};

// Global variables
let map;
let currentFilter = 'all';
let currentPriorityFilter = 'all';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

// Initialize Dashboard
function initializeDashboard() {
    setupTabNavigation();
    setupCounterAnimations();
    initializeMap();
    populateBlocks();
    populateIncidents();
    populateVaccination();
    populateVisitors();
    setupModalHandlers();
    setupSearchAndFilters();
    startRealTimeUpdates();
}

// Tab Navigation
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabIndicator = document.querySelector('.tab-indicator');

    function updateTabIndicator(activeButton) {
        const buttonRect = activeButton.getBoundingClientRect();
        const containerRect = activeButton.parentElement.getBoundingClientRect();
        const position = buttonRect.left - containerRect.left - 6; // Account for padding
        const width = buttonRect.width;
        
        tabIndicator.style.left = `${position}px`;
        tabIndicator.style.width = `${width}px`;
    }

    // Initialize indicator position
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        updateTabIndicator(activeTab);
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
            
            // Update indicator
            updateTabIndicator(button);
            
            // Initialize tab-specific content
            if (targetTab === 'vaccination') {
                setTimeout(createVaccinationCharts, 100);
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const activeButton = document.querySelector('.tab-button.active');
        if (activeButton) {
            updateTabIndicator(activeButton);
        }
    });
}

// Counter Animations
function setupCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    };
    
    // Observe counters for animation trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Map Initialization
function initializeMap() {
    map = L.map('district-map').setView([18.5204, 73.8567], 9);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add block markers
    dashboardData.blocks.forEach(block => {
        const color = getRiskColor(block.risk_level);
        const marker = L.circleMarker([block.lat, block.lng], {
            radius: 8,
            fillColor: color,
            color: color,
            weight: 2,
            opacity: 0.8,
            fillOpacity: 0.6
        });
        
        marker.bindPopup(`
            <div class="map-popup">
                <h4>${block.name}</h4>
                <p><strong>Farms:</strong> ${block.farms}</p>
                <p><strong>Active Alerts:</strong> ${block.alerts}</p>
                <p><strong>Vaccination:</strong> ${block.vaccination_completion}%</p>
                <p><strong>Risk Level:</strong> <span class="risk-${block.risk_level}">${block.risk_level.toUpperCase()}</span></p>
            </div>
        `);
        
        marker.addTo(map);
    });
}

function getRiskColor(riskLevel) {
    switch (riskLevel) {
        case 'low': return '#1FB8CD';
        case 'medium': return '#FFC185';
        case 'high': return '#B4413C';
        default: return '#5D878F';
    }
}

// Populate Blocks
function populateBlocks() {
    const blocksGrid = document.getElementById('blocks-grid');
    blocksGrid.innerHTML = '';
    
    dashboardData.blocks.forEach(block => {
        const blockCard = document.createElement('div');
        blockCard.className = `block-card risk-${block.risk_level} fade-in`;
        blockCard.innerHTML = `
            <div class="block-header">
                <h4 class="block-name">${block.name}</h4>
                <span class="risk-badge ${block.risk_level}">${block.risk_level}</span>
            </div>
            <div class="block-stats">
                <div class="block-stat">
                    <div class="block-stat-value">${block.farms}</div>
                    <div class="block-stat-label">Farms</div>
                </div>
                <div class="block-stat">
                    <div class="block-stat-value">${block.alerts}</div>
                    <div class="block-stat-label">Alerts</div>
                </div>
                <div class="block-stat">
                    <div class="block-stat-value">${block.vaccination_completion}%</div>
                    <div class="block-stat-label">Vaccinated</div>
                </div>
                <div class="block-stat">
                    <div class="block-stat-value">${block.pending_vaccines}</div>
                    <div class="block-stat-label">Pending</div>
                </div>
            </div>
        `;
        
        blockCard.addEventListener('click', () => {
            if (map) {
                map.setView([block.lat, block.lng], 11);
            }
        });
        
        blocksGrid.appendChild(blockCard);
    });
}

// Populate Incidents
function populateIncidents() {
    const timeline = document.getElementById('incidents-timeline');
    timeline.innerHTML = '';
    
    let filteredIncidents = dashboardData.incidents;
    
    // Apply filters
    if (currentFilter !== 'all') {
        filteredIncidents = filteredIncidents.filter(incident => incident.status === currentFilter);
    }
    
    if (currentPriorityFilter !== 'all') {
        filteredIncidents = filteredIncidents.filter(incident => incident.priority === currentPriorityFilter);
    }
    
    filteredIncidents.forEach((incident, index) => {
        const incidentCard = document.createElement('div');
        incidentCard.className = `incident-card priority-${incident.priority} slide-up`;
        incidentCard.style.animationDelay = `${index * 100}ms`;
        
        const dueDate = new Date(incident.due_date || incident.completed_date);
        const isOverdue = incident.status !== 'completed' && dueDate < new Date();
        
        incidentCard.innerHTML = `
            <div class="incident-header">
                <div class="incident-title">
                    <h4>${incident.title}</h4>
                    <div class="incident-meta">
                        <span>ID: ${incident.id}</span>
                        <span>Block: ${incident.block}</span>
                        <span>Farms: ${incident.affected_farms}</span>
                        <span>Officer: ${incident.assigned_officer}</span>
                        ${incident.due_date ? `<span class="${isOverdue ? 'overdue' : ''}">Due: ${formatDate(incident.due_date)}</span>` : ''}
                    </div>
                </div>
                <div class="incident-badges">
                    <span class="status ${incident.status}">${incident.status.replace('-', ' ')}</span>
                </div>
            </div>
            <div class="incident-description">${incident.description}</div>
            ${incident.status !== 'completed' ? `
                <div class="incident-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${incident.progress}%"></div>
                    </div>
                    <small>${incident.progress}% Complete</small>
                </div>
            ` : ''}
            <div class="incident-actions">
                <button class="btn btn--sm btn--outline">Update Status</button>
                <button class="btn btn--sm btn--primary">View Details</button>
            </div>
        `;
        
        timeline.appendChild(incidentCard);
    });
    
    if (filteredIncidents.length === 0) {
        timeline.innerHTML = '<p class="no-results">No incidents match your current filters.</p>';
    }
}

// Populate Vaccination
function populateVaccination() {
    const vaccinationList = document.getElementById('vaccination-list');
    vaccinationList.innerHTML = '';
    
    dashboardData.vaccination_progress.forEach(item => {
        const vaccinationItem = document.createElement('div');
        vaccinationItem.className = 'vaccination-item fade-in';
        
        const nextDue = new Date(item.next_due);
        const isUrgent = (nextDue - new Date()) / (1000 * 60 * 60 * 24) <= 3; // 3 days or less
        
        vaccinationItem.innerHTML = `
            <div class="vaccination-info">
                <div class="vaccination-block">${item.block}</div>
                <div class="vaccination-details">
                    <span>Target: ${item.target_farms} farms</span>
                    <span>Completed: ${item.completed}</span>
                    <span>Pending: ${item.pending}</span>
                    <span>Types: ${item.vaccine_types.join(', ')}</span>
                    <span class="${isUrgent ? 'urgent' : ''}">Next Due: ${formatDate(item.next_due)}</span>
                </div>
            </div>
            <div class="vaccination-actions">
                <div class="progress-ring">
                    <svg width="60" height="60">
                        <circle cx="30" cy="30" r="25" stroke="var(--color-border)" stroke-width="4" fill="none"/>
                        <circle cx="30" cy="30" r="25" stroke="var(--color-primary)" stroke-width="4" fill="none" 
                                stroke-dasharray="157" stroke-dashoffset="${157 - (157 * item.completion_rate / 100)}" class="progress-circle"/>
                    </svg>
                    <div class="progress-text">${item.completion_rate}%</div>
                </div>
                <button class="btn btn--sm btn--primary">Confirm Delivery</button>
            </div>
        `;
        
        vaccinationList.appendChild(vaccinationItem);
    });
}

// Create Vaccination Charts
function createVaccinationCharts() {
    const chartsContainer = document.getElementById('vaccination-charts');
    chartsContainer.innerHTML = '';
    
    // Create charts for top 4 blocks
    const topBlocks = dashboardData.vaccination_progress
        .sort((a, b) => a.completion_rate - b.completion_rate)
        .slice(0, 4);
    
    topBlocks.forEach(block => {
        const chartCard = document.createElement('div');
        chartCard.className = 'chart-card';
        chartCard.innerHTML = `
            <h4 class="chart-title">${block.block}</h4>
            <div class="chart-container" style="position: relative; height: 200px;">
                <canvas></canvas>
            </div>
            <p>${block.completed}/${block.target_farms} farms completed</p>
        `;
        
        chartsContainer.appendChild(chartCard);
        
        // Create donut chart
        const canvas = chartCard.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Pending'],
                datasets: [{
                    data: [block.completed, block.pending],
                    backgroundColor: ['#1FB8CD', '#ECEBD5'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                cutout: '70%'
            }
        });
    });
}

// Populate Visitors
function populateVisitors() {
    const tbody = document.getElementById('visitors-tbody');
    tbody.innerHTML = '';
    
    dashboardData.high_risk_visitors.forEach(visitor => {
        const row = document.createElement('tr');
        const entryTime = new Date(visitor.entry_time);
        
        row.innerHTML = `
            <td>${visitor.farm_name}</td>
            <td>${visitor.block}</td>
            <td>${visitor.visitor_name}</td>
            <td>${formatDateTime(visitor.entry_time)}</td>
            <td><span class="risk-status ${visitor.risk_status}">${visitor.risk_status}</span></td>
            <td><span class="compliance-status ${visitor.compliance_check}">${visitor.compliance_check}</span></td>
            <td>
                <div class="visitor-actions">
                    <button class="btn btn--sm btn--outline">Schedule Audit</button>
                    <button class="btn btn--sm btn--primary">Send Alert</button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Modal Handlers
function setupModalHandlers() {
    const modal = document.getElementById('new-incident-modal');
    const quickAddBtn = document.querySelector('.quick-add-btn'); // Header button
    const logIncidentBtn = document.getElementById('log-new-incident-btn'); // Incidents tab button
    const closeBtn = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.modal-cancel');
    const overlay = document.querySelector('.modal-overlay');
    const form = document.querySelector('.incident-form');
    
    function openModal() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        form.reset();
    }
    
    // Handle both buttons - header quick add and incidents tab button
    if (quickAddBtn) {
        quickAddBtn.addEventListener('click', openModal);
    }
    
    if (logIncidentBtn) {
        logIncidentBtn.addEventListener('click', openModal);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }
    
    // Handle form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const title = form.querySelector('input[type="text"]').value;
            const block = form.querySelector('select').value;
            const priority = form.querySelectorAll('select')[1].value;
            const officer = form.querySelectorAll('input')[1].value;
            const dueDate = form.querySelector('input[type="date"]').value;
            const description = form.querySelector('textarea').value;
            
            const newIncident = {
                id: `PUN${String(dashboardData.incidents.length + 1).padStart(3, '0')}`,
                title: title,
                status: 'open',
                priority: priority,
                block: block,
                affected_farms: 1,
                assigned_officer: officer,
                due_date: dueDate,
                created_date: new Date().toISOString().split('T')[0],
                progress: 0,
                description: description
            };
            
            // Add to incidents array
            dashboardData.incidents.unshift(newIncident);
            
            // Update summary
            dashboardData.summary.pending_incidents++;
            updateCounters();
            
            // Refresh incidents display
            populateIncidents();
            
            // Close modal
            closeModal();
            
            // Show success message
            showNotification('Incident logged successfully!', 'success');
        });
    }
}

// Search and Filters
function setupSearchAndFilters() {
    const searchInput = document.querySelector('.search-input');
    const statusFilter = document.querySelector('.filter-select');
    const priorityFilter = document.querySelector('.priority-filter');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', handleStatusFilter);
    }
    
    if (priorityFilter) {
        priorityFilter.addEventListener('change', handlePriorityFilter);
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const incidents = document.querySelectorAll('.incident-card');
    
    incidents.forEach(incident => {
        const title = incident.querySelector('h4').textContent.toLowerCase();
        const description = incident.querySelector('.incident-description').textContent.toLowerCase();
        const visible = title.includes(searchTerm) || description.includes(searchTerm);
        
        incident.style.display = visible ? 'block' : 'none';
    });
}

function handleStatusFilter(e) {
    currentFilter = e.target.value;
    populateIncidents();
}

function handlePriorityFilter(e) {
    currentPriorityFilter = e.target.value;
    populateIncidents();
}

// Real-time Updates
function startRealTimeUpdates() {
    setInterval(() => {
        // Simulate real-time data updates
        simulateDataUpdates();
        updateLastRefreshed();
    }, 30000); // Update every 30 seconds
}

function simulateDataUpdates() {
    // Randomly update some values to simulate real-time changes
    const randomBlock = dashboardData.blocks[Math.floor(Math.random() * dashboardData.blocks.length)];
    const change = Math.random() > 0.5 ? 1 : -1;
    
    if (randomBlock.alerts + change >= 0) {
        randomBlock.alerts += change;
        dashboardData.summary.active_alerts += change;
    }
    
    // Update displays
    updateCounters();
    populateBlocks();
    
    // Add pulse animation to updated elements
    document.querySelectorAll('.counter').forEach(counter => {
        counter.classList.add('pulse');
        setTimeout(() => counter.classList.remove('pulse'), 1000);
    });
}

function updateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = counter.dataset.target;
        const currentValue = parseInt(counter.textContent.replace(/,/g, ''));
        
        // Update the target based on current data
        if (counter.dataset.target === '3000') {
            counter.dataset.target = dashboardData.summary.total_farms;
        } else if (counter.dataset.target === '26') {
            counter.dataset.target = dashboardData.summary.active_alerts;
        } else if (counter.dataset.target === '12') {
            counter.dataset.target = dashboardData.summary.pending_incidents;
        }
        
        // Animate to new value
        const newTarget = parseInt(counter.dataset.target);
        if (newTarget !== currentValue) {
            animateCounterUpdate(counter, currentValue, newTarget);
        }
    });
}

function animateCounterUpdate(counter, from, to) {
    const duration = 1000;
    const increment = (to - from) / (duration / 16);
    let current = from;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= to) || (increment < 0 && current <= to)) {
            current = to;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

function updateLastRefreshed() {
    dashboardData.summary.last_updated = new Date().toISOString();
    // You could add a "last updated" indicator here
}

// Utility Functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-${type === 'success' ? 'success' : 'primary'});
        border-radius: var(--radius-base);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: var(--space-8);">
            <span style="color: var(--color-${type === 'success' ? 'success' : 'primary'});">
                ${type === 'success' ? '✓' : 'ℹ'}
            </span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .pulse {
        animation: pulse 1s ease;
    }
    
    .urgent {
        color: var(--color-error) !important;
        font-weight: var(--font-weight-semibold);
    }
    
    .overdue {
        color: var(--color-error) !important;
        font-weight: var(--font-weight-semibold);
    }
    
    .no-results {
        text-align: center;
        color: var(--color-text-secondary);
        padding: var(--space-32);
        font-style: italic;
    }
`;

document.head.appendChild(notificationStyles);