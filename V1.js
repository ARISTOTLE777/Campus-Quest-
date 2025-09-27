import React, { useState, useEffect } from 'react';
import { MapPin, Trophy, User, Zap, BookOpen, Coffee, FlaskConical, Utensils, Dumbbell, Users, GraduationCap, Camera, CheckCircle, XCircle, Star, Sparkles, Award, Target } from 'lucide-react';

const CampusQuest = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [playerStats, setPlayerStats] = useState({
    name: '',
    level: 1,
    experience: 0,
    levelsCleared: 0,
    engagementScore: 0
  });
  const [gameStarted, setGameStarted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [arMode, setArMode] = useState(false);
  const [visitedLocations, setVisitedLocations] = useState(new Set());
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [particles, setParticles] = useState([]);
  const [pulsingLocations, setPulsingLocations] = useState(new Set());

  const campusLocations = [
    {
      id: 1,
      name: "Rishihood Central Library",
      icon: BookOpen,
      position: { x: 25, y: 30 },
      description: "Knowledge hub of innovation and learning",
      color: "from-blue-500 to-blue-700",
      unlocked: true
    },
    {
      id: 2,
      name: "Innovation Labs",
      icon: FlaskConical,
      position: { x: 60, y: 25 },
      description: "Where ideas transform into reality",
      color: "from-purple-500 to-purple-700",
      unlocked: true
    },
    {
      id: 3,
      name: "Wellness Café",
      icon: Coffee,
      position: { x: 40, y: 50 },
      description: "Fuel your mind and body",
      color: "from-amber-500 to-amber-700",
      unlocked: true
    },
    {
      id: 4,
      name: "Main Canteen",
      icon: Utensils,
      position: { x: 70, y: 60 },
      description: "Community dining experience",
      color: "from-green-500 to-green-700",
      unlocked: true
    },
    {
      id: 5,
      name: "Fitness Center",
      icon: Dumbbell,
      position: { x: 20, y: 70 },
      description: "Strengthen body and mind",
      color: "from-orange-500 to-orange-700",
      unlocked: true
    },
    {
      id: 6,
      name: "Student Lounge",
      icon: Users,
      position: { x: 80, y: 40 },
      description: "Connect, collaborate, create",
      color: "from-pink-500 to-pink-700",
      unlocked: true
    },
    {
      id: 7,
      name: "Academic Block",
      icon: GraduationCap,
      position: { x: 45, y: 80 },
      description: "Center of academic excellence",
      color: "from-indigo-500 to-indigo-700",
      unlocked: visitedLocations.size >= 3
    }
  ];

  const locationQuestions = {
    1: [
      {
        question: "What is the primary mission of Rishihood University?",
        options: ["Traditional education", "Holistic development and innovation", "Only technical skills", "Sports excellence"],
        correct: 1,
        explanation: "Rishihood University focuses on holistic development, combining academics with personal growth and innovation."
      },
      {
        question: "Which learning approach does Rishihood emphasize?",
        options: ["Memorization only", "Practical application", "Theory without practice", "Competitive learning"],
        correct: 1,
        explanation: "Rishihood emphasizes practical, experiential learning that prepares students for real-world challenges."
      }
    ],
    2: [
      {
        question: "What type of projects are typically developed in innovation labs?",
        options: ["Only software", "Interdisciplinary solutions", "Traditional crafts", "Administrative work"],
        correct: 1,
        explanation: "Innovation labs at Rishihood foster interdisciplinary collaboration to solve complex problems."
      },
      {
        question: "Which technology trend is most relevant for campus innovation?",
        options: ["Typewriters", "AI and Machine Learning", "Telegraph", "Abacus"],
        correct: 1,
        explanation: "AI and ML are key technologies driving innovation in modern educational environments."
      }
    ],
    3: [
      {
        question: "What is the importance of wellness in academic performance?",
        options: ["No connection", "Direct positive impact", "Negative impact", "Only physical health matters"],
        correct: 1,
        explanation: "Mental and physical wellness directly enhance cognitive function and academic performance."
      },
      {
        question: "Which practice supports student well-being?",
        options: ["Isolation", "Mindful eating and social connection", "Excessive caffeine", "Skipping meals"],
        correct: 1,
        explanation: "Mindful eating and social connections are essential for student wellness and community building."
      }
    ],
    4: [
      {
        question: "How does communal dining benefit students?",
        options: ["Wastes time", "Builds community and cultural exchange", "Creates mess", "Expensive only"],
        correct: 1,
        explanation: "Communal dining spaces foster relationships, cultural understanding, and social skills."
      },
      {
        question: "What role does nutrition play in learning?",
        options: ["No role", "Fundamental for brain function", "Only for athletes", "Luxury concern"],
        correct: 1,
        explanation: "Proper nutrition is essential for optimal brain function, memory, and concentration."
      }
    ],
    5: [
      {
        question: "How does physical fitness impact academic success?",
        options: ["Reduces study time", "Improves cognitive function and stress management", "Only for sports students", "Waste of energy"],
        correct: 1,
        explanation: "Regular exercise improves cognitive function, memory, and helps manage academic stress effectively."
      },
      {
        question: "What is the mind-body connection in education?",
        options: ["Myth", "Physical health directly affects mental performance", "Only for meditation", "Separate systems"],
        correct: 1,
        explanation: "Physical and mental health are interconnected, with physical wellness supporting better learning outcomes."
      }
    ],
    6: [
      {
        question: "Why are collaborative spaces important in universities?",
        options: ["Waste of space", "Foster teamwork and peer learning", "Only for socializing", "Administrative requirement"],
        correct: 1,
        explanation: "Collaborative spaces enable peer-to-peer learning, teamwork skills, and innovation through interaction."
      },
      {
        question: "What skills are developed through student collaboration?",
        options: ["Individual competition", "Communication, leadership, and problem-solving", "Isolation techniques", "Following orders"],
        correct: 1,
        explanation: "Collaborative environments develop essential 21st-century skills like communication, leadership, and creative problem-solving."
      }
    ],
    7: [
      {
        question: "What makes Rishihood's academic approach unique?",
        options: ["Traditional lectures only", "Integration of theory with practical application", "Exam-focused learning", "Single-discipline focus"],
        correct: 1,
        explanation: "Rishihood integrates theoretical knowledge with hands-on application and interdisciplinary learning."
      },
      {
        question: "How does project-based learning benefit students?",
        options: ["More homework", "Develops real-world problem-solving skills", "Easier grades", "Less interaction"],
        correct: 1,
        explanation: "Project-based learning develops critical thinking, collaboration, and practical skills needed in professional environments."
      }
    ]
  };

  useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      life: 100
    });

    const initialParticles = Array.from({ length: 20 }, createParticle);
    setParticles(initialParticles);

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100,
        life: particle.life - 1
      })).filter(p => p.life > 0));
    };

    const particleInterval = setInterval(animateParticles, 100);
    return () => clearInterval(particleInterval);
  }, [gameStarted]);

  useEffect(() => {
    const interval = setInterval(() => {
      const availableLocations = campusLocations
        .filter(loc => loc.unlocked && !visitedLocations.has(loc.id))
        .map(loc => loc.id);
      
      setPulsingLocations(new Set(availableLocations));
    }, 1000);

    return () => clearInterval(interval);
  }, [visitedLocations]);

  const generateQuestion = (locationId) => {
    const questions = locationQuestions[locationId] || [];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const startGame = () => {
    if (playerStats.name.trim()) {
      setGameStarted(true);
    }
  };

  const visitLocation = (location) => {
    if (!location.unlocked) return;
    
    setCurrentLocation(location);
    const question = generateQuestion(location.id);
    setCurrentQuestion(question);
    setShowQuiz(true);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQuestion.correct;
    const newVisitedLocations = new Set(visitedLocations);
    newVisitedLocations.add(currentLocation.id);
    
    setVisitedLocations(newVisitedLocations);
    setShowResult(true);
    
    const experienceGain = isCorrect ? 100 : 50;
    const engagementGain = isCorrect ? 20 : 10;
    const newExperience = playerStats.experience + experienceGain;
    const newLevel = Math.floor(newExperience / 300) + 1;
    
    if (newLevel > playerStats.level) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 3000);
    }
    
    setPlayerStats(prev => ({
      ...prev,
      experience: newExperience,
      levelsCleared: isCorrect ? prev.levelsCleared + 1 : prev.levelsCleared,
      engagementScore: prev.engagementScore + engagementGain,
      level: newLevel
    }));
  };

  const closeQuiz = () => {
    setShowQuiz(false);
    setCurrentLocation(null);
    setCurrentQuestion(null);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const toggleARMode = async () => {
    if (!arMode) {
      // Check if device supports camera access
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          // Request camera permission for AR
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: 'environment', // Use back camera for AR
              width: { ideal: 1280 },
              height: { ideal: 720 }
            } 
          });
          
          // Stop the stream immediately (we just needed permission check)
          stream.getTracks().forEach(track => track.stop());
          
          setArMode(true);
          
          // Create celebration particles
          const newParticles = Array.from({ length: 50 }, () => ({
            id: Math.random(),
            x: 50,
            y: 50,
            size: Math.random() * 6 + 3,
            opacity: 1,
            speedX: (Math.random() - 0.5) * 4,
            speedY: (Math.random() - 0.5) * 4,
            life: 30
          }));
          setParticles(prev => [...prev, ...newParticles]);
          
          alert("📱 AR Mode Ready! Point your camera at campus locations to unlock special AR challenges. Look for QR codes or building markers around Rishihood campus!");
          
        } catch (error) {
          alert("📷 Camera access needed for AR features. Please enable camera permissions and try again!");
          console.log("AR Mode requires camera access:", error);
        }
      } else {
        alert("📱 AR features require a modern mobile browser with camera support. Try Chrome or Safari on your phone!");
      }
    } else {
      setArMode(false);
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-700/20 animate-pulse"></div>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full border border-red-200/50 transform transition-all duration-500 hover:scale-105 relative z-10">
          <div className="text-center mb-6">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-red-600 animate-bounce" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2 animate-pulse">
              CampusQuest
            </h1>
            <p className="text-red-600 font-medium">Rishihood University Adventure</p>
            <div className="flex justify-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-red-700 font-medium mb-2">Enter Your Name:</label>
            <input
              type="text"
              value={playerStats.name}
              onChange={(e) => setPlayerStats(prev => ({...prev, name: e.target.value}))}
              className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:border-red-600 focus:outline-none transition-all duration-300 focus:scale-105 focus:shadow-lg bg-white/80 backdrop-blur-sm"
              placeholder="Your adventure awaits..."
            />
          </div>
          
          <button
            onClick={startGame}
            disabled={!playerStats.name.trim()}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span className="relative flex items-center justify-center space-x-2">
              <span>Start Your Quest!</span>
              <Sparkles className="w-5 h-5 animate-spin" />
            </span>
          </button>
          
          <div className="mt-6 text-sm text-red-600 bg-red-50/80 backdrop-blur-sm p-4 rounded-xl border border-red-200/50">
            <strong className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>How to Play:</span>
            </strong>
            <ul className="mt-2 space-y-1">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span>Explore campus locations on the map</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span>Answer AI-generated quizzes to gain XP</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span>Unlock new areas as you progress</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span>Try AR mode for real campus challenges!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>

      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-8 rounded-3xl shadow-2xl transform animate-bounce border-4 border-yellow-300">
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4 animate-spin" />
              <h2 className="text-3xl font-bold mb-2">LEVEL UP!</h2>
              <p className="text-xl">Level {playerStats.level}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-red-800 to-red-900 shadow-2xl p-6 border-b border-red-700/50 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <GraduationCap className="w-10 h-10 text-white animate-bounce" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">CampusQuest</h1>
              <p className="text-red-200 text-sm">Rishihood University</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm animate-pulse">
                <User className="w-5 h-5" />
                <span className="font-medium">{playerStats.name}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                <Star className="w-5 h-5 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span>Level {playerStats.level}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                <Trophy className="w-5 h-5 text-yellow-400 animate-bounce" />
                <span>{playerStats.levelsCleared}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                <Zap className="w-5 h-5 text-blue-400 animate-pulse" />
                <span>{playerStats.engagementScore}</span>
              </div>
            </div>
            
            <button
              onClick={toggleARMode}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-110 ${
                arMode 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg' 
                  : 'bg-white/90 hover:bg-white text-red-800 shadow-lg hover:shadow-xl backdrop-blur-sm'
              }`}
            >
              <Camera className={`w-5 h-5 ${arMode ? 'animate-pulse' : 'animate-bounce'}`} />
              <span>{arMode ? 'AR Active' : 'AR Mode'}</span>
              {arMode && (
                <>
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
                  <span className="text-xs bg-green-400 text-green-900 px-2 py-1 rounded-full">📱 Ready</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-red-200/50 transform transition-all duration-500 hover:shadow-3xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                  Rishihood Campus
                </h2>
                <div className="flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}></div>
                  ))}
                </div>
              </div>
              
              <div className="relative bg-gradient-to-br from-green-100 via-green-50 to-blue-50 rounded-2xl h-[500px] overflow-hidden border-2 border-red-300/50 shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/70 to-blue-50/70">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-white/30 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 20 + 10}px`,
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${Math.random() * 3 + 4}s`
                      }}
                    />
                  ))}
                </div>
                
                {campusLocations.map((location) => {
                  const IconComponent = location.icon;
                  const isVisited = visitedLocations.has(location.id);
                  const isUnlocked = location.unlocked;
                  const isPulsing = pulsingLocations.has(location.id);
                  
                  return (
                    <div key={location.id} className="absolute transform -translate-x-1/2 -translate-y-1/2"
                      style={{ 
                        left: `${location.position.x}%`, 
                        top: `${location.position.y}%` 
                      }}>
                      
                      {isPulsing && (
                        <div className="absolute inset-0 w-16 h-16 -m-2 border-4 border-red-400 rounded-full animate-ping"></div>
                      )}
                      
                      <button
                        onClick={() => visitLocation(location)}
                        disabled={!isUnlocked}
                        className={`relative transition-all duration-500 transform ${
                          isUnlocked 
                            ? 'hover:scale-125 cursor-pointer hover:rotate-12' 
                            : 'cursor-not-allowed opacity-50'
                        } ${isPulsing ? 'animate-bounce' : ''}`}
                      >
                        <div className={`relative w-12 h-12 rounded-full shadow-2xl border-3 border-white transition-all duration-300 ${
                          isVisited 
                            ? 'bg-gradient-to-br from-green-400 to-green-600 shadow-green-400/50' 
                            : isUnlocked 
                              ? `bg-gradient-to-br ${location.color} shadow-red-400/50 hover:shadow-lg` 
                              : 'bg-gradient-to-br from-gray-400 to-gray-600'
                        }`}>
                          <IconComponent className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                          
                          {isVisited && (
                            <div className="absolute -top-1 -right-1">
                              <CheckCircle className="w-6 h-6 text-green-400 bg-white rounded-full animate-bounce" />
                            </div>
                          )}
                          
                          {!isVisited && isUnlocked && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse border-2 border-white"></div>
                          )}
                        </div>
                        
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-3 min-w-max border border-red-200/50 opacity-0 hover:opacity-100 transition-all duration-300 z-10">
                          <p className="font-bold text-red-800 text-sm">{location.name}</p>
                          <p className="text-red-600 text-xs">{location.description}</p>
                          {!isUnlocked && <p className="text-gray-500 text-xs mt-1">🔒 Complete 3 locations to unlock</p>}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-red-200/50">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-6 flex items-center">
                <Trophy className="w-6 h-6 text-red-600 mr-2 animate-bounce" />
                Player Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200/50">
                  <span className="text-red-700 font-medium flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Experience:
                  </span>
                  <span className="font-bold text-red-800 bg-white px-3 py-1 rounded-full shadow-sm">
                    {playerStats.experience} XP
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200/50">
                  <span className="text-yellow-700 font-medium flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Level:
                  </span>
                  <span className="font-bold text-yellow-800 bg-white px-3 py-1 rounded-full shadow-sm">
                    {playerStats.level}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200/50">
                  <span className="text-green-700 font-medium flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    Cleared:
                  </span>
                  <span className="font-bold text-green-800 bg-white px-3 py-1 rounded-full shadow-sm">
                    {playerStats.levelsCleared}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200/50">
                  <span className="text-blue-700 font-medium flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Engagement:
                  </span>
                  <span className="font-bold text-blue-800 bg-white px-3 py-1 rounded-full shadow-sm">
                    {playerStats.engagementScore}
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between text-sm text-red-600 mb-2">
                  <span className="font-medium">Progress to Level {playerStats.level + 1}</span>
                  <span className="font-bold">{playerStats.experience % 300}/300 XP</span>
                </div>
                <div className="w-full bg-red-200/50 rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${(playerStats.experience % 300) / 300 * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 border border-red-200/50">
              <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-red-600 mr-2 animate-pulse" />
                Campus Progress
              </h3>
              
              <div className="space-y-3">
                {campusLocations.map((location) => {
                  const isVisited = visitedLocations.has(location.id);
                  const isUnlocked = location.unlocked;
                  const IconComponent = location.icon;
                  
                  return (
                    <div key={location.id} className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 transform hover:scale-102 ${
                      isVisited ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-md' : 
                      isUnlocked ? 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 shadow-sm hover:shadow-md' : 
                      'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                    }`}>
                      <div className={`p-2 rounded-lg ${
                        isVisited ? 'bg-green-500 text-white animate-pulse' : 
                        isUnlocked ? 'bg-red-500 text-white' : 
                        'bg-gray-400 text-white'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <span className={`text-sm font-medium block ${
                          isVisited ? 'text-green-800' : 
                          isUnlocked ? 'text-red-800' : 
                          'text-gray-500'
                        }`}>
                          {location.name}
                        </span>
                        <span className="text-xs text-gray-600">{location.description}</span>
                      </div>
                      {isVisited && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-5 h-5 text-green-600 animate-bounce" />
                          <span className="text-xs text-green-600 font-bold">✓</span>
                        </div>
                      )}
                      {!isUnlocked && (
                        <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                          🔒 Locked
                        </div>
                      )}
                      {isUnlocked && !isVisited && (
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-red-600 animate-bounce" />
                    <span className="font-medium text-red-800">Completion</span>
                  </div>
                  <span className="font-bold text-red-800">
                    {visitedLocations.size}/{campusLocations.length}
                  </span>
                </div>
                <div className="mt-2 w-full bg-red-200/50 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(visitedLocations.size / campusLocations.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AR Scanner Overlay */}
      {arMode && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">
          <div className="absolute inset-4 border-4 border-green-400 rounded-2xl animate-pulse">
            <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-green-400"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-green-400"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-green-400"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-green-400"></div>
          </div>
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
          </div>
          
          <div className="absolute bottom-20 left-0 right-0 text-center">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">📱 AR Scanner Active</h3>
              <p className="text-gray-700 mb-4">Point your camera at campus locations:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span>QR codes on campus buildings</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>University signage and landmarks</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Special AR markers around campus</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={toggleARMode}
            className="absolute top-8 right-8 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all duration-300"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Mobile Responsive Enhancements */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-30">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 border border-red-200/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-red-800 text-sm">{playerStats.name}</p>
                <p className="text-xs text-red-600">Level {playerStats.level} • {playerStats.levelsCleared} cleared</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-red-800">{playerStats.experience} XP</p>
              <p className="text-xs text-red-600">{playerStats.engagementScore} engagement</p>
            </div>
          </div>
        </div>
      </div>
      {showQuiz && currentQuestion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-2xl w-full border border-red-200/50 transform animate-scale-in">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                  {React.createElement(currentLocation.icon, { className: "w-8 h-8" })}
                  <h3 className="text-2xl font-bold">{currentLocation.name}</h3>
                </div>
                <p className="text-red-200">{currentLocation.description}</p>
              </div>
            </div>
            
            <div className="p-8">
              {!showResult ? (
                <>
                  <h4 className="text-xl font-bold text-red-800 mb-6 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-yellow-500 animate-spin" />
                    {currentQuestion.question}
                  </h4>
                  
                  <div className="space-y-4 mb-8">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedAnswer(index)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-102 ${
                          selectedAnswer === index
                            ? 'border-red-500 bg-gradient-to-r from-red-50 to-red-100 text-red-800 shadow-lg scale-102'
                            : 'border-red-200 hover:border-red-400 hover:bg-red-50 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${
                            selectedAnswer === index
                              ? 'bg-red-500 text-white border-red-600'
                              : 'bg-white text-red-600 border-red-300'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={submitAnswer}
                      disabled={selectedAnswer === null}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-xl relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                      <span className="relative flex items-center justify-center space-x-2">
                        <span>Submit Answer</span>
                        <Zap className="w-5 h-5 animate-pulse" />
                      </span>
                    </button>
                    <button
                      onClick={closeQuiz}
                      className="px-8 py-4 border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 font-medium hover:scale-105"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center animate-fade-in">
                  <div className="mb-6">
                    {selectedAnswer === currentQuestion.correct ? (
                      <div className="relative">
                        <CheckCircle className="w-20 h-20 text-green-600 mx-auto animate-bounce" />
                        <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-green-400 rounded-full animate-ping"></div>
                      </div>
                    ) : (
                      <div className="relative">
                        <XCircle className="w-20 h-20 text-red-600 mx-auto animate-pulse" />
                        <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-red-400 rounded-full animate-ping"></div>
                      </div>
                    )}
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-4">
                    {selectedAnswer === currentQuestion.correct ? (
                      <span className="text-green-600 flex items-center justify-center space-x-2">
                        <span>🎉 Excellent!</span>
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center justify-center space-x-2">
                        <span>💡 Keep Learning!</span>
                      </span>
                    )}
                  </h4>
                  
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed">{currentQuestion.explanation}</p>
                  
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-red-800">
                          <Zap className="w-5 h-5" />
                          <span className="font-bold">XP Gained</span>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          +{selectedAnswer === currentQuestion.correct ? '100' : '50'}
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-red-800">
                          <Star className="w-5 h-5" />
                          <span className="font-bold">Engagement</span>
                        </div>
                        <span className="text-2xl font-bold text-red-600">
                          +{selectedAnswer === currentQuestion.correct ? '20' : '10'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={closeQuiz}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Continue Adventure 🚀
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-in {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default CampusQuest;
