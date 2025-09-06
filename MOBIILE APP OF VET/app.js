// Veterinary Mobile App JavaScript
class VetApp {
    constructor() {
        this.currentTab = 'home';
        this.data = {
            veterinarian: {
                name: "Dr. Priya Sharma",
                licenseNumber: "VET2023045",
                specialization: "Poultry & Swine Health",
                district: "Mumbai",
                phone: "+91-9876543210"
            },
            todaysVisits: [
                {
                    farmId: "F001",
                    farmName: "Krishna Poultry Farm",
                    location: "Andheri, Mumbai",
                    time: "09:00",
                    status: "Scheduled",
                    species: "Poultry",
                    farmSize: 5000,
                    contactPerson: "Ramesh Patel",
                    visitType: "Routine Checkup"
                },
                {
                    farmId: "F002",
                    farmName: "Ganesh Pig Farm",
                    location: "Pune",
                    time: "14:00",
                    status: "Scheduled",
                    species: "Pig",
                    farmSize: 500,
                    contactPerson: "Suresh Patil",
                    visitType: "Vaccination"
                }
            ],
            activeCases: [
                {
                    caseId: "C001",
                    farmName: "Krishna Poultry Farm",
                    species: "Poultry",
                    symptoms: ["Coughing", "Reduced appetite"],
                    severity: "Medium",
                    lastUpdate: "2025-09-05",
                    status: "In Progress",
                    followUpDate: "2025-09-08"
                },
                {
                    caseId: "C002",
                    farmName: "Patel Dairy",
                    species: "Cattle",
                    symptoms: ["Fever", "Diarrhea"],
                    severity: "High",
                    lastUpdate: "2025-09-06",
                    status: "Follow-up Required",
                    followUpDate: "2025-09-07"
                }
            ],
            notifications: [
                {
                    id: "N001",
                    type: "Critical",
                    title: "Disease Outbreak Alert",
                    message: "Suspected ASF outbreak in Pune district",
                    timestamp: "2025-09-06T08:30:00Z",
                    farmLocation: "Pune",
                    priority: "Critical"
                },
                {
                    id: "N002",
                    type: "High",
                    title: "Overdue Vaccination",
                    message: "Krishna Poultry Farm vaccination overdue by 3 days",
                    timestamp: "2025-09-06T07:00:00Z",
                    farmLocation: "Mumbai",
                    priority: "High"
                }
            ]
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderVisits();
        this.renderCases();
        this.renderNotifications();
        this.setupModal();
        this.setupCamera();
    }

    setupEventListeners() {
        // Bottom navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Quick actions
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // FAB button
        document.getElementById('add-case-fab')?.addEventListener('click', () => {
            this.openCaseModal();
        });

        // Notification filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterNotifications(e.currentTarget.dataset.filter);
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Case cards click handlers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.case-card')) {
                const caseCard = e.target.closest('.case-card');
                const caseId = caseCard.dataset.caseId;
                this.openCaseModal(caseId);
            }
        });

        // Visit action buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.action-btn')) {
                const btn = e.target.closest('.action-btn');
                const action = btn.dataset.action;
                const farmId = btn.closest('.visit-card').dataset.farmId;
                this.handleVisitAction(action, farmId);
            }
        });
    }

    switchTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Show selected tab
        document.getElementById(`${tabName}-tab`)?.classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');

        this.currentTab = tabName;
    }

    renderVisits() {
        const visitsList = document.getElementById('visits-list');
        if (!visitsList) return;

        visitsList.innerHTML = this.data.todaysVisits.map(visit => `
            <div class="visit-card" data-farm-id="${visit.farmId}">
                <div class="visit-header">
                    <h4 class="farm-name">${visit.farmName}</h4>
                    <span class="visit-status ${visit.status.toLowerCase().replace(' ', '-')}">
                        ${visit.status}
                    </span>
                </div>
                <div class="visit-info">
                    <div><i class="fas fa-map-marker-alt"></i> ${visit.location}</div>
                    <div><i class="fas fa-clock"></i> ${visit.time}</div>
                    <div class="species-tag">
                        <i class="fas fa-${visit.species.toLowerCase() === 'poultry' ? 'dove' : 'pig'}"></i>
                        ${visit.species}
                    </div>
                    <div><i class="fas fa-user"></i> ${visit.contactPerson}</div>
                </div>
                <div class="visit-actions">
                    <button class="action-btn secondary" data-action="navigate">
                        <i class="fas fa-directions"></i> Navigate
                    </button>
                    <button class="action-btn primary" data-action="start-visit">
                        <i class="fas fa-play"></i> Start Visit
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderCases() {
        const casesList = document.getElementById('cases-list');
        if (!casesList) return;

        casesList.innerHTML = this.data.activeCases.map(caseItem => `
            <div class="case-card" data-case-id="${caseItem.caseId}">
                <div class="case-header">
                    <div class="case-farm">${caseItem.farmName}</div>
                    <span class="case-severity ${caseItem.severity.toLowerCase()}">${caseItem.severity}</span>
                </div>
                <div class="case-symptoms">
                    ${caseItem.symptoms.map(symptom => `<span class="symptom-tag">${symptom}</span>`).join('')}
                </div>
                <div class="case-meta">
                    <span>Status: ${caseItem.status}</span>
                    <span>Updated: ${new Date(caseItem.lastUpdate).toLocaleDateString()}</span>
                </div>
            </div>
        `).join('');
    }

    renderNotifications(filter = 'all') {
        const notificationsList = document.getElementById('notifications-list');
        if (!notificationsList) return;

        let filteredNotifications = this.data.notifications;
        if (filter !== 'all') {
            filteredNotifications = this.data.notifications.filter(notification => 
                notification.priority.toLowerCase() === filter.toLowerCase()
            );
        }

        notificationsList.innerHTML = filteredNotifications.map(notification => `
            <div class="notification-card ${notification.priority.toLowerCase()}" data-notification-id="${notification.id}">
                <div class="notification-header">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-time">${this.formatTimestamp(notification.timestamp)}</div>
                </div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-actions">
                    <button class="btn btn--outline" onclick="app.dismissNotification('${notification.id}')">
                        Dismiss
                    </button>
                    <button class="btn btn--primary" onclick="app.acknowledgeNotification('${notification.id}')">
                        Acknowledge
                    </button>
                </div>
            </div>
        `).join('');
    }

    filterNotifications(filter) {
        this.renderNotifications(filter);
    }

    handleQuickAction(action) {
        switch (action) {
            case 'new-case':
                this.openCaseModal();
                break;
            case 'alerts':
                this.switchTab('notifications');
                break;
            case 'scan':
                this.showScanner();
                break;
            case 'emergency':
                this.callEmergency();
                break;
        }
    }

    handleVisitAction(action, farmId) {
        const visit = this.data.todaysVisits.find(v => v.farmId === farmId);
        if (!visit) return;

        switch (action) {
            case 'navigate':
                this.navigateToFarm(visit);
                break;
            case 'start-visit':
                this.startVisit(visit);
                break;
        }
    }

    navigateToFarm(visit) {
        // Simulate GPS navigation
        this.showToast(`Opening navigation to ${visit.farmName}...`);
        // In real app, would integrate with maps API
    }

    startVisit(visit) {
        // Update visit status
        visit.status = 'In Progress';
        this.renderVisits();
        this.showToast(`Started visit to ${visit.farmName}`);
        
        // Switch to cases tab for logging
        setTimeout(() => {
            this.switchTab('cases');
        }, 1000);
    }

    setupModal() {
        const modal = document.getElementById('case-modal');
        const closeBtn = modal?.querySelector('.modal-close');
        const cancelBtn = document.getElementById('cancel-case');
        const saveBtn = document.getElementById('save-case');
        const certificateBtn = document.getElementById('generate-certificate');

        closeBtn?.addEventListener('click', () => this.closeCaseModal());
        cancelBtn?.addEventListener('click', () => this.closeCaseModal());
        saveBtn?.addEventListener('click', () => this.saveCaseDetails());
        certificateBtn?.addEventListener('click', () => this.generateCertificate());

        // Close modal on backdrop click
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeCaseModal();
            }
        });
    }

    openCaseModal(caseId = null) {
        const modal = document.getElementById('case-modal');
        if (!modal) return;

        if (caseId) {
            // Load existing case data
            const caseData = this.data.activeCases.find(c => c.caseId === caseId);
            if (caseData) {
                document.getElementById('case-farm').value = caseData.farmName;
                
                // Check symptoms
                const checkboxes = document.querySelectorAll('#symptom-checklist input[type="checkbox"]');
                checkboxes.forEach(cb => {
                    cb.checked = caseData.symptoms.some(symptom => 
                        symptom.toLowerCase().includes(cb.value.toLowerCase()) || 
                        cb.value.toLowerCase().includes(symptom.toLowerCase())
                    );
                });
                
                document.getElementById('case-followup').value = caseData.followUpDate;
            }
        } else {
            // Clear form for new case
            document.getElementById('case-farm').value = '';
            document.querySelectorAll('#symptom-checklist input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
            document.getElementById('case-diagnosis').value = '';
            document.getElementById('case-treatment').value = '';
            document.getElementById('case-followup').value = '';
        }

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeCaseModal() {
        const modal = document.getElementById('case-modal');
        modal?.classList.add('hidden');
        document.body.style.overflow = '';
    }

    saveCaseDetails() {
        const farmName = document.getElementById('case-farm').value;
        const diagnosis = document.getElementById('case-diagnosis').value;
        const treatment = document.getElementById('case-treatment').value;
        const followUpDate = document.getElementById('case-followup').value;
        
        const selectedSymptoms = Array.from(document.querySelectorAll('#symptom-checklist input:checked'))
            .map(cb => cb.value);

        if (!farmName || selectedSymptoms.length === 0) {
            this.showToast('Please fill in required fields');
            return;
        }

        // In real app, would save to backend
        this.showToast('Case saved successfully');
        this.closeCaseModal();
        
        // Refresh cases list
        this.renderCases();
    }

    generateCertificate() {
        this.showToast('Generating vaccination certificate...');
        // In real app, would generate PDF certificate
        setTimeout(() => {
            this.showToast('Certificate generated and saved');
        }, 2000);
    }

    setupCamera() {
        const captureBtn = document.querySelector('.capture-btn');
        const imagePreview = document.getElementById('image-preview');
        const capturedImage = document.getElementById('captured-image');
        const sendLabBtn = document.querySelector('.send-lab-btn');

        captureBtn?.addEventListener('click', () => {
            // Simulate camera capture since we can't access real camera
            this.simulateCameraCapture();
        });

        sendLabBtn?.addEventListener('click', () => {
            this.sendToLab();
        });
    }

    simulateCameraCapture() {
        const imagePreview = document.getElementById('image-preview');
        const capturedImage = document.getElementById('captured-image');
        
        // Use a placeholder image for simulation
        const placeholderImages = [
            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiPkNhcHR1cmVkIFNhbXBsZTwvdGV4dD48L3N2Zz4='
        ];
        
        capturedImage.src = placeholderImages[0];
        imagePreview?.classList.remove('hidden');
        
        this.showToast('Sample image captured');
    }

    sendToLab() {
        this.showToast('Sending sample to laboratory...');
        // Simulate lab submission
        setTimeout(() => {
            this.showToast('Sample sent to lab. Results will be available in 24-48 hours.');
        }, 2000);
    }

    showScanner() {
        this.showToast('Opening QR/Barcode scanner...');
        // In real app, would open camera scanner
    }

    callEmergency() {
        if (confirm('Call emergency veterinary services?')) {
            this.showToast('Connecting to emergency services...');
            // In real app, would initiate phone call
        }
    }

    acknowledgeNotification(notificationId) {
        // Remove notification from list
        this.data.notifications = this.data.notifications.filter(n => n.id !== notificationId);
        this.renderNotifications();
        this.showToast('Notification acknowledged');
    }

    dismissNotification(notificationId) {
        // Remove notification from list
        this.data.notifications = this.data.notifications.filter(n => n.id !== notificationId);
        this.renderNotifications();
        this.showToast('Notification dismissed');
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffMinutes < 60) {
            return `${diffMinutes}m ago`;
        } else if (diffHours < 24) {
            return `${diffHours}h ago`;
        } else {
            return date.toLocaleDateString();
        }
    }

    showToast(message) {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--color-surface);
            color: var(--color-text);
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            border: 1px solid var(--color-border);
            font-size: 14px;
            max-width: 300px;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.opacity = '1';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Utility methods for offline functionality
    saveToLocalStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.warn('Local storage not available');
        }
    }

    loadFromLocalStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.warn('Local storage not available');
            return null;
        }
    }

    // Initialize GPS location (simulated)
    getCurrentLocation() {
        return new Promise((resolve) => {
            // Simulate GPS coordinates for Mumbai
            setTimeout(() => {
                resolve({
                    latitude: 19.0760,
                    longitude: 72.8777,
                    accuracy: 10
                });
            }, 1000);
        });
    }

    // Voice input simulation
    startVoiceInput(targetElement) {
        this.showToast('Voice input not available in web version');
        // In real app, would use Speech Recognition API
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new VetApp();
});

// Service Worker registration for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Handle network status
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    app.showToast('Back online - syncing data...');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    app.showToast('Offline mode - data will sync when connection is restored');
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Handle device orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 500);
});