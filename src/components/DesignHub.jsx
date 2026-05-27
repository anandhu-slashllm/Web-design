import React from 'react';
import { motion } from 'framer-motion';
import { Palette, ExternalLink, Lock, CheckCircle2, Layout, Sparkles } from 'lucide-react';

function DesignHub({ onSelect }) {
  const proposals = [
    {
      id: 'design1',
      title: 'Design 1: Editorial Teal',
      badge: 'ACTIVE & TESTABLE',
      badgeColor: 'rgba(45, 184, 158, 0.15)',
      badgeTextColor: '#2db89e',
      description: 'Our approved, official visual identity. Combines high-contrast editorial typography, organic SVG leaf motifs, HSL-balanced medical teals, and structured, elegant layout sections. Delivers a clean, trustworthy clinical feel.',
      fonts: ['Bebas Neue', 'DM Sans'],
      colors: ['#2db89e', '#1a3a35', '#f4f9f8'],
      isActive: true,
      features: ['Large Bebas Neue Headlines', 'Organic SVG Leaf Animations', 'Interactive Region Selector', 'Editorial Scroll Effects']
    },
    {
      id: 'design2',
      title: 'Design 2: Editorial Sage',
      badge: 'ACTIVE & TESTABLE',
      badgeColor: 'rgba(74, 171, 109, 0.15)',
      badgeTextColor: '#4aab6d',
      description: 'An elegant, nature-inspired design with a soft sage green and warm cream palette. Replaces hard clinical lines with organic serif italic text, horizontal smooth-scrolling service grids, and beautiful viewport-driven animations.',
      fonts: ['Playfair Display', 'DM Sans'],
      colors: ['#4aab6d', '#1e3a2f', '#f7f5f0'],
      isActive: true,
      features: ['Playfair Display Typography', 'Alternating Cream & Sage Rhythm', 'Interactive Service Filter Bar', 'Auto-scrolling Testimonials Carousel']
    },
    {
      id: 'design3',
      title: 'Design 3: Playful Soft Coral',
      badge: 'ACTIVE & TESTABLE',
      badgeColor: 'rgba(255, 111, 89, 0.15)',
      badgeTextColor: '#ff6f59',
      description: 'A warm, approachable, family-first aesthetic with soft peach, coral, and forest green accents. Features highly rounded shapes (32px+ radius), bouncy physics animations, organic blob layers, and friendly typography. Ideal for compassionate, personal eldercare branding.',
      fonts: ['Cabinet Grotesk', 'Fraunces'],
      colors: ['#ff6f59', '#ffb03a', '#fffaf4'],
      isActive: true,
      features: ['Super-rounded UI Containers', 'Peach & Warm Cream Palette', 'Bouncy Animation Physics', 'Friendly Rounded Elements']
    }
  ];

  // Container motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Card motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 18 } }
  };

  return (
    <div className="theme-hub design-hub-wrapper">
      {/* Background patterns */}
      <div className="hub-mesh-glow" />
      <div className="grain-overlay" />
      
      <div className="container hub-container">
        {/* Hub Header */}
        <header className="hub-header">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hub-title-container"
          >
            <div className="hub-badge-pill">
              <Palette size={14} className="icon-pulse" />
              <span>Carezone Design Lab</span>
            </div>
            <h1 className="hub-title">
              Interactive <span>Design</span> Showcase
            </h1>
            <p className="hub-subtitle">
              Evaluate different visual languages, typography choices, and user experience layouts in real time. Select a proposal below to test its interactive capabilities.
            </p>
          </motion.div>
        </header>

        {/* Proposals Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="hub-grid"
        >
          {proposals.map((proposal) => (
            <motion.div
              key={proposal.id}
              variants={cardVariants}
              whileHover={proposal.isActive ? { y: -8, boxShadow: "0 25px 50px -12px rgba(45, 184, 158, 0.25)" } : {}}
              className={`hub-card ${proposal.isActive ? 'active-card' : 'disabled-card'}`}
            >
              {/* Badge */}
              <div className="card-top-row">
                <span 
                  className="card-badge" 
                  style={{ backgroundColor: proposal.badgeColor, color: proposal.badgeTextColor }}
                >
                  {proposal.badge}
                </span>
                
                {proposal.isActive ? (
                  <CheckCircle2 size={20} className="icon-active" />
                ) : (
                  <Lock size={18} className="icon-locked" />
                )}
              </div>

              {/* Info */}
              <div className="card-body">
                <h3 className="card-title">{proposal.title}</h3>
                <p className="card-description">{proposal.description}</p>
                
                {/* Visual spec elements */}
                <div className="card-spec-section">
                  <div className="spec-item">
                    <span className="spec-label">Typography</span>
                    <div className="spec-font-tags">
                      {proposal.fonts.map((f, i) => (
                        <span key={i} className="font-tag" style={{ fontFamily: i === 0 ? 'var(--font-display)' : 'var(--font-body)' }}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="spec-item">
                    <span className="spec-label">Colors</span>
                    <div className="spec-color-row">
                      {proposal.colors.map((c, i) => (
                        <span 
                          key={i} 
                          className="color-dot" 
                          style={{ backgroundColor: c }} 
                          title={c}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="card-features-section">
                  <span className="spec-label">Key Highlights</span>
                  <ul className="features-list">
                    {proposal.features.map((feat, i) => (
                      <li key={i}>
                        <span className="feature-bullet">•</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA Action footer */}
              <div className="card-footer">
                {proposal.isActive ? (
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onSelect(proposal.id)}
                    className="btn-hub-primary"
                  >
                    <span>Launch {proposal.id === 'design1' ? 'Design 1' : proposal.id === 'design2' ? 'Design 2' : 'Design 3'}</span>
                    <ExternalLink size={16} />
                  </motion.button>
                ) : (
                  <button className="btn-hub-disabled" disabled>
                    <span>Coming Soon</span>
                    <Lock size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer / Instructions */}
        <footer className="hub-footer">
          <p>
            <Sparkles size={14} style={{ color: '#2db89e', marginRight: '0.5rem', verticalAlign: 'middle', display: 'inline' }} />
            Select and review. Feel free to navigate back to this Showcase Hub at any time using the floating control bar.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default DesignHub;
