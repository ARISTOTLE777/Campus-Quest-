// Enhanced AR CampusQuest Game Logic for Rishihood University

// Game State with AR enhancements
let gameState = {
    currentScreen: 'welcome',
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
    arMode: true,
    scanningActive: false,
    currentBackground: 'main'
};

// AR Background configurations for different locations
const arBackgrounds = {
    main: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png',
    library: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png',
    auditorium: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png',
    reception: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png',
    mess: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png',
    residence: 'https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png'
};

// Enhanced Campus Data with AR information
const campusData = {
    "campus_locations": [
        {
            "id": 1,
            "name": "B Block - Library (2nd Floor)",
            "coordinates": [320, 180],
            "image_url": "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png",
            "background_key": "library",
            "ar_distance": "12m",
            "description": "The central library on the 2nd floor of B Block where students study and conduct research. This modern facility houses thousands of books, digital resources, and quiet study spaces for academic excellence.",
            "trivia_questions": [
                {
                    "question": "On which floor is the Rishihood University library located?",
                    "options": ["1st Floor", "2nd Floor", "3rd Floor", "Ground Floor"],
                    "correct_answer": "2nd Floor",
                    "difficulty": "easy",
                    "explanation": "The library is situated on the 2nd floor of B Block, providing students with a quiet study environment away from the ground floor activities."
                },
                {
                    "question": "In which block is the library situated?",
                    "options": ["A Block", "B Block", "C Block", "R1 Block"],
                    "correct_answer": "B Block",
                    "difficulty": "easy",
                    "explanation": "B Block houses the main library on its 2nd floor, making it the academic heart of the university."
                },
                {
                    "question": "What is the maximum number of books a Rishihood student can issue at once?",
                    "options": ["3 books", "5 books", "7 books", "10 books"],
                    "correct_answer": "5 books",
                    "difficulty": "medium",
                    "explanation": "Students can issue up to 5 books at a time, which is adequate for most research and study purposes."
                }
            ]
        },
        {
            "id": 2,
            "name": "B Block - Main Auditorium (Ground Floor)",
            "coordinates": [320, 320],
            "image_url": "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png",
            "background_key": "auditorium",
            "ar_distance": "8m",
            "description": "The main auditorium on B Block ground floor where convocations and major events are held. This space hosts distinguished speakers, cultural events, and important university ceremonies.",
            "trivia_questions": [
                {
                    "question": "Where is the main auditorium located at Rishihood University?",
                    "options": ["A Block Ground Floor", "B Block Ground Floor", "C Block Ground Floor", "B Block 1st Floor"],
                    "correct_answer": "B Block Ground Floor",
                    "difficulty": "easy",
                    "explanation": "The main auditorium is conveniently located on the ground floor of B Block for easy access during events."
                },
                {
                    "question": "In which year was Rishihood University's first convocation held?",
                    "options": ["2021", "2022", "2023", "2024"],
                    "correct_answer": "2022",
                    "difficulty": "medium",
                    "explanation": "Rishihood University held its inaugural convocation in 2022, marking a significant milestone for the institution."
                },
                {
                    "question": "What is the seating capacity of the main auditorium?",
                    "options": ["200", "300", "400", "500"],
                    "correct_answer": "300",
                    "difficulty": "hard",
                    "explanation": "The main auditorium can accommodate 300 people, perfect for university-wide events and guest lectures."
                }
            ]
        },
        {
            "id": 3,
            "name": "C Block - Reception (Ground Floor)",
            "coordinates": [220, 320],
            "image_url": "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png",
            "background_key": "reception",
            "ar_distance": "5m",
            "description": "The main reception and administrative center located on C Block ground floor. This is the first point of contact for visitors and students seeking administrative services.",
            "trivia_questions": [
                {
                    "question": "Where is the main reception located at Rishihood University?",
                    "options": ["A Block", "B Block", "C Block Ground Floor", "R1 Reception"],
                    "correct_answer": "C Block Ground Floor",
                    "difficulty": "easy",
                    "explanation": "C Block ground floor houses the main reception, serving as the primary information and administrative hub."
                },
                {
                    "question": "What services are available at the C Block reception?",
                    "options": ["Student queries only", "Administrative services only", "Visitor registration only", "All administrative and visitor services"],
                    "correct_answer": "All administrative and visitor services",
                    "difficulty": "medium",
                    "explanation": "The reception provides comprehensive services including student queries, administrative help, and visitor registration."
                },
                {
                    "question": "What are the reception operating hours on weekdays?",
                    "options": ["8 AM - 5 PM", "9 AM - 6 PM", "10 AM - 7 PM", "24/7"],
                    "correct_answer": "9 AM - 6 PM",
                    "difficulty": "medium",
                    "explanation": "The reception operates from 9 AM to 6 PM on weekdays to assist students and visitors during standard business hours."
                }
            ]
        },
        {
            "id": 4,
            "name": "A Block Mess & Chai Adda Canteen",
            "coordinates": [120, 200],
            "image_url": "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png",
            "background_key": "mess",
            "ar_distance": "15m",
            "description": "A Block mess and Chai Adda canteen serving delicious meals and snacks to students. The popular Chai Adda is a student favorite for tea, coffee, and quick bites between classes.",
            "trivia_questions": [
                {
                    "question": "What are the two dining facilities in A Block?",
                    "options": ["A Block Mess and Chai Adda", "Pushpa Devi Mess and A Block Canteen", "Library Cafe and Mess", "Student Center and Cafeteria"],
                    "correct_answer": "A Block Mess and Chai Adda",
                    "difficulty": "easy",
                    "explanation": "A Block houses both the A Block Mess for regular meals and Chai Adda, the popular student canteen for snacks and beverages."
                },
                {
                    "question": "Which canteen is famous for tea and snacks at Rishihood?",
                    "options": ["Pushpa Devi Mess", "A Block Canteen", "Chai Adda", "B Block Cafe"],
                    "correct_answer": "Chai Adda",
                    "difficulty": "medium",
                    "explanation": "Chai Adda is the go-to spot for students craving tea, coffee, and quick snacks throughout the day."
                },
                {
                    "question": "What time does the A Block mess serve dinner?",
                    "options": ["6:30 PM - 8:30 PM", "7:00 PM - 9:00 PM", "7:30 PM - 9:30 PM", "8:00 PM - 10:00 PM"],
                    "correct_answer": "7:30 PM - 9:30 PM",
                    "difficulty": "hard",
                    "explanation": "Dinner is served from 7:30 PM to 9:30 PM, allowing students to have their evening meal after classes and study sessions."
                }
            ]
        },
        {
            "id": 5,
            "name": "Pushpa Devi Mess",
            "coordinates": [420, 250],
            "image_url": "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png",
            "background_key": "mess",
            "ar_distance": "18m",
            "description": "The main dining facility named after Pushpa Devi, serving authentic Indian meals. This spacious mess provides nutritious and homely food to students throughout the day.",
            "trivia_questions": [
                {
                    "question": "What is the name of the main mess at Rishihood University?",
                    "options": ["Central Mess", "Main Dining Hall", "Pushpa Devi Mess", "University Mess"],
                    "correct_answer": "Pushpa Devi Mess",
                    "difficulty": "easy",
                    "explanation": "The main dining facility is named Pushpa Devi Mess, honoring the memory of Pushpa Devi."
                },
                {
                    "question": "After whom is the main mess named?",
                    "options": ["A faculty member", "Pushpa Devi", "The founder's mother", "A generous donor"],
                    "correct_answer": "Pushpa Devi",
                    "difficulty": "medium",
                    "explanation": "The mess is named after Pushpa Devi, reflecting the university's tradition of honoring important figures."
                },
                {
                    "question": "What type of cuisine does Pushpa Devi Mess primarily serve?",
                    "options": ["Continental", "South Indian", "North Indian and Punjabi", "Chinese"],
                    "correct_answer": "North Indian and Punjabi",
                    "difficulty": "medium",
                    "explanation": "The mess specializes in North Indian and Punjabi cuisine, providing comfort food that students love."
                }
            ]
        },
        {
            "id": 6,
            "name": "R2 Residence - First Year Boys",
            "coordinates": [150, 100],
            "image_url": "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png",
            "background_key": "residence",
            "ar_distance": "25m",
            "description": "R2 residence exclusively for first-year male students with modern amenities. This residence provides a supportive environment for new students to adapt to university life.",
            "trivia_questions": [
                {
                    "question": "Which residence is designated for first-year boys at Rishihood?",
                    "options": ["R1", "R2", "R3", "A Block Hostel"],
                    "correct_answer": "R2",
                    "difficulty": "easy",
                    "explanation": "R2 is specifically designated for first-year boys, helping them transition into university life with peer support."
                },
                {
                    "question": "What is the accommodation type in R2 residence?",
                    "options": ["Single occupancy", "Double sharing", "Triple sharing", "Dormitory style"],
                    "correct_answer": "Double sharing",
                    "difficulty": "medium",
                    "explanation": "R2 provides double sharing rooms, allowing students to have companionship while maintaining privacy."
                },
                {
                    "question": "What facilities are available in R2 residence?",
                    "options": ["Basic rooms only", "Rooms with AC and Wi-Fi", "Rooms with study area and recreation", "All amenities including gym"],
                    "correct_answer": "Rooms with study area and recreation",
                    "difficulty": "hard",
                    "explanation": "R2 is well-equipped with study areas and recreational facilities to support both academic and personal development."
                }
            ]
        },
        {
            "id": 7,
            "name": "R1 Residence - Seniors & Faculty",
            "coordinates": [450, 100],
            "image_url": "https://user-gen-media-assets.s3.amazonaws.com/seedream_images/655fca07-2cae-4f67-84a5-65d40b8710a4.png",
            "background_key": "residence",
            "ar_distance": "30m",
            "description": "R1 residence housing senior students, staff and faculty members. This mixed-community residence fosters interaction between students and faculty outside the classroom.",
            "trivia_questions": [
                {
                    "question": "Who resides in R1 at Rishihood University?",
                    "options": ["First year students only", "Seniors, staff and faculty", "Only faculty members", "Visiting students"],
                    "correct_answer": "Seniors, staff and faculty",
                    "difficulty": "easy",
                    "explanation": "R1 houses a diverse community including senior students, staff, and faculty, creating a unique learning environment."
                },
                {
                    "question": "What makes R1 different from R2 residence?",
                    "options": ["It's newer", "It houses mixed occupants including faculty", "It's larger", "It has better facilities"],
                    "correct_answer": "It houses mixed occupants including faculty",
                    "difficulty": "medium",
                    "explanation": "R1's unique feature is its mixed community of students, staff, and faculty living together, promoting academic interaction."
                },
                {
                    "question": "How many residence blocks are there at Rishihood University?",
                    "options": ["2", "3", "4", "5"],
                    "correct_answer": "3",
                    "difficulty": "medium",
                    "explanation": "Rishihood University has three residence blocks (R1, R2, and R3) to accommodate its residential student community."
                }
            ]
        }
    ]
};

// Player level thresholds
const levelThresholds = {
    'Fresher': 0,
    'Explorer': 50,
    'Campus Expert': 120,
    'Legend': 200
};

// DOM Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    game: document.getElementById('game-screen'),
    completion: document.getElementById('completion-screen')
};

const modals = {
    location: document.getElementById('location-modal'),
    trivia: document.getElementById('trivia-modal'),
    feedback: document.getElementById('feedback-modal')
};

const arOverlay = document.getElementById('ar-overlay');

const elements = {
    startGameBtn: document.getElementById('start-game-btn'),
    restartGameBtn: document.getElementById('restart-game-btn'),
    shareBtn: document.getElementById('share-btn'),
    score: document.getElementById('score'),
    completedLocations: document.getElementById('completed-locations'),
    playerLevel: document.getElementById('player-level'),
    progressFill: document.getElementById('progress-fill'),
    campusMap: document.getElementById('campus-map'),
    
    // AR Controls
    arToggle: document.getElementById('ar-toggle'),
    scanBtn: document.getElementById('scan-btn'),
    mapBtn: document.getElementById('map-btn'),
    achievementsBtn: document.getElementById('achievements-btn'),
    
    // Location modal elements
    locationTitle: document.getElementById('location-title'),
    locationImage: document.getElementById('location-image'),
    locationDescription: document.getElementById('location-description'),
    startTriviaBtn: document.getElementById('start-trivia-btn'),
    closeLocationBtn: document.getElementById('close-location-btn'),
    
    // Trivia modal elements
    locationName: document.getElementById('location-name'),
    currentQuestion: document.getElementById('current-question'),
    totalQuestions: document.getElementById('total-questions'),
    difficultyBadge: document.getElementById('difficulty-badge'),
    questionText: document.getElementById('question-text'),
    answerOptions: document.getElementById('answer-options'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    
    // Feedback modal elements
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackTitle: document.getElementById('feedback-title'),
    feedbackText: document.getElementById('feedback-text'),
    feedbackExplanation: document.getElementById('feedback-explanation'),
    continueBtn: document.getElementById('continue-btn'),
    
    // Completion screen elements
    finalScore: document.getElementById('final-score'),
    finalAccuracy: document.getElementById('final-accuracy'),
    achievementList: document.getElementById('achievement-list')
};

// Initialize the AR game
function initGame() {
    bindEvents();
    updateUI();
    updateLocationStates();
    initializeAREffects();
    preloadBackgrounds();
}

// Preload background images for smoother transitions
function preloadBackgrounds() {
    Object.values(arBackgrounds).forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize AR visual effects
function initializeAREffects() {
    // Add subtle AR scanning animation to welcome screen
    const campusBg = document.querySelector('.campus-bg-image');
    if (campusBg) {
        campusBg.addEventListener('animationend', () => {
            campusBg.style.animation = 'parallaxMove 25s ease-in-out infinite';
        });
    }
    
    // Initialize AR marker glow effects
    const arMarkers = document.querySelectorAll('.ar-location-marker');
    arMarkers.forEach((marker, index) => {
        setTimeout(() => {
            marker.style.animationDelay = `${index * 0.5}s`;
        }, 100 * index);
    });
}

// Bind event listeners with AR enhancements
function bindEvents() {
    elements.startGameBtn.addEventListener('click', startARGame);
    elements.restartGameBtn.addEventListener('click', restartGame);
    elements.shareBtn.addEventListener('click', shareAchivement);
    elements.closeLocationBtn.addEventListener('click', () => closeModal('location'));
    elements.startTriviaBtn.addEventListener('click', showARTrivia);
    elements.closeModalBtn.addEventListener('click', closeTrivia);
    elements.continueBtn.addEventListener('click', handleFeedbackContinue);
    
    // AR Control buttons
    elements.scanBtn.addEventListener('click', performARScan);
    elements.mapBtn.addEventListener('click', toggleMapView);
    elements.achievementsBtn.addEventListener('click', showAchievements);
    elements.arToggle.addEventListener('click', toggleARMode);
    
    // Add click listeners to AR location markers
    const arMarkers = document.querySelectorAll('.ar-location-marker');
    arMarkers.forEach(marker => {
        marker.addEventListener('click', handleARLocationClick);
        marker.addEventListener('touchstart', handleARLocationTouch, { passive: true });
    });
    
    // Modal overlay click to close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', closeModals);
    });
    
    // Add device orientation handling for mobile AR effect
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    
    // Add touch gestures for mobile
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (gameState.currentScreen === 'game') {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            
            // Add parallax effect based on touch movement
            updateParallaxEffect(deltaY * 0.1);
        }
    }, { passive: true });
}

// Handle device orientation for AR effects
function handleDeviceOrientation(event) {
    if (gameState.currentScreen === 'game' && gameState.arMode) {
        const tilt = event.beta; // Front-to-back tilt
        const turn = event.gamma; // Left-to-right tilt
        
        // Apply subtle parallax based on device orientation
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        parallaxLayers.forEach((layer, index) => {
            const intensity = (index + 1) * 0.5;
            layer.style.transform = `translateX(${turn * intensity}px) translateY(${tilt * intensity}px)`;
        });
    }
}

// Update parallax effect
function updateParallaxEffect(offset) {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach((layer, index) => {
        const speed = (index + 1) * 0.3;
        const currentTransform = layer.style.transform || '';
        layer.style.transform = `${currentTransform} translateY(${offset * speed}px)`;
    });
}

// Start AR game with enhanced effects
function startARGame() {
    gameState.currentScreen = 'game';
    showScreen('game');
    updateUI();
    updateLocationStates();
    
    // Activate AR mode
    activateARMode();
    
    // Change background to campus view
    updateCampusBackground('main');
    
    // Show welcome AR scan effect
    setTimeout(() => {
        performWelcomeScan();
    }, 500);
}

// Activate AR mode with visual effects
function activateARMode() {
    gameState.arMode = true;
    arOverlay.classList.add('active');
    
    // Update AR indicator
    const arIndicator = document.querySelector('.ar-indicator');
    if (arIndicator) {
        arIndicator.classList.add('active');
    }
    
    // Add AR scanning sound effect (visual feedback)
    createARScanEffect();
}

// Create AR scanning visual effect
function createARScanEffect() {
    const scanEffect = document.createElement('div');
    scanEffect.className = 'ar-scan-active';
    scanEffect.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 2px;
        height: 100vh;
        background: linear-gradient(to bottom, transparent, #eb6b34, transparent);
        z-index: 999;
        pointer-events: none;
    `;
    
    document.body.appendChild(scanEffect);
    
    setTimeout(() => {
        document.body.removeChild(scanEffect);
    }, 2000);
}

// Perform welcome AR scan
function performWelcomeScan() {
    const markers = document.querySelectorAll('.ar-location-marker.available');
    
    markers.forEach((marker, index) => {
        setTimeout(() => {
            marker.style.animation = 'arPulse 1s ease-in-out';
            
            // Add distance animation
            const distanceElement = marker.querySelector('.ar-marker-distance');
            if (distanceElement) {
                distanceElement.style.animation = 'pulse 2s infinite';
            }
            
            setTimeout(() => {
                marker.style.animation = 'arPulse 3s infinite';
            }, 1000);
        }, index * 200);
    });
}

// Update campus background based on location
function updateCampusBackground(backgroundKey) {
    const newBgUrl = arBackgrounds[backgroundKey] || arBackgrounds.main;
    gameState.currentBackground = backgroundKey;
    
    // Update all parallax layers
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    parallaxLayers.forEach(layer => {
        layer.style.backgroundImage = `url('${newBgUrl}')`;
    });
    
    // Update welcome screen background
    const welcomeBg = document.querySelector('.campus-bg-image');
    if (welcomeBg) {
        welcomeBg.style.backgroundImage = `url('${newBgUrl}')`;
    }
}

// Handle AR location marker clicks with enhanced effects
function handleARLocationClick(event) {
    const locationId = parseInt(event.currentTarget.dataset.locationId);
    
    if (!gameState.unlockedLocations.includes(locationId)) {
        // Show locked feedback with AR effect
        showARLockedFeedback(event.currentTarget);
        return;
    }
    
    const location = campusData.campus_locations.find(loc => loc.id === locationId);
    if (location && !gameState.playerAnswers[locationId]) {
        // Add AR discovery effect
        createARDiscoveryEffect(event.currentTarget);
        
        // Update background to location-specific
        updateCampusBackground(location.background_key);
        
        // Show location info with AR styling
        setTimeout(() => {
            showARLocationInfo(location);
        }, 800);
    }
}

// Handle touch events for mobile AR
function handleARLocationTouch(event) {
    event.preventDefault();
    const marker = event.currentTarget;
    
    // Add haptic feedback simulation
    marker.style.transform = 'translate(-50%, -50%) scale(0.95)';
    setTimeout(() => {
        marker.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 150);
    
    // Trigger click after touch animation
    setTimeout(() => {
        handleARLocationClick(event);
    }, 100);
}

// Show AR locked feedback
function showARLockedFeedback(marker) {
    const feedback = document.createElement('div');
    feedback.className = 'ar-locked-feedback';
    feedback.innerHTML = '🔒 Location Locked';
    feedback.style.cssText = `
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 84, 89, 0.9);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
        pointer-events: none;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    marker.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

// Create AR discovery effect
function createARDiscoveryEffect(marker) {
    // Add discovery animation
    marker.style.animation = 'none';
    marker.offsetHeight; // Trigger reflow
    marker.style.animation = 'arPulse 0.5s ease-in-out 3';
    
    // Create expanding ring effect
    const rings = document.createElement('div');
    rings.className = 'ar-discovery-rings';
    rings.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 5;
    `;
    
    for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        ring.style.cssText = `
            position: absolute;
            border: 2px solid #eb6b34;
            border-radius: 50%;
            animation: expandRing 1.5s ease-out ${i * 0.2}s;
        `;
        rings.appendChild(ring);
    }
    
    marker.appendChild(rings);
    
    setTimeout(() => {
        if (rings.parentNode) {
            rings.parentNode.removeChild(rings);
        }
    }, 2000);
}

// Show AR-enhanced location information
function showARLocationInfo(location) {
    elements.locationTitle.textContent = location.name;
    elements.locationImage.src = location.image_url;
    elements.locationImage.alt = location.name;
    elements.locationDescription.textContent = location.description;
    
    gameState.currentLocation = location;
    showModal('location');
    
    // Add AR scan line effect to image
    setTimeout(() => {
        const scanLine = document.querySelector('.ar-scan-line');
        if (scanLine) {
            scanLine.style.animation = 'scanLine 3s linear infinite';
        }
    }, 500);
}

// Show AR-enhanced trivia
function showARTrivia() {
    closeModal('location');
    
    const location = gameState.currentLocation;
    const questions = location.trivia_questions;
    const currentQ = questions[gameState.currentQuestionIndex];
    
    // Update modal content
    elements.locationName.textContent = `${location.name} - AR Challenge`;
    elements.currentQuestion.textContent = gameState.currentQuestionIndex + 1;
    elements.totalQuestions.textContent = questions.length;
    elements.questionText.textContent = currentQ.question;
    
    // Set difficulty badge with AR styling
    elements.difficultyBadge.textContent = currentQ.difficulty.toUpperCase();
    elements.difficultyBadge.className = `difficulty-badge ${currentQ.difficulty}`;
    
    // Create AR-styled answer options
    elements.answerOptions.innerHTML = '';
    currentQ.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'answer-option';
        optionElement.innerHTML = `
            <span class="option-number">${String.fromCharCode(65 + index)}</span>
            ${option}
        `;
        optionElement.addEventListener('click', () => selectARAnswer(option, optionElement));
        elements.answerOptions.appendChild(optionElement);
        
        // Add staggered animation
        setTimeout(() => {
            optionElement.style.opacity = '1';
            optionElement.style.transform = 'translateX(0)';
        }, index * 100);
        
        optionElement.style.opacity = '0';
        optionElement.style.transform = 'translateX(-20px)';
        optionElement.style.transition = 'all 0.3s ease-out';
    });
    
    showModal('trivia');
}

// Select answer with AR effects
function selectARAnswer(selectedAnswer, optionElement) {
    const location = gameState.currentLocation;
    const currentQ = location.trivia_questions[gameState.currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQ.correct_answer;
    
    // Disable all options
    const allOptions = elements.answerOptions.querySelectorAll('.answer-option');
    allOptions.forEach(option => {
        option.style.pointerEvents = 'none';
        option.style.opacity = '0.6';
        
        if (option.textContent.includes(currentQ.correct_answer)) {
            option.classList.add('correct');
            option.style.opacity = '1';
        } else if (option === optionElement && !isCorrect) {
            option.classList.add('incorrect');
            option.style.opacity = '1';
        }
    });
    
    // Update game state
    gameState.totalQuestionsAnswered++;
    if (isCorrect) {
        gameState.correctAnswers++;
        gameState.streak++;
        gameState.maxStreak = Math.max(gameState.maxStreak, gameState.streak);
        const points = getDifficultyPoints(currentQ.difficulty);
        gameState.score += points;
        
        // Bonus points for streak
        if (gameState.streak >= 3) {
            gameState.score += 5;
        }
        
        // Create success AR effect
        createARSuccessEffect();
    } else {
        gameState.streak = 0;
        createARErrorEffect();
    }
    
    // Store player answer
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
    
    // Update player level
    updatePlayerLevel();
    
    // Show AR feedback after delay
    setTimeout(() => {
        showARFeedback(isCorrect, currentQ.explanation);
    }, 1500);
    
    updateUI();
}

// Create AR success effect
function createARSuccessEffect() {
    const effect = document.createElement('div');
    effect.className = 'ar-success-burst';
    effect.innerHTML = '✨';
    effect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        z-index: 3000;
        pointer-events: none;
        animation: successBurst 1s ease-out;
    `;
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        document.body.removeChild(effect);
    }, 1000);
}

// Create AR error effect
function createARErrorEffect() {
    const effect = document.createElement('div');
    effect.className = 'ar-error-shake';
    effect.innerHTML = '❌';
    effect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        z-index: 3000;
        pointer-events: none;
        animation: errorShake 0.8s ease-out;
    `;
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        document.body.removeChild(effect);
    }, 800);
}

// Show AR-enhanced feedback
function showARFeedback(isCorrect, explanation) {
    closeModal('trivia');
    
    if (isCorrect) {
        elements.feedbackIcon.textContent = '🎯';
        elements.feedbackTitle.textContent = 'AR Target Acquired!';
        elements.feedbackText.textContent = `Excellent! ${gameState.streak > 1 ? `AR Streak: ${gameState.streak} 🔥` : 'Perfect accuracy!'}`;
    } else {
        elements.feedbackIcon.textContent = '🔄';
        elements.feedbackTitle.textContent = 'AR Recalibrating...';
        elements.feedbackText.textContent = 'Sensors indicate incorrect data. Recalibrating for next scan!';
    }
    
    elements.feedbackExplanation.textContent = explanation;
    showModal('feedback');
    
    // Add AR ring effect to feedback
    setTimeout(() => {
        const successRing = document.querySelector('.ar-success-ring');
        if (successRing) {
            successRing.style.animation = 'expandRing 1s ease-out';
        }
    }, 100);
}

// Perform AR scan effect
function performARScan() {
    if (gameState.scanningActive) return;
    
    gameState.scanningActive = true;
    elements.scanBtn.style.opacity = '0.5';
    
    // Create scanning effect
    const scanOverlay = document.createElement('div');
    scanOverlay.className = 'ar-scan-overlay';
    scanOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(235, 107, 52, 0.3) 50%, 
            transparent 100%);
        z-index: 1500;
        pointer-events: none;
        animation: arScan 2s ease-in-out;
    `;
    
    document.body.appendChild(scanOverlay);
    
    // Reveal nearby locations during scan
    const nearbyMarkers = document.querySelectorAll('.ar-location-marker.available');
    nearbyMarkers.forEach((marker, index) => {
        setTimeout(() => {
            const distanceEl = marker.querySelector('.ar-marker-distance');
            if (distanceEl) {
                distanceEl.style.animation = 'pulse 1s ease-in-out';
                distanceEl.style.background = '#eb6b34';
            }
        }, index * 300);
    });
    
    setTimeout(() => {
        document.body.removeChild(scanOverlay);
        gameState.scanningActive = false;
        elements.scanBtn.style.opacity = '1';
    }, 2000);
}

// Toggle AR mode
function toggleARMode() {
    gameState.arMode = !gameState.arMode;
    
    const arIndicator = document.querySelector('.ar-indicator');
    if (gameState.arMode) {
        arOverlay.classList.add('active');
        arIndicator.classList.add('active');
    } else {
        arOverlay.classList.remove('active');
        arIndicator.classList.remove('active');
    }
}

// Toggle map view
function toggleMapView() {
    // Simple implementation - could be enhanced with full map overlay
    const campus = document.querySelector('.campus-ar-background');
    campus.style.filter = campus.style.filter === 'sepia(100%)' ? 'none' : 'sepia(100%)';
}

// Show achievements overlay
function showAchievements() {
    const achievements = generateAchievements(
        Math.round((gameState.correctAnswers / Math.max(gameState.totalQuestionsAnswered, 1)) * 100)
    );
    
    const achievementOverlay = document.createElement('div');
    achievementOverlay.className = 'achievement-overlay';
    achievementOverlay.innerHTML = `
        <div class="achievement-modal">
            <h3>🏅 Current Achievements</h3>
            <div class="current-achievements">
                ${achievements.map(achievement => `
                    <div class="achievement-item">
                        <span class="achievement-icon">${achievement.icon}</span>
                        <span>${achievement.name}</span>
                    </div>
                `).join('')}
            </div>
            <button class="close-achievements">Close</button>
        </div>
    `;
    
    achievementOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2500;
    `;
    
    document.body.appendChild(achievementOverlay);
    
    achievementOverlay.querySelector('.close-achievements').addEventListener('click', () => {
        document.body.removeChild(achievementOverlay);
    });
    
    achievementOverlay.addEventListener('click', (e) => {
        if (e.target === achievementOverlay) {
            document.body.removeChild(achievementOverlay);
        }
    });
}

// Get points based on difficulty
function getDifficultyPoints(difficulty) {
    switch (difficulty) {
        case 'easy': return 10;
        case 'medium': return 20;
        case 'hard': return 30;
        default: return 10;
    }
}

// Update player level
function updatePlayerLevel() {
    const levels = Object.keys(levelThresholds).reverse();
    for (const level of levels) {
        if (gameState.score >= levelThresholds[level]) {
            if (gameState.playerLevel !== level) {
                gameState.playerLevel = level;
                showLevelUpEffect();
            }
            break;
        }
    }
}

// Show level up effect
function showLevelUpEffect() {
    const levelUpEffect = document.createElement('div');
    levelUpEffect.className = 'level-up-effect';
    levelUpEffect.innerHTML = `
        <div class="level-up-content">
            <div class="level-up-icon">🆙</div>
            <div class="level-up-text">Level Up!</div>
            <div class="level-up-level">${gameState.playerLevel}</div>
        </div>
    `;
    
    levelUpEffect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3000;
        pointer-events: none;
        animation: levelUpAnimation 2s ease-out;
    `;
    
    document.body.appendChild(levelUpEffect);
    
    setTimeout(() => {
        document.body.removeChild(levelUpEffect);
    }, 2000);
}

// Handle feedback continue with AR effects
function handleFeedbackContinue() {
    closeModal('feedback');
    
    const location = gameState.currentLocation;
    const hasMoreQuestions = gameState.currentQuestionIndex < location.trivia_questions.length - 1;
    
    if (hasMoreQuestions) {
        gameState.currentQuestionIndex++;
        showARTrivia();
    } else {
        // Complete location with AR effects
        completeARLocation();
    }
}

// Complete location with AR effects
function completeARLocation() {
    const locationId = gameState.currentLocation.id;
    
    // Mark location as completed
    gameState.completedLocations++;
    
    // Update location visual state with AR effect
    const hotspot = document.querySelector(`[data-location-id="${locationId}"]`);
    if (hotspot) {
        hotspot.classList.remove('available');
        hotspot.classList.add('completed');
        
        // Add completion effect
        createLocationCompletionEffect(hotspot);
        
        // Update distance to "DONE"
        const distanceEl = hotspot.querySelector('.ar-marker-distance');
        if (distanceEl) {
            distanceEl.textContent = '✓ DONE';
            distanceEl.style.background = '#21c55d';
        }
    }
    
    // Unlock adjacent locations
    unlockNextLocations(locationId);
    
    // Reset question index
    gameState.currentQuestionIndex = 0;
    gameState.currentLocation = null;
    
    updateUI();
    updateLocationStates();
    
    // Check if game is complete
    if (gameState.completedLocations === 7) {
        setTimeout(() => {
            showARCompletionScreen();
        }, 1500);
    } else {
        // Return to main campus background
        updateCampusBackground('main');
    }
}

// Create location completion effect
function createLocationCompletionEffect(marker) {
    const completionEffect = document.createElement('div');
    completionEffect.className = 'completion-effect';
    completionEffect.innerHTML = '🎉';
    completionEffect.style.cssText = `
        position: absolute;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 2rem;
        z-index: 100;
        pointer-events: none;
        animation: completionBurst 2s ease-out;
    `;
    
    marker.appendChild(completionEffect);
    
    setTimeout(() => {
        if (completionEffect.parentNode) {
            completionEffect.parentNode.removeChild(completionEffect);
        }
    }, 2000);
}

// Unlock next locations based on progression logic
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
            
            // Add unlock animation
            setTimeout(() => {
                const marker = document.querySelector(`[data-location-id="${locationId}"]`);
                if (marker) {
                    createUnlockEffect(marker);
                }
            }, 500);
        }
    });
}

// Create unlock effect
function createUnlockEffect(marker) {
    const unlockEffect = document.createElement('div');
    unlockEffect.className = 'unlock-effect';
    unlockEffect.innerHTML = '🔓';
    unlockEffect.style.cssText = `
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.5rem;
        z-index: 100;
        pointer-events: none;
        animation: unlockAnimation 1.5s ease-out;
    `;
    
    marker.appendChild(unlockEffect);
    
    setTimeout(() => {
        if (unlockEffect.parentNode) {
            unlockEffect.parentNode.removeChild(unlockEffect);
        }
    }, 1500);
}

// Update location states with AR enhancements
function updateLocationStates() {
    const markers = document.querySelectorAll('.ar-location-marker');
    
    markers.forEach(marker => {
        const locationId = parseInt(marker.dataset.locationId);
        const location = campusData.campus_locations.find(loc => loc.id === locationId);
        
        marker.classList.remove('available', 'locked', 'completed');
        
        if (gameState.playerAnswers[locationId]) {
            marker.classList.add('completed');
        } else if (gameState.unlockedLocations.includes(locationId)) {
            marker.classList.add('available');
            
            // Update distance for available locations
            const distanceEl = marker.querySelector('.ar-marker-distance');
            if (distanceEl && location) {
                distanceEl.textContent = location.ar_distance;
            }
        } else {
            marker.classList.add('locked');
        }
    });
}

// Show AR-enhanced completion screen
function showARCompletionScreen() {
    const accuracy = Math.round((gameState.correctAnswers / gameState.totalQuestionsAnswered) * 100);
    
    elements.finalScore.textContent = gameState.score;
    elements.finalAccuracy.textContent = accuracy + '%';
    
    // Generate achievements
    const achievements = generateAchievements(accuracy);
    elements.achievementList.innerHTML = '';
    
    achievements.forEach((achievement, index) => {
        const badge = document.createElement('div');
        badge.className = 'achievement-badge';
        badge.innerHTML = `
            <span class="achievement-icon">${achievement.icon}</span>
            <span>${achievement.name}</span>
        `;
        
        // Add staggered animation
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        badge.style.transition = 'all 0.5s ease-out';
        
        elements.achievementList.appendChild(badge);
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    showScreen('completion');
    
    // Deactivate AR mode
    arOverlay.classList.remove('active');
    
    // Add completion particles effect
    createCompletionParticles();
}

// Create completion particles effect
function createCompletionParticles() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.innerHTML = ['🎉', '✨', '🎊', '⭐'][Math.floor(Math.random() * 4)];
            particle.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -20px;
                font-size: ${Math.random() * 20 + 10}px;
                z-index: 1000;
                pointer-events: none;
                animation: fallDown ${Math.random() * 3 + 2}s linear;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    document.body.removeChild(particle);
                }
            }, 5000);
        }, i * 100);
    }
}

// Generate achievements based on performance
function generateAchievements(accuracy) {
    const achievements = [];
    
    // Always get explorer achievement
    achievements.push({ icon: '🔍', name: 'AR Explorer' });
    
    // Score-based achievements
    if (gameState.score >= 100) achievements.push({ icon: '💯', name: 'High Scanner' });
    if (gameState.score >= 150) achievements.push({ icon: '⭐', name: 'AR Star' });
    if (gameState.score >= 200) achievements.push({ icon: '🏆', name: 'AR Legend' });
    
    // Accuracy-based achievements
    if (accuracy >= 70) achievements.push({ icon: '🎯', name: 'Sharp Sensors' });
    if (accuracy >= 85) achievements.push({ icon: '🧠', name: 'AI Brain' });
    if (accuracy === 100) achievements.push({ icon: '💎', name: 'Perfect Calibration' });
    
    // Streak achievements
    if (gameState.maxStreak >= 5) achievements.push({ icon: '🔥', name: 'AR Streak Master' });
    if (gameState.maxStreak >= 10) achievements.push({ icon: '⚡', name: 'Unstoppable Scanner' });
    
    // Completion achievements
    achievements.push({ icon: '🎓', name: 'RU AR Graduate' });
    
    // Level achievement
    if (gameState.playerLevel === 'Legend') {
        achievements.push({ icon: '👑', name: 'AR Campus Royalty' });
    }
    
    return achievements;
}

// Share achievement with AR context
function shareAchivement() {
    const accuracy = Math.round((gameState.correctAnswers / gameState.totalQuestionsAnswered) * 100);
    const shareText = `I just completed CampusQuest AR at Rishihood University! 🎯📱\n\nAR Score: ${gameState.score} points\nAccuracy: ${accuracy}%\nLevel: ${gameState.playerLevel}\n\nExplore campus in AR too! 🏫✨`;
    
    if (navigator.share) {
        navigator.share({
            title: 'CampusQuest AR Achievement',
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('AR Achievement copied to clipboard! Share it with your friends! 📱✨');
        });
    }
}

// Restart game with AR reset
function restartGame() {
    // Reset game state
    gameState = {
        currentScreen: 'game',
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
        arMode: true,
        scanningActive: false,
        currentBackground: 'main'
    };
    
    showScreen('game');
    updateUI();
    updateLocationStates();
    updateCampusBackground('main');
    activateARMode();
    closeModals();
    
    // Reset AR effects
    setTimeout(() => {
        performWelcomeScan();
    }, 500);
}

// Utility functions (show/hide screens, modals, etc.)
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function showModal(modalName) {
    const modal = modals[modalName];
    if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
    }
}

function closeModal(modalName) {
    const modal = modals[modalName];
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('hidden'), 250);
    }
}

function closeModals() {
    Object.values(modals).forEach(modal => {
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('hidden'), 250);
    });
}

function closeTrivia() {
    closeModal('trivia');
    gameState.currentLocation = null;
    gameState.currentQuestionIndex = 0;
}

function updateUI() {
    elements.score.textContent = gameState.score;
    elements.completedLocations.textContent = gameState.completedLocations;
    elements.playerLevel.textContent = gameState.playerLevel;
    
    // Update progress bar
    const progress = (gameState.completedLocations / 7) * 100;
    elements.progressFill.style.width = progress + '%';
}

// Add dynamic CSS animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes successBurst {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
    }
    
    @keyframes errorShake {
        0%, 100% { transform: translate(-50%, -50%); }
        25% { transform: translate(-45%, -50%); }
        75% { transform: translate(-55%, -50%); }
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateX(-50%) translateY(10px); }
        50% { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    
    @keyframes completionBurst {
        0% { transform: translateX(-50%) translateY(0) scale(0); opacity: 1; }
        50% { transform: translateX(-50%) translateY(-20px) scale(1.2); opacity: 1; }
        100% { transform: translateX(-50%) translateY(-40px) scale(0.8); opacity: 0; }
    }
    
    @keyframes unlockAnimation {
        0% { transform: translateX(-50%) scale(0); opacity: 1; }
        50% { transform: translateX(-50%) scale(1.3); opacity: 1; }
        100% { transform: translateX(-50%) scale(1); opacity: 0; }
    }
    
    @keyframes levelUpAnimation {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
    }
    
    @keyframes fallDown {
        0% { transform: translateY(-100vh) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(360deg); }
    }
    
    .level-up-content {
        background: linear-gradient(135deg, #eb6b34, #c0152f);
        color: white;
        padding: 20px;
        border-radius: 15px;
        text-align: center;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    
    .level-up-icon {
        font-size: 3rem;
        margin-bottom: 10px;
    }
    
    .level-up-text {
        font-size: 1.5rem;
        margin-bottom: 10px;
    }
    
    .level-up-level {
        font-size: 1.2rem;
        color: #ffd700;
    }
    
    .achievement-modal {
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(20px);
        padding: 30px;
        border-radius: 15px;
        border: 2px solid #eb6b34;
        max-width: 400px;
        width: 90%;
        text-align: center;
        color: white;
    }
    
    .current-achievements {
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin: 20px 0;
    }
    
    .achievement-item {
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 15px;
        background: rgba(235, 107, 52, 0.2);
        border-radius: 10px;
        border: 1px solid #eb6b34;
    }
    
    .close-achievements {
        background: linear-gradient(135deg, #eb6b34, #c0152f);
        border: none;
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 20px;
    }
`;

document.head.appendChild(dynamicStyles);

// Initialize AR game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);