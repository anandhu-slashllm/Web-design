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
  Sparkles
} from 'lucide-react';
import './DesignTwo.css';

// Animated Counter Component for Stats Section
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: "-50px" });

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

  return <span ref={ref} className="twoleaves-stat-number">0{suffix}</span>;
}

function DesignTwo({ onSelect }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  
  // Testimonial Carousel state
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  
  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [newsletterFocused, setNewsletterFocused] = useState(false);

  // Parallax Refs and Scroll Hooks
  const heroRef = useRef(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);

  const originRef = useRef(null);
  const { scrollYProgress: originScrollProgress } = useScroll({
    target: originRef,
    offset: ["start end", "end start"]
  });
  const originY = useTransform(originScrollProgress, [0, 1], ["-15%", "15%"]);

  // Scroll handler for solid navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    } else if (info.offset.x > threshold) {
      setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  // Scroll navigation helper
  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Data Definitions
  const services = [
    {
      id: 'nursing',
      icon: '🩺',
      title: 'Nursing',
      desc: 'Medication management, wound care, dementia & palliative support',
      tags: ['home-nursing', 'aged-care', 'dva', 'ndis', 'brisbane', 'gold-coast', 'tweed']
    },
    {
      id: 'personal',
      icon: '🚿',
      title: 'Personal Care',
      desc: 'Showering, dressing, grooming — with dignity and comfort',
      tags: ['personal-care', 'aged-care', 'dva', 'ndis', 'brisbane', 'gold-coast', 'tweed']
    },
    {
      id: 'social',
      icon: '🤝',
      title: 'Social Support',
      desc: 'Outings, activities, appointments — staying connected',
      tags: ['dva', 'ndis', 'brisbane', 'gold-coast', 'tweed']
    },
    {
      id: 'health',
      icon: '💪',
      title: 'Health & Wellbeing',
      desc: 'Fitness and wellness programs tailored to your needs',
      tags: ['ndis', 'allied-health', 'brisbane', 'gold-coast', 'tweed']
    },
    {
      id: 'domestic',
      icon: '🧹',
      title: 'Domestic Assistance',
      desc: 'Cleaning, laundry, and everyday household tasks',
      tags: ['aged-care', 'dva', 'ndis', 'brisbane', 'gold-coast', 'tweed']
    },
    {
      id: 'maintenance',
      icon: '🔧',
      title: 'Home Maintenance',
      desc: 'Safety repairs, modifications, and accessibility upgrades',
      tags: ['ndis', 'brisbane', 'gold-coast', 'tweed']
    },
    {
      id: 'allied',
      icon: '🦯',
      title: 'Allied Health',
      desc: 'Physio, OT, podiatry, and dietetics at home',
      tags: ['allied-health', 'ndis', 'brisbane', 'gold-coast', 'tweed']
    }
  ];

  const filterPills = [
    { label: 'All Services', id: null },
    { label: 'NDIS', id: 'ndis' },
    { label: 'Aged Care', id: 'aged-care' },
    { label: 'DVA', id: 'dva' },
    { label: 'Home Nursing', id: 'home-nursing' },
    { label: 'Personal Care', id: 'personal-care' },
    { label: 'Allied Health', id: 'allied-health' },
    { label: 'Brisbane', id: 'brisbane' },
    { label: 'Gold Coast', id: 'gold-coast' },
    { label: 'Tweed', id: 'tweed' }
  ];

  const testimonials = [
    {
      quote: "The carers from Carezone treat Mum like family. We couldn't be more grateful.",
      author: "Sandra K.",
      location: "Brisbane",
      service: "Aged Care",
      rating: 5
    },
    {
      quote: "Finally an NDIS provider that actually listens. Life-changing support.",
      author: "Michael T.",
      location: "Gold Coast",
      service: "NDIS",
      rating: 5
    },
    {
      quote: "Professional, warm, and always on time. Highly recommend to any veteran families.",
      author: "Robyn H.",
      location: "Tweed",
      service: "DVA",
      rating: 5
    }
  ];

  const carePrograms = [
    { title: "NDIS Home Support", tagline: "Flexible, funded, person-centred care" },
    { title: "Aged Care Package", tagline: "Stay independent in the home you love" },
    { title: "DVA Services", tagline: "Dedicated care for our veterans" },
    { title: "Allied Health at Home", tagline: "Expert therapy, delivered to your door" },
    { title: "Post-Hospital Care", tagline: "Safe, supported recovery at home" }
  ];

  const journalArticles = [
    { title: "What to Expect from an NDIS Home Visit", img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80" },
    { title: "How to Talk to Ageing Parents About Home Care", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80" },
    { title: "5 Signs It's Time to Consider DVA Support", img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80" },
    { title: "What Allied Health at Home Really Looks Like", img: "https://images.unsplash.com/photo-1579684389782-64d84b5e905d?auto=format&fit=crop&w=400&q=80" },
    { title: "Navigating the My Aged Care Portal", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80" },
    { title: "Home Modifications That Make a Real Difference", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80" }
  ];

  // Framer Motion staggered variants for Hero Title
  const titleVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const wordVariants = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  // Card list animation configuration
  const cardListVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const filteredServices = activeFilter
    ? services.filter(s => s.tags.includes(activeFilter))
    : services;

  return (
    <div className="design-twoleaves-sage">
      <div className="grain-overlay" />

      {/* 1. Top Utility Bar */}
      <div className="twoleaves-utility-bar">
        <div className="container">
          <div className="twoleaves-utility-bar-left">
            <span>📍 Serving Brisbane · Gold Coast · Tweed</span>
          </div>
          <div className="twoleaves-utility-bar-right">
            <span>📞 Call: <a href="tel:1300162976" className="twoleaves-phone-link">1300 162 976</a></span>
          </div>
        </div>
      </div>

      {/* 2. Sticky Navbar */}
      <header className={`twoleaves-navbar ${isScrolled ? 'solid' : 'transparent'}`}>
        <div className="container twoleaves-navbar-container">
          <a href="#" className="twoleaves-logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero-section'); }}>
            CAREZONE <span>NURSING</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="twoleaves-nav-links">
            <a onClick={() => scrollToSection('hero-section')} className="twoleaves-nav-item">Home</a>
            <a onClick={() => scrollToSection('origin-section')} className="twoleaves-nav-item">About Us</a>
            
            <div className="twoleaves-dropdown-wrapper">
              <span className="twoleaves-nav-item">
                Our Services <ChevronDown size={14} />
              </span>
              <div className="twoleaves-dropdown-menu">
                <a onClick={() => { scrollToSection('services-section'); setActiveFilter(null); }} className="twoleaves-dropdown-item">All Services</a>
                <a onClick={() => { scrollToSection('services-section'); setActiveFilter('ndis'); }} className="twoleaves-dropdown-item">NDIS Supports</a>
                <a onClick={() => { scrollToSection('services-section'); setActiveFilter('aged-care'); }} className="twoleaves-dropdown-item">Aged Care</a>
                <a onClick={() => { scrollToSection('services-section'); setActiveFilter('dva'); }} className="twoleaves-dropdown-item">DVA Services</a>
                <a onClick={() => { scrollToSection('services-section'); setActiveFilter('allied-health'); }} className="twoleaves-dropdown-item">Allied Health</a>
              </div>
            </div>

            <a onClick={() => { scrollToSection('services-section'); setActiveFilter('ndis'); }} className="twoleaves-nav-item">NDIS</a>
            <a onClick={() => scrollToSection('contact-section')} className="twoleaves-nav-item">Contact</a>
          </nav>

          {/* Desktop CTA */}
          <div className="twoleaves-nav-cta">
            <motion.button 
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact-section')}
              className="btn-twoleaves btn-twoleaves-primary"
            >
              Get In Touch
            </motion.button>
          </div>

          {/* Mobile Hamburger menu */}
          <button className="twoleaves-hamburger" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="twoleaves-mobile-drawer"
          >
            <div className="container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <span className="twoleaves-logo">CAREZONE</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }} onClick={() => setMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="twoleaves-mobile-links">
                <a onClick={() => scrollToSection('hero-section')} className="twoleaves-mobile-item">Home</a>
                <a onClick={() => scrollToSection('origin-section')} className="twoleaves-mobile-item">About Us</a>
                <a onClick={() => { scrollToSection('services-section'); setActiveFilter(null); }} className="twoleaves-mobile-item">Our Services</a>
                <a onClick={() => { scrollToSection('services-section'); setActiveFilter('ndis'); }} className="twoleaves-mobile-item">NDIS Supports</a>
                <a onClick={() => scrollToSection('contact-section')} className="twoleaves-mobile-item">Contact</a>
              </div>

              <div className="twoleaves-mobile-cta">
                <a href="tel:1300162976" className="btn-twoleaves btn-twoleaves-secondary" style={{ textAlign: 'center' }}>
                  Call 1300 162 976
                </a>
                <button onClick={() => scrollToSection('contact-section')} className="btn-twoleaves btn-twoleaves-primary">
                  Get In Touch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Hero Section */}
      <div id="hero-section" ref={heroRef} className="twoleaves-hero">
        <motion.div 
          style={{ y: heroY, backgroundImage: `url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=80)` }}
          className="twoleaves-hero-bg"
        />
        <div className="twoleaves-hero-overlay" />
        
        <div className="twoleaves-hero-content">
          <motion.h1 
            variants={titleVariants}
            initial="hidden"
            animate="show"
            className="twoleaves-hero-heading"
          >
            <motion.span variants={wordVariants} style={{ display: 'block' }}>Care that fits</motion.span>
            <motion.span variants={wordVariants} style={{ display: 'block' }}>
              the <em>moment</em>.
            </motion.span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="twoleaves-hero-subtext"
          >
            "From NDIS support and Aged Care to DVA services — we bring expert, person-centred nursing to your home in Brisbane, the Gold Coast, and Tweed."
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.8 }}
            className="twoleaves-hero-ctas"
          >
            <motion.button 
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('services-section')}
              className="btn-twoleaves btn-twoleaves-primary"
            >
              Learn More
            </motion.button>
            <motion.a 
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="tel:1300162976"
              className="btn-twoleaves btn-twoleaves-ghost-light"
            >
              Call 1300 162 976
            </motion.a>
          </motion.div>
        </div>

        <div onClick={() => scrollToSection('band-section')} className="twoleaves-scroll-indicator">
          <span>Scroll</span>
          <span className="twoleaves-bounce">↓</span>
        </div>
      </div>

      {/* 4. Italic Subheading Band */}
      <section id="band-section" className="twoleaves-subheading-band">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="twoleaves-band-text"
          >
            A <em>great</em> recovery starts with care <br />
            in the <em>comfort</em> of your own home.
          </motion.h2>
        </div>
      </section>

      {/* 5. Services Section — "Best Sellers" Style */}
      <section id="services-section" className="twoleaves-services">
        <div className="container">
          <span className="twoleaves-section-badge">Our Services</span>
          <h2 className="twoleaves-section-title">What we offer</h2>

          {/* Horizontally scrollable list on mobile, grid on desktop */}
          <motion.div 
            variants={cardListVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="twoleaves-horizontal-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, idx) => (
                <motion.div 
                  key={service.id}
                  layout
                  variants={cardVariants}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="twoleaves-service-card"
                >
                  <div className="twoleaves-card-icon">
                    {service.icon}
                  </div>
                  <h3 className="twoleaves-card-title">{service.title}</h3>
                  <p className="twoleaves-card-desc">{service.desc}</p>
                  <div>
                    <a onClick={() => scrollToSection('contact-section')} className="twoleaves-card-link">
                      Learn More <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="twoleaves-services-footer">
            <a onClick={() => scrollToSection('contact-section')} className="twoleaves-footer-link">
              Explore All Services <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 6. "Discover" Filter Section */}
      <section className="twoleaves-discover">
        <div className="container">
          <h2 className="twoleaves-discover-title">
            Let's find the care that fits <br />
            <em>your</em> situation.
          </h2>

          <div className="twoleaves-pills-scroll">
            {filterPills.map((pill) => {
              const isActive = activeFilter === pill.id;
              return (
                <motion.button
                  key={pill.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => {
                    setActiveFilter(pill.id);
                    scrollToSection('services-section');
                  }}
                  className={`twoleaves-pill ${isActive ? 'active' : ''}`}
                >
                  {pill.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Origin / Mission Section — "Born in Colorado" Style */}
      <section id="origin-section" ref={originRef} className="twoleaves-origin">
        <motion.div 
          style={{ y: originY, backgroundImage: `url(https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1600&q=80)` }}
          className="twoleaves-origin-bg"
        />
        <div className="twoleaves-origin-overlay" />

        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="twoleaves-origin-title"
          >
            born in <br />
            <em>brisbane</em>
          </motion.h2>

          <p className="twoleaves-origin-desc">
            "Founded with a simple belief — that every Australian deserves quality care at home. Carezone Nursing Solutions has served Brisbane, the Gold Coast, and Tweed since 2015."
          </p>

          <div className="twoleaves-values-row">
            <div className="twoleaves-value-item">
              <span className="twoleaves-value-icon">🌿</span>
              <span className="twoleaves-value-label">Person-Centred Care</span>
            </div>
            <div className="twoleaves-value-item">
              <span className="twoleaves-value-icon">🤲</span>
              <span className="twoleaves-value-label">Dignity & Respect</span>
            </div>
            <div className="twoleaves-value-item">
              <span className="twoleaves-value-icon">✅</span>
              <span className="twoleaves-value-label">Registered & Trusted</span>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <motion.button 
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact-section')}
              className="btn-twoleaves btn-twoleaves-white"
            >
              Our Story →
            </motion.button>
          </div>
        </div>
      </section>

      {/* 8. Stats Counter Band */}
      <section className="twoleaves-stats">
        <div className="container">
          <div className="twoleaves-stats-grid">
            <div className="twoleaves-stat-item">
              <Counter value={500} suffix="+" />
              <span className="twoleaves-stat-label">Clients Served</span>
            </div>
            <div className="twoleaves-stat-item">
              <Counter value={3} suffix="" />
              <span className="twoleaves-stat-label">Regions</span>
            </div>
            <div className="twoleaves-stat-item">
              <Counter value={10} suffix="+" />
              <span className="twoleaves-stat-label">Years of Care</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Testimonials — "Loved by Tea People Everywhere" Style */}
      <section className="twoleaves-testimonials">
        <div className="container">
          <h2 className="twoleaves-testimonials-title">
            Loved by families <em>everywhere</em>.<br />
            Here's what they're saying.
          </h2>

          <div className="twoleaves-carousel-viewport">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -70 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                className="twoleaves-testimonial-card"
              >
                <div className="twoleaves-testimonial-stars">
                  {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                    <Star key={i} size={18} fill="#ffb03a" stroke="none" style={{ display: 'inline-block', marginRight: '3px' }} />
                  ))}
                </div>
                <p className="twoleaves-testimonial-quote">
                  "{testimonials[testimonialIndex].quote}"
                </p>
                <div className="twoleaves-testimonial-meta">
                  — {testimonials[testimonialIndex].author}, {testimonials[testimonialIndex].location}
                </div>
                <span className="twoleaves-testimonial-tag">
                  {testimonials[testimonialIndex].service}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="twoleaves-carousel-controls">
            <button 
              onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)} 
              className="twoleaves-carousel-btn"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="twoleaves-carousel-dots">
              {testimonials.map((_, idx) => (
                <span
                  key={idx}
                  className={`twoleaves-carousel-dot ${testimonialIndex === idx ? 'active' : ''}`}
                  onClick={() => setTestimonialIndex(idx)}
                />
              ))}
            </div>
            <button 
              onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)} 
              className="twoleaves-carousel-btn"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 10. Partners / Wholesale Band — "Cafe & Wholesale" Style */}
      <section className="twoleaves-partners">
        <div className="container">
          <div className="twoleaves-partners-grid">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="twoleaves-partners-content"
            >
              <h2 className="twoleaves-partners-title">
                Working with NDIS, DVA & Aged Care providers
              </h2>
              <p className="twoleaves-partners-text">
                Carezone partners with hospitals, discharge planners, and care coordinators across South East Queensland to ensure seamless at-home transitions.
              </p>
            </motion.div>

            <div className="twoleaves-partners-action">
              <motion.button 
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('contact-section')}
                className="btn-twoleaves btn-twoleaves-primary"
              >
                Partner With Us →
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Care Programs — "Barista Blends" Style */}
      <section className="twoleaves-programs">
        <div className="container">
          <span className="twoleaves-section-badge">Program Streams</span>
          <h2 className="twoleaves-section-title">Care Programs</h2>

          <div className="twoleaves-programs-scroll">
            {carePrograms.map((prog, idx) => (
              <div key={idx} className="twoleaves-program-card">
                <span className="twoleaves-program-badge">STREAM 0{idx+1}</span>
                <h3 className="twoleaves-program-title">{prog.title}</h3>
                <p className="twoleaves-program-tagline">{prog.tagline}</p>
                <div>
                  <a onClick={() => scrollToSection('contact-section')} className="twoleaves-program-link">
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Journal / Blog Strip — "Tea Journal" Style */}
      <section className="twoleaves-journal">
        <div className="container">
          <span className="twoleaves-section-badge">Care Journal</span>
          <h2 className="twoleaves-journal-title" style={{ textAlign: 'left', marginBottom: '3rem' }}>
            A community built on <em>compassion</em>. <br />
            Explore care tips and family guides.
          </h2>

          <motion.div 
            variants={cardListVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="twoleaves-journal-grid"
          >
            {journalArticles.map((art, idx) => (
              <motion.div 
                key={idx}
                variants={cardVariants}
                className="twoleaves-journal-card"
              >
                <img src={art.img} alt={art.title} className="twoleaves-journal-img" />
                <div className="twoleaves-journal-body">
                  <h3 className="twoleaves-journal-title">{art.title}</h3>
                  <div>
                    <a onClick={() => scrollToSection('contact-section')} className="twoleaves-journal-link">
                      Read More <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="twoleaves-services-footer" style={{ marginTop: '2.5rem' }}>
            <button onClick={() => scrollToSection('contact-section')} className="btn-twoleaves btn-twoleaves-secondary">
              Explore All Articles →
            </button>
          </div>
        </div>
      </section>

      {/* 13. Final CTA Section — "Great Tea. In Good Company." Style */}
      <section className="twoleaves-final-cta">
        <div className="container">
          <h2 className="twoleaves-final-title">
            Expert Care. <br />
            In Good <em>Hands</em>.
          </h2>
          <p className="twoleaves-final-sub">
            "Discover the people, purpose, and passion behind every visit."
          </p>
          <div className="twoleaves-final-actions">
            <motion.button 
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('origin-section')}
              className="btn-twoleaves btn-twoleaves-secondary"
            >
              About Us
            </motion.button>
            <motion.button 
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('contact-section')}
              className="btn-twoleaves btn-twoleaves-primary"
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </section>

      {/* 11. Contact Form Section (Shared styling & design elements) */}
      <section id="contact-section" className="twoleaves-services" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'start' }}>
            {/* Form Column */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid var(--border)', borderRadius: '20px', padding: '3rem 2rem', boxShadow: 'var(--shadow-md)' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Let's discuss your nursing needs</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
                Have an inquiry about NDIS packages or private nursing care? Send us a message, and a qualified coordinator will get back to you within 24 business hours.
              </p>

              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem 0' }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌿</div>
                  <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Message Sent Successfully!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Thank you for reaching out. A Carezone coordinator will contact you shortly.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="btn-twoleaves btn-twoleaves-secondary" 
                    style={{ marginTop: "2rem" }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }} htmlFor="t-name">Your Name</label>
                        <input 
                          id="t-name"
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. John Doe"
                          style={{ padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none' }}
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }} htmlFor="t-email">Email Address</label>
                        <input 
                          id="t-email"
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. john@example.com"
                          style={{ padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }} htmlFor="t-phone">Phone Number</label>
                      <input 
                        id="t-phone"
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. 0412 345 678"
                        style={{ padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }} htmlFor="t-message">How can we help you?</label>
                      <textarea 
                        id="t-message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Please describe the care services you require..."
                        rows={4}
                        style={{ padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }}
                      />
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                      <motion.button 
                        whileHover={{ y: -2, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        disabled={formStatus === 'loading'}
                        className="btn-twoleaves btn-twoleaves-primary"
                        style={{ width: '100%' }}
                      >
                        {formStatus === 'loading' ? 'Sending Message...' : 'Submit Inquiry'}
                      </motion.button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 14. Footer */}
      <footer className="twoleaves-footer">
        <div className="container">
          <div className="twoleaves-footer-grid">
            <div className="twoleaves-footer-brand">
              <h2 className="twoleaves-footer-logo">CAREZONE NURSING</h2>
              <p className="twoleaves-footer-tagline">
                "Care you can feel good about."
              </p>
              <div className="twoleaves-footer-socials">
                <a href="#" className="twoleaves-social-btn" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="twoleaves-social-btn" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" className="twoleaves-social-btn" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="twoleaves-footer-title">Services</h4>
              <ul className="twoleaves-footer-links">
                <li><a onClick={() => { scrollToSection('services-section'); setActiveFilter('home-nursing'); }} className="twoleaves-footer-link-item">Nursing Care</a></li>
                <li><a onClick={() => { scrollToSection('services-section'); setActiveFilter('personal-care'); }} className="twoleaves-footer-link-item">Personal Support</a></li>
                <li><a onClick={() => { scrollToSection('services-section'); setActiveFilter('social-support'); }} className="twoleaves-footer-link-item">Social Companion</a></li>
                <li><a onClick={() => { scrollToSection('services-section'); setActiveFilter('allied-health'); }} className="twoleaves-footer-link-item">Allied Health</a></li>
                <li><a onClick={() => { scrollToSection('services-section'); setActiveFilter('home-maintenance'); }} className="twoleaves-footer-link-item">Home Maintenance</a></li>
              </ul>
            </div>

            <div>
              <h4 className="twoleaves-footer-title">Quick Links</h4>
              <ul className="twoleaves-footer-links">
                <li><a onClick={() => scrollToSection('hero-section')} className="twoleaves-footer-link-item">Home</a></li>
                <li><a onClick={() => scrollToSection('origin-section')} className="twoleaves-footer-link-item">About Us</a></li>
                <li><a onClick={() => { scrollToSection('services-section'); setActiveFilter('ndis'); }} className="twoleaves-footer-link-item">NDIS Services</a></li>
                <li><a onClick={() => { scrollToSection('services-section'); setActiveFilter('dva'); }} className="twoleaves-footer-link-item">DVA Care</a></li>
                <li><a onClick={() => { scrollToSection('services-section'); setActiveFilter('aged-care'); }} className="twoleaves-footer-link-item">Aged Care</a></li>
                <li><a onClick={() => scrollToSection('contact-section')} className="twoleaves-footer-link-item">Contact</a></li>
              </ul>
            </div>

            <div className="twoleaves-footer-newsletter">
              <h4 className="twoleaves-footer-title">Stay Connected</h4>
              <p className="twoleaves-footer-newsletter-text">
                Get the latest health updates, support resources, and care guides delivered directly to your inbox.
              </p>
              
              {newsletterSuccess ? (
                <div style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "0.95rem" }}>
                  ✓ Subscription Successful!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="twoleaves-newsletter-form">
                  <motion.input 
                    type="email" 
                    placeholder="Your Email" 
                    required 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    onFocus={() => setNewsletterFocused(true)}
                    onBlur={() => setNewsletterFocused(false)}
                    animate={{ width: newsletterFocused ? 220 : 160 }}
                    transition={{ duration: 0.3 }}
                    className="twoleaves-newsletter-input" 
                  />
                  <button type="submit" className="twoleaves-newsletter-submit" aria-label="Subscribe">
                    <Check size={18} />
                  </button>
                </form>
              )}

              <div className="twoleaves-footer-contacts">
                <span>📞 1300 162 976</span>
                <span>✉️ admin@carezonenursing.com.au</span>
              </div>
            </div>
          </div>

          <div className="twoleaves-footer-bottom">
            <p>
              All rights reserved CAREZONE NURSING © 2026
            </p>
            <div className="twoleaves-footer-bottom-links">
              <a href="#" className="twoleaves-footer-bottom-link">Privacy Policy</a>
              <a href="#" className="twoleaves-footer-bottom-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating control bar to go back to Hub */}
      <div className="twoleaves-floating-hub">
        <motion.button 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => {
            window.scrollTo({ top: 0 });
            onSelect('hub');
          }}
          className="twoleaves-floating-hub-btn"
        >
          <ArrowLeft size={16} />
          <span>Designs Showcase</span>
        </motion.button>
      </div>
    </div>
  );
}

export default DesignTwo;
