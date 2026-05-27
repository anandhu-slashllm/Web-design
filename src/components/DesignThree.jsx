import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  animate, 
  useInView,
  useSpring
} from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft,
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Menu, 
  X, 
  Check, 
  Send,
  Star,
  Sparkles,
  Stethoscope, 
  Droplets, 
  Handshake, 
  Activity, 
  Wrench, 
  ClipboardList, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ShieldCheck,
  HeartHandshake,
  Award
} from 'lucide-react';
import './DesignThree.css';

// Animated Counter Component for Stats Section
function StatCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: "easeOut"
      });
      return controls.stop;
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toLocaleString() + suffix;
      }
    });
  }, [rounded, suffix]);

  return <span ref={ref} className="three-stat-num">0{suffix}</span>;
}

function DesignThree({ onSelect }) {
  // Navigation Router state
  const [currentPage, setCurrentPage] = useState('home');

  // Global states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [stickerSet, setStickerSet] = useState(0);

  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterWidth, setNewsletterWidth] = useState(140);

  // Carousel states
  const [heroIndex, setHeroIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [butterflyPos, setButterflyPos] = useState({ x: 180, y: 120 });
  const [eyesOffset, setEyesOffset] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);

  // Refs for mouse-following tracking
  const eyesContainerRef = useRef(null);
  const waterAreaRef = useRef(null);
  const physicsContainerRef = useRef(null);
  const aboutSectionRef = useRef(null);

  // Custom Cursor Spring Lag
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSpringX = useSpring(cursorX, { stiffness: 120, damping: 22 });
  const cursorSpringY = useSpring(cursorY, { stiffness: 120, damping: 22 });
  const [isCursorHovering, setIsCursorHovering] = useState(false);

  // Swinging sign physics
  const swingAngle = useSpring(0, { stiffness: 35, damping: 9 });

  // Scroll parallax logic for About section illustration
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutSectionRef,
    offset: ["start end", "end start"]
  });
  const aboutParallaxY = useTransform(aboutScrollProgress, [0, 1], ["-10%", "10%"]);

  const ease = [0.25, 0.46, 0.45, 0.94];
  const easeBouncy = [0.34, 1.56, 0.64, 1];

  // Mouse move listener for custom cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  // Navbar scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance Testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Panel 1: Eye tracking
  const handlePanel1MouseMove = (e) => {
    if (!eyesContainerRef.current) return;
    const rect = eyesContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxOffset = 5;
    if (distance === 0) {
      setEyesOffset({ x: 0, y: 0 });
    } else {
      const scale = Math.min(maxOffset, distance) / distance;
      setEyesOffset({ x: dx * scale, y: dy * scale });
    }
  };

  // Panel 4: Water ripple effect
  const handleWaterMouseMove = (e) => {
    if (!waterAreaRef.current) return;
    const rect = waterAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y
    };
    setRipples((prev) => [...prev.slice(-6), newRipple]);
  };

  // Physics swinging rope signboard calculations
  const handlePhysicsMouseMove = (e) => {
    if (!physicsContainerRef.current) return;
    const rect = physicsContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const offset = e.clientX - centerX;
    swingAngle.set(offset * 0.045);
  };

  // Form Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('loading');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1800);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 4000);
    }
  };

  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'ndis', label: 'NDIS & Programs' },
    { id: 'contact', label: 'Contact Us' }
  ];

  // Data Models
  const heroPanels = [
    { id: 'ndis', title: 'NDIS Home Support', desc: 'Flexible, funded, person-centred assistance outdoors and at home.', color: 'var(--bg-mint)' },
    { id: 'aged-care', title: 'Aged Care Packages', desc: 'Help in a cozy home environment. Control your care with confidence.', color: 'var(--bg-peach)' },
    { id: 'dva', title: 'DVA Support Services', desc: 'Specialized clinical support with animated foliage and sunshine loops.', color: 'var(--bg-sky)' },
    { id: 'allied', title: 'Allied Health Therapy', desc: 'Clinical physio & OT assessments. Mouse over the water to interact.', color: 'var(--bg-sun)' }
  ];

  const servicesData = [
    { id: 'nursing', icon: '🩺', title: 'Nursing', desc: 'Clinical medication setup, detailed wound care, dementia programs, and palliative nursing at home.', tags: ['home-nursing', 'aged-care', 'dva', 'ndis', 'brisbane', 'gold-coast', 'tweed'], color: 'var(--accent-teal)' },
    { id: 'personal', icon: '🚿', title: 'Personal Care', desc: 'Bathing support, personal hygiene routines, dressing assistance, and mobility support.', tags: ['personal-care', 'aged-care', 'dva', 'ndis', 'brisbane', 'gold-coast', 'tweed'], color: 'var(--accent-peach)' },
    { id: 'social', icon: '🤝', title: 'Social Support', desc: 'Companion visits, civic access activities, transport assistance, and social integration.', tags: ['dva', 'ndis', 'brisbane', 'gold-coast', 'tweed'], color: 'var(--accent-violet)' },
    { id: 'health', icon: '💪', title: 'Health & Wellbeing', desc: 'Guided home exercises, healthy meal planning, check-ins, and preventive wellness checks.', tags: ['ndis', 'allied-health', 'brisbane', 'gold-coast', 'tweed'], color: 'var(--accent-yellow)' },
    { id: 'domestic', icon: '🧹', title: 'Domestic Support', desc: 'Cleaning, laundry support, household organization, and healthy food prep.', tags: ['aged-care', 'dva', 'ndis', 'brisbane', 'gold-coast', 'tweed'], color: 'var(--accent-teal)' },
    { id: 'maintenance', icon: '🔧', title: 'Home Maintenance', desc: 'Safety rails installation, minor home modifications, gardening, and repairs.', tags: ['ndis', 'brisbane', 'gold-coast', 'tweed'], color: 'var(--accent-peach)' },
    { id: 'allied', icon: '🦯', title: 'Allied Health', desc: 'Physiotherapy, OT assessments, podiatry support, and dietetic guidance in your lounge room.', tags: ['allied-health', 'ndis', 'brisbane', 'gold-coast', 'tweed'], color: 'var(--accent-violet)' }
  ];

  const filterPills = [
    { label: 'All Services', id: null },
    { label: 'NDIS Support', id: 'ndis' },
    { label: 'Aged Care', id: 'aged-care' },
    { label: 'DVA Services', id: 'dva' },
    { label: 'Home Nursing', id: 'home-nursing' },
    { label: 'Personal Care', id: 'personal-care' },
    { label: 'Allied Health', id: 'allied-health' },
    { label: 'Brisbane', id: 'brisbane' },
    { label: 'Gold Coast', id: 'gold-coast' },
    { label: 'Tweed Heads', id: 'tweed' }
  ];

  const stickersSets = [
    [
      { emoji: '🌿', text: 'Person-Centred Care' },
      { emoji: '🤲', text: 'Dignity & Respect' },
      { emoji: '✅', text: 'Registered & Trusted' }
    ],
    [
      { emoji: '🌸', text: 'Compassionate Carers' },
      { emoji: '🏡', text: 'Comfort of Home' },
      { emoji: '✨', text: 'Clinical Excellence' }
    ],
    [
      { emoji: '🤝', text: 'Community First' },
      { emoji: '💪', text: 'Empowering Choices' },
      { emoji: '🌟', text: 'Quality Support' }
    ]
  ];

  const testimonialsData = [
    { quote: "The carers treat Mum like family. We couldn't be more grateful.", author: "Sandra K., Brisbane", rating: 5, tag: "Aged Care" },
    { quote: "Finally an NDIS provider that actually listens.", author: "Michael T., Gold Coast", rating: 5, tag: "NDIS" },
    { quote: "Professional, warm, and always on time. Highly recommend.", author: "Robyn H., Tweed", rating: 5, tag: "DVA" }
  ];

  const programsData = [
    { title: "NDIS Support", tag: "STREAM 01", desc: "Flexible, funded, person-centred daily assistance.", color: 'var(--bg-mint)' },
    { title: "Aged Care Package", tag: "STREAM 02", desc: "Stay independent in the home you love.", color: 'var(--bg-peach)' },
    { title: "DVA Services", tag: "STREAM 03", desc: "Dedicated care for our military veterans.", color: 'var(--bg-sky)' },
    { title: "Allied Health at Home", tag: "STREAM 04", desc: "Expert therapy, delivered to your door.", color: 'var(--bg-sun)' },
    { title: "Post-Hospital Care", tag: "STREAM 05", desc: "Safe, supported recovery in home comfort.", color: 'var(--bg-mint)' }
  ];

  const articlesData = [
    { title: "What to Expect from an NDIS Home Visit", emoji: "📋" },
    { title: "How to Talk to Ageing Parents About Home Care", emoji: "🗣️" },
    { title: "5 Signs It's Time to Consider DVA Support", emoji: "🎖️" },
    { title: "What Allied Health at Home Really Looks Like", emoji: "🩹" },
    { title: "Navigating the My Aged Care Portal", emoji: "💻" },
    { title: "Home Modifications That Make a Real Difference", emoji: "🛠️" }
  ];

  const filteredServices = activeFilter 
    ? servicesData.filter(s => s.tags.includes(activeFilter))
    : servicesData;

  const activePanel = heroPanels[heroIndex];

  // SUB-PAGES RENDER FUNCTIONS

  // Page 1: Home
  const renderHome = () => {
    return (
      <div className="three-home-page">
        {/* Hero Section with Interactive Illustration Carousel */}
        <section className="three-hero">
          <div className="three-hero-grid">
            <div className="three-hero-content">
              {/* Clinical Accreditation Badges Row */}
              <div className="three-accreditation-row" style={{ marginTop: 0, marginBottom: '1.5rem' }}>
                <span className="three-accreditation-badge ndis-certified">
                  <ShieldCheck size={14} /> NDIS Registered Provider
                </span>
                <span className="three-accreditation-badge">
                  <HeartHandshake size={14} /> AHPRA Registered Nurses
                </span>
              </div>

              <h1 className="three-hero-heading">
                {["Clinical", "care", "tailored"].map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  className="highlight-teal"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.24, ease }}
                >
                  to you.
                </motion.span>
              </h1>

              <p className="three-hero-subtext">
                Registered nurses delivering clinical excellence in South East Queensland. We blend warm, friendly support coordinates with rigorous healthcare standards.
              </p>

              <div className="three-hero-actions">
                <button 
                  className="btn-three-cta"
                  onClick={() => setCurrentPage('contact')}
                  onMouseEnter={() => setIsCursorHovering(true)}
                  onMouseLeave={() => setIsCursorHovering(false)}
                >
                  Contact Clinic →
                </button>
                <button 
                  className="btn-three-secondary"
                  onClick={() => setCurrentPage('services')}
                  onMouseEnter={() => setIsCursorHovering(true)}
                  onMouseLeave={() => setIsCursorHovering(false)}
                >
                  View Services
                </button>
              </div>
            </div>

            {/* Interactive panel container */}
            <div>
              <div 
                className="three-hero-illustration-wrapper"
                style={{ backgroundColor: activePanel.color }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePanel.id}
                    className="three-carousel-panel"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                  >
                    {/* Inline animated SVGs per panel */}
                    <div className="three-panel-illustration">
                      {activePanel.id === 'ndis' && (
                        <div 
                          style={{ width: '200px', height: '200px', position: 'relative' }}
                          onMouseMove={handlePanel1MouseMove}
                          onMouseLeave={() => setEyesOffset({ x: 0, y: 0 })}
                        >
                          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                            {/* Pulsing clinical compliance rings */}
                            <circle cx="100" cy="100" r="85" fill="none" stroke="var(--accent-teal)" strokeWidth="1" className="three-pulse-ring" style={{ opacity: 0.3 }} />
                            <circle cx="100" cy="100" r="65" fill="none" stroke="var(--accent-teal)" strokeWidth="1.5" className="three-pulse-ring" style={{ animationDelay: '1.5s', opacity: 0.2 }} />
                            
                            {/* Medical Shield */}
                            <path 
                              d="M 100 35 L 155 55 V 105 C 155 140 100 165 100 165 C 100 165 45 140 45 105 V 55 Z" 
                              fill="var(--bg-cream)" 
                              stroke="var(--text-dark)" 
                              strokeWidth="3.5" 
                            />
                            {/* Inner Shield border */}
                            <path 
                              d="M 100 45 L 143 61 V 102 C 143 130 100 152 100 152 C 100 152 57 130 57 102 V 61 Z" 
                              fill="none" 
                              stroke="var(--accent-teal)" 
                              strokeWidth="1.5" 
                              opacity="0.5"
                            />
                            {/* Home Outline */}
                            <path 
                              d="M 80 115 V 92 L 100 75 L 120 92 V 115 Z" 
                              fill="none" 
                              stroke="var(--text-dark)" 
                              strokeWidth="3" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                            {/* Heart inside Home */}
                            <path 
                              d="M 100 104 C 100 104 94 98 94 92 C 94 86 100 86 100 92 C 100 86 106 86 106 92 C 106 98 100 104 100 104 Z" 
                              fill="var(--accent-peach)" 
                              stroke="var(--text-dark)" 
                              strokeWidth="1.5" 
                            />
                            {/* Interactive glowing compliance orb (tracks cursor) */}
                            <motion.circle 
                              cx={100 + eyesOffset.x * 6} 
                              cy={100 + eyesOffset.y * 6} 
                              r="6" 
                              fill="var(--accent-yellow)" 
                              stroke="var(--text-dark)" 
                              strokeWidth="2" 
                            />
                          </svg>
                        </div>
                      )}

                      {activePanel.id === 'aged-care' && (
                        <div 
                          ref={eyesContainerRef}
                          style={{ width: '200px', height: '200px', position: 'relative' }}
                        >
                          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                            {/* Glow aura */}
                            <circle cx="100" cy="95" r="45" fill="var(--accent-yellow)" opacity="0.15" />
                            {/* Left cradling hand */}
                            <path 
                              d="M 45 125 C 55 95 85 90 95 98 C 85 105 70 105 60 125 C 52 140 70 145 80 135 L 95 120" 
                              fill="none" 
                              stroke="var(--text-dark)" 
                              strokeWidth="3" 
                              strokeLinecap="round" 
                            />
                            {/* Right cradling hand */}
                            <path 
                              d="M 155 125 C 145 95 115 90 105 98 C 115 105 130 105 140 125 C 148 140 130 145 120 135 L 105 120" 
                              fill="none" 
                              stroke="var(--text-dark)" 
                              strokeWidth="3" 
                              strokeLinecap="round" 
                            />
                            {/* Golden heart */}
                            <path 
                              d="M 100 110 C 100 110 82 93 82 78 C 82 63 94 63 100 74 C 106 63 118 63 118 78 C 118 93 100 110 100 110 Z" 
                              fill="var(--accent-yellow)" 
                              stroke="var(--text-dark)" 
                              strokeWidth="3.5" 
                              strokeLinejoin="round" 
                            />
                            <circle cx="100" cy="80" r="30" fill="none" stroke="var(--accent-peach)" strokeWidth="1" opacity="0.3" className="three-pulse-ring" />
                          </svg>

                          {/* Draggable Spark / Star Widget */}
                          <motion.div
                            drag
                            dragConstraints={eyesContainerRef}
                            style={{ position: 'absolute', cursor: 'grab', width: '36px', height: '36px', top: '40px', left: '30px' }}
                          >
                            <svg viewBox="0 0 40 40" style={{ width: '100%', height: '100%' }}>
                              <path d="M 14 20 L 26 20 M 20 14 L 20 26" stroke="var(--accent-teal-dk)" strokeWidth="4.5" strokeLinecap="round" />
                              <circle cx="20" cy="20" r="12" fill="none" stroke="var(--text-dark)" strokeWidth="2.5" />
                            </svg>
                          </motion.div>
                        </div>
                      )}

                      {activePanel.id === 'dva' && (
                        <div style={{ width: '200px', height: '200px', position: 'relative', overflow: 'hidden' }}>
                          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                            {/* Rotating sunburst rays */}
                            <g className="three-rotate-sun">
                              {Array.from({ length: 8 }).map((_, i) => (
                                <line 
                                  key={i} 
                                  x1="100" y1="30" x2="100" y2="170" 
                                  stroke="var(--accent-peach)" 
                                  strokeWidth="1.5" 
                                  opacity="0.25" 
                                  transform={`rotate(${i * 22.5} 100 100)`} 
                                />
                              ))}
                            </g>
                            {/* Laurel Leaves Wreath */}
                            <circle cx="100" cy="100" r="55" fill="none" stroke="var(--accent-teal)" strokeWidth="2.5" strokeDasharray="6 6" opacity="0.6" />
                            
                            {/* Medical Cross */}
                            <rect x="86" y="65" width="28" height="70" rx="4" fill="var(--bg-cream)" stroke="var(--text-dark)" strokeWidth="3" />
                            <rect x="65" y="86" width="70" height="28" rx="4" fill="var(--bg-cream)" stroke="var(--text-dark)" strokeWidth="3" />
                            <rect x="91" y="70" width="18" height="60" rx="2" fill="var(--accent-teal)" opacity="0.3" />
                            <rect x="70" y="91" width="60" height="18" rx="2" fill="var(--accent-teal)" opacity="0.3" />
                          </svg>
                        </div>
                      )}

                      {activePanel.id === 'allied' && (
                        <div 
                          ref={waterAreaRef}
                          onMouseMove={handleWaterMouseMove}
                          style={{ width: '200px', height: '200px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                        >
                          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                            {/* Background medical grids */}
                            <path d="M 20 20 L 180 20 M 20 60 L 180 60 M 20 100 L 180 100 M 20 140 L 180 140 M 20 180 L 180 180" stroke="var(--text-soft)" strokeWidth="0.5" opacity="0.15" />
                            <path d="M 20 20 L 20 180 M 60 20 L 60 180 M 100 20 L 100 180 M 140 20 L 140 180 M 180 20 L 180 180" stroke="var(--text-soft)" strokeWidth="0.5" opacity="0.15" />
                            
                            {/* Dynamic ECG waves */}
                            <path 
                              d="M 20 90 L 50 90 L 60 70 L 70 120 L 80 50 L 90 100 L 100 90 L 120 100 Q 140 115 160 100 T 180 110" 
                              fill="none" 
                              stroke="var(--text-dark)" 
                              strokeWidth="3.5" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                            <path 
                              d="M 20 110 L 48 110 L 58 92 L 68 135 L 78 72 L 88 118 L 98 110 L 118 120 Q 138 135 158 120 T 180 130" 
                              fill="none" 
                              stroke="var(--accent-teal)" 
                              strokeWidth="1.5" 
                              opacity="0.6"
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                            />
                            {ripples.map((ripple) => (
                              <motion.circle
                                key={ripple.id} cx={ripple.x} cy={ripple.y} r={0} fill="none" stroke="var(--accent-peach)" strokeWidth={2.5}
                                animate={{ r: 40, opacity: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                              />
                            ))}
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="three-panel-text">
                      <h3 className="three-panel-title">{activePanel.title}</h3>
                      <p className="three-panel-desc">{activePanel.desc}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="three-carousel-dots">
                {heroPanels.map((panel, idx) => (
                  <div 
                    key={panel.id}
                    className={`three-carousel-dot ${heroIndex === idx ? 'active' : ''}`}
                    onClick={() => setHeroIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3 Medical Promo Cards */}
        <section className="three-home-highlights">
          <div className="three-highlights-grid">
            <div className="three-highlight-card">
              <div className="three-highlight-icon">🛡️</div>
              <h3 className="three-highlight-title">AHPRA Compliant</h3>
              <p className="three-highlight-desc">
                Our support programs are managed under registered nursing guidance with strict medical safeguards.
              </p>
            </div>

            <div className="three-highlight-card">
              <div className="three-highlight-icon">🩺</div>
              <h3 className="three-highlight-title">Clinical Supervision</h3>
              <p className="three-highlight-desc">
                From wound evaluation to medication delivery management, we ensure registered nursing oversight.
              </p>
            </div>

            <div className="three-highlight-card">
              <div className="three-highlight-icon">🌿</div>
              <h3 className="three-highlight-title">Holistic Wellness</h3>
              <p className="three-highlight-desc">
                Bridging playful care activities with clinical compliance for veterans, NDIS, and Aged Care.
              </p>
            </div>
          </div>
        </section>

        {/* Italic Banner */}
        <section className="three-italic-banner">
          <h2 className="three-italic-banner-text">
            Bridging compassionate healing with <em className="highlight-teal">clinical standards.</em>
          </h2>
        </section>

        {/* Home: Testimonials */}
        <section className="three-home-testimonials">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">COMMUNITY REVIEWS</span>
            <h2 className="section-title">Loved by families <em>everywhere.</em></h2>
          </div>

          <div className="three-carousel-track-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                className="three-testimonial-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) {
                    setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
                  } else if (info.offset.x > 50) {
                    setTestimonialIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
                  }
                }}
              >
                <div className="three-stars-row">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} fill="currentColor" stroke="none" />)}
                </div>
                <p className="three-testimonial-quote">"{testimonialsData[testimonialIndex].quote}"</p>
                <h4 className="three-testimonial-author">— {testimonialsData[testimonialIndex].author}</h4>
                <span className="three-testimonial-tag">{testimonialsData[testimonialIndex].tag}</span>
              </motion.div>
            </AnimatePresence>

            <div className="three-carousel-nav">
              <button className="three-carousel-arrow" onClick={() => setTestimonialIndex(p => (p - 1 + testimonialsData.length) % testimonialsData.length)}><ChevronLeft size={16} /></button>
              <button className="three-carousel-arrow" onClick={() => setTestimonialIndex(p => (p + 1) % testimonialsData.length)}><ChevronRight size={16} /></button>
            </div>
          </div>
        </section>

        {/* Physics Sign swinging rope block */}
        <section 
          className="three-physics-section"
          ref={physicsContainerRef}
          onMouseMove={handlePhysicsMouseMove}
          onMouseLeave={() => swingAngle.set(0)}
        >
          <div className="three-swing-container">
            <motion.div className="three-rope-anchor three-rope-left" style={{ rotate: swingAngle }} />
            <motion.div className="three-rope-anchor three-rope-right" style={{ rotate: swingAngle }} />
            <motion.div className="three-swinging-sign" style={{ rotate: swingAngle }}>
              <span className="three-swinging-text">SUPPORT</span>
            </motion.div>
          </div>
          <p className="three-physics-desc">"Expert registered nursing backing you up — every step of the way."</p>
          <button className="btn-three-cta" onClick={() => setCurrentPage('contact')}>Contact Our Nurses</button>
        </section>
      </div>
    );
  };

  // Page 2: About Us
  const renderAbout = () => {
    return (
      <div className="three-about-page" ref={aboutSectionRef}>
        <div className="three-about-layout">
          {/* Left Illustration */}
          <div className="three-about-ill-container">
            <motion.div style={{ y: aboutParallaxY, width: '100%', height: '100%' }} className="three-panel-illustration">
              <svg viewBox="0 0 240 200" style={{ width: '100%', height: '100%' }}>
                {/* Glowing organic accent background blobs */}
                <circle cx="90" cy="80" r="45" fill="var(--bg-mint)" opacity="0.6" />
                <circle cx="150" cy="80" r="45" fill="var(--bg-sky)" opacity="0.6" />
                <circle cx="120" cy="130" r="45" fill="var(--bg-sun)" opacity="0.6" />

                {/* Overlapping medical glassmorphism circular panels with float animation loops */}
                <g className="three-float-slow">
                  <circle cx="90" cy="80" r="45" fill="none" stroke="var(--text-dark)" strokeWidth="3" />
                  <path d="M 82 80 L 98 80 M 90 72 L 90 88" stroke="var(--text-dark)" strokeWidth="3.5" strokeLinecap="round" />
                </g>

                <g className="three-float-slow" style={{ animationDelay: '1.5s' }}>
                  <circle cx="150" cy="80" r="45" fill="none" stroke="var(--text-dark)" strokeWidth="3" />
                  <path d="M 150 89 C 150 89 139 78 139 68 C 139 58 147 58 150 66 C 153 58 161 58 161 68 C 161 78 150 89 150 89 Z" fill="var(--accent-peach)" stroke="var(--text-dark)" strokeWidth="2.2" />
                </g>

                <g className="three-float-slow" style={{ animationDelay: '3.0s' }}>
                  <circle cx="120" cy="130" r="45" fill="none" stroke="var(--text-dark)" strokeWidth="3" />
                  <path d="M 120 110 L 132 118 V 134 C 132 144 120 152 120 152 C 120 152 108 144 108 134 V 118 Z" fill="none" stroke="var(--text-dark)" strokeWidth="3" />
                </g>
              </svg>
            </motion.div>
          </div>

          {/* Right Narrative */}
          <div className="three-about-right">
            <div className="section-header" style={{ marginBottom: 0 }}>
              <span className="section-label">CLINICAL ORIGINS</span>
              <h2 
                className="three-about-heading section-title"
                onClick={() => setStickerSet(p => (p + 1) % stickersSets.length)}
                onMouseEnter={() => setIsCursorHovering(true)}
                onMouseLeave={() => setIsCursorHovering(false)}
              >
                Born in <em className="highlight-teal">Brisbane.</em>
              </h2>
            </div>

            <p className="three-about-text">
              Carezone Nursing Solutions was founded with a dedicated focus: delivering AHPRA registered nursing directly to local Australian homes. Since 2015, we have worked alongside major hospital discharge boards, local practitioners, and the NDIS commission to ensure high clinical compliance in home assistance.
            </p>

            <p className="three-about-text" style={{ fontSize: '0.95rem', fontStyle: 'italic', borderLeft: '3px solid var(--accent-teal-dk)', paddingLeft: '1rem' }}>
              "Click the heading above to cycle through our core clinical values and see how our registered care coordinators support independent health paths."
            </p>

            {/* Sticker Badges Row */}
            <div className="three-stickers-row">
              {stickersSets[stickerSet].map((sticker, idx) => (
                <motion.div
                  key={sticker.text + stickerSet}
                  className="three-sticker"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, ease: easeBouncy, delay: idx * 0.08 }}
                >
                  <span>{sticker.emoji}</span>
                  <span>{sticker.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Band */}
        <section className="three-stats-band">
          <div className="three-stats-grid">
            <div className="three-stat-card">
              <StatCounter value={500} suffix="+" />
              <span className="three-stat-label">Clients Serviced</span>
            </div>
            <div className="three-stat-card">
              <StatCounter value={3} suffix="" />
              <span className="three-stat-label">SEQ Regions</span>
            </div>
            <div className="three-stat-card">
              <StatCounter value={10} suffix="+" />
              <span className="three-stat-label">Years of Nursing</span>
            </div>
          </div>
        </section>

        {/* Partners Accreditations */}
        <div className="three-partners-block">
          <h4 className="three-partners-title">Clinical Partners & Integrations</h4>
          <div className="three-partners-logos">
            <span className="three-partner-logo">🏥 Brisbane Metro Health</span>
            <span className="three-partner-logo">🛡️ AHPRA Registered</span>
            <span className="three-partner-logo">🤝 NDIS Commissioned</span>
            <span className="three-partner-logo">✨ QLD Safety Audit</span>
          </div>
        </div>
      </div>
    );
  };

  // Page 3: Services
  const renderServices = () => {
    return (
      <div className="three-services-page">
        <div className="section-header">
          <span className="section-label">CLINICAL REGISTER</span>
          <h2 className="section-title">Healthcare programs built for <em>every</em> need.</h2>
        </div>

        {/* Filter Pills */}
        <div className="three-filter-container">
          {filterPills.map((pill) => {
            const isActive = activeFilter === pill.id;
            return (
              <button
                key={pill.label}
                className={`three-filter-pill ${isActive ? 'active' : ''}`}
                onClick={() => setActiveFilter(pill.id)}
                onMouseEnter={() => setIsCursorHovering(true)}
                onMouseLeave={() => setIsCursorHovering(false)}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Masonry Asymmetric Services Grid */}
        <div className="three-services-masonry">
          {filteredServices.map((service, idx) => (
            <motion.div
              key={service.id}
              className={`three-service-card ${idx % 2 !== 0 ? 'offset-card' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <div className="three-service-hover-border" style={{ backgroundColor: service.color }} />
              <div 
                className="three-service-icon-box"
                style={{ backgroundColor: service.color + '1F', borderColor: 'var(--text-dark)' }}
              >
                {service.icon}
              </div>
              <h3 className="three-service-title">{service.title}</h3>
              <p className="three-service-desc">{service.desc}</p>
              
              <button 
                onClick={() => setCurrentPage('contact')}
                className="three-service-link"
                onMouseEnter={() => setIsCursorHovering(true)}
                onMouseLeave={() => setIsCursorHovering(false)}
              >
                <span>Book Evaluation</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  // Page 4: NDIS & Programs
  const renderNDIS = () => {
    return (
      <div className="three-ndis-page">
        {/* NDIS Hero overview banner */}
        <div className="three-ndis-intro">
          <div className="three-ndis-hero-card">
            <h3 className="three-ndis-hero-title">Accredited Support Pathways</h3>
            <p className="three-ndis-hero-text">
              We offer registered NDIS support coordination and daily life assistance. Our team matches you with registered clinicians, occupational therapists, and nurses to achieve your plan goals.
            </p>
          </div>

          <div className="three-ndis-checklist">
            <div className="three-ndis-check-item">
              <div className="three-check-circle"><Check size={12} strokeWidth={3} /></div>
              <span>Registered NDIS provider coordinating care parameters.</span>
            </div>
            <div className="three-ndis-check-item">
              <div className="three-check-circle"><Check size={12} strokeWidth={3} /></div>
              <span>Direct, certified management of daily assistance tasks.</span>
            </div>
            <div className="three-ndis-check-item">
              <div className="three-check-circle"><Check size={12} strokeWidth={3} /></div>
              <span>Therapy programs and OT supports registered in SEQ.</span>
            </div>
          </div>
        </div>

        {/* Care programs Grid */}
        <div className="section-header">
          <span className="section-label">CLINICAL STREAMS</span>
          <h2 className="section-title">Support programs built around <em>plan</em> goals.</h2>
        </div>

        <div className="three-programs-grid">
          {programsData.map((prog, idx) => (
            <motion.div 
              key={prog.title}
              className="three-program-card"
              style={{ backgroundColor: prog.color }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div>
                <span className="three-program-label">{prog.tag}</span>
                <h3 className="three-program-title">{prog.title}</h3>
                <p className="three-program-desc">{prog.desc}</p>
              </div>

              <button 
                onClick={() => setCurrentPage('contact')}
                className="three-program-link"
                onMouseEnter={() => setIsCursorHovering(true)}
                onMouseLeave={() => setIsCursorHovering(false)}
              >
                <span>Details & Coordination</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Health Resources Strip */}
        <div className="three-journal-strip">
          <div className="section-header">
            <span className="section-label">CLINICAL GUIDES</span>
            <h2 className="section-title">A community built on <em>clinical</em> compassion.</h2>
          </div>

          <div className="three-journal-scroll">
            {articlesData.map((article, idx) => (
              <motion.div 
                key={article.title}
                className="three-journal-card"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
              >
                <div 
                  className="three-journal-img-placeholder" 
                  style={{ backgroundColor: `var(--bg-${['mint', 'peach', 'sky', 'sun', 'mint', 'peach'][idx % 6]})` }}
                >
                  <span>{article.emoji}</span>
                </div>
                
                <div className="three-journal-body">
                  <h3 className="three-journal-title">{article.title}</h3>
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="three-journal-link"
                    onMouseEnter={() => setIsCursorHovering(true)}
                    onMouseLeave={() => setIsCursorHovering(false)}
                  >
                    <span>Read Guide</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Page 5: Contact Us
  const renderContact = () => {
    return (
      <div className="three-contact-page">
        <div className="three-contact-layout">
          {/* Info Details */}
          <div className="three-contact-info">
            <h2 className="three-contact-title">Let's discuss your nursing support.</h2>
            <p className="three-contact-desc">
              Have clinical questions regarding your NDIS package, private respite care, or post-hospital needs? Submit your details, and a care coordinator will contact you shortly.
            </p>

            <div className="three-contact-details">
              <div className="three-detail-card">
                <div className="three-detail-icon"><Phone size={16} /></div>
                <div className="three-detail-text">
                  <h4>DIRECT CALL</h4>
                  <p>1300 162 976</p>
                </div>
              </div>

              <div className="three-detail-card">
                <div className="three-detail-icon"><Mail size={16} /></div>
                <div className="three-detail-text">
                  <h4>EMAIL SUPPORT</h4>
                  <p>info@carezonenursing.com.au</p>
                </div>
              </div>

              <div className="three-detail-card">
                <div className="three-detail-icon"><Clock size={16} /></div>
                <div className="three-detail-text">
                  <h4>OFFICE HOURS</h4>
                  <p>Monday - Friday: 8:30 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form container */}
          <div className="three-contact-form-container">
            {formStatus === 'success' ? (
              <motion.div 
                className="three-success-view"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="three-success-icon-wrapper">
                  <svg viewBox="0 0 24 24" style={{ width: '36px', height: '36px', color: 'var(--text-dark)' }}>
                    <motion.path
                      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      d="M20 6L9 17l-5-5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </svg>
                </div>
                <h3 className="three-success-title">Message Sent!</h3>
                <p className="three-success-desc">
                  Thank you for reaching out. We will get back to you within 24 business hours.
                </p>
                <button 
                  className="btn-three-secondary"
                  onClick={() => setFormStatus('idle')}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="three-form-group">
                  <label className="three-form-label" htmlFor="name-input">Your Name</label>
                  <motion.input 
                    id="name-input"
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. John Doe"
                    className="three-form-input"
                    whileFocus={{ scale: 1.01, borderColor: 'var(--accent-teal-dk)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="three-form-group">
                    <label className="three-form-label" htmlFor="email-input">Email</label>
                    <motion.input 
                      id="email-input"
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className="three-form-input"
                      whileFocus={{ scale: 1.01, borderColor: 'var(--accent-teal-dk)' }}
                    />
                  </div>

                  <div className="three-form-group">
                    <label className="three-form-label" htmlFor="phone-input">Phone</label>
                    <motion.input 
                      id="phone-input"
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="0412 345 678"
                      className="three-form-input"
                      whileFocus={{ scale: 1.01, borderColor: 'var(--accent-teal-dk)' }}
                    />
                  </div>
                </div>

                <div className="three-form-group">
                  <label className="three-form-label" htmlFor="msg-input">Message</label>
                  <motion.textarea 
                    id="msg-input"
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe the clinical or coordination support you require..."
                    className="three-form-textarea"
                    whileFocus={{ scale: 1.01, borderColor: 'var(--accent-teal-dk)' }}
                  />
                </div>

                <button 
                  type="submit"
                  className="btn-three-cta"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  disabled={formStatus === 'loading'}
                  onMouseEnter={() => setIsCursorHovering(true)}
                  onMouseLeave={() => setIsCursorHovering(false)}
                >
                  {formStatus === 'loading' ? (
                    <>
                      <span className="three-spinner" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="design-maximatherapy-coral">
      {/* Custom Spring Follower Cursor */}
      <motion.div 
        className={`three-custom-cursor ${isCursorHovering ? 'hovering-link' : ''}`}
        style={{
          x: cursorSpringX,
          y: cursorSpringY
        }}
      />

      {/* 2. Top Utility Bar */}
      <div className="three-utility-bar">
        <div className="container utility-content">
          <div>📍 Brisbane · Gold Coast · Tweed</div>
          <div>📞 1300 162 976</div>
        </div>
      </div>

      {/* 3. Sticky Navbar */}
      <header className={`three-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a 
            href="#" 
            className="three-logo"
            onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
            onMouseEnter={() => setIsCursorHovering(true)}
            onMouseLeave={() => setIsCursorHovering(false)}
          >
            <Sparkles size={20} />
            <span>CAREZONE</span>
          </a>

          {/* Desktop Navigation Link tabs */}
          <nav className="three-nav-links">
            {pages.map((pg) => {
              const isActive = currentPage === pg.id;
              return (
                <div 
                  key={pg.id}
                  className={`three-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setCurrentPage(pg.id)}
                  onMouseEnter={() => setIsCursorHovering(true)}
                  onMouseLeave={() => setIsCursorHovering(false)}
                >
                  {pg.label}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNavTabLine"
                      className="three-nav-underline"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Nav CTA shape morph */}
          <div className="three-navbar-cta-wrapper">
            <motion.button 
              className="btn-three-cta"
              onClick={() => setCurrentPage('contact')}
              onMouseEnter={() => setIsCursorHovering(true)}
              onMouseLeave={() => setIsCursorHovering(false)}
              animate={{ borderRadius: isScrolled ? "30px" : "12px" }}
              transition={{ duration: 0.3 }}
            >
              Get In Touch
            </motion.button>
          </div>

          <button 
            className="three-hamburger"
            onClick={() => setMobileMenuOpen(true)}
            onMouseEnter={() => setIsCursorHovering(true)}
            onMouseLeave={() => setIsCursorHovering(false)}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Mobile slide drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="three-mobile-drawer"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="three-logo"><Sparkles size={20} /> CAREZONE</span>
              <button onClick={() => setMobileMenuOpen(false)} style={{ width: '40px', height: '40px', border: '2px solid var(--text-dark)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>
            
            <div className="three-mobile-links">
              {pages.map((pg) => {
                const isActive = currentPage === pg.id;
                return (
                  <a 
                    key={pg.id} 
                    className={`three-mobile-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentPage(pg.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {pg.label}
                  </a>
                );
              })}
            </div>

            <div className="three-mobile-cta">
              <button className="btn-three-cta" onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}>Get In Touch</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Routed Page Container */}
      <div className="container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease }}
            className="three-page-content"
          >
            {currentPage === 'home' && renderHome()}
            {currentPage === 'about' && renderAbout()}
            {currentPage === 'services' && renderServices()}
            {currentPage === 'ndis' && renderNDIS()}
            {currentPage === 'contact' && renderContact()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="three-footer">
        <div className="container">
          <div className="three-footer-grid">
            <div className="three-footer-brand">
              <h2 className="three-footer-logo">CAREZONE</h2>
              <p className="three-footer-tagline">
                Clinical care you can feel good about. Managed by registered healthcare professionals in SEQ.
              </p>
              
              <div className="three-footer-socials">
                {['FB', 'IG', 'TW'].map((soc) => (
                  <a key={soc} href="#" className="three-social-btn" onMouseEnter={() => setIsCursorHovering(true)} onMouseLeave={() => setIsCursorHovering(false)}>
                    {soc}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="three-footer-title">Services</h4>
              <ul className="three-footer-links">
                {['Nursing Support', 'Personal Care', 'Social Support', 'Allied Health', 'Home Maintenance'].map((serv) => (
                  <li key={serv}><a className="three-footer-link" onClick={() => setCurrentPage('services')}>{serv}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="three-footer-title">Quick Links</h4>
              <ul className="three-footer-links">
                {pages.map((pg) => (
                  <li key={pg.id}><a className="three-footer-link" onClick={() => setCurrentPage(pg.id)}>{pg.label}</a></li>
                ))}
              </ul>
            </div>

            <div className="three-footer-newsletter">
              <h4 className="three-footer-title">Clinical Hub</h4>
              <p className="three-footer-tagline">Subscribe to our newsletter for health tips and compliance news.</p>
              
              {newsletterSuccess ? (
                <div style={{ color: 'var(--accent-teal)', fontWeight: 'bold' }}>✓ Subscription Successful!</div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="three-newsletter-form">
                  <motion.input 
                    type="email" 
                    placeholder="Your Email" 
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="three-newsletter-input"
                    animate={{ width: newsletterWidth }}
                    onFocus={() => setNewsletterWidth(200)}
                    onBlur={() => setNewsletterWidth(140)}
                    transition={{ duration: 0.25 }}
                  />
                  <button 
                    type="submit" 
                    className="three-newsletter-btn"
                    onMouseEnter={() => setIsCursorHovering(true)}
                    onMouseLeave={() => setIsCursorHovering(false)}
                  >
                    <Check size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="three-footer-bottom">
            <div>All rights reserved CAREZONE NURSING SOLUTIONS © 2026</div>
            <div className="three-footer-bottom-links">
              <a href="#" className="three-footer-link">Privacy Policy</a>
              <a href="#" className="three-footer-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Showcase Widget */}
      <div className="three-floating-widget">
        <button 
          onClick={() => {
            window.scrollTo({ top: 0 });
            onSelect('hub');
          }}
          className="three-floating-btn"
          onMouseEnter={() => setIsCursorHovering(true)}
          onMouseLeave={() => setIsCursorHovering(false)}
        >
          <ArrowLeft size={14} />
          <span>Designs Showcase Hub</span>
        </button>
      </div>
    </div>
  );
}

export default DesignThree;
