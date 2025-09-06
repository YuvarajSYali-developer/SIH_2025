// Maharashtra Animal Health Dashboard - Premium Application
class MaharashtraDashboard {
    constructor() {
        this.data = {
            state: "Maharashtra",
            districts: [
                {name: "Mumbai", farms: 1250, alerts: 3, vaccination_coverage: 87, mortality_rate: 2.1, risk_level: "low", lat: 19.0760, lng: 72.8777, ppe_compliance: 92, population: 12442373, area: 603},
                {name: "Pune", farms: 2100, alerts: 7, vaccination_coverage: 92, mortality_rate: 1.8, risk_level: "medium", lat: 18.5204, lng: 73.8567, ppe_compliance: 88, population: 9426959, area: 15642},
                {name: "Nashik", farms: 1800, alerts: 12, vaccination_coverage: 78, mortality_rate: 3.2, risk_level: "high", lat: 19.9975, lng: 73.7898, ppe_compliance: 65, population: 6107187, area: 15530},
                {name: "Aurangabad", farms: 1650, alerts: 5, vaccination_coverage: 85, mortality_rate: 2.5, risk_level: "medium", lat: 19.8762, lng: 75.3433, ppe_compliance: 83, population: 3701282, area: 10100},
                {name: "Nagpur", farms: 1420, alerts: 2, vaccination_coverage: 94, mortality_rate: 1.6, risk_level: "low", lat: 21.1458, lng: 79.0882, ppe_compliance: 95, population: 4653570, area: 9892},
                {name: "Thane", farms: 950, alerts: 4, vaccination_coverage: 89, mortality_rate: 2.3, risk_level: "medium", lat: 19.2183, lng: 72.9781, ppe_compliance: 87, population: 11060148, area: 9558},
                {name: "Kolhapur", farms: 1320, alerts: 6, vaccination_coverage: 81, mortality_rate: 2.8, risk_level: "medium", lat: 16.7050, lng: 74.2433, ppe_compliance: 79, population: 3876001, area: 7685}
            ],
            state_kpis: {
                total_farms: 12490,
                growth_percentage: 15.3,
                active_alerts: 39,
                vaccination_coverage: 86.8,
                mortality_rate: 2.31,
                overall_compliance: 84.1,
                revenue_impact: "₹2.4 Cr",
                farms_digital: 8943,
                ai_recommendations: 23
            },
            disease_outbreaks: [
                {disease: "Avian Influenza H5N1", districts_affected: 4, farms_affected: 78, severity: "high", trend: "increasing", lat: 19.9975, lng: 73.7898, confirmed_cases: 156, mortality: 23},
                {disease: "African Swine Fever", districts_affected: 2, farms_affected: 23, severity: "medium", trend: "stable", lat: 18.5204, lng: 73.8567, confirmed_cases: 45, mortality: 8},
                {disease: "Newcastle Disease", districts_affected: 3, farms_affected: 34, severity: "medium", trend: "decreasing", lat: 16.7050, lng: 74.2433, confirmed_cases: 67, mortality: 12},
                {disease: "Foot & Mouth Disease", districts_affected: 1, farms_affected: 12, severity: "low", trend: "stable", lat: 21.1458, lng: 79.0882, confirmed_cases: 24, mortality: 2}
            ],
            ai_recommendations: [
                {type: "Resource Allocation", priority: "high", recommendation: "Deploy 3 additional field teams to Nashik district due to predicted 40% increase in outbreak risk based on seasonal patterns and current PPE compliance rates", confidence: 0.91, impact: "High", timeline: "Immediate"},
                {type: "Policy Intervention", priority: "medium", recommendation: "Implement mandatory digital vaccination certificates in high-risk districts to improve traceability and reduce manual errors", confidence: 0.84, impact: "Medium", timeline: "2 weeks"},
                {type: "Preventive Action", priority: "high", recommendation: "Increase vaccine stock by 35% in Aurangabad and Kolhapur regions before monsoon season based on historical outbreak patterns", confidence: 0.87, impact: "High", timeline: "1 week"},
                {type: "Training Initiative", priority: "low", recommendation: "Conduct PPE compliance workshops in districts with <80% compliance rates, targeting 500 farmers per district", confidence: 0.78, impact: "Medium", timeline: "1 month"}
            ],
            compliance_metrics: {
                ppe_compliance_trend: [85, 87, 84, 86, 88, 84],
                vaccination_completion_trend: [78, 82, 85, 87, 86, 89],
                digital_adoption_trend: [45, 52, 58, 64, 69, 72],
                non_compliant_farms: [
                    {farm_name: "Sunrise Poultry Farm", district: "Nashik", compliance_score: 42, violations: ["Missing PPE", "Incomplete visitor logs", "Overdue vaccination"], last_audit: "2025-09-01"},
                    {farm_name: "Green Valley Pig Farm", district: "Pune", compliance_score: 48, violations: ["Poor hygiene standards", "No disinfection protocol"], last_audit: "2025-09-03"},
                    {farm_name: "Modern Poultry Unit", district: "Aurangabad", compliance_score: 51, violations: ["Environmental monitoring gaps", "Incomplete records"], last_audit: "2025-09-02"}
                ]
            },
            resource_allocation: {
                vaccine_demand: [
                    {month: "Jan", demand: 25000, stock: 28000, utilization: 89},
                    {month: "Feb", demand: 22000, stock: 25000, utilization: 88},
                    {month: "Mar", demand: 28000, stock: 26000, utilization: 107},
                    {month: "Apr", demand: 24000, stock: 27000, utilization: 89},
                    {month: "May", demand: 26000, stock: 29000, utilization: 90},
                    {month: "Jun", demand: 23000, stock: 25000, utilization: 92}
                ]
            }
        };
        
        this.charts = {};
        this.map = null;
        this.currentView = 'overview';
        this.notifications = [];
        this.isLoading = true;
        
        this.init();
    }

    async init() {
        console.log('🚀 Initializing Maharashtra Animal Health Dashboard...');
        
        // Show loading screen
        this.showLoadingScreen();
        
        // Initialize components
        await this.initializeComponents();
        
        // Hide loading screen
        setTimeout(() => {
            this.hideLoadingScreen();
            this.showWelcomeToast();
        }, 2000);
    }

    async initializeComponents() {
        try {
            // Core components
            this.setupNavigation();
            this.setupSearch();
            this.setupNotifications();
            this.setupKPICards();
            this.setupDistrictCards();
            
            // Wait for Leaflet to be available before initializing map
            if (typeof L !== 'undefined') {
                this.setupMap();
            } else {
                console.warn('Leaflet not available, map functionality disabled');
            }
            
            this.setupCharts();
            this.setupAIRecommendations();
            this.setupRealTimeUpdates();
            this.setupLiveFeed();
            this.setupModals();
            this.setupResponsive();
            
            console.log('✅ All components initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing components:', error);
            this.showToast('Error loading dashboard components', 'error');
        }
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'flex';
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    // Navigation System
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.getAttribute('data-view');
                this.switchView(view);
                
                // Update active state
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Mobile menu toggle
        this.setupMobileNavigation();
    }

    setupMobileNavigation() {
        // Create mobile menu button if on mobile
        if (window.innerWidth <= 768) {
            const header = document.querySelector('.header-left');
            if (header && !header.querySelector('.mobile-menu-btn')) {
                const mobileMenuBtn = document.createElement('button');
                mobileMenuBtn.className = 'mobile-menu-btn';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: var(--color-text);
                    font-size: 20px;
                    padding: 8px;
                    cursor: pointer;
                    margin-right: 16px;
                `;
                mobileMenuBtn.addEventListener('click', this.toggleMobileMenu.bind(this));
                header.insertBefore(mobileMenuBtn, header.firstChild);
            }
        }
    }

    toggleMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('mobile-open');
        }
    }

    switchView(viewName) {
        console.log('Switching to view:', viewName);
        
        // Hide all views
        const views = document.querySelectorAll('.view-content');
        views.forEach(view => view.classList.remove('active'));
        
        // Show target view
        const targetView = document.getElementById(viewName);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;
            
            // Handle view-specific logic
            this.handleViewSwitch(viewName);
        } else {
            console.warn('View not found:', viewName);
        }
    }

    handleViewSwitch(viewName) {
        switch (viewName) {
            case 'disease-map':
                setTimeout(() => {
                    if (this.map) {
                        this.map.invalidateSize();
                    } else {
                        console.log('Initializing map for disease-map view');
                        this.setupMap();
                    }
                }, 100);
                break;
            case 'analytics':
                setTimeout(() => {
                    this.refreshCharts();
                }, 100);
                break;
            case 'ai-insights':
                this.loadAIRecommendations();
                break;
            case 'compliance':
                this.loadComplianceData();
                break;
        }
    }

    // Search Functionality
    setupSearch() {
        const searchInput = document.getElementById('globalSearch');
        const suggestions = document.getElementById('searchSuggestions');
        
        if (!searchInput) return;
        
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();
            
            if (query.length < 2) {
                if (suggestions) suggestions.style.display = 'none';
                return;
            }
            
            searchTimeout = setTimeout(() => {
                this.performSearch(query, suggestions);
            }, 300);
        });
        
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                if (suggestions) suggestions.style.display = 'none';
            }, 200);
        });
    }

    performSearch(query, suggestionsEl) {
        if (!suggestionsEl) return;
        
        const results = [];
        const queryLower = query.toLowerCase();
        
        // Search districts
        this.data.districts.forEach(district => {
            if (district.name.toLowerCase().includes(queryLower)) {
                results.push({
                    type: 'district',
                    title: district.name,
                    subtitle: `${district.farms} farms, ${district.alerts} alerts`,
                    action: () => this.showDistrictDetails(district.name)
                });
            }
        });
        
        // Search diseases
        this.data.disease_outbreaks.forEach(outbreak => {
            if (outbreak.disease.toLowerCase().includes(queryLower)) {
                results.push({
                    type: 'disease',
                    title: outbreak.disease,
                    subtitle: `${outbreak.farms_affected} farms affected`,
                    action: () => this.showDiseaseDetails(outbreak)
                });
            }
        });
        
        this.displaySearchResults(results, suggestionsEl);
    }

    displaySearchResults(results, suggestionsEl) {
        if (results.length === 0) {
            suggestionsEl.style.display = 'none';
            return;
        }
        
        const html = results.map(result => `
            <div class="search-result" data-type="${result.type}">
                <div class="result-title">${result.title}</div>
                <div class="result-subtitle">${result.subtitle}</div>
            </div>
        `).join('');
        
        suggestionsEl.innerHTML = html;
        suggestionsEl.style.display = 'block';
        
        // Add click handlers
        suggestionsEl.querySelectorAll('.search-result').forEach((item, index) => {
            item.addEventListener('click', () => {
                results[index].action();
                suggestionsEl.style.display = 'none';
            });
        });
    }

    // Notification System
    setupNotifications() {
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationPanel = document.getElementById('notificationPanel');
        
        if (notificationBtn && notificationPanel) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isVisible = notificationPanel.style.display === 'block';
                notificationPanel.style.display = isVisible ? 'none' : 'block';
            });
            
            // Close notifications when clicking outside
            document.addEventListener('click', (e) => {
                if (!notificationBtn.contains(e.target) && !notificationPanel.contains(e.target)) {
                    notificationPanel.style.display = 'none';
                }
            });
        }
        
        this.generateNotifications();
    }

    generateNotifications() {
        this.notifications = [
            {
                type: 'high',
                icon: 'fas fa-exclamation-triangle',
                title: 'H5N1 Outbreak Alert',
                message: 'Nashik district - 78 farms affected',
                timestamp: '2 minutes ago',
                unread: true
            },
            {
                type: 'medium',
                icon: 'fas fa-syringe',
                title: 'Vaccination Milestone',
                message: 'Pune district reaches 92% coverage',
                timestamp: '15 minutes ago',
                unread: true
            },
            {
                type: 'low',
                icon: 'fas fa-check-circle',
                title: 'Compliance Audit Complete',
                message: 'Mumbai district - All farms cleared',
                timestamp: '1 hour ago',
                unread: false
            }
        ];
        
        this.updateNotificationPanel();
        this.updateNotificationCount();
    }

    updateNotificationPanel() {
        const panel = document.querySelector('.notification-list');
        if (!panel) return;
        
        const html = this.notifications.map(notif => `
            <div class="notification-item ${notif.type}-priority ${notif.unread ? 'unread' : ''}">
                <div class="notification-icon">
                    <i class="${notif.icon}"></i>
                </div>
                <div class="notification-content">
                    <h4>${notif.title}</h4>
                    <p>${notif.message}</p>
                    <span class="timestamp">${notif.timestamp}</span>
                </div>
            </div>
        `).join('');
        
        panel.innerHTML = html;
    }

    updateNotificationCount() {
        const count = this.notifications.filter(n => n.unread).length;
        const badge = document.querySelector('.notification-count');
        if (badge) {
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // KPI Cards with Animations
    setupKPICards() {
        this.animateCounters();
        this.setupKPIInteractions();
    }

    animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const current = target * easeOutCubic;
                
                if (counter.textContent.includes('%')) {
                    counter.textContent = `${current.toFixed(1)}%`;
                } else if (counter.textContent.includes(',')) {
                    counter.textContent = current.toLocaleString();
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    setupKPIInteractions() {
        const kpiCards = document.querySelectorAll('.kpi-card');
        
        kpiCards.forEach(card => {
            card.addEventListener('click', () => {
                const cardType = this.getKPICardType(card);
                this.showKPIDetails(cardType);
            });
        });
    }

    getKPICardType(card) {
        if (card.classList.contains('farms-card')) return 'farms';
        if (card.classList.contains('alerts-card')) return 'alerts';
        if (card.classList.contains('vaccination-card')) return 'vaccination';
        if (card.classList.contains('compliance-card')) return 'compliance';
        return 'general';
    }

    showKPIDetails(type) {
        const details = this.getKPIDetailsData(type);
        this.showModal(`${details.title} Details`, details.content);
    }

    getKPIDetailsData(type) {
        const data = {
            farms: {
                title: 'Farm Statistics',
                content: `
                    <div class="kpi-details">
                        <div class="detail-grid">
                            <div class="detail-item">
                                <span class="detail-label">Total Registered Farms</span>
                                <span class="detail-value">${this.data.state_kpis.total_farms.toLocaleString()}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Digital Farms</span>
                                <span class="detail-value">${this.data.state_kpis.farms_digital.toLocaleString()}</span>
                            </div>
                            <div class="detail-item">
                                <span class="detail-label">Monthly Growth</span>
                                <span class="detail-value">+${this.data.state_kpis.growth_percentage}%</span>
                            </div>
                        </div>
                        <div class="district-breakdown">
                            <h4>District Breakdown</h4>
                            ${this.data.districts.map(d => `
                                <div class="breakdown-item">
                                    <span>${d.name}</span>
                                    <span>${d.farms} farms</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `
            },
            alerts: {
                title: 'Alert Analysis',
                content: `
                    <div class="alert-details">
                        <div class="alert-summary">
                            <h4>Current Alerts: ${this.data.state_kpis.active_alerts}</h4>
                            <p>8% decrease from yesterday</p>
                        </div>
                        <div class="alert-breakdown">
                            ${this.data.districts.map(d => `
                                <div class="alert-item ${d.risk_level}-risk">
                                    <span class="district-name">${d.name}</span>
                                    <span class="alert-count">${d.alerts} alerts</span>
                                    <span class="risk-indicator">${d.risk_level} risk</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `
            },
            vaccination: {
                title: 'Vaccination Coverage',
                content: `
                    <div class="vaccination-details">
                        <div class="coverage-summary">
                            <h4>State Coverage: ${this.data.state_kpis.vaccination_coverage}%</h4>
                            <p>Target: 95% by December 2025</p>
                        </div>
                        <div class="district-coverage">
                            ${this.data.districts.map(d => `
                                <div class="coverage-item">
                                    <span class="district-name">${d.name}</span>
                                    <div class="coverage-bar">
                                        <div class="coverage-fill" style="width: ${d.vaccination_coverage}%"></div>
                                    </div>
                                    <span class="coverage-value">${d.vaccination_coverage}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `
            },
            compliance: {
                title: 'Compliance Metrics',
                content: `
                    <div class="compliance-details">
                        <div class="compliance-summary">
                            <h4>Overall Compliance: ${this.data.state_kpis.overall_compliance}%</h4>
                            <p>Stable trend this month</p>
                        </div>
                        <div class="compliance-breakdown">
                            ${this.data.districts.map(d => `
                                <div class="compliance-item">
                                    <span class="district-name">${d.name}</span>
                                    <span class="compliance-score ${d.ppe_compliance < 80 ? 'low' : d.ppe_compliance < 90 ? 'medium' : 'high'}">
                                        ${d.ppe_compliance}%
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `
            }
        };
        
        return data[type] || { title: 'Details', content: 'No details available.' };
    }

    // District Cards
    setupDistrictCards() {
        this.renderDistrictCards();
        this.setupDistrictFilters();
    }

    renderDistrictCards() {
        const container = document.querySelector('.districts-container');
        if (!container) return;
        
        const html = this.data.districts.map(district => `
            <div class="district-card ${district.risk_level}-risk" data-district="${district.name.toLowerCase()}">
                <div class="district-header">
                    <h3 class="district-name">${district.name}</h3>
                    <span class="risk-badge ${district.risk_level}-risk">${district.risk_level} risk</span>
                </div>
                <div class="district-stats">
                    <div class="stat-item">
                        <span class="stat-label">Farms</span>
                        <span class="stat-value">${district.farms.toLocaleString()}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Alerts</span>
                        <span class="stat-value">${district.alerts}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Vaccination</span>
                        <span class="stat-value">${district.vaccination_coverage}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Compliance</span>
                        <span class="stat-value">${district.ppe_compliance}%</span>
                    </div>
                </div>
                <div class="district-actions">
                    <button class="action-btn-sm" onclick="dashboard.showDistrictDetails('${district.name}')">View Details</button>
                    <button class="action-btn-sm" onclick="dashboard.focusOnDistrict('${district.name}')">Show on Map</button>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = html;
    }

    setupDistrictFilters() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const filter = tab.getAttribute('data-filter');
                this.applyDistrictFilter(filter);
                
                // Update active state
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    }

    applyDistrictFilter(filter) {
        const cards = document.querySelectorAll('.district-card');
        
        cards.forEach(card => {
            let show = true;
            
            switch (filter) {
                case 'high-risk':
                    show = card.classList.contains('high-risk');
                    break;
                case 'alerts':
                    const alertsElement = card.querySelector('.stat-value');
                    const alerts = alertsElement ? parseInt(alertsElement.nextElementSibling.textContent) : 0;
                    show = alerts > 5;
                    break;
                case 'all':
                default:
                    show = true;
            }
            
            card.style.display = show ? 'block' : 'none';
        });
    }

    // Interactive Map
    setupMap() {
        const mapContainer = document.getElementById('maharashtraMap');
        if (!mapContainer || typeof L === 'undefined') {
            console.warn('Leaflet not available or map container not found');
            return;
        }
        
        try {
            // Initialize Leaflet map
            if (this.map) {
                this.map.remove(); // Remove existing map
            }
            
            this.map = L.map('maharashtraMap').setView([19.7515, 75.7139], 7);
            
            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);
            
            // Add district markers
            this.addDistrictMarkers();
            this.addOutbreakMarkers();
            
            // Setup map controls
            this.setupMapControls();
            
            console.log('✅ Map initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing map:', error);
        }
    }

    addDistrictMarkers() {
        if (!this.map) return;
        
        this.data.districts.forEach(district => {
            const color = this.getRiskColor(district.risk_level);
            
            const marker = L.circleMarker([district.lat, district.lng], {
                radius: Math.sqrt(district.farms) / 5,
                fillColor: color,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.7
            }).addTo(this.map);
            
            const popupContent = `
                <div class="map-popup">
                    <h3>${district.name}</h3>
                    <div class="popup-stats">
                        <div class="popup-stat">
                            <span class="stat-label">Farms:</span>
                            <span class="stat-value">${district.farms}</span>
                        </div>
                        <div class="popup-stat">
                            <span class="stat-label">Alerts:</span>
                            <span class="stat-value">${district.alerts}</span>
                        </div>
                        <div class="popup-stat">
                            <span class="stat-label">Vaccination:</span>
                            <span class="stat-value">${district.vaccination_coverage}%</span>
                        </div>
                        <div class="popup-stat">
                            <span class="stat-label">Risk Level:</span>
                            <span class="stat-value risk-${district.risk_level}">${district.risk_level}</span>
                        </div>
                    </div>
                    <button class="btn-primary btn-sm" onclick="dashboard.showDistrictDetails('${district.name}')">
                        View Details
                    </button>
                </div>
            `;
            
            marker.bindPopup(popupContent);
        });
    }

    addOutbreakMarkers() {
        if (!this.map) return;
        
        this.data.disease_outbreaks.forEach(outbreak => {
            const marker = L.marker([outbreak.lat, outbreak.lng], {
                icon: L.divIcon({
                    className: `outbreak-marker ${outbreak.severity}-severity`,
                    html: `<div style="
                        background: ${outbreak.severity === 'high' ? '#ef4444' : outbreak.severity === 'medium' ? '#f59e0b' : '#10b981'};
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 16px;
                        border: 2px solid white;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    "><i class="fas fa-virus"></i></div>`,
                    iconSize: [30, 30]
                })
            }).addTo(this.map);
            
            const popupContent = `
                <div class="outbreak-popup">
                    <h3>${outbreak.disease}</h3>
                    <div class="outbreak-stats">
                        <p><strong>Farms Affected:</strong> ${outbreak.farms_affected}</p>
                        <p><strong>Confirmed Cases:</strong> ${outbreak.confirmed_cases}</p>
                        <p><strong>Mortality:</strong> ${outbreak.mortality}</p>
                        <p><strong>Trend:</strong> <span class="trend-${outbreak.trend}">${outbreak.trend}</span></p>
                    </div>
                    <div class="severity-badge ${outbreak.severity}">
                        ${outbreak.severity.toUpperCase()} SEVERITY
                    </div>
                </div>
            `;
            
            marker.bindPopup(popupContent);
        });
    }

    setupMapControls() {
        const layerBtns = document.querySelectorAll('.layer-btn');
        
        layerBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const layer = btn.getAttribute('data-layer');
                this.switchMapLayer(layer);
                
                // Update active state
                layerBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Fullscreen toggle
        const fullscreenBtn = document.getElementById('fullscreenMap');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleMapFullscreen();
            });
        }
    }

    switchMapLayer(layerType) {
        console.log(`Switching to ${layerType} layer`);
        this.showToast(`Switched to ${layerType} view`, 'info');
    }

    getRiskColor(riskLevel) {
        const colors = {
            high: '#ef4444',
            medium: '#f59e0b',
            low: '#10b981'
        };
        return colors[riskLevel] || '#6b7280';
    }

    // Charts Setup
    setupCharts() {
        // Wait for Chart.js to be available
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not available, charts disabled');
            return;
        }
        
        this.createFarmsSparkline();
        this.createOutbreakTrendsChart();
        this.createResourceChart();
        this.createVaccinationChart();
    }

    createFarmsSparkline() {
        const ctx = document.getElementById('farmsSparkline');
        if (!ctx || typeof Chart === 'undefined') return;
        
        this.charts.farmsSparkline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    data: [11200, 11500, 11800, 12100, 12300, 12490],
                    borderColor: '#1FB8CD',
                    backgroundColor: 'rgba(31, 184, 205, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
    }

    createOutbreakTrendsChart() {
        const ctx = document.getElementById('outbreakTrendsChart');
        if (!ctx || typeof Chart === 'undefined') return;
        
        this.charts.outbreakTrends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'H5N1 Cases',
                        data: [12, 18, 25, 30, 45, 78],
                        borderColor: '#B4413C',
                        backgroundColor: 'rgba(180, 65, 60, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'ASF Cases',
                        data: [5, 8, 12, 15, 18, 23],
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
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
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Cases'
                        }
                    }
                }
            }
        });
    }

    createResourceChart() {
        const ctx = document.getElementById('resourceChart');
        if (!ctx || typeof Chart === 'undefined') return;
        
        this.charts.resource = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data.resource_allocation.vaccine_demand.map(d => d.month),
                datasets: [
                    {
                        label: 'Demand',
                        data: this.data.resource_allocation.vaccine_demand.map(d => d.demand),
                        backgroundColor: '#1FB8CD',
                        borderRadius: 4
                    },
                    {
                        label: 'Stock',
                        data: this.data.resource_allocation.vaccine_demand.map(d => d.stock),
                        backgroundColor: '#5D878F',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Doses'
                        }
                    }
                }
            }
        });
    }

    createVaccinationChart() {
        const ctx = document.getElementById('vaccinationChart');
        if (!ctx || typeof Chart === 'undefined') return;
        
        this.charts.vaccination = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.data.districts.map(d => d.name),
                datasets: [{
                    data: this.data.districts.map(d => d.vaccination_coverage),
                    backgroundColor: [
                        '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', 
                        '#5D878F', '#DB4545', '#D2BA4C'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }

    refreshCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.update === 'function') {
                chart.update();
            }
        });
    }

    // AI Recommendations
    setupAIRecommendations() {
        this.loadAIRecommendations();
        this.setupAIFilters();
        this.setupAIActions();
    }

    loadAIRecommendations() {
        const container = document.querySelector('.recommendations-list');
        if (!container) return;
        
        const html = this.data.ai_recommendations.map((rec, index) => `
            <div class="recommendation-item ${rec.priority}-priority" data-id="${index}">
                <div class="recommendation-header">
                    <div class="rec-type">${rec.type}</div>
                    <div class="rec-priority ${rec.priority}">${rec.priority.toUpperCase()}</div>
                </div>
                <div class="rec-content">
                    <p>${rec.recommendation}</p>
                </div>
                <div class="rec-meta">
                    <div class="confidence-meter">
                        <span>Confidence: ${Math.round(rec.confidence * 100)}%</span>
                        <div class="confidence-bar">
                            <div class="confidence-fill" style="width: ${rec.confidence * 100}%"></div>
                        </div>
                    </div>
                    <div class="rec-timeline">Timeline: ${rec.timeline}</div>
                </div>
                <div class="rec-actions">
                    <button class="action-btn accept" onclick="dashboard.acceptRecommendation(${index})">
                        <i class="fas fa-check"></i>
                        Implement
                    </button>
                    <button class="action-btn dismiss" onclick="dashboard.dismissRecommendation(${index})">
                        <i class="fas fa-times"></i>
                        Dismiss
                    </button>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = html;
    }

    setupAIFilters() {
        const filters = document.querySelectorAll('.priority-filter');
        
        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                const priority = filter.getAttribute('data-priority');
                this.filterRecommendations(priority);
                
                // Update active state
                filters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
            });
        });
    }

    filterRecommendations(priority) {
        const items = document.querySelectorAll('.recommendation-item');
        
        items.forEach(item => {
            if (priority === 'all' || item.classList.contains(`${priority}-priority`)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    setupAIActions() {
        // AI action handlers are set up via onclick attributes in HTML
    }

    acceptRecommendation(index) {
        const recommendation = this.data.ai_recommendations[index];
        this.showToast(`Implementing: ${recommendation.type}`, 'success');
        
        // Remove from list
        const item = document.querySelector(`[data-id="${index}"]`);
        if (item) {
            item.style.opacity = '0.5';
            item.style.pointerEvents = 'none';
        }
    }

    dismissRecommendation(index) {
        const recommendation = this.data.ai_recommendations[index];
        this.showToast(`Dismissed: ${recommendation.type}`, 'info');
        
        // Remove from list
        const item = document.querySelector(`[data-id="${index}"]`);
        if (item) {
            item.remove();
        }
    }

    // Real-time Updates
    setupRealTimeUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            this.updateLiveData();
        }, 30000); // Update every 30 seconds
        
        // Update timestamps
        setInterval(() => {
            this.updateTimestamps();
        }, 60000); // Update every minute
    }

    updateLiveData() {
        // Simulate random data changes
        const randomDistrict = this.data.districts[Math.floor(Math.random() * this.data.districts.length)];
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        
        randomDistrict.alerts = Math.max(0, randomDistrict.alerts + change);
        
        // Update UI
        this.updateKPIValues();
        this.addLiveFeedItem(`Alert update in ${randomDistrict.name} district`);
        
        if (change > 0) {
            this.showToast(`New alert in ${randomDistrict.name}`, 'warning');
        }
    }

    updateKPIValues() {
        const totalAlerts = this.data.districts.reduce((sum, d) => sum + d.alerts, 0);
        this.data.state_kpis.active_alerts = totalAlerts;
        
        // Update display
        const alertsValue = document.querySelector('.alerts-card .kpi-value');
        if (alertsValue) {
            alertsValue.textContent = totalAlerts;
        }
    }

    updateTimestamps() {
        const timestamps = document.querySelectorAll('.timestamp');
        timestamps.forEach(ts => {
            // Update relative timestamps
            // This is a simplified version - in reality, you'd calculate based on actual timestamps
        });
    }

    // Live Feed
    setupLiveFeed() {
        const feedToggle = document.getElementById('feedToggle');
        const liveFeed = document.getElementById('liveFeed');
        
        if (feedToggle && liveFeed) {
            feedToggle.addEventListener('click', () => {
                liveFeed.classList.toggle('collapsed');
            });
        }
        
        // Add initial feed items
        this.addLiveFeedItem('Dashboard initialized successfully');
        this.addLiveFeedItem('Real-time monitoring active');
    }

    addLiveFeedItem(message) {
        const feedContent = document.querySelector('.feed-content');
        if (!feedContent) return;
        
        const time = new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        const item = document.createElement('div');
        item.className = 'feed-item';
        item.innerHTML = `
            <div class="feed-time">${time}</div>
            <div class="feed-message">${message}</div>
        `;
        
        feedContent.insertBefore(item, feedContent.firstChild);
        
        // Keep only last 10 items
        const items = feedContent.querySelectorAll('.feed-item');
        if (items.length > 10) {
            items[items.length - 1].remove();
        }
    }

    // Modal System
    setupModals() {
        this.setupQuickActions();
        this.setupEmergencyAlert();
    }

    setupQuickActions() {
        const quickActionBtn = document.getElementById('quickAction');
        if (quickActionBtn) {
            quickActionBtn.addEventListener('click', () => {
                this.showQuickActionModal();
            });
        }
    }

    setupEmergencyAlert() {
        const emergencyBtn = document.getElementById('emergencyAlert');
        if (emergencyBtn) {
            emergencyBtn.addEventListener('click', () => {
                this.showEmergencyAlertModal();
            });
        }
    }

    showModal(title, content, actions = '') {
        const modalContainer = document.getElementById('modalContainer');
        if (!modalContainer) return;
        
        const html = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="dashboard.closeModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${actions ? `<div class="modal-actions">${actions}</div>` : ''}
            </div>
        `;
        
        modalContainer.innerHTML = html;
        modalContainer.classList.add('active');
        
        // Close on overlay click
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                this.closeModal();
            }
        });
        
        // Close on escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    closeModal() {
        const modalContainer = document.getElementById('modalContainer');
        if (modalContainer) {
            modalContainer.classList.remove('active');
            modalContainer.innerHTML = '';
        }
    }

    showQuickActionModal() {
        const content = `
            <div class="quick-actions">
                <div class="action-grid">
                    <button class="quick-action-btn" onclick="dashboard.quickAction('alert')">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Create Alert</span>
                    </button>
                    <button class="quick-action-btn" onclick="dashboard.quickAction('vaccination')">
                        <i class="fas fa-syringe"></i>
                        <span>Schedule Vaccination</span>
                    </button>
                    <button class="quick-action-btn" onclick="dashboard.quickAction('inspection')">
                        <i class="fas fa-search"></i>
                        <span>Schedule Inspection</span>
                    </button>
                    <button class="quick-action-btn" onclick="dashboard.quickAction('report')">
                        <i class="fas fa-file-alt"></i>
                        <span>Generate Report</span>
                    </button>
                </div>
            </div>
        `;
        
        this.showModal('Quick Actions', content);
    }

    showEmergencyAlertModal() {
        const content = `
            <div class="emergency-form">
                <div class="alert-warning">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>This will send immediate alerts to all district officers and field teams.</p>
                </div>
                <form id="emergencyForm">
                    <div class="form-group">
                        <label>Alert Type</label>
                        <select class="form-control" required>
                            <option value="outbreak">Disease Outbreak</option>
                            <option value="contamination">Feed Contamination</option>
                            <option value="environmental">Environmental Hazard</option>
                            <option value="other">Other Emergency</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Affected Districts</label>
                        <div class="checkbox-group">
                            ${this.data.districts.map(d => `
                                <label class="checkbox-label">
                                    <input type="checkbox" value="${d.name}">
                                    <span>${d.name}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Emergency Message</label>
                        <textarea class="form-control" rows="4" required 
                                  placeholder="Describe the emergency situation..."></textarea>
                    </div>
                </form>
            </div>
        `;
        
        const actions = `
            <button class="btn-secondary" onclick="dashboard.closeModal()">Cancel</button>
            <button class="btn-primary emergency" onclick="dashboard.sendEmergencyAlert()">
                <i class="fas fa-broadcast-tower"></i>
                Send Emergency Alert
            </button>
        `;
        
        this.showModal('Emergency Alert System', content, actions);
    }

    quickAction(type) {
        this.closeModal();
        this.showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} action initiated`, 'success');
    }

    sendEmergencyAlert() {
        this.closeModal();
        this.showToast('Emergency alert sent to all field teams', 'warning');
    }

    // Toast Notifications
    showToast(message, type = 'info', duration = 4000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        toast.innerHTML = `
            <div class="toast-content">
                <i class="${icons[type] || icons.info}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, duration);
    }

    showWelcomeToast() {
        this.showToast('Welcome to Maharashtra Animal Health Dashboard', 'success', 6000);
    }

    // Responsive Design
    setupResponsive() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile && this.map) {
            setTimeout(() => {
                this.map.invalidateSize();
            }, 100);
        }
        
        // Update chart responsiveness
        this.refreshCharts();
    }

    // Helper Methods
    showDistrictDetails(districtName) {
        const district = this.data.districts.find(d => d.name === districtName);
        if (!district) return;
        
        const content = `
            <div class="district-details">
                <div class="district-overview">
                    <h4>${district.name} District Overview</h4>
                    <div class="risk-indicator ${district.risk_level}">
                        ${district.risk_level.toUpperCase()} RISK LEVEL
                    </div>
                </div>
                <div class="detail-stats">
                    <div class="stat-row">
                        <span>Total Farms:</span>
                        <span>${district.farms.toLocaleString()}</span>
                    </div>
                    <div class="stat-row">
                        <span>Active Alerts:</span>
                        <span>${district.alerts}</span>
                    </div>
                    <div class="stat-row">
                        <span>Vaccination Coverage:</span>
                        <span>${district.vaccination_coverage}%</span>
                    </div>
                    <div class="stat-row">
                        <span>PPE Compliance:</span>
                        <span>${district.ppe_compliance}%</span>
                    </div>
                    <div class="stat-row">
                        <span>Mortality Rate:</span>
                        <span>${district.mortality_rate}%</span>
                    </div>
                    <div class="stat-row">
                        <span>Population:</span>
                        <span>${district.population.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(`${district.name} District`, content);
    }

    focusOnDistrict(districtName) {
        const district = this.data.districts.find(d => d.name === districtName);
        if (!district) {
            this.showToast(`District ${districtName} not found`, 'error');
            return;
        }
        
        // Switch to map view
        this.switchView('disease-map');
        
        // Update nav state
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        const mapNavItem = document.querySelector('[data-view="disease-map"]');
        if (mapNavItem) {
            mapNavItem.classList.add('active');
        }
        
        // Focus on district
        setTimeout(() => {
            if (this.map) {
                this.map.setView([district.lat, district.lng], 10);
                this.showToast(`Focused on ${districtName}`, 'info');
            } else {
                this.showToast('Map not available', 'error');
            }
        }, 500);
    }

    showDiseaseDetails(outbreak) {
        const content = `
            <div class="disease-details">
                <h4>${outbreak.disease}</h4>
                <div class="severity-badge ${outbreak.severity}">
                    ${outbreak.severity.toUpperCase()} SEVERITY
                </div>
                <div class="outbreak-stats">
                    <div class="stat-item">
                        <span>Districts Affected:</span>
                        <span>${outbreak.districts_affected}</span>
                    </div>
                    <div class="stat-item">
                        <span>Farms Affected:</span>
                        <span>${outbreak.farms_affected}</span>
                    </div>
                    <div class="stat-item">
                        <span>Confirmed Cases:</span>
                        <span>${outbreak.confirmed_cases}</span>
                    </div>
                    <div class="stat-item">
                        <span>Mortality:</span>
                        <span>${outbreak.mortality}</span>
                    </div>
                    <div class="stat-item">
                        <span>Trend:</span>
                        <span class="trend-${outbreak.trend}">${outbreak.trend}</span>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal('Disease Outbreak Details', content);
    }

    loadComplianceData() {
        const tableContainer = document.querySelector('.farms-table');
        if (!tableContainer) return;
        
        const html = `
            <div class="table-header">
                <span>Farm Name</span>
                <span>District</span>
                <span>Compliance Score</span>
                <span>Last Audit</span>
                <span>Actions</span>
            </div>
            <div class="table-body">
                ${this.data.compliance_metrics.non_compliant_farms.map(farm => `
                    <div class="table-row">
                        <div class="table-cell">${farm.farm_name}</div>
                        <div class="table-cell">${farm.district}</div>
                        <div class="table-cell">
                            <span class="compliance-score ${farm.compliance_score < 50 ? 'low' : 'medium'}">
                                ${farm.compliance_score}%
                            </span>
                        </div>
                        <div class="table-cell">${farm.last_audit}</div>
                        <div class="table-cell">
                            <button class="btn-sm btn-primary" onclick="dashboard.scheduleAudit('${farm.farm_name}')">
                                Schedule Audit
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        tableContainer.innerHTML = html;
    }

    scheduleAudit(farmName) {
        this.showToast(`Audit scheduled for ${farmName}`, 'success');
    }

    toggleMapFullscreen() {
        const mapContainer = document.querySelector('.map-container');
        if (!mapContainer) return;
        
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            mapContainer.requestFullscreen();
        }
        
        setTimeout(() => {
            if (this.map) {
                this.map.invalidateSize();
            }
        }, 100);
    }
}

// Initialize Dashboard
let dashboard;

function initializeDashboard() {
    console.log('🚀 Starting Maharashtra Animal Health Dashboard...');
    dashboard = new MaharashtraDashboard();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
    initializeDashboard();
}

// Global utility functions
window.dashboard = dashboard;

// Add required CSS animations and styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Search Results */
    .search-result {
        padding: 12px 16px;
        cursor: pointer;
        border-bottom: 1px solid var(--color-border);
        transition: background-color 0.2s ease;
    }
    
    .search-result:hover {
        background-color: var(--color-secondary);
    }
    
    .result-title {
        font-weight: 500;
        color: var(--color-text);
        margin-bottom: 4px;
    }
    
    .result-subtitle {
        font-size: 12px;
        color: var(--color-text-secondary);
    }
    
    /* Map Popup Styles */
    .map-popup {
        min-width: 200px;
    }
    
    .popup-stats {
        margin: 12px 0;
    }
    
    .popup-stat {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
        font-size: 14px;
    }
    
    /* Modal Styles */
    .modal {
        background: var(--color-surface);
        border-radius: 16px;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: var(--shadow-lg);
    }
    
    .modal-header {
        padding: 24px;
        border-bottom: 1px solid var(--color-border);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h3 {
        margin: 0;
        color: var(--color-text);
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 20px;
        color: var(--color-text-secondary);
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    
    .modal-close:hover {
        background: var(--color-secondary);
        color: var(--color-text);
    }
    
    .modal-body {
        padding: 24px;
        max-height: 60vh;
        overflow-y: auto;
    }
    
    .modal-actions {
        padding: 24px;
        border-top: 1px solid var(--color-border);
        display: flex;
        gap: 12px;
        justify-content: flex-end;
    }
    
    /* Toast Styles */
    .toast {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
        animation: slideInRight 0.3s ease-out;
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .toast-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        padding: 4px;
        opacity: 0.7;
        transition: opacity 0.2s ease;
    }
    
    .toast-close:hover {
        opacity: 1;
    }
    
    /* Detail styles */
    .detail-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        margin-bottom: 24px;
    }
    
    .detail-item {
        display: flex;
        justify-content: space-between;
        padding: 12px;
        background: var(--color-bg-1);
        border-radius: 8px;
    }
    
    .detail-label {
        color: var(--color-text-secondary);
        font-size: 14px;
    }
    
    .detail-value {
        font-weight: 600;
        color: var(--color-text);
    }
    
    .breakdown-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--color-border);
    }
    
    .stat-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--color-border);
    }
    
    .risk-indicator {
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 16px;
    }
    
    .risk-indicator.high {
        background: rgba(var(--color-error-rgb), 0.15);
        color: var(--color-error);
    }
    
    .risk-indicator.medium {
        background: rgba(var(--color-warning-rgb), 0.15);
        color: var(--color-warning);
    }
    
    .risk-indicator.low {
        background: rgba(var(--color-success-rgb), 0.15);
        color: var(--color-success);
    }
    
    .coverage-bar {
        flex: 1;
        height: 8px;
        background: var(--color-secondary);
        border-radius: 4px;
        overflow: hidden;
        margin: 0 12px;
    }
    
    .coverage-fill {
        height: 100%;
        background: var(--color-primary);
        transition: width 0.5s ease;
    }
    
    .coverage-item {
        display: flex;
        align-items: center;
        padding: 8px 0;
        border-bottom: 1px solid var(--color-border);
    }
    
    .district-name {
        min-width: 100px;
    }
    
    .coverage-value {
        min-width: 50px;
        text-align: right;
        font-weight: 600;
    }
    
    .compliance-score.low {
        color: var(--color-error);
    }
    
    .compliance-score.medium {
        color: var(--color-warning);
    }
    
    .compliance-score.high {
        color: var(--color-success);
    }
    
    /* Table styles */
    .table-header {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        gap: 16px;
        padding: 16px 20px;
        background: var(--color-bg-1);
        font-weight: 600;
        font-size: 14px;
        color: var(--color-text);
        border-radius: 8px 8px 0 0;
    }
    
    .table-body {
        background: var(--color-surface);
        border-radius: 0 0 8px 8px;
    }
    
    .table-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        gap: 16px;
        padding: 16px 20px;
        border-bottom: 1px solid var(--color-border);
        align-items: center;
    }
    
    .table-row:last-child {
        border-bottom: none;
    }
    
    .table-cell {
        font-size: 14px;
        color: var(--color-text);
    }
    
    .btn-sm {
        padding: 6px 12px;
        font-size: 12px;
        border-radius: 6px;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .btn-primary {
        background: var(--color-primary);
        color: var(--color-white);
    }
    
    .btn-primary:hover {
        background: var(--color-primary-hover);
    }
    
    /* Quick Actions */
    .action-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
    }
    
    .quick-action-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 24px;
        background: var(--color-surface);
        border: 2px solid var(--color-border);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--color-text);
    }
    
    .quick-action-btn:hover {
        border-color: var(--color-primary);
        background: var(--color-bg-1);
        transform: translateY(-2px);
    }
    
    .quick-action-btn i {
        font-size: 24px;
        color: var(--color-primary);
    }
    
    /* Emergency Form */
    .emergency-form .alert-warning {
        background: var(--color-bg-4);
        border: 1px solid rgba(var(--color-error-rgb), 0.3);
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--color-error);
    }
    
    .checkbox-group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        margin-top: 8px;
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 8px;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }
    
    .checkbox-label:hover {
        background: var(--color-secondary);
    }
    
    /* Recommendation Items */
    .recommendation-item {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 16px;
        transition: all 0.2s ease;
    }
    
    .recommendation-item:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
    }
    
    .recommendation-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }
    
    .rec-type {
        font-weight: 600;
        color: var(--color-primary);
        font-size: 14px;
    }
    
    .rec-priority {
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
    }
    
    .rec-priority.high {
        background: rgba(var(--color-error-rgb), 0.15);
        color: var(--color-error);
    }
    
    .rec-priority.medium {
        background: rgba(var(--color-warning-rgb), 0.15);
        color: var(--color-warning);
    }
    
    .rec-priority.low {
        background: rgba(var(--color-success-rgb), 0.15);
        color: var(--color-success);
    }
    
    .rec-content p {
        margin: 0;
        line-height: 1.5;
        color: var(--color-text);
    }
    
    .rec-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0;
        font-size: 14px;
    }
    
    .confidence-meter {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .confidence-bar {
        width: 80px;
        height: 4px;
        background: var(--color-secondary);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .confidence-fill {
        height: 100%;
        background: var(--color-success);
        transition: width 0.5s ease;
    }
    
    .rec-timeline {
        color: var(--color-text-secondary);
    }
    
    .rec-actions {
        display: flex;
        gap: 8px;
    }
    
    /* Mobile Optimizations */
    @media (max-width: 768px) {
        .modal {
            margin: 20px;
            max-width: none;
            width: calc(100% - 40px);
        }
        
        .action-grid {
            grid-template-columns: 1fr;
        }
        
        .checkbox-group {
            grid-template-columns: 1fr;
        }
        
        .rec-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
        }
        
        .detail-grid {
            grid-template-columns: 1fr;
        }
        
        .table-header,
        .table-row {
            grid-template-columns: 1fr;
            gap: 8px;
        }
        
        .table-cell {
            padding: 4px 0;
        }
    }
    
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
`;
document.head.appendChild(additionalStyles);

// Handle window events
window.addEventListener('resize', () => {
    if (window.dashboard && window.dashboard.handleResize) {
        window.dashboard.handleResize();
    }
});

window.addEventListener('beforeunload', () => {
    console.log('👋 Maharashtra Animal Health Dashboard shutting down...');
});