// Mobile AR CampusQuest App for Rishihood University

// Game State
let gameState = {
    currentScreen: 'splash',
    currentView: 'map-view',
    currentSlide: 0,
    score: 0,
    completedLocations: 0,
    unlockedLocations: [3], // Start with C Block Reception
    currentLocation: null,
    currentQuestionIndex: 0,
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    playerAnswers: {},
    playerLevel: 'Fresher',
    streak: 0,
    maxStreak: 0,
    arActive: false,
    scanningActive: false,
    achievements: []
};

// Rishihood University Campus Data with AR Features
const campusData = {
    "campus_locations": [
        {
            "id": 1,
            "name": "B Block - Library (2nd Floor)",
            "ar_marker": "library_qr_code",
            "background_image": "https://pplx-res.cloudinary.com/image/upload/v1758967329/pplx_project_search_images/91237be6caff1c32af1f7921b8beaa5fbd72d9dc.png",
            "description": "The central library on the 2nd floor of B Block where students study and conduct research. Point your camera at the B Block entrance to discover the library quiz!",
            "ar_info": "🔍 AR DETECTED: B Block Library Access Point",
            "trivia_questions": [
                {
                    "question": "On which floor is the Rishihood University library located?",
                    "options": ["1st Floor", "2nd Floor", "3rd Floor", "Ground Floor"],
                    "correct_answer": "2nd Floor",
                    "difficulty": "easy",
                    "explanation": "The library is situated on the 2nd floor of B Block, providing students with a quiet study environment away from the ground floor activities."
                },
                {
                    "question": "What is the library's main purpose at Rishihood University?",
                    "options": ["Recreation", "Research and Study", "Administration", "Events"],
                    "correct_answer": "Research and Study",
                    "difficulty": "medium",
                    "explanation": "The library serves as the primary research and study facility, housing academic resources and quiet study spaces."
                }
            ]
        },
        {
            "id": 2,
            "name": "B Block - Main Auditorium (Ground Floor)",
            "ar_marker": "auditorium_qr_code",
            "background_image": "https://pplx-res.cloudinary.com/image/upload/v1758967329/pplx_project_search_images/91237be6caff1c32af1f7921b8beaa5fbd72d9dc.png",
            "description": "The main auditorium on B Block ground floor where convocations and major events are held. Scan the auditorium entrance to unlock event trivia!",
            "ar_info": "🎭 AR DETECTED: Main Auditorium Event Center",
            "trivia_questions": [
                {
                    "question": "Where is the main auditorium located at Rishihood University?",
                    "options": ["A Block Ground Floor", "B Block Ground Floor", "C Block Ground Floor", "B Block 1st Floor"],
                    "correct_answer": "B Block Ground Floor",
                    "difficulty": "easy",
                    "explanation": "The main auditorium is conveniently located on the ground floor of B Block for easy access during events."
                },
                {
                    "question": "What major university events are held in the auditorium?",
                    "options": ["Only lectures", "Convocations and ceremonies", "Sports events", "Dining events"],
                    "correct_answer": "Convocations and ceremonies",
                    "difficulty": "medium",
                    "explanation": "The auditorium hosts important university ceremonies like convocations and major events."
                }
            ]
        },
        {
            "id": 3,
            "name": "C Block - Reception (Ground Floor)",
            "ar_marker": "reception_qr_code",
            "background_image": "https://pplx-res.cloudinary.com/image/upload/v1758967329/pplx_project_search_images/91237be6caff1c32af1f7921b8beaa5fbd72d9dc.png",
            "description": "The main reception and administrative center located on C Block ground floor. Point camera at C Block reception to start your campus journey!",
            "ar_info": "📋 AR DETECTED: Campus Information Hub",
            "trivia_questions": [
                {
                    "question": "Where is the main reception located at Rishihood University?",
                    "options": ["A Block", "B Block", "C Block Ground Floor", "R1 Reception"],
                    "correct_answer": "C Block Ground Floor",
                    "difficulty": "easy",
                    "explanation": "C Block ground floor houses the main reception, serving as the primary information and administrative hub."
                },
                {
                    "question": "What is the primary function of C Block reception?",
                    "options": ["Student dining", "Administrative services", "Library access", "Sports activities"],
                    "correct_answer": "Administrative services",
                    "difficulty": "medium",
                    "explanation": "The reception provides comprehensive administrative services and visitor assistance."
                }
            ]
        },
        {
            "id": 4,
            "name": "A Block Mess & Chai Adda",
            "ar_marker": "chai_adda_qr_code",
            "background_image": "https://pplx-res.cloudinary.com/image/upload/v1758967329/pplx_project_search_images/91237be6caff1c32af1f7921b8beaa5fbd72d9dc.png",
            "description": "A Block mess and Chai Adda canteen serving delicious meals and snacks to students. Scan Chai Adda entrance for food and beverage trivia!",
            "ar_info": "🍽️ AR DETECTED: Student Dining Complex",
            "trivia_questions": [
                {
                    "question": "Which canteen is famous for tea and snacks at Rishihood?",
                    "options": ["Pushpa Devi Mess", "A Block Canteen", "Chai Adda", "B Block Cafe"],
                    "correct_answer": "Chai Adda",
                    "difficulty": "medium",
                    "explanation": "Chai Adda is the go-to spot for students craving tea, coffee, and quick snacks throughout the day."
                },
                {
                    "question": "What dining options are available in A Block?",
                    "options": ["Only mess", "Only canteen", "Mess and Chai Adda", "Library cafe"],
                    "correct_answer": "Mess and Chai Adda",
                    "difficulty": "easy",
                    "explanation": "A Block houses both the mess for regular meals and Chai Adda for snacks and beverages."
                }
            ]
        },
        {
            "id": 5,
            "name": "Pushpa Devi Mess",
            "ar_marker": "pushpa_devi_qr_code",
            "background_image": "https://pplx-res.cloudinary.com/image/upload/v1758967329/pplx_project_search_images/91237be6caff1c32af1f7921b8beaa5fbd72d9dc.png",
            "description": "The main dining facility named after Pushpa Devi, serving authentic Indian meals. Scan the main mess entrance to discover dining trivia!",
            "ar_info": "🥘 AR DETECTED: Main Dining Facility",
            "trivia_questions": [
                {
                    "question": "What is the name of the main mess at Rishihood University?",
                    "options": ["Central Mess", "Main Dining Hall", "Pushpa Devi Mess", "University Mess"],
                    "correct_answer": "Pushpa Devi Mess",
                    "difficulty": "easy",
                    "explanation": "The main dining facility is named Pushpa Devi Mess, honoring the memory of Pushpa Devi."
                },
                {
                    "question": "What type of cuisine does the main mess primarily serve?",
                    "options": ["Continental", "South Indian", "North Indian and authentic meals", "Fast food"],
                    "correct_answer": "North Indian and authentic meals",
                    "difficulty": "medium",
                    "explanation": "The mess specializes in authentic North Indian cuisine, providing homely and nutritious meals."
                }
            ]
        },
        {
            "id": 6,
            "name": "R2 Residence - First Year Boys",
            "ar_marker": "r2_residence_qr_code",
            "background_image": "https://pplx-res.cloudinary.com/image/upload/v1758967329/pplx_project_search_images/91237be6caff1c32af1f7921b8beaa5fbd72d9dc.png",
            "description": "R2 residence exclusively for first-year male students with modern amenities. Point camera at R2 entrance for residence life questions!",
            "ar_info": "🏠 AR DETECTED: First Year Residence Complex",
            "trivia_questions": [
                {
                    "question": "Which residence is designated for first-year boys at Rishihood?",
                    "options": ["R1", "R2", "R3", "A Block Hostel"],
                    "correct_answer": "R2",
                    "difficulty": "easy",
                    "explanation": "R2 is specifically designated for first-year boys, helping them transition into university life."
                },
                {
                    "question": "What is special about R2 residence?",
                    "options": ["Only for faculty", "Mixed accommodation", "First-year focused", "Graduate students only"],
                    "correct_answer": "First-year focused",
                    "difficulty": "medium",
                    "explanation": "R2 provides a supportive environment specifically designed for first-year students to adapt to campus life."
                }
            ]
        },
        {
            "id": 7,
            "name": "R1 Residence - Seniors & Faculty",
            "ar_marker": "r1_residence_qr_code",
            "background_image": "https://pplx-res.cloudinary.com/image/upload/v1758967329/pplx_project_search_images/91237be6caff1c32af1f7921b8beaa5fbd72d9dc.png",
            "description": "R1 residence housing senior students, staff and faculty members. Scan R1 building to unlock senior residence trivia!",
            "ar_info": "🏢 AR DETECTED: Senior Residence Community",
            "trivia_questions": [
                {
                    "question": "Who resides in R1 at Rishihood University?",
                    "options": ["First year students only", "Seniors, staff and faculty", "Only faculty members", "Visiting students"],
                    "correct_answer": "Seniors, staff and faculty",
                    "difficulty": "easy",
                    "explanation": "R1 houses a diverse community including senior students, staff, and faculty, creating a unique learning environment."
                },
                {
                    "question": "What makes R1 unique compared to other residences?",
                    "options": ["Newer building", "Mixed community living", "Larger rooms", "More facilities"],
                    "correct_answer": "Mixed community living",
                    "difficulty": "medium",
                    "explanation": "R1's unique feature is its mixed community of students, staff, and faculty living together, promoting academic interaction."
                }
            ]
        }
    ]
};

// Achievement definitions
const achievementDefinitions = [
    { id: 'first_scan', icon: '📱', name: 'First Scan', description: 'Completed your first AR scan', unlocked: false },
    { id: 'campus_explorer', icon: '🗺️', name: 'Campus Explorer', description: 'Discovered 3 locations', unlocked: false },
    { id: 'quiz_master', icon: '🧠', name: 'Quiz Master', description: 'Answered 10 questions correctly', unlocked: false },
    { id: 'streak_star', icon: '⭐', name: 'Streak Star', description: 'Got 5 questions right in a row', unlocked: false },
    { id: 'campus_legend', icon: '🏆', name: 'Campus Legend', description: 'Completed all locations', unlocked: false },
    { id: 'perfect_score', icon: '💯', name: 'Perfect Scholar', description: 'Achieved 100% accuracy', unlocked: false }
];

// DOM Elements
const elements = {
    // Screens
    splashScreen: document.getElementById('splash-screen'),
    onboardingScreen: document.getElementById('onboarding-screen'),
    mainScreen: document.getElementById('main-screen'),
    
    // Views
    mapView: document.getElementById('map-view'),
    progressView: document.getElementById('progress-view'),
    profileView: document.getElementById('profile-view'),
    
    // AR Camera
    arCamera: document.getElementById('ar-camera'),
    arStatus: document.querySelector('.ar-status'),
    arLocations: document.getElementById('ar-locations'),
    compassNeedle: document.getElementById('compass-needle'),
    
    // Navigation
    bottomNav: document.querySelector('.bottom-nav'),
    arScanBtn: document.getElementById('ar-scan-btn'),
    
    // Onboarding
    skipOnboarding: document.getElementById('skip-onboarding'),
    nextSlide: document.getElementById('next-slide'),
    
    // Modals
    arLocationModal: document.getElementById('ar-location-modal'),
    quizModal: document.getElementById('quiz-modal'),
    feedbackModal: document.getElementById('feedback-modal'),
    completionModal: document.getElementById('completion-modal'),
    
    // Stats
    totalScore: document.getElementById('total-score'),
    locationsFound: document.getElementById('locations-found'),
    accuracyRate: document.getElementById('accuracy-rate'),
    playerLevel: document.getElementById('player-level'),
    profileLevel: document.getElementById('profile-level'),
    levelProgress: document.getElementById('level-progress'),
    
    // Time
    currentTime: document.getElementById('current-time')
};

// Level thresholds
const levelThresholds = {
    'Fresher': 0,
    'Explorer': 50,
    'Campus Expert': 120,
    'Legend': 200
};

// Initialize the app
function initApp() {
    updateTime();
    setInterval(updateTime, 1000);
    
    bindEvents();
    startSplashSequence();
    initializeAchievements();
}

// Update mobile time
function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (elements.currentTime) {
        elements.currentTime.textContent = time;
    }
}

// Bind all event listeners
function bindEvents() {
    // Onboarding
    elements.skipOnboarding?.addEventListener('click', skipOnboarding);
    elements.nextSlide?.addEventListener('click', handleNextSlide);
    
    // Navigation dots
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            goToSlide(parseInt(e.target.dataset.slide));
        });
    });
    
    // Bottom navigation
    elements.bottomNav?.addEventListener('click', handleNavigation);
    elements.arScanBtn?.addEventListener('click', activateARCamera);
    
    // AR Camera controls
    document.getElementById('close-ar')?.addEventListener('click', closeARCamera);
    document.getElementById('scan-qr')?.addEventListener('click', simulateQRScan);
    document.getElementById('capture-btn')?.addEventListener('click', simulateCapture);
    document.getElementById('ar-help')?.addEventListener('click', showARHelp);
    
    // Location hotspots
    document.querySelectorAll('.ar-hotspot').forEach(hotspot => {
        hotspot.addEventListener('click', handleLocationClick);
    });
    
    // Modal controls
    document.getElementById('close-ar-modal')?.addEventListener('click', () => closeModal('ar-location-modal'));
    document.getElementById('start-ar-quiz')?.addEventListener('click', startLocationQuiz);
    document.getElementById('continue-quiz')?.addEventListener('click', handleQuizContinue);
    
    // Profile actions
    document.getElementById('share-progress')?.addEventListener('click', shareProgress);
    document.getElementById('reset-progress')?.addEventListener('click', resetProgress);
    document.getElementById('share-achievement')?.addEventListener('click', shareAchievement);
    document.getElementById('restart-journey')?.addEventListener('click', restartJourney);
    
    // Touch gestures for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    });
    
    function handleSwipeGesture() {
        const swipeDistance = touchStartY - touchEndY;
        const minSwipeDistance = 50;
        
        if (Math.abs(swipeDistance) > minSwipeDistance && gameState.currentScreen === 'main') {
            if (swipeDistance > 0) {
                // Swipe up - could trigger AR mode or other actions
                simulateHapticFeedback();
            } else {
                // Swipe down - could close modals or return to map
                if (gameState.arActive) {
                    closeARCamera();
                }
            }
        }
    }
    
    // Modal overlay clicks
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', closeAllModals);
    });
}

// Splash screen sequence
function startSplashSequence() {
    setTimeout(() => {
        showScreen('onboarding');
    }, 2500);
}

// Onboarding functions
function skipOnboarding() {
    showScreen('main');
    gameState.currentScreen = 'main';
}

function handleNextSlide() {
    if (gameState.currentSlide < 2) {
        gameState.currentSlide++;
        goToSlide(gameState.currentSlide);
    } else {
        skipOnboarding();
    }
}

function goToSlide(slideIndex) {
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
    });
    
    // Update slides
    document.querySelectorAll('.onboarding-slide').forEach((slide, index) => {
        slide.classList.toggle('active', index === slideIndex);
    });
    
    // Update button text
    const nextBtn = elements.nextSlide;
    if (nextBtn) {
        nextBtn.textContent = slideIndex === 2 ? 'Start Adventure' : 'Next';
    }
    
    gameState.currentSlide = slideIndex;
}

// Screen management
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    gameState.currentScreen = screenName;
    updateUI();
}

// Navigation handling
function handleNavigation(e) {
    const navItem = e.target.closest('.nav-item');
    if (!navItem || navItem.id === 'ar-scan-btn') return;
    
    const targetView = navItem.dataset.view;
    if (targetView) {
        // Update nav active states
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        navItem.classList.add('active');
        
        // Show target view
        document.querySelectorAll('.view-content').forEach(view => {
            view.classList.remove('active');
        });
        
        const targetElement = document.getElementById(targetView);
        if (targetElement) {
            targetElement.classList.add('active');
        }
        
        gameState.currentView = targetView;
        simulateHapticFeedback();
        updateUI();
    }
}

// AR Camera functions
function activateARCamera() {
    gameState.arActive = true;
    elements.arCamera?.classList.remove('hidden');
    startARScanning();
    simulateHapticFeedback();
    
    // Animate AR interface
    setTimeout(() => {
        if (elements.arStatus) {
            elements.arStatus.textContent = '🔍 Scanning campus locations...';
        }
    }, 500);
}

function closeARCamera() {
    gameState.arActive = false;
    gameState.scanningActive = false;
    elements.arCamera?.classList.add('hidden');
    
    if (elements.arStatus) {
        elements.arStatus.textContent = '📱 AR Camera Inactive';
    }
}

function startARScanning() {
    gameState.scanningActive = true;
    
    // Simulate AR location detection
    setTimeout(() => {
        if (gameState.scanningActive) {
            simulateLocationDetection();
        }
    }, 2000);
}

function simulateLocationDetection() {
    const availableLocations = gameState.unlockedLocations.filter(id => 
        !gameState.playerAnswers[id]
    );
    
    if (availableLocations.length > 0) {
        const randomLocation = availableLocations[Math.floor(Math.random() * availableLocations.length)];
        const location = campusData.campus_locations.find(loc => loc.id === randomLocation);
        
        if (location) {
            showARLocationDetected(location);
        }
    }
}

function simulateQRScan() {
    if (elements.arStatus) {
        elements.arStatus.textContent = '🔳 Scanning QR Code...';
    }
    
    simulateHapticFeedback();
    
    setTimeout(() => {
        const availableLocations = gameState.unlockedLocations.filter(id => 
            !gameState.playerAnswers[id]
        );
        
        if (availableLocations.length > 0) {
            const location = campusData.campus_locations.find(loc => loc.id === availableLocations[0]);
            if (location) {
                showARLocationDetected(location);
            }
        }
    }, 1500);
}

function simulateCapture() {
    // Flash effect
    const flashDiv = document.createElement('div');
    flashDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        z-index: 9999;
        pointer-events: none;
        opacity: 0.8;
    `;
    document.body.appendChild(flashDiv);
    
    simulateHapticFeedback();
    
    setTimeout(() => {
        document.body.removeChild(flashDiv);
    }, 200);
}

function showARHelp() {
    alert('AR Help:\n\n• Point camera at campus buildings\n• Tap on detected locations\n• Scan QR codes for instant access\n• Swipe down to exit AR mode');
}

// Location interaction
function handleLocationClick(e) {
    const locationId = parseInt(e.currentTarget.dataset.locationId);
    
    if (!gameState.unlockedLocations.includes(locationId)) {
        simulateHapticFeedback();
        showMessage('🔒 Complete previous locations to unlock this area!');
        return;
    }
    
    if (gameState.playerAnswers[locationId]) {
        showMessage('✅ You\'ve already completed this location!');
        return;
    }
    
    const location = campusData.campus_locations.find(loc => loc.id === locationId);
    if (location) {
        if (gameState.arActive) {
            closeARCamera();
        }
        showARLocationModal(location);
        simulateHapticFeedback();
    }
}

function showARLocationDetected(location) {
    if (elements.arStatus) {
        elements.arStatus.textContent = `✨ ${location.name} detected!`;
    }
    
    // Add visual AR overlay
    setTimeout(() => {
        showARLocationModal(location);
        closeARCamera();
    }, 1000);
}

function showARLocationModal(location) {
    gameState.currentLocation = location;
    
    // Update modal content
    const modal = elements.arLocationModal;
    const titleEl = document.getElementById('ar-location-title');
    const imageEl = document.getElementById('ar-location-image');
    const infoEl = document.getElementById('ar-location-info');
    const descEl = document.getElementById('ar-location-description');
    
    if (titleEl) titleEl.textContent = location.name;
    if (imageEl) {
        imageEl.src = location.background_image;
        imageEl.alt = location.name;
    }
    if (infoEl) infoEl.textContent = location.ar_info;
    if (descEl) descEl.textContent = location.description;
    
    showModal('ar-location-modal');
}

function startLocationQuiz() {
    closeModal('ar-location-modal');
    
    if (!gameState.currentLocation) return;
    
    gameState.currentQuestionIndex = 0;
    showQuiz();
}

function showQuiz() {
    const location = gameState.currentLocation;
    const questions = location.trivia_questions;
    const currentQ = questions[gameState.currentQuestionIndex];
    
    // Update quiz modal
    const locationNameEl = document.getElementById('quiz-location-name');
    const counterEl = document.getElementById('question-counter');
    const difficultyEl = document.getElementById('quiz-difficulty');
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    
    if (locationNameEl) locationNameEl.textContent = location.name;
    if (counterEl) counterEl.textContent = `${gameState.currentQuestionIndex + 1}/${questions.length}`;
    if (difficultyEl) {
        difficultyEl.textContent = currentQ.difficulty;
        difficultyEl.className = `difficulty-badge ${currentQ.difficulty}`;
    }
    if (questionEl) questionEl.textContent = currentQ.question;
    
    // Create quiz options
    if (optionsEl) {
        optionsEl.innerHTML = '';
        currentQ.options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'quiz-option';
            optionEl.textContent = option;
            optionEl.addEventListener('click', () => selectQuizAnswer(option, optionEl));
            optionsEl.appendChild(optionEl);
        });
    }
    
    showModal('quiz-modal');
}

function selectQuizAnswer(selectedAnswer, optionElement) {
    const location = gameState.currentLocation;
    const currentQ = location.trivia_questions[gameState.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQ.correct_answer;
    
    // Disable all options and show correct/incorrect
    const allOptions = document.querySelectorAll('.quiz-option');
    allOptions.forEach(option => {
        option.style.pointerEvents = 'none';
        if (option.textContent === currentQ.correct_answer) {
            option.classList.add('correct');
        } else if (option === optionElement && !isCorrect) {
            option.classList.add('incorrect');
        }
    });
    
    // Update game state
    gameState.totalQuestionsAnswered++;
    if (isCorrect) {
        gameState.correctAnswers++;
        gameState.streak++;
        gameState.maxStreak = Math.max(gameState.maxStreak, gameState.streak);
        gameState.score += getDifficultyPoints(currentQ.difficulty);
        
        // Bonus for streak
        if (gameState.streak >= 3) {
            gameState.score += 5;
        }
        
        simulateHapticFeedback();
    } else {
        gameState.streak = 0;
        simulateHapticFeedback('error');
    }
    
    // Store answer
    if (!gameState.playerAnswers[location.id]) {
        gameState.playerAnswers[location.id] = [];
    }
    
    gameState.playerAnswers[location.id].push({
        question: currentQ.question,
        selected: selectedAnswer,
        correct: currentQ.correct_answer,
        isCorrect: isCorrect,
        explanation: currentQ.explanation
    });
    
    updatePlayerLevel();
    updateUI();
    
    // Show feedback after delay
    setTimeout(() => {
        showFeedback(isCorrect, currentQ.explanation);
    }, 1500);
}

function getDifficultyPoints(difficulty) {
    switch (difficulty) {
        case 'easy': return 10;
        case 'medium': return 20;
        case 'hard': return 30;
        default: return 10;
    }
}

function updatePlayerLevel() {
    const levels = Object.keys(levelThresholds).reverse();
    for (const level of levels) {
        if (gameState.score >= levelThresholds[level]) {
            if (gameState.playerLevel !== level) {
                gameState.playerLevel = level;
                showMessage(`🎉 Level up! You are now a ${level}!`);
                simulateHapticFeedback('success');
            }
            break;
        }
    }
}

function showFeedback(isCorrect, explanation) {
    closeModal('quiz-modal');
    
    const iconEl = document.getElementById('feedback-icon');
    const titleEl = document.getElementById('feedback-title');
    const textEl = document.getElementById('feedback-text');
    const explanationEl = document.getElementById('feedback-explanation-text');
    
    if (isCorrect) {
        if (iconEl) iconEl.textContent = '✅';
        if (titleEl) titleEl.textContent = 'Excellent!';
        if (textEl) textEl.textContent = `Correct! ${gameState.streak > 1 ? `${gameState.streak} in a row! 🔥` : ''}`;
    } else {
        if (iconEl) iconEl.textContent = '❌';
        if (titleEl) titleEl.textContent = 'Not quite right';
        if (textEl) textEl.textContent = 'Better luck with the next question!';
    }
    
    if (explanationEl) explanationEl.textContent = explanation;
    
    showModal('feedback-modal');
}

function handleQuizContinue() {
    closeModal('feedback-modal');
    
    const location = gameState.currentLocation;
    const hasMoreQuestions = gameState.currentQuestionIndex < location.trivia_questions.length - 1;
    
    if (hasMoreQuestions) {
        gameState.currentQuestionIndex++;
        showQuiz();
    } else {
        completeLocation();
    }
}

function completeLocation() {
    const locationId = gameState.currentLocation.id;
    
    gameState.completedLocations++;
    unlockNextLocations(locationId);
    updateLocationStates();
    checkAchievements();
    
    // Reset for next location
    gameState.currentQuestionIndex = 0;
    gameState.currentLocation = null;
    
    updateUI();
    
    // Show completion message
    showMessage(`🎉 Location completed! ${gameState.completedLocations}/7 discovered`);
    
    // Check if game complete
    if (gameState.completedLocations === 7) {
        setTimeout(() => showCompletionModal(), 1000);
    }
}

function unlockNextLocations(completedLocationId) {
    const unlockMap = {
        3: [1, 4], // C Block Reception unlocks B Block Library and A Block Mess
        1: [2], // B Block Library unlocks B Block Auditorium
        4: [5], // A Block Mess unlocks Pushpa Devi Mess
        2: [6], // B Block Auditorium unlocks R2 Residence
        5: [7], // Pushpa Devi Mess unlocks R1 Residence
        6: [7], // R2 also unlocks R1 (alternative path)
    };
    
    const toUnlock = unlockMap[completedLocationId] || [];
    toUnlock.forEach(locationId => {
        if (!gameState.unlockedLocations.includes(locationId)) {
            gameState.unlockedLocations.push(locationId);
            showMessage(`🔓 New location unlocked!`);
        }
    });
}

function updateLocationStates() {
    const hotspots = document.querySelectorAll('.ar-hotspot');
    
    hotspots.forEach(hotspot => {
        const locationId = parseInt(hotspot.dataset.locationId);
        
        hotspot.classList.remove('available', 'locked', 'completed');
        
        if (gameState.playerAnswers[locationId]) {
            hotspot.classList.add('completed');
        } else if (gameState.unlockedLocations.includes(locationId)) {
            hotspot.classList.add('available');
        } else {
            hotspot.classList.add('locked');
        }
    });
}

// Achievement system
function initializeAchievements() {
    gameState.achievements = [...achievementDefinitions];
    updateAchievementDisplay();
}

function checkAchievements() {
    let newAchievements = [];
    
    // First scan achievement
    if (!gameState.achievements.find(a => a.id === 'first_scan').unlocked && gameState.totalQuestionsAnswered >= 1) {
        unlockAchievement('first_scan');
        newAchievements.push('First Scan');
    }
    
    // Campus explorer
    if (!gameState.achievements.find(a => a.id === 'campus_explorer').unlocked && gameState.completedLocations >= 3) {
        unlockAchievement('campus_explorer');
        newAchievements.push('Campus Explorer');
    }
    
    // Quiz master
    if (!gameState.achievements.find(a => a.id === 'quiz_master').unlocked && gameState.correctAnswers >= 10) {
        unlockAchievement('quiz_master');
        newAchievements.push('Quiz Master');
    }
    
    // Streak star
    if (!gameState.achievements.find(a => a.id === 'streak_star').unlocked && gameState.maxStreak >= 5) {
        unlockAchievement('streak_star');
        newAchievements.push('Streak Star');
    }
    
    // Campus legend
    if (!gameState.achievements.find(a => a.id === 'campus_legend').unlocked && gameState.completedLocations === 7) {
        unlockAchievement('campus_legend');
        newAchievements.push('Campus Legend');
    }
    
    // Perfect score
    if (!gameState.achievements.find(a => a.id === 'perfect_score').unlocked && 
        gameState.totalQuestionsAnswered > 0 && 
        (gameState.correctAnswers / gameState.totalQuestionsAnswered) === 1.0 &&
        gameState.totalQuestionsAnswered >= 5) {
        unlockAchievement('perfect_score');
        newAchievements.push('Perfect Scholar');
    }
    
    // Show new achievements
    if (newAchievements.length > 0) {
        showMessage(`🏆 Achievement unlocked: ${newAchievements.join(', ')}`);
        simulateHapticFeedback('success');
    }
}

function unlockAchievement(achievementId) {
    const achievement = gameState.achievements.find(a => a.id === achievementId);
    if (achievement) {
        achievement.unlocked = true;
        updateAchievementDisplay();
    }
}

function updateAchievementDisplay() {
    const grid = document.getElementById('achievement-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    gameState.achievements.forEach(achievement => {
        const item = document.createElement('div');
        item.className = `achievement-item ${achievement.unlocked ? '' : 'locked'}`;
        item.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
        `;
        grid.appendChild(item);
    });
}

// Modal management
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('hidden'), 250);
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('hidden'), 250);
    });
}

// Completion modal
function showCompletionModal() {
    const accuracy = Math.round((gameState.correctAnswers / gameState.totalQuestionsAnswered) * 100);
    
    const scoreEl = document.getElementById('final-score');
    const accuracyEl = document.getElementById('final-accuracy');
    
    if (scoreEl) scoreEl.textContent = gameState.score;
    if (accuracyEl) accuracyEl.textContent = accuracy + '%';
    
    showModal('completion-modal');
}

// Progress sharing
function shareProgress() {
    const accuracy = gameState.totalQuestionsAnswered > 0 ? 
        Math.round((gameState.correctAnswers / gameState.totalQuestionsAnswered) * 100) : 0;
    
    const shareText = `🎓 I'm exploring Rishihood University with CampusQuest AR!\n\n📊 Progress:\n• Score: ${gameState.score} points\n• Locations: ${gameState.completedLocations}/7\n• Accuracy: ${accuracy}%\n• Level: ${gameState.playerLevel}\n\nJoin the adventure! 📱✨`;
    
    if (navigator.share) {
        navigator.share({
            title: 'CampusQuest AR Progress',
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            showMessage('📋 Progress copied to clipboard!');
        });
    }
}

function shareAchievement() {
    const shareText = `🏆 I've mastered Rishihood University with CampusQuest AR!\n\n✨ Final Stats:\n• Score: ${gameState.score} points\n• Accuracy: ${Math.round((gameState.correctAnswers / gameState.totalQuestionsAnswered) * 100)}%\n• Level: ${gameState.playerLevel}\n• All 7 locations discovered!\n\nExplore your campus too! 🎓📱`;
    
    if (navigator.share) {
        navigator.share({
            title: 'CampusQuest AR Achievement',
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            showMessage('🎉 Achievement copied to clipboard!');
        });
    }
}

// Progress reset
function resetProgress() {
    if (confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
        gameState = {
            currentScreen: 'main',
            currentView: 'map-view',
            currentSlide: 0,
            score: 0,
            completedLocations: 0,
            unlockedLocations: [3],
            currentLocation: null,
            currentQuestionIndex: 0,
            totalQuestionsAnswered: 0,
            correctAnswers: 0,
            playerAnswers: {},
            playerLevel: 'Fresher',
            streak: 0,
            maxStreak: 0,
            arActive: false,
            scanningActive: false,
            achievements: []
        };
        
        initializeAchievements();
        updateLocationStates();
        updateUI();
        showMessage('🔄 Progress reset! Start your journey again.');
    }
}

function restartJourney() {
    closeAllModals();
    resetProgress();
}

// Update UI elements
function updateUI() {
    // Update stats
    if (elements.totalScore) elements.totalScore.textContent = gameState.score;
    if (elements.locationsFound) elements.locationsFound.textContent = `${gameState.completedLocations}/7`;
    if (elements.playerLevel) elements.playerLevel.textContent = gameState.playerLevel;
    if (elements.profileLevel) elements.profileLevel.textContent = `Level: ${gameState.playerLevel}`;
    
    // Update accuracy
    if (elements.accuracyRate) {
        const accuracy = gameState.totalQuestionsAnswered > 0 ? 
            Math.round((gameState.correctAnswers / gameState.totalQuestionsAnswered) * 100) : 0;
        elements.accuracyRate.textContent = accuracy + '%';
    }
    
    // Update level progress
    if (elements.levelProgress) {
        const currentLevelPoints = levelThresholds[gameState.playerLevel] || 0;
        const levels = Object.keys(levelThresholds);
        const currentIndex = levels.indexOf(gameState.playerLevel);
        const nextLevelPoints = currentIndex < levels.length - 1 ? 
            levelThresholds[levels[currentIndex + 1]] : currentLevelPoints;
        
        const progress = nextLevelPoints > currentLevelPoints ? 
            ((gameState.score - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100 : 100;
        
        elements.levelProgress.style.width = Math.min(progress, 100) + '%';
    }
    
    // Update journey timeline
    updateJourneyTimeline();
}

function updateJourneyTimeline() {
    const timeline = document.getElementById('journey-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    // Add completed locations to timeline
    Object.keys(gameState.playerAnswers).forEach(locationId => {
        const location = campusData.campus_locations.find(loc => loc.id === parseInt(locationId));
        if (location) {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-icon">✅</div>
                <div class="timeline-content">
                    <div class="timeline-title">${location.name}</div>
                    <div class="timeline-time">Completed</div>
                </div>
            `;
            timeline.appendChild(item);
        }
    });
    
    if (timeline.children.length === 0) {
        timeline.innerHTML = '<p style="color: var(--color-text-secondary); text-align: center; font-style: italic;">Start exploring to build your journey timeline!</p>';
    }
}

// Utility functions
function simulateHapticFeedback(type = 'light') {
    if (navigator.vibrate) {
        switch (type) {
            case 'light':
                navigator.vibrate(50);
                break;
            case 'success':
                navigator.vibrate([100, 50, 100]);
                break;
            case 'error':
                navigator.vibrate([200, 100, 200]);
                break;
            default:
                navigator.vibrate(50);
        }
    }
}

function showMessage(message) {
    // Create and show a toast message
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-size: 14px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        max-width: 80%;
        text-align: center;
        animation: fadeInOut 3s ease-in-out forwards;
    `;
    toast.textContent = message;
    
    // Add fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
            15%, 85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        if (document.body.contains(toast)) {
            document.body.removeChild(toast);
        }
        if (document.head.contains(style)) {
            document.head.removeChild(style);
        }
    }, 3000);
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);