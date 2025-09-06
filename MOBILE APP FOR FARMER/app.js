// Smallholder Farmer Mobile App - JavaScript
// Optimized for 414x896 pixel frame - Fixed with Event Listeners

// App Data and State Management - Karnataka Region
const appData = {
  farmer: {
    name: "राजेश कुमार गौड़ा",
    name_english: "Rajesh Kumar Gowda",
    name_kannada: "ರಾಜೇಶ್ ಕುಮಾರ್ ಗೌಡ",
    farm_name: "श्री लक्ष्मी पोल्ट्री फार्म",
    farm_name_english: "Sri Lakshmi Poultry Farm",
    farm_name_kannada: "ಶ್ರೀ ಲಕ್ಷ್ಮೀ ಪೋಲ್ಟ್ರಿ ಫಾರ್ಮ್",
    farm_id: "KA-BLR-002",
    phone: "+91 9845123456",
    location: "Devanahalli Taluk, Bengaluru Rural",
    location_kannada: "ದೇವನಹಳ್ಳಿ ತಾಲೂಕು, ಬೆಂಗಳೂರು ಗ್ರಾಮೀಣ",
    animal_count: 750,
    district: "Bengaluru Rural",
    state: "Karnataka",
    pin_code: "562110"
  },
  emergency_contacts: [
    {
      name: "Dr. Suresh Nayak",
      name_kannada: "ಡಾ. ಸುರೇಶ್ ನಾಯಕ್",
      role: "Veterinarian", 
      phone: "+91 9845234567",
      location: "Devanahalli"
    },
    {
      name: "Karnataka Animal Hospital",
      name_kannada: "ಕರ್ನಾಟಕ ಪಶು ಆಸ್ಪತ್ರೆ",
      role: "Emergency",
      phone: "+91 9845345678",
      location: "Bengaluru"
    },
    {
      name: "KVAFSU Helpline",
      name_kannada: "ಕೆವಿಎಎಫ್ಎಸ್ಯು ಸಹಾಯವಾಣಿ",
      role: "University Support",
      phone: "+91 9845456789",
      location: "Bidar"
    }
  ],
  market_data: {
    current_price: 88,
    currency: "₹/kg",
    trend: "up",
    market_location: "KR Market, Bengaluru",
    last_updated: "Today 3:00 PM"
  }
};

// Current app state
let currentTab = 'dashboard';
let currentScanType = 'visitor';
let isScanning = false;
let currentMonth = 8; // September (0-indexed)
let currentYear = 2025;
let isVoicePlaying = false;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🌾 DOM Loaded - Initializing App...');
  initializeApp();
});

// Initialize the application
function initializeApp() {
  console.log('🌾 Initializing Kisan Sahayak App...');
  
  // Setup all event listeners first
  setupEventListeners();
  
  // Set initial tab
  setTimeout(() => {
    switchTab('dashboard');
  }, 100);
  
  // Initialize other components
  updateNetworkStatus();
  updateCalendar();
  
  // Show welcome message
  setTimeout(() => {
    showToast('🏠 किसान सहायक में आपका स्वागत है - Welcome to Kisan Sahayak', 'success');
  }, 1000);
  
  console.log('✅ Kisan Sahayak App Ready');
}

// Setup all event listeners
function setupEventListeners() {
  console.log('🔧 Setting up event listeners...');
  
  // Bottom Navigation Event Listeners
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(navItem => {
    navItem.addEventListener('click', function(e) {
      e.preventDefault();
      const tabName = this.getAttribute('data-tab');
      console.log('🧭 Nav clicked:', tabName);
      if (tabName) {
        switchTab(tabName);
      }
    });
  });
  
  // Voice Assistant Button
  const voiceAssistantBtn = document.getElementById('voiceAssistantBtn');
  if (voiceAssistantBtn) {
    voiceAssistantBtn.addEventListener('click', activateVoiceAssistant);
  }
  
  // Voice Play Button with Ripple Effect
  const voicePlayBtn = document.getElementById('voicePlayBtn');
  if (voicePlayBtn) {
    voicePlayBtn.addEventListener('click', function(e) {
      createRippleEffect(e, this);
      playVoice();
    });
  }
  
  // Emergency Button
  const emergencyBtn = document.getElementById('emergencyBtn');
  if (emergencyBtn) {
    emergencyBtn.addEventListener('click', () => callEmergency('vet'));
  }
  
  // Market Button
  const marketBtn = document.getElementById('marketBtn');
  if (marketBtn) {
    marketBtn.addEventListener('click', openMarketPrices);
  }
  
  // Scan Type Buttons
  const scanTypeButtons = document.querySelectorAll('.scan-option-btn');
  scanTypeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const scanType = this.getAttribute('data-scan-type');
      setScanType(scanType);
    });
  });
  
  // Scan Button
  const scanBtn = document.getElementById('scanBtn');
  if (scanBtn) {
    scanBtn.addEventListener('click', simulateScan);
  }
  
  // Close Scan Result Button
  const closeScanBtn = document.getElementById('closeScanBtn');
  if (closeScanBtn) {
    closeScanBtn.addEventListener('click', closeScanResult);
  }
  
  // Calendar Navigation
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');
  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => changeMonth(-1));
  }
  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => changeMonth(1));
  }
  
  // Call Veterinarian Button
  const callVetBtn = document.getElementById('callVetBtn');
  if (callVetBtn) {
    callVetBtn.addEventListener('click', () => callEmergency('vet'));
  }
  
  // Alert Voice Buttons
  const voiceBtns = document.querySelectorAll('.voice-btn');
  voiceBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const alertType = this.getAttribute('data-alert-type');
      playAlertVoice(alertType);
    });
  });
  
  // More Tab Buttons
  const moreButtons = {
    'trainingBtn': openTraining,
    'marketPricesBtn': openMarketPrices,
    'weatherBtn': openWeatherForecast,
    'emergencyContactsBtn': openEmergencyContacts,
    'helpBtn': openHelp,
    'settingsBtn': openSettings,
    'profileBtn': openProfile,
    'schemesBtn': openSchemes,
    'chatBtn': openChat
  };
  
  Object.keys(moreButtons).forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', moreButtons[btnId]);
    }
  });
  
  // Touch feedback for mobile
  document.addEventListener('touchstart', function(e) {
    const target = e.target.closest('.btn') || 
                   e.target.closest('.nav-item') || 
                   e.target.closest('.more-item') ||
                   e.target.closest('.status-card') ||
                   e.target.closest('.alert-item') ||
                   e.target.closest('.scan-option-btn') ||
                   e.target.closest('.quick-action-btn');
    
    if (target) {
      target.style.opacity = '0.7';
    }
  }, { passive: true });
  
  document.addEventListener('touchend', function(e) {
    const target = e.target.closest('.btn') || 
                   e.target.closest('.nav-item') || 
                   e.target.closest('.more-item') ||
                   e.target.closest('.status-card') ||
                   e.target.closest('.alert-item') ||
                   e.target.closest('.scan-option-btn') ||
                   e.target.closest('.quick-action-btn');
    
    if (target) {
      setTimeout(() => {
        target.style.opacity = '';
      }, 150);
    }
  }, { passive: true });
  
  console.log('✅ Event listeners setup complete');
}

// Tab switching functionality
function switchTab(tabName) {
  console.log('🔄 Switching to tab:', tabName);
  
  try {
    // Hide all tab contents
    const allTabs = document.querySelectorAll('.tab-content');
    allTabs.forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Remove active class from all nav items
    const allNavItems = document.querySelectorAll('.nav-item');
    allNavItems.forEach(nav => {
      nav.classList.remove('active');
    });
    
    // Show selected tab
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
      targetTab.classList.add('active');
      console.log('✅ Added active to tab:', tabName);
    } else {
      console.error('❌ Tab not found:', tabName);
      return false;
    }
    
    // Add active class to corresponding nav item
    const tabNames = ['dashboard', 'scan', 'alerts', 'schedule', 'more'];
    const tabIndex = tabNames.indexOf(tabName);
    
    if (tabIndex !== -1 && allNavItems[tabIndex]) {
      allNavItems[tabIndex].classList.add('active');
      console.log('✅ Nav item activated:', tabIndex);
    }
    
    currentTab = tabName;
    
    // Show tab switch feedback
    showToast(`📱 ${getTabDisplayName(tabName)} खुला गया`, 'info');
    
    // Simulate haptic feedback
    simulateHapticFeedback();
    
    // Scroll to top of tab content
    if (targetTab) {
      targetTab.scrollTop = 0;
    }
    
    console.log('✅ Tab switch completed:', tabName);
    return true;
    
  } catch (error) {
    console.error('❌ Error switching tabs:', error);
    showToast('⚠️ Navigation error - कृपया दोबारा कोशिश करें', 'error');
    return false;
  }
}

// Get display name for tabs
function getTabDisplayName(tabName) {
  const names = {
    dashboard: 'डैशबोर्ड - Dashboard',
    scan: 'स्कैन - Scan',
    alerts: 'अलर्ट - Alerts',
    schedule: 'समयसारणी - Schedule',
    more: 'अधिक - More'
  };
  return names[tabName] || tabName;
}

// Voice Assistant Functions
function activateVoiceAssistant() {
  console.log('🎤 Voice assistant activated');
  showToast('🎤 आवाज सहायक सक्रिय - Voice assistant activated', 'info');
  simulateHapticFeedback('success');
  
  setTimeout(() => {
    showToast('🔊 "आज मेरे फार्म की स्थिति कैसी है?" - How is my farm today?', 'success');
  }, 1500);
}

function playVoice() {
  console.log('🎵 Voice play button clicked');
  const playBtn = document.getElementById('voicePlayBtn');
  
  if (!playBtn) {
    console.error('❌ Voice play button not found');
    return;
  }
  
  if (isVoicePlaying) {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    isVoicePlaying = false;
    showToast('⏹️ आवाज रुक गई - Voice stopped', 'info');
  } else {
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    isVoicePlaying = true;
    showToast('🎵 आवाज चल रही है - Playing voice message', 'success');
    
    // Add playing animation to voice icon
    const voiceIcon = document.querySelector('.voice-icon.animated');
    if (voiceIcon) {
      voiceIcon.style.animation = 'voicePulse 1s infinite';
    }
    
    setTimeout(() => {
      if (isVoicePlaying && playBtn) {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        isVoicePlaying = false;
        showToast('✅ आवाज पूरी हुई - Voice message complete', 'info');
        
        // Reset voice icon animation
        if (voiceIcon) {
          voiceIcon.style.animation = 'voicePulse 2s infinite';
        }
      }
    }, 5000);
  }
  
  simulateHapticFeedback();
}

// Create ripple effect for buttons
function createRippleEffect(event, element) {
  const ripple = element.querySelector('.play-ripple');
  if (!ripple) return;
  
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  ripple.classList.remove('animate');
  ripple.classList.add('animate');
  
  setTimeout(() => {
    ripple.classList.remove('animate');
  }, 600);
}

function playAlertVoice(alertType) {
  console.log('🔊 Playing alert voice:', alertType);
  const messages = {
    vaccination: '💉 कल सुबह 10 बजे Newcastle Disease का टीकाकरण है। 500 पक्षियों के लिए डॉ. प्रिया पाटिल आएंगे।',
    temperature: '🌡️ शेड का तापमान थोड़ा बढ़ा हुआ है। हवादार बनाने की जरूरत है।',
    market: '₹ आज ब्रॉयलर का भाव 85 रुपये किलो है। बेचने का अच्छा समय है।',
    visitor: '🛡️ सभी आने वाले लोगों को बैज स्कैन करना और हाथ साफ करना जरूरी है।'
  };
  
  showToast(`🔊 ${messages[alertType] || 'Alert voice message playing'}`, 'info');
  simulateHapticFeedback();
}

// Scan Functionality
function setScanType(type) {
  console.log('📷 Setting scan type:', type);
  
  // Remove active class from all scan type buttons
  document.querySelectorAll('.scan-option-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to selected button
  const targetBtn = document.querySelector(`[data-scan-type="${type}"]`);
  if (targetBtn) {
    targetBtn.classList.add('active');
  }
  
  currentScanType = type;
  
  const typeText = getScanTypeText(type);
  showToast(`📷 स्कैन प्रकार: ${typeText}`, 'info');
  simulateHapticFeedback();
}

function getScanTypeText(type) {
  const types = {
    visitor: 'विज़िटर बैज - Visitor Badge',
    equipment: 'उपकरण - Equipment',
    feed: 'चारा - Feed'
  };
  return types[type] || 'अज्ञात - Unknown';
}

function simulateScan() {
  console.log('📷 Starting scan simulation');
  
  if (isScanning) {
    console.log('⚠️ Scan already in progress');
    return;
  }
  
  const scanBtn = document.getElementById('scanBtn');
  if (!scanBtn) {
    console.error('❌ Scan button not found');
    return;
  }
  
  isScanning = true;
  
  // Update button state
  scanBtn.disabled = true;
  scanBtn.innerHTML = '📷 स्कैन हो रहा है... Scanning...';
  scanBtn.style.background = 'var(--color-warning)';
  
  showToast('📷 स्कैनिंग शुरू की गई - Scanning started', 'info');
  simulateHapticFeedback();
  
  // Simulate scanning process
  setTimeout(() => {
    const success = Math.random() > 0.25; // 75% success rate
    showScanResult(success);
    
    // Reset button
    scanBtn.disabled = false;
    scanBtn.innerHTML = '📷 स्कैन शुरू करें - Start Scan';
    scanBtn.style.background = '';
    isScanning = false;
    
    simulateHapticFeedback(success ? 'success' : 'error');
  }, 3000);
}

function showScanResult(success) {
  console.log('📋 Showing scan result:', success);
  
  const modal = document.getElementById('scanResultModal');
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultMessage = document.getElementById('resultMessage');
  
  if (!modal || !resultIcon || !resultTitle || !resultMessage) {
    console.error('❌ Scan result elements not found');
    return;
  }
  
  const typeText = getScanTypeText(currentScanType);
  
  if (success) {
    resultIcon.innerHTML = '✅';
    resultTitle.innerHTML = 'स्कैन सफल - Scan Successful';
    resultMessage.innerHTML = `${typeText} सफलतापूर्वक स्कैन किया गया। सभी नियमों का पालन किया गया है।`;
    showToast('✅ स्कैन सफल रहा - Scan successful', 'success');
  } else {
    resultIcon.innerHTML = '❌';
    resultTitle.innerHTML = 'स्कैन असफल - Scan Failed';
    resultMessage.innerHTML = `${typeText} स्कैन में समस्या। कृपया दोबारा कोशिश करें।`;
    showToast('❌ स्कैन असफल - Scan failed', 'error');
  }
  
  modal.classList.remove('hidden');
}

function closeScanResult() {
  console.log('❌ Closing scan result modal');
  const modal = document.getElementById('scanResultModal');
  if (modal) {
    modal.classList.add('hidden');
  }
  simulateHapticFeedback();
}

// Calendar functionality
function changeMonth(direction) {
  console.log('📅 Changing month:', direction);
  
  currentMonth += direction;
  
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  } else if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  
  updateCalendar();
  simulateHapticFeedback();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  showToast(`📅 ${monthNames[currentMonth]} ${currentYear} दिखाया गया`, 'info');
}

function updateCalendar() {
  console.log('📅 Updating calendar');
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const monthHeader = document.querySelector('.calendar-month');
  if (monthHeader) {
    monthHeader.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    console.log('✅ Calendar updated to:', monthNames[currentMonth], currentYear);
  }
}

// Emergency contact functionality
function callEmergency(type) {
  console.log('📞 Emergency call:', type);
  
  let contact = appData.emergency_contacts[0];
  let message = `📞 पशु चिकित्सक को कॉल: ${contact.name} (${contact.phone})`;
  
  showToast(message, 'warning');
  simulateHapticFeedback('success');
  
  setTimeout(() => {
    showToast('📱 कॉल कनेक्ट हो गया - Call connected', 'success');
  }, 2000);
}

// More tab functionality
function openTraining() {
  console.log('📹 Opening training');
  showToast('📹 प्रशिक्षण वीडियो खुल रहे हैं - Opening training videos', 'info');
  simulateHapticFeedback();
  
  setTimeout(() => {
    showToast('🎥 पोल्ट्री फार्मिंग के 25 वीडियो उपलब्ध हैं', 'success');
  }, 1500);
}

function openMarketPrices() {
  console.log('📊 Opening market prices');
  showToast('📊 बाजार भाव देख रहे हैं - Checking market prices', 'info');
  simulateHapticFeedback();
  
  setTimeout(() => {
    showToast('₹ आज: ब्रॉयलर ₹85/kg, अंडे ₹6.5/piece', 'success');
  }, 1500);
}

function openWeatherForecast() {
  console.log('🌤️ Opening weather forecast');
  showToast('🌤️ मौसम पूर्वानुमान देख रहे हैं - Checking weather forecast', 'info');
  simulateHapticFeedback();
  
  setTimeout(() => {
    showToast('🌦️ कल बारिश की संभावना। फार्म की तैयारी करें', 'warning');
  }, 1500);
}

function openEmergencyContacts() {
  console.log('📞 Opening emergency contacts');
  showToast('📞 आपातकालीन संपर्क खुल रहे हैं - Opening emergency contacts', 'info');
  simulateHapticFeedback();
  
  setTimeout(() => {
    showToast('👨‍⚕️ डॉ. प्रिया पाटिल: +91 9876543220 (24/7 उपलब्ध)', 'success');
  }, 1500);
}

function openHelp() {
  showToast('❓ सहायता केंद्र खुल रहा है - Opening help center', 'info');
  simulateHapticFeedback();
}

function openSettings() {
  showToast('🌐 भाषा सेटिंग्स खुल रही हैं - Opening language settings', 'info');
  simulateHapticFeedback();
}

function openProfile() {
  showToast('👤 प्रोफाइल खुल रही है - Opening profile', 'info');
  simulateHapticFeedback();
}

function openSchemes() {
  showToast('🏛️ सरकारी योजनाएं खुल रही हैं - Opening government schemes', 'info');
  simulateHapticFeedback();
}

function openChat() {
  showToast('🤖 चैटबॉट शुरू हो रहा है - Starting chatbot', 'info');
  simulateHapticFeedback();
  
  setTimeout(() => {
    showToast('💬 नमस्कार! मैं आपकी खेती में कैसे मदद कर सकता हूं?', 'success');
  }, 1500);
}

// Utility functions
function showToast(message, type = 'info') {
  console.log('🍞 Toast:', message, type);
  
  // Remove existing toasts
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  // Set toast styles based on type
  const borderColors = {
    success: 'var(--color-success)',
    error: 'var(--color-error)',
    warning: 'var(--color-warning)',
    info: 'var(--color-primary)'
  };
  
  toast.style.borderColor = borderColors[type] || borderColors.info;
  
  // Add toast to body
  document.body.appendChild(toast);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    if (toast && toast.parentElement) {
      toast.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => {
        if (toast.parentElement) {
          toast.remove();
        }
      }, 300);
    }
  }, 4000);
}

function simulateHapticFeedback(type = 'light') {
  // Simulate haptic feedback through vibration API if available
  if ('vibrate' in navigator) {
    const patterns = {
      light: [50],
      success: [50, 50, 50],
      error: [100, 50, 100],
      warning: [75, 25, 75]
    };
    navigator.vibrate(patterns[type] || patterns.light);
  }
}

function updateNetworkStatus() {
  const statusIndicator = document.querySelector('.status-indicator');
  const statusText = document.querySelector('.status-text');
  
  if (!statusIndicator || !statusText) return;
  
  const isOnline = navigator.onLine !== false;
  
  if (isOnline) {
    statusIndicator.classList.add('online');
    statusText.textContent = 'Online';
    statusIndicator.style.backgroundColor = 'var(--color-success)';
  } else {
    statusIndicator.classList.remove('online');
    statusIndicator.style.backgroundColor = 'var(--color-warning)';
    statusText.textContent = 'Offline';
  }
}

// Handle orientation changes
window.addEventListener('orientationchange', function() {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

// Handle app visibility changes
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    updateNetworkStatus();
  }
});

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Global error handlers
window.addEventListener('error', function(e) {
  console.error('❌ App Error:', e.error);
  showToast('⚠️ कुछ गलत हुआ है - Something went wrong. Please try again.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('❌ Unhandled Promise:', e.reason);
  showToast('⚠️ कनेक्शन की समस्या - Connection issue. Please check network.', 'warning');
});

// Final initialization log
console.log('🌾 Kisan Sahayak - Smallholder Farmer App Initialized Successfully');
console.log('📱 Frame Size: 414x896px | Language: Hindi + English | Features: All Active');