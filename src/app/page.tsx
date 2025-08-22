import Link from 'next/link';
import {
  Scale,
  FileText,
  Brain,
  LineChart,
  Gavel,
  Sparkles,
  Eye,
  Search,
  ShieldCheck,
  Zap,
  Users,
  BarChart,
  Check,
  Mail,
  Phone,
  Linkedin,
  Twitter,
} from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Scale className="icon" />
            <span>LegalAI Pro</span>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#">API Docs</a></li>
          </ul>
          <div className="nav-toggle">
            <span />
            <span />
            <span />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Transform Your Legal Practice with{' '}
              <span className="gradient-text">AI-Powered Solutions</span>
            </h1>
            <p className="hero-subtitle">
              Streamline document processing with advanced OCR technology and get
              instant summaries of complex legal judgments. Save hours of manual
              work and focus on what matters most - your clients.
            </p>
            <div className="hero-buttons">
              <Link className="btn btn-primary" href="/app">
                Start Free Trial
              </Link>
              <button className="btn btn-secondary">Watch Demo</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">10,000+ </span>
                <span className="stat-label">Documents Processed</span>
              </div>
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Lawyers Trust Us</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Accuracy Rate</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <FileText className="icon" />
              <span>OCR Processing</span>
            </div>
            <div className="floating-card card-2">
              <Brain className="icon" />
              <span>AI Analysis</span>
            </div>
            <div className="floating-card card-3">
              <LineChart className="icon" />
              <span>Smart Summary</span>
            </div>
            <div className="main-visual">
              <div className="document-preview">
                <div className="document-header">
                  <div className="doc-icon">
                    <Gavel />
                  </div>
                  <div className="doc-info">
                    <h4>Supreme Court Judgment</h4>
                    <p>Case No. 2024-001</p>
                  </div>
                </div>
                <div className="document-content">
                  <div className="content-line" />
                  <div className="content-line short" />
                  <div className="content-line" />
                  <div className="content-line short" />
                  <div className="content-line" />
                </div>
                <div className="ai-highlight">
                  <Sparkles />
                  <span>AI Summary Generated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Our AI-Powered Services</h2>
            <p>
              Cutting-edge technology designed specifically for legal
              professionals
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <Eye />
              </div>
              <h3>Advanced OCR</h3>
              <p>
                Convert scanned legal documents, handwritten notes, and court
                papers into searchable digital text with 99% accuracy.
              </p>
              <ul className="service-features">
                <li><Check className="icon" /> Handwritten text recognition</li>
                <li><Check className="icon" /> Multi-language support</li>
                <li><Check className="icon" /> Batch processing</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <Brain />
              </div>
              <h3>Judgment Summarization</h3>
              <p>
                Get instant, comprehensive summaries of complex legal judgments
                with key points, precedents, and actionable insights.
              </p>
              <ul className="service-features">
                <li><Check className="icon" /> Key legal principles</li>
                <li><Check className="icon" /> Precedent identification</li>
                <li><Check className="icon" /> Citation tracking</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <Search />
              </div>
              <h3>Smart Search</h3>
              <p>
                Search through thousands of legal documents instantly with
                semantic understanding and context-aware results.
              </p>
              <ul className="service-features">
                <li><Check className="icon" /> Semantic search</li>
                <li><Check className="icon" /> Cross-reference detection</li>
                <li><Check className="icon" /> Relevance scoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose LegalAI Pro?</h2>
            <p>Built by legal professionals, for legal professionals</p>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <ShieldCheck />
              </div>
              <div className="feature-content">
                <h3>Bank-Grade Security</h3>
                <p>
                  Your sensitive legal documents are protected with
                  enterprise-level encryption and compliance with legal data
                  protection standards.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Zap />
              </div>
              <div className="feature-content">
                <h3>Lightning Fast</h3>
                <p>
                  Process documents in seconds, not hours. Our AI engine
                  delivers results 10x faster than manual processing.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <Users />
              </div>
              <div className="feature-content">
                <h3>Team Collaboration</h3>
                <p>
                  Share insights, annotations, and summaries with your legal
                  team seamlessly across all devices.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <BarChart />
              </div>
              <div className="feature-content">
                <h3>Analytics Dashboard</h3>
                <p>
                  Track your productivity, document processing metrics, and time
                  savings with detailed analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>Simple, Transparent Pricing</h2>
            <p>Choose the plan that fits your practice</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Starter</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">29</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li><Check className="icon" /> 100 documents/month</li>
                <li><Check className="icon" /> Basic OCR processing</li>
                <li><Check className="icon" /> Standard summaries</li>
                <li><Check className="icon" /> Email support</li>
              </ul>
              <button className="btn btn-outline">Get Started</button>
            </div>
            <div className="pricing-card featured">
              <div className="pricing-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Professional</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">79</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li><Check className="icon" /> 500 documents/month</li>
                <li><Check className="icon" /> Advanced OCR + AI</li>
                <li><Check className="icon" /> Detailed summaries</li>
                <li><Check className="icon" /> Priority support</li>
                <li><Check className="icon" /> Team collaboration</li>
              </ul>
              <button className="btn btn-primary">Get Started</button>
            </div>
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Enterprise</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">199</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li><Check className="icon" /> Unlimited documents</li>
                <li><Check className="icon" /> Custom AI models</li>
                <li><Check className="icon" /> API access</li>
                <li><Check className="icon" /> Dedicated support</li>
                <li><Check className="icon" /> Custom integrations</li>
              </ul>
              <button className="btn btn-outline">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Ready to Transform Your Practice?</h2>
              <p>
                Join thousands of legal professionals who are already saving
                hours every week with our AI-powered solutions.
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <Mail className="icon" />
                  <div>
                    <h4>Email Us</h4>
                    <p>team.legal.ai@gmail.com</p>
                  </div>
                </div>
                <div className="contact-method">
                  <Phone className="icon" />
                  <div>
                    <h4>Call Us</h4>
                    <p>8637373214</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form id="contact-form">
                <div className="form-group">
                  <input type="text" name="name" placeholder="Full Name" required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Email Address" required />
                </div>
                <div className="form-group">
                  <input type="text" name="lawfirm" placeholder="Law Firm Name" />
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Tell us about your needs..." rows={4}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Get Started Today
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <Scale className="icon" />
                <span>LegalAI Pro</span>
              </div>
              <p>
                Empowering legal professionals with AI-driven document
                processing and analysis solutions.
              </p>
              <div className="social-links">
                <a href="#"><Linkedin /></a>
                <a href="https://x.com/LegalAI_team"><Twitter /></a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Documentation</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 LegalAI Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}