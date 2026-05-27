import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  animate, 
  useInView 
} from 'framer-motion';
import { 
  Stethoscope, 
  Droplets, 
  Handshake, 
  Activity, 
  Sparkles, 
  Wrench, 
  ClipboardList, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  Menu, 
  X, 
  Check, 
  Send,
  ArrowLeft
} from 'lucide-react';
import './App.css';
import DesignHub from './components/DesignHub';
import DesignTwo from './components/DesignTwo';
import DesignThree from './components/DesignThree';

// Animated Counter Component for Stats Section
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2.5,
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

  return <span ref={ref} className="stat-number">0{suffix}</span>;
}

function App() {
  const [activeDesign, setActiveDesign] = useState('hub');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('ndis');
  const [selectedLocation, setSelectedLocation] = useState('brisbane');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  // Scroll tracking for Navbar using Framer Motion
  const { scrollY } = useScroll();
  const headerPadding = useTransform(scrollY, [0, 50], ["20px 0px", "10px 0px"]);
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ["rgba(244, 249, 248, 1)", "rgba(255, 255, 255, 0.96)"]
  );
  const borderBottomColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(200, 224, 220, 0)", "rgba(200, 224, 220, 1)"]
  );
  const headerShadow = useTransform(
    scrollY,
    [0, 50],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 8px 30px rgba(26, 58, 53, 0.05)"]
  );

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
    }, 1500);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 4000);
    }
  };

  // Scroll to section function
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Data
  const services = [
    {
      icon: <Stethoscope size={32} />,
      title: "Nursing Care",
      desc: "Clinical medication management, detailed wound care assessments, dementia-specific programs, and compassionate palliative nursing at home."
    },
    {
      icon: <Droplets size={32} />,
      title: "Personal Care",
      desc: "Dignified assistance with bathing, daily grooming, hygiene management, dressing, and personal mobility support."
    },
    {
      icon: <Handshake size={32} />,
      title: "Social Support",
      desc: "Companion visits, community participation support, assisted shopping runs, social outings, and hobby engagement."
    },
    {
      icon: <Activity size={32} />,
      title: "Health & Wellbeing",
      desc: "Tailored physical exercise routines, nutritional diet mapping, preventative wellness reviews, and mental health check-ins."
    },
    {
      icon: <Sparkles size={32} />,
      title: "Domestic Cleaning",
      desc: "General household cleaning, laundry assistance, organizing living spaces, and daily meal preparation support."
    },
    {
      icon: <Wrench size={32} />,
      title: "Home Maintenance",
      desc: "Minor home safety modifications, handrail installations, garden upkeep, and general home repairs to ensure a safe environment."
    },
    {
      icon: <ClipboardList size={32} />,
      title: "Allied Health",
      desc: "In-home assessments for physiotherapy, occupational therapy guidance, custom podiatry care, and expert dietetics advice."
    }
  ];

  const tabContents = {
    ndis: [
      { num: "01", title: "Support Coordination", desc: "We guide you in navigating your NDIS portal, matching you with appropriate care practitioners, and understanding your funding allocations." },
      { num: "02", title: "Core Daily Activity Supports", desc: "Direct, personal care assisting you with meal prep, grooming, household chores, and travel/transport tasks." },
      { num: "03", title: "Social & Civic Access", desc: "Supporting you to engage in sports, attend educational programs, join art clubs, and feel part of your local community." }
    ],
    'aged-care': [
      { num: "01", title: "Home Care Packages", desc: "Expert administration and care delivery for Home Care Package Levels 1 through 4, customized completely to your lifestyle." },
      { num: "02", title: "In-Home Respite Support", desc: "Providing family carers with essential breaks, ensuring peace of mind while certified professionals look after your loved ones." },
      { num: "03", title: "Post-Hospital Transition", desc: "Temporary, focused recovery programs to help you settle back safely into your home after a medical discharge." }
    ],
    dva: [
      { num: "01", title: "Community Nursing Services", desc: "Direct, government-funded clinical nursing for eligible veterans and war widows, delivering clinical care without hassle." },
      { num: "02", title: "Hygiene & Mobility Support", desc: "Assisting veterans with dressing, personal care tasks, and transferring safely using approved assistive equipment." },
      { num: "03", title: "Domestic Assistance", desc: "Help with grocery shopping, washing, meal prep, and overall home tidiness to support independent living." }
    ],
    'allied-health': [
      { num: "01", title: "In-Home Physiotherapy", desc: "Strength assessments, range of motion training, and customized home rehabilitation programs following operations." },
      { num: "02", title: "Occupational Therapy (OT)", desc: "Home assessments to recommend essential aids, walk-in shower modifications, ramps, and ergonomic adjustments." },
      { num: "03", title: "Clinical Podiatry & Dietetics", desc: "Direct care for foot hygiene, diabetes foot care, and customized nutritional plans to manage conditions like hypertension." }
    ]
  };

  const locationsData = {
    brisbane: {
      name: "Brisbane Central",
      address: "Suite 12, 100 Queen St, Brisbane QLD 4000",
      phone: "1300 162 976 (Ext. 1)",
      hours: "Mon - Fri: 8:30 AM - 5:00 PM",
      coords: { x: "50%", y: "30%" }
    },
    'gold-coast': {
      name: "Gold Coast Office",
      address: "Level 2, 50 Marine Parade, Southport QLD 4215",
      phone: "1300 162 976 (Ext. 2)",
      hours: "Mon - Fri: 8:30 AM - 5:00 PM",
      coords: { x: "55%", y: "55%" }
    },
    tweed: {
      name: "Tweed Heads Hub",
      address: "12 Wharf St, Tweed Heads NSW 2485",
      phone: "1300 162 976 (Ext. 3)",
      hours: "Mon - Fri: 9:00 AM - 4:30 PM",
      coords: { x: "60%", y: "80%" }
    }
  };

  if (activeDesign === 'hub') {
    return <DesignHub onSelect={setActiveDesign} />;
  }

  if (activeDesign === 'design2') {
    return <DesignTwo onSelect={setActiveDesign} />;
  }

  if (activeDesign === 'design3') {
    return <DesignThree onSelect={setActiveDesign} />;
  }

  return (
    <>
      {/* Background grain noise effect */}
      <div className="grain-overlay" />

      {/* 1. Top Utility Bar */}
      <div className="utility-bar">
        <div className="container">
          <div className="utility-bar-left">
            <span className="open-indicator">
              <span className="dot" />
              Open Now
            </span>
            <span>|</span>
            <span>Serving SE QLD & Northern NSW</span>
          </div>
          <div className="utility-bar-right">
            <span>Call: <a href="tel:1300162976" className="phone-link">1300 162 976</a></span>
            <span>|</span>
            <span>Brisbane • Gold Coast • Tweed</span>
          </div>
        </div>
      </div>

      {/* 2. Sticky Navbar */}
      <motion.header 
        style={{ 
          padding: headerPadding, 
          backgroundColor: headerBg,
          borderBottom: borderBottomColor,
          boxShadow: headerShadow
        }}
        className="navbar-header"
      >
        <div className="container navbar-container">
          <a href="#" className="logo-link" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
            <span className="logo-text">CAREZONE<span style={{ color: "var(--accent)" }}>.</span>NURSING</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            <a onClick={() => scrollToSection('hero')} className="nav-item">Home</a>
            <a onClick={() => scrollToSection('about')} className="nav-item">About Us</a>
            
            <div className="nav-item nav-item-dropdown">
              Our Services <ChevronDown size={14} />
              <div className="dropdown-menu">
                <a onClick={() => scrollToSection('services')} className="dropdown-item">All Services</a>
                <a onClick={() => { scrollToSection('gallery'); setActiveTab('ndis'); }} className="dropdown-item">NDIS Services</a>
                <a onClick={() => { scrollToSection('gallery'); setActiveTab('aged-care'); }} className="dropdown-item">Aged Care</a>
                <a onClick={() => { scrollToSection('gallery'); setActiveTab('dva'); }} className="dropdown-item">DVA Support</a>
                <a onClick={() => { scrollToSection('gallery'); setActiveTab('allied-health'); }} className="dropdown-item">Allied Health</a>
              </div>
            </div>

            <a onClick={() => { scrollToSection('gallery'); setActiveTab('ndis'); }} className="nav-item">NDIS</a>
            <a onClick={() => scrollToSection('locations')} className="nav-item">Locations</a>
            <a onClick={() => scrollToSection('contact')} className="nav-item">Contact Us</a>
          </nav>

          {/* Desktop CTA */}
          <div className="nav-cta">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact')}
              className="btn btn-primary"
            >
              Get In Touch
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="mobile-drawer"
          >
            <div className="mobile-drawer-links">
              <a onClick={() => scrollToSection('hero')} className="mobile-nav-item">Home</a>
              <a onClick={() => scrollToSection('about')} className="mobile-nav-item">About Us</a>
              <a onClick={() => scrollToSection('services')} className="mobile-nav-item">Services</a>
              <a onClick={() => { scrollToSection('gallery'); setActiveTab('ndis'); }} className="mobile-nav-item">NDIS Supports</a>
              <a onClick={() => scrollToSection('locations')} className="mobile-nav-item">Locations</a>
              <a onClick={() => scrollToSection('contact')} className="mobile-nav-item">Contact</a>
            </div>
            <div className="mobile-drawer-cta">
              <a href="tel:1300162976" className="btn btn-secondary">
                Call 1300 162 976
              </a>
              <button onClick={() => scrollToSection('contact')} className="btn btn-primary">
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Hero Section */}
      <section id="hero" className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              {/* Stacked multi-line headings with stagger */}
              <h1 className="hero-heading">
                <motion.span
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  CARE
                </motion.span>
                <motion.span
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="light-weight"
                >
                  at
                </motion.span>
                <motion.span
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  HOME
                </motion.span>
              </h1>

              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="hero-subtext"
              >
                Serving Brisbane, Gold Coast & Tweed — person-centred nursing care for NDIS, Aged Care & DVA.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="hero-actions"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection('about')}
                  className="btn btn-primary"
                >
                  Learn More <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
                </motion.button>
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  href="tel:1300162976"
                  className="btn btn-secondary"
                >
                  Call Now
                </motion.a>
              </motion.div>
            </div>

            <div className="hero-visual">
              {/* Organic SVG Decorative Leaf Motif */}
              <motion.svg 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="hero-organic-svg" 
                viewBox="0 0 500 500" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#eaf4f2" />
                    <stop offset="50%" stopColor="#c8e0dc" />
                    <stop offset="100%" stopColor="#2db89e" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                {/* Organic fluid shape */}
                <path 
                  fill="url(#leafGrad)" 
                  d="M407.5,335.5Q347,421,241,408.5Q135,396,93.5,298Q52,200,138,137.5Q224,75,321,112.5Q418,150,468,242.5Q518,335,407.5,335.5Z" 
                />
                {/* Organic Leaf lines */}
                <path 
                  d="M170,300 C220,240 280,210 350,180" 
                  fill="none" 
                  stroke="var(--accent)" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  opacity="0.6"
                />
                <path 
                  d="M230,250 C260,200 290,190 310,140" 
                  fill="none" 
                  stroke="var(--accent)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  opacity="0.4"
                />
                <path 
                  d="M260,280 C290,260 320,220 360,230" 
                  fill="none" 
                  stroke="var(--accent)" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  opacity="0.4"
                />
                {/* Caring Dots */}
                <circle cx="160" cy="180" r="12" fill="var(--accent)" />
                <circle cx="340" cy="300" r="8" fill="var(--text-primary)" opacity="0.7" />
                <circle cx="280" cy="360" r="16" fill="var(--bg-secondary)" />
              </motion.svg>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Marquee Ticker */}
      <section className="marquee-container">
        <motion.div 
          className="marquee-content"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 25 
          }}
        >
          {/* Double content for seamless looping */}
          {[1, 2].map((loopIdx) => (
            <React.Fragment key={loopIdx}>
              <span className="marquee-item">
                NDIS Support <span className="marquee-dot">•</span>
                Aged Care <span className="marquee-dot">•</span>
                DVA Services <span className="marquee-dot">•</span>
                Home Nursing <span className="marquee-dot">•</span>
                Personal Care <span className="marquee-dot">•</span>
                Allied Health <span className="marquee-dot">•</span>
                Brisbane <span className="marquee-dot">•</span>
                Gold Coast <span className="marquee-dot">•</span>
                Tweed <span className="marquee-dot">•</span>
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </section>

      {/* 5. Services Section */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Care Philosophy</span>
            <h2 className="section-title-editorial">We offer personalised support</h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="services-grid"
          >
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
                }}
                className="service-card"
              >
                <div className="service-card-icon">
                  {service.icon}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. About / Welcome Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-left-editorial">
              <h2 className="about-editorial-heading">
                <span>CARE</span>
                <span className="accent-word">for</span>
                <span>YOU</span>
              </h2>
            </div>
            
            <div className="about-right">
              <h3 className="about-mission-title">
                Delivering compassionate, clinical nursing care tailored to your home environment.
              </h3>
              <p className="about-mission-text">
                At Carezone Nursing Solutions, we believe that everyone deserves high-quality health support in the place they feel most comfortable. Our team of Registered Nurses, clinical assistants, and support coordinators work hand-in-hand with NDIS participants, aged care individuals, and military veterans to deliver clinical Excellence, domestic ease, and a higher quality of life.
              </p>
              <div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-outline-teal"
                  style={{ color: "var(--bg-secondary)", borderColor: "var(--bg-secondary)" }}
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Stats Bar */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <Counter value={500} suffix="+" />
              <span className="stat-label">Clients Supported</span>
            </div>
            <div className="stat-item">
              <Counter value={3} suffix="" />
              <span className="stat-label">Regions Served</span>
            </div>
            <div className="stat-item">
              <Counter value={10} suffix="+" />
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Talk With a Nurse Section */}
      <section className="nurse-section">
        <div className="container">
          <div className="nurse-grid">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="nurse-visual"
            >
              <div className="nurse-avatar-container">
                <span className="nurse-icon-huge">🩺</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="nurse-content"
            >
              <h2 className="nurse-heading">Talk With a Nurse Today!</h2>
              <p className="nurse-text">
                Have clinical questions regarding your NDIS plan, aged care support levels, or wound care treatment? Our friendly nursing team is available to offer advice and help guide you through the process of choosing the right support model for your circumstances.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('contact')}
                className="btn btn-primary"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 9. Gallery / Services Tabs */}
      <section id="gallery" className="tabs-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Funding & Support Packages</span>
            <h2 className="section-title-editorial">Tailored Care pathways</h2>
          </div>

          <div className="tabs-nav">
            <button 
              onClick={() => setActiveTab('ndis')}
              className={`tab-btn ${activeTab === 'ndis' ? 'active' : ''}`}
            >
              NDIS Supports
            </button>
            <button 
              onClick={() => setActiveTab('aged-care')}
              className={`tab-btn ${activeTab === 'aged-care' ? 'active' : ''}`}
            >
              Aged Care
            </button>
            <button 
              onClick={() => setActiveTab('dva')}
              className={`tab-btn ${activeTab === 'dva' ? 'active' : ''}`}
            >
              DVA Services
            </button>
            <button 
              onClick={() => setActiveTab('allied-health')}
              className={`tab-btn ${activeTab === 'allied-health' ? 'active' : ''}`}
            >
              Allied Health
            </button>
          </div>

          <div className="tab-content-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="tabs-grid"
              >
                {tabContents[activeTab].map((card, idx) => (
                  <div key={idx} className="tab-card">
                    <span className="tab-card-num">{card.num}</span>
                    <h3 className="tab-card-title">{card.title}</h3>
                    <p className="tab-card-desc">{card.desc}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 10. Location Section */}
      <section id="locations" className="location-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Footprint</span>
            <h2 className="section-title-editorial">Serving Our Communities</h2>
          </div>

          {/* Interactive location pills */}
          <div className="pills-container">
            <button 
              onClick={() => setSelectedLocation('brisbane')}
              className="location-pill"
              style={{
                borderColor: selectedLocation === 'brisbane' ? 'var(--accent)' : 'var(--border)',
                backgroundColor: selectedLocation === 'brisbane' ? 'var(--bg-card)' : 'var(--bg-primary)'
              }}
            >
              <MapPin size={18} color={selectedLocation === 'brisbane' ? 'var(--accent)' : 'var(--text-muted)'} />
              Brisbane
            </button>
            <button 
              onClick={() => setSelectedLocation('gold-coast')}
              className="location-pill"
              style={{
                borderColor: selectedLocation === 'gold-coast' ? 'var(--accent)' : 'var(--border)',
                backgroundColor: selectedLocation === 'gold-coast' ? 'var(--bg-card)' : 'var(--bg-primary)'
              }}
            >
              <MapPin size={18} color={selectedLocation === 'gold-coast' ? 'var(--accent)' : 'var(--text-muted)'} />
              Gold Coast
            </button>
            <button 
              onClick={() => setSelectedLocation('tweed')}
              className="location-pill"
              style={{
                borderColor: selectedLocation === 'tweed' ? 'var(--accent)' : 'var(--border)',
                backgroundColor: selectedLocation === 'tweed' ? 'var(--bg-card)' : 'var(--bg-primary)'
              }}
            >
              <MapPin size={18} color={selectedLocation === 'tweed' ? 'var(--accent)' : 'var(--text-muted)'} />
              Tweed Heads
            </button>
          </div>

          <div className="map-wrapper">
            <div className="map-placeholder-graphic">
              {/* Beautiful background pattern for the map */}
              <div className="map-graphic-overlay" />
              
              {/* SVG abstract map design */}
              <svg 
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1 }}
                viewBox="0 0 800 450" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M100 200 C300 150 500 250 700 200" 
                  fill="none" 
                  stroke="#e2f0ed" 
                  strokeWidth="8" 
                />
                <path 
                  d="M300 50 C400 200 350 300 450 400" 
                  fill="none" 
                  stroke="#e2f0ed" 
                  strokeWidth="5" 
                />
                
                {/* Interactive markers with coordinate lookup */}
                {Object.keys(locationsData).map((locKey) => {
                  const loc = locationsData[locKey];
                  const isSelected = selectedLocation === locKey;
                  const x = locKey === 'brisbane' ? 380 : locKey === 'gold-coast' ? 440 : 480;
                  const y = locKey === 'brisbane' ? 120 : locKey === 'gold-coast' ? 240 : 340;

                  return (
                    <g key={locKey} style={{ cursor: "pointer" }} onClick={() => setSelectedLocation(locKey)}>
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isSelected ? 16 : 8} 
                        fill="var(--accent)" 
                        opacity={isSelected ? 0.3 : 0.15} 
                      />
                      <circle 
                        cx={x} 
                        cy={y} 
                        r={isSelected ? 8 : 4} 
                        fill="var(--accent)" 
                      />
                      <text 
                        x={x + 15} 
                        y={y + 5} 
                        fontFamily="var(--font-display)" 
                        fontSize="1.1rem" 
                        fill={isSelected ? "var(--text-primary)" : "var(--text-muted)"}
                        fontWeight={isSelected ? "bold" : "normal"}
                      >
                        {loc.name}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="map-graphic-content">
                <span className="map-pin-pulse">
                  <MapPin size={48} />
                </span>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedLocation}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    style={{ backgroundColor: "var(--bg-secondary)", padding: "2rem", borderRadius: "16px", border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}
                  >
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", marginBottom: "0.75rem", color: "var(--text-primary)" }}>
                      {locationsData[selectedLocation].name}
                    </h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                      <strong>Address: </strong>{locationsData[selectedLocation].address}
                    </p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                      <strong>Phone: </strong>{locationsData[selectedLocation].phone}
                    </p>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
                      <strong>Hours: </strong>{locationsData[selectedLocation].hours}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Contact Form Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info">
              <h2 className="contact-info-title">Let's discuss your nursing needs</h2>
              <p className="contact-info-desc">
                Have an inquiry about NDIS packages or private nursing care? Send us a message, and a qualified member of our team will get back to you within 24 business hours.
              </p>
              
              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Phone size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Direct Call</h4>
                    <p><a href="tel:1300162976" style={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>1300 162 976</a></p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Mail size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Email support</h4>
                    <p><a href="mailto:info@carezonenursing.com.au" style={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>info@carezonenursing.com.au</a></p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Clock size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Office Hours</h4>
                    <p>Monday - Friday: 8:30 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-card-form">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-message"
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. A Carezone Care Coordinator will contact you shortly.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="btn btn-secondary" 
                    style={{ marginTop: "2rem" }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-grid">
                    <div className="form-grid-two-col">
                      <div className="form-group">
                        <label className="form-label" htmlFor="form-name">Your Name</label>
                        <motion.input 
                          whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
                          transition={{ duration: 0.2 }}
                          id="form-name"
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          required 
                          placeholder="e.g. John Doe"
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="form-email">Email Address</label>
                        <motion.input 
                          whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
                          transition={{ duration: 0.2 }}
                          id="form-email"
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          required 
                          placeholder="e.g. john@example.com"
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="form-phone">Phone Number</label>
                      <motion.input 
                        whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
                        transition={{ duration: 0.2 }}
                        id="form-phone"
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        required 
                        placeholder="e.g. 0412 345 678"
                        className="form-input" 
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="form-message">How can we help you?</label>
                      <motion.textarea 
                        whileFocus={{ scale: 1.01, borderColor: "var(--accent)" }}
                        transition={{ duration: 0.2 }}
                        id="form-message"
                        name="message" 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        required 
                        placeholder="Please describe what support service you are looking for..."
                        className="form-textarea"
                      />
                    </div>
                  </div>

                  <div className="submit-btn-container">
                    <motion.button 
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      disabled={formStatus === 'loading'}
                      className="btn btn-primary"
                      style={{ minWidth: "180px" }}
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <svg className="spinner" viewBox="0 0 50 50">
                            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Inquiry <Send size={16} style={{ marginLeft: "0.5rem" }} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2 className="footer-logo">CAREZONE</h2>
              <p className="footer-tagline">
                Person-centred nursing care and support services for NDIS, Aged Care & DVA participants. Delivering clinical excellence in the comfort of your home.
              </p>
              <div className="footer-socials">
                <a href="#" className="social-icon-btn" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="social-icon-btn" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M20 4l-6.768 6.768"/></svg>
                </a>
                <a href="#" className="social-icon-btn" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              </div>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-nav-title">Services</h4>
              <ul className="footer-nav-links">
                <li><a onClick={() => scrollToSection('services')} className="footer-nav-link">Nursing Care</a></li>
                <li><a onClick={() => scrollToSection('services')} className="footer-nav-link">Personal Support</a></li>
                <li><a onClick={() => scrollToSection('services')} className="footer-nav-link">Social Companion</a></li>
                <li><a onClick={() => scrollToSection('services')} className="footer-nav-link">Allied Health Support</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-nav-title">Quick Links</h4>
              <ul className="footer-nav-links">
                <li><a onClick={() => scrollToSection('hero')} className="footer-nav-link">Home</a></li>
                <li><a onClick={() => scrollToSection('about')} className="footer-nav-link">About Us</a></li>
                <li><a onClick={() => scrollToSection('locations')} className="footer-nav-link">Our Regions</a></li>
                <li><a onClick={() => scrollToSection('contact')} className="footer-nav-link">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-newsletter">
              <h4 className="footer-nav-title">Newsletter</h4>
              <p className="footer-newsletter-text">
                Receive the latest health updates, support resources, and agency announcements.
              </p>
              {newsletterSuccess ? (
                <div style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "0.95rem" }}>
                  ✓ Subscription Successful!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <motion.input 
                    whileFocus={{ borderColor: "var(--accent)" }}
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="newsletter-input" 
                  />
                  <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                    <Check size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            <p className="copyright-text">
              All rights reserved CAREZONE NURSING SOLUTIONS © 2026
            </p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Design Hub Trigger */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 20 }}
        className="floating-hub-widget"
      >
        <button 
          onClick={() => {
            window.scrollTo({ top: 0 });
            setActiveDesign('hub');
          }}
          className="floating-hub-btn"
          aria-label="Back to Designs Showcase"
        >
          <ArrowLeft size={16} />
          <span>Designs Showcase</span>
        </button>
      </motion.div>
    </>
  );
}

export default App;
