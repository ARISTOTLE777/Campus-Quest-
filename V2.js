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
  const [energyWaves, setEnergyWaves] = useState([]);
  const [floatingElements, setFloatingElements] = useState([]);
  const [screenShake, setScreenShake] = useState(false);

  const campusLocations = [
    {
      id: 1,
      name: "Rishihood Central Library",
      icon: BookOpen,
      position: { x: 25, y: 30 },
      description: "Knowledge hub across A, B, C blocks",
      color: "from-blue-500 to-blue-700",
      unlocked: true
    },
    {
      id: 2,
      name: "Innovation Labs",
      icon: FlaskConical,
      position: { x: 60, y: 25 },
      description: "Cross-block innovation facilities",
      color: "from-purple-500 to-purple-700",
      unlocked: true
    },
    {
      id: 3,
      name: "Chai Adda",
      icon: Coffee,
      position: { x: 40, y: 50 },
      description: "Popular student hangout spot",
      color: "from-amber-500 to-amber-700",
      unlocked: true
    },
    {
      id: 4,
      name: "Pushpa Devi Mess",
      icon: Utensils,
      position: { x: 70, y: 60 },
      description: "Main mess with A Block Mess",
      color: "from-green-500 to-green-700",
      unlocked: true
    },
    {
      id: 5,
      name: "Fitness Center",
      icon: Dumbbell,
      position: { x: 20, y: 70 },
      description: "Wellness facility for all blocks",
      color: "from-orange-500 to-orange-700",
      unlocked: true
    },
    {
      id: 6,
      name: "R1, R2, R3 Residencies",
      icon: Users,
      position: { x: 80, y: 40 },
      description: "Three residential blocks",
      color: "from-pink-500 to-pink-700",
      unlocked: true
    },
    {
      id: 7,
      name: "A, B, C Academic Blocks",
      icon: GraduationCap,
      position: { x: 45, y: 80 },
      description: "Three main academic buildings",
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
      },
      {
        question: "How many academic blocks are there in Rishihood University?",
        options: ["Two blocks", "Three blocks (A, B, C)", "Four blocks", "Five blocks"],
        correct: 1,
        explanation: "Rishihood University has three main academic blocks: A Block, B Block, and C Block."
      },
      {
        question: "What makes the Rishihood library special for students?",
        options: ["Only physical books", "Digital resources and collaborative spaces", "Silent study only", "Limited access"],
        correct: 1,
        explanation: "The library combines extensive digital resources with collaborative learning spaces for modern education."
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
      },
      {
        question: "What is the main purpose of innovation labs at Rishihood?",
        options: ["Storage space", "Hands-on learning and prototype development", "Meeting rooms", "Library extension"],
        correct: 1,
        explanation: "Innovation labs provide hands-on learning experiences where students develop prototypes and real-world solutions."
      },
      {
        question: "Which academic blocks house the main innovation facilities?",
        options: ["Only A Block", "Distributed across A, B, and C blocks", "External building", "R1 Residency"],
        correct: 1,
        explanation: "Innovation facilities are strategically distributed across all three academic blocks for easy access."
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
      },
      {
        question: "What is the popular name for Rishihood's main canteen?",
        options: ["Campus Café", "Chai Adda", "Food Court", "Student Center"],
        correct: 1,
        explanation: "The main canteen is affectionately known as 'Chai Adda' by students, reflecting its warm, tea-centered atmosphere."
      },
      {
        question: "Besides Chai Adda, where else can students get meals on campus?",
        options: ["Only external restaurants", "Pushpa Devi Mess and A Block Mess", "Vending machines only", "No other options"],
        correct: 1,
        explanation: "Students can dine at Pushpa Devi Mess and A Block Mess, providing variety in meal options across campus."
      }
    ],
    4: [
      {
        question: "What is the official name of Rishihood's main mess?",
        options: ["Campus Mess", "Pushpa Devi Mess", "Central Dining", "University Cafeteria"],
        correct: 1,
        explanation: "The main mess is named 'Pushpa Devi Mess', honoring an important figure in the university's history."
      },
      {
        question: "How many mess facilities are available on campus?",
        options: ["One mess only", "Two messes: Pushpa Devi Mess and A Block Mess", "Three messes", "Four messes"],
        correct: 1,
        explanation: "There are two main mess facilities: Pushpa Devi Mess and A Block Mess, serving different areas of campus."
      },
      {
        question: "What role does communal dining play in campus life?",
        options: ["Just for eating", "Building community and fostering friendships", "Waste of time", "Only for nutrition"],
        correct: 1,
        explanation: "Communal dining spaces like the mess halls are vital for building friendships and campus community."
      },
      {
        question: "Which dining option is most popular for casual hangouts?",
        options: ["A Block Mess", "Chai Adda", "External restaurants", "Vending machines"],
        correct: 1,
        explanation: "Chai Adda is the go-to spot for casual hangouts, tea breaks, and informal student gatherings."
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
      },
      {
        question: "Where is the fitness center located relative to the academic blocks?",
        options: ["Inside A Block", "Separate facility serving all blocks", "Only in residencies", "Off-campus"],
        correct: 1,
        explanation: "The fitness center is a dedicated facility designed to serve students from all three academic blocks."
      },
      {
        question: "What facilities might students expect in the fitness center?",
        options: ["Only cardio equipment", "Comprehensive gym with varied equipment and wellness programs", "Just a room", "Outdoor space only"],
        correct: 1,
        explanation: "The fitness center offers comprehensive facilities including varied equipment and wellness programs for holistic health."
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
      },
      {
        question: "How many residential blocks serve the Rishihood campus?",
        options: ["Two residencies", "Three residencies: R1, R2, and R3", "Four residencies", "No on-campus housing"],
        correct: 1,
        explanation: "Rishihood has three residential blocks: R1, R2, and R3, each serving different student populations."
      },
      {
        question: "Which residency is specifically reserved for VIPs and female students?",
        options: ["R1 Residency", "R2 Residency", "R3 Residency", "All residencies are mixed"],
        correct: 2,
        explanation: "R3 Residency is specially designated for VIP guests and female students, ensuring appropriate accommodation."
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
      },
      {
        question: "Which residency houses 2nd and 3rd year male students?",
        options: ["R1 Residency", "R2 Residency", "R3 Residency", "External housing"],
        correct: 0,
        explanation: "R1 Residency is designated for 2nd and 3rd year male students, creating a community of senior students."
      },
      {
        question: "Where do first-year students typically reside on campus?",
        options: ["R1 Residency", "R2 Residency", "R3 Residency", "Off-campus only"],
        correct: 1,
        explanation: "R2 Residency is specifically designed for first-year students, helping them transition to university life."
      },
      {
        question: "What is the total number of main academic blocks at Rishihood?",
        options: ["Two blocks", "Three blocks: A, B, and C", "Four blocks", "Five blocks"],
        correct: 1,
        explanation: "Rishihood University campus is organized into three main academic blocks: A Block, B Block, and C Block."
      },
      {
        question: "How are the dining facilities distributed across campus?",
        options: ["Only one central location", "Strategically placed: Chai Adda, Pushpa Devi Mess, and A Block Mess", "Only in residencies", "External only"],
        correct: 1,
        explanation: "Dining facilities are strategically distributed with Chai Adda for casual dining, Pushpa Devi Mess and A Block Mess for regular meals."
      }
    ]
  };

  // Dynamic particle and animation system
  useEffect(() => {
    const createMorphingParticle = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      color: ['red', 'orange', 'yellow', 'pink', 'purple'][Math.floor(Math.random() * 5)],
      opacity: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 8,
      life: 150,
      morphPhase: 0
    });

    const createEnergyWave = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      radius: 0,
      maxRadius: Math.random() * 200 + 100,
      opacity: 0.8,
      color: ['cyan', 'lime', 'magenta', 'gold'][Math.floor(Math.random() * 4)],
      speed: Math.random() * 3 + 2,
      life: 60
    });

    const createFloatingElement = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      shape: ['circle', 'square', 'triangle', 'diamond'][Math.floor(Math.random() * 4)],
      color: Math.random() * 360,
      opacity: Math.random() * 0.3 + 0.1,
      floatSpeed: Math.random() * 0.5 + 0.2,
      scalePhase: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 4,
      life: 200
    });

    // Initialize dynamic elements
    const initialParticles = Array.from({ length: 30 }, createMorphingParticle);
    const initialWaves = Array.from({ length: 5 }, createEnergyWave);
    const initialFloaters = Array.from({ length: 15 }, createFloatingElement);
    
    setParticles(initialParticles);
    setEnergyWaves(initialWaves);
    setFloatingElements(initialFloaters);

    const animateElements = () => {
      // Animate morphing particles
      setParticles(prev => {
        const updated = prev.map(particle => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
          rotation: particle.rotation + particle.rotationSpeed,
          morphPhase: particle.morphPhase + 0.1,
          size: particle.size + Math.sin(particle.morphPhase) * 2,
          life: particle.life - 1
        })).filter(p => p.life > 0);
        
        // Add new particles
        while (updated.length < 30) {
          updated.push(createMorphingParticle());
        }
        return updated;
      });

      // Animate energy waves
      setEnergyWaves(prev => {
        const updated = prev.map(wave => ({
          ...wave,
          radius: wave.radius + wave.speed,
          opacity: wave.opacity * 0.98,
          life: wave.life - 1
        })).filter(w => w.life > 0 && w.radius < w.maxRadius);
        
        // Add new waves occasionally
        if (Math.random() < 0.1) {
          updated.push(createEnergyWave());
        }
        return updated;
      });

      // Animate floating elements
      setFloatingElements(prev => {
        const updated = prev.map(element => ({
          ...element,
          y: (element.y - element.floatSpeed + 100) % 100,
          scalePhase: element.scalePhase + 0.05,
          rotation: element.rotation + element.rotationSpeed,
          life: element.life - 1
        })).filter(e => e.life > 0);
        
        // Add new floaters
        while (updated.length < 15) {
          updated.push(createFloatingElement());
        }
        return updated;
      });
    };

    const elementInterval = setInterval(animateElements, 80);
    return () => clearInterval(elementInterval);
  }, [gameStarted]);

  useEffect(() => {
    const interval = setInterval(() => {
      const availableLocations = campusLocations
        .filter(loc => loc.unlocked && !visitedLocations.has(loc.id))
        .map(loc => loc.id);
      
      setPulsingLocations(new Set(availableLocations));
    }, 1000);

    return () => clearInterval(interval);
  }, [visitedLocations, campusLocations]);

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
      setScreenShake(true);
      
      // Create spectacular celebration effects
      const celebrationParticles = Array.from({ length: 100 }, () => ({
        id: Math.random(),
        x: 50,
        y: 50,
        size: Math.random() * 12 + 6,
        color: ['gold', 'yellow', 'orange', 'red', 'magenta'][Math.floor(Math.random() * 5)],
        opacity: 1,
        speedX: (Math.random() - 0.5) * 15,
        speedY: (Math.random() - 0.5) * 15,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 20,
        life: 80,
        morphPhase: 0
      }));
      
      const celebrationWaves = Array.from({ length: 8 }, () => ({
        id: Math.random(),
        x: 50,
        y: 50,
        radius: 0,
        maxRadius: 300,
        opacity: 0.8,
        color: 'gold',
        speed: 8,
        life: 40
      }));

      setParticles(prev => [...prev, ...celebrationParticles]);
      setEnergyWaves(prev => [...prev, ...celebrationWaves]);
      
      setTimeout(() => {
        setShowLevelUp(false);
        setScreenShake(false);
      }, 3000);
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
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: 'environment',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            } 
          });
          
          stream.getTracks().forEach(track => track.stop());
          setArMode(true);
          
          // Create spectacular AR activation effects
          const arParticles = Array.from({ length: 80 }, () => ({
            id: Math.random(),
            x: 50,
            y: 50,
            size: Math.random() * 10 + 4,
            color: ['cyan', 'lime', 'blue', 'teal', 'green'][Math.floor(Math.random() * 5)],
            opacity: 1,
            speedX: (Math.random() - 0.5) * 12,
            speedY: (Math.random() - 0.5) * 12,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 15,
            life: 60,
            morphPhase: 0
          }));
          
          const arWaves = Array.from({ length: 6 }, (_, i) => ({
            id: Math.random(),
            x: 50,
            y: 50,
            radius: i * 50,
            maxRadius: 400,
            opacity: 0.6,
            color: 'cyan',
            speed: 6,
            life: 50
          }));

          setParticles(prev => [...prev, ...arParticles]);
          setEnergyWaves(prev => [...prev, ...arWaves]);
          
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
    <div className={`min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 flex items-center justify-center p-4 relative overflow-hidden ${screenShake ? 'animate-shake' : ''}`}>
        {/* Dynamic morphing background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-transparent to-red-700/30 animate-gradient-shift"></div>
          
            {/* Morphing particles */}
            {particles.map(particle => {
                const colors = { red: '#f87171', orange: '#fb923c', yellow: '#facc15', pink: '#f472b6', purple: '#c084fc' };
                return (
                    <div
                        key={particle.id}
                        className="absolute animate-morph"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            opacity: particle.opacity,
                            transform: `rotate(${particle.rotation}deg)`,
                            background: colors[particle.color] || colors.red,
                            borderRadius: Math.sin(particle.morphPhase) > 0 ? '50%' : '0%',
                            animationDuration: '3s'
                        }}
                    />
                );
            })}

            {/* Energy waves */}
            {energyWaves.map(wave => {
                const colors = { cyan: '#22d3ee', lime: '#a3e635', magenta: '#f0abfc', gold: '#fde047' };
                return (
                    <div
                        key={wave.id}
                        className="absolute border-2 rounded-full animate-wave-pulse"
                        style={{
                            left: `${wave.x}%`,
                            top: `${wave.y}%`,
                            width: `${wave.radius * 2}px`,
                            height: `${wave.radius * 2}px`,
                            marginLeft: `-${wave.radius}px`,
                            marginTop: `-${wave.radius}px`,
                            opacity: wave.opacity,
                            borderColor: colors[wave.color] || colors.cyan
                        }}
                    />
                );
            })}

            {/* Floating geometric elements */}
            {floatingElements.map(element => {
                const scale = 1 + Math.sin(element.scalePhase) * 0.3;
                return (
                    <div
                        key={element.id}
                        className="absolute animate-float-geometric"
                        style={{
                            left: `${element.x}%`,
                            top: `${element.y}%`,
                            width: `${element.size}px`,
                            height: `${element.size}px`,
                            opacity: element.opacity,
                            transform: `rotate(${element.rotation}deg) scale(${scale})`,
                            background: element.shape === 'circle' ? `hsl(${element.color}, 70%, 60%)` : 'transparent',
                            border: element.shape !== 'circle' ? `2px solid hsl(${element.color}, 70%, 60%)` : 'none',
                            borderRadius: element.shape === 'circle' ? '50%' :
                                element.shape === 'diamond' ? '0' : '4px',
                            clipPath: element.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                                element.shape === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'none',
                            filter: `hue-rotate(${element.color}deg) brightness(1.2)`
                        }}
                    />
                );
            })}
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-red-200/50 transform transition-all duration-700 hover:scale-105 relative z-10 animate-title-entrance">
          <div className="text-center mb-6">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-700 rounded-full animate-orbital-spin"></div>
              <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-counter-orbital"></div>
              <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center animate-icon-bob">
                <GraduationCap className="w-12 h-12 text-red-600" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-satellite"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-red-800 bg-clip-text text-transparent mb-3 animate-text-glow">
              CampusQuest
            </h1>
            <p className="text-red-600 font-medium text-lg animate-subtitle-slide">Rishihood University Adventure</p>
            <div className="flex justify-center mt-3 space-x-1">
              {[...Array(7)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 animate-star-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-red-700 font-medium mb-3 animate-label-glow">Enter Your Name:</label>
            <input
              type="text"
              value={playerStats.name}
              onChange={(e) => setPlayerStats(prev => ({...prev, name: e.target.value}))}
              className="w-full px-6 py-4 border-2 border-red-300 rounded-2xl focus:border-red-600 focus:outline-none transition-all duration-500 focus:scale-105 focus:shadow-2xl bg-white/90 backdrop-blur-sm text-lg font-medium animate-input-glow"
              placeholder="Your adventure awaits..."
            />
          </div>
          
          <button
            onClick={startGame}
            disabled={!playerStats.name.trim()}
            className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 disabled:from-gray-400 disabled:to-gray-600 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-500 transform hover:scale-110 hover:shadow-2xl disabled:scale-100 disabled:shadow-none relative overflow-hidden group animate-button-glow"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/30 via-yellow/20 to-white/30 transform -skew-x-12 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></span>
            <span className="relative flex items-center justify-center space-x-3 text-xl">
              <span>Start Your Quest!</span>
              <Sparkles className="w-6 h-6 animate-sparkle-spin" />
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
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
                <span>Use AR mode to scan real campus locations!</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span>Look for QR codes and AR markers on mobile</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700 relative overflow-hidden ${screenShake ? 'animate-shake' : ''}`}>
      {/* Dynamic background system */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Morphing particles with advanced effects */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute animate-particle-morph"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transform: `rotate(${particle.rotation}deg)`,
              background: particle.color === 'red' ? '#ef4444' :
                          particle.color === 'orange' ? '#f97316' :
                          particle.color === 'yellow' ? '#eab308' :
                          particle.color === 'pink' ? '#ec4899' :
                          particle.color === 'purple' ? '#a855f7' :
                          particle.color === 'cyan' ? '#06b6d4' :
                          particle.color === 'lime' ? '#65a30d' :
                          particle.color === 'blue' ? '#3b82f6' :
                          particle.color === 'teal' ? '#14b8a6' :
                          particle.color === 'green' ? '#22c55e' :
                          particle.color === 'gold' ? '#fbbf24' :
                          particle.color === 'magenta' ? '#d946ef' : '#ef4444',
              borderRadius: Math.sin(particle.morphPhase) > 0.5 ? '50%' : 
                            Math.sin(particle.morphPhase + 1) > 0.5 ? '0%' : '20%',
              animationDuration: '2s',
              filter: `blur(${Math.sin(particle.morphPhase) * 2 + 1}px) brightness(1.2)`
    
            }}
          />
        ))}
        
        
        {/* Energy wave effects */}
        {energyWaves.map(wave => (
          <div
            key={wave.id}
            className="absolute border-2 rounded-full animate-energy-wave"
            style={{
              left: `${wave.x}%`,
              top: `${wave.y}%`,
              width: `${wave.radius * 2}px`,
              height: `${wave.radius * 2}px`,
              marginLeft: `-${wave.radius}px`,
              marginTop: `-${wave.radius}px`,
              opacity: wave.opacity,
              borderColor: wave.color === 'cyan' ? '#06b6d4' :
                           wave.color === 'lime' ? '#65a30d' :
                           wave.color === 'magenta' ? '#d946ef' :
                           wave.color === 'gold' ? '#fbbf24' : '#06b6d4',
              boxShadow: `0 0 20px ${wave.color === 'cyan' ? '#06b6d4' :
                                      wave.color === 'lime' ? '#65a30d' :
                                      wave.color === 'magenta' ? '#d946ef' :
                                      wave.color === 'gold' ? '#fbbf24' : '#06b6d4'}40`
            }}
          />
        ))}
        
        {/* Advanced floating geometric elements */}
        {floatingElements.map(element => {
          const scale = 1 + Math.sin(element.scalePhase) * 0.4;
          const hue = (element.color + Date.now() * 0.01) % 360;
          return (
            <div
              key={element.id}
              className="absolute animate-geometric-float"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
                width: `${element.size}px`,
                height: `${element.size}px`,
                opacity: element.opacity,
                transform: `rotate(${element.rotation}deg) scale(${scale})`,
                background: element.shape === 'circle' ? `hsl(${hue}, 80%, 65%)` : 'transparent',
                border: element.shape !== 'circle' ? `3px solid hsl(${hue}, 80%, 65%)` : 'none',
                borderRadius: element.shape === 'circle' ? '50%' : 
                              element.shape === 'diamond' ? '0' : '8px',
                clipPath: element.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                          element.shape === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'none',
                filter: `hue-rotate(${hue}deg) brightness(1.2)`
              }}
            />
          );
        })}
      </div>

      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none animate-fade-in">
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white p-8 rounded-3xl shadow-2xl transform animate-bounce border-4 border-yellow-300">
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto mb-4 animate-spin" />
              <h2 className="text-3xl font-bold mb-2">LEVEL UP!</h2>
              <p className="text-xl">Level {playerStats.level}</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 shadow-2xl p-6 border-b border-red-700/50 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
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
          
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
            <div className="flex flex-wrap items-center justify-center gap-3 text-white">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm animate-pulse">
                <User className="w-4 h-4" />
                <span className="font-medium text-sm">{playerStats.name}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                <Star className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-sm">Level {playerStats.level}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                <Trophy className="w-4 h-4 text-yellow-400 animate-bounce" />
                <span className="text-sm">{playerStats.levelsCleared}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
                <span className="text-sm">{playerStats.engagementScore}</span>
              </div>
            </div>
            
            <button
              onClick={toggleARMode}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-110 text-sm ${
                arMode 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg' 
                  : 'bg-white/90 hover:bg-white text-red-800 shadow-lg hover:shadow-xl backdrop-blur-sm'
              }`}
            >
              <Camera className={`w-4 h-4 ${arMode ? 'animate-pulse' : 'animate-bounce'}`} />
              <span>{arMode ? 'AR Active' : 'AR Mode'}</span>
              {arMode && (
                <>
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-ping"></div>
                  <span className="text-xs bg-green-400 text-green-900 px-2 py-1 rounded-full">📱</span>
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

                  