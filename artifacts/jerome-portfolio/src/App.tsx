import { useEffect, useMemo, useState, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { projects, type PortfolioProject, luckyImages } from './data/projects';

const filters = ['All', 'Advertising', 'Social Media', 'Branding', 'Marketing', 'Posters'] as const;

function PortfolioImage({ src, alt, title, className = '' }: { src: string; alt: string; title: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`image-frame ${className}`}>
      {!failed ? (
        <img
          className="project-image"
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          data-testid={`img-project-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
        />
      ) : (
        <div className="image-placeholder" role="img" aria-label={`${title} — image preview unavailable`}>
          <span>{title}</span>
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: PortfolioProject; onOpen: (project: PortfolioProject) => void }) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(project);
    }
  };
  return (
    <article
      className={`project-card ${project.featured ? 'featured-card' : ''}`}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
      aria-label={`View project: ${project.title}`}
      data-testid={`card-project-${project.id}`}
    >
      <div className="project-image-wrap">
        <PortfolioImage src={project.thumbnail} title={project.title} alt={`${project.title} portfolio artwork`} />
        <div className="project-overlay" aria-hidden="true">
          <span>View project</span>
          <b><ArrowUpRight size={19} strokeWidth={1.5} /></b>
        </div>
      </div>
      <div className="project-meta">
        <div>
          <h3>{project.title}</h3>
          <span className="project-category">{project.category}</span>
        </div>
        <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={19} strokeWidth={1.5} /></span>
      </div>
    </article>
  );
}

function ProjectDetail({ project, onClose }: { project: PortfolioProject; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()} data-testid="dialog-project">
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title">
        <button className="modal-close" onClick={onClose} aria-label="Close project details" data-testid="button-close-project">×</button>
        <span className="eyebrow">Selected work</span>
        <h2 id="project-dialog-title">{project.title}</h2>
        <div className="modal-category">{project.category}</div>
        <p className="modal-role"><strong>Role</strong> &nbsp;{project.role}</p>
        {project.description ? (
          <>
            <p className="modal-description">{project.description}</p>
            <p className="modal-description"><strong>Focus</strong><br />Brand Visuals • Marketing Collateral • Social Media • Promotional Design</p>
          </>
        ) : (
          <p className="modal-description">Explore this project on Behance for the full project presentation.</p>
        )}
        <div className="modal-images">
          {(project.images ?? [project.thumbnail]).map((image, index) => (
            <PortfolioImage key={image} src={image} title={project.title} alt={`${project.title} project image ${index + 1}`} />
          ))}
        </div>
        <div className="modal-actions">
          <a href="#contact" className="button" onClick={onClose} data-testid="link-start-similar-project">Start a Similar Project <ArrowRight size={16} /></a>
          <a href={project.behanceUrl} target="_blank" rel="noreferrer" className="button button-outline" data-testid="link-project-behance">View on Behance <ArrowUpRight size={16} /></a>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [compactNav, setCompactNav] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const visibleProjects = useMemo(
    () => activeFilter === 'All' ? projects : projects.filter((project) => project.tags.includes(activeFilter)),
    [activeFilter],
  );

  useEffect(() => {
    const onScroll = () => setCompactNav(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const handleInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const company = String(data.get('company') ?? '');
    const type = String(data.get('projectType') ?? '');
    const timeline = String(data.get('timeline') ?? '');
    const details = String(data.get('details') ?? '');
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany / Brand: ${company}\nProject Type: ${type}\nTimeline: ${timeline}\n\nProject Details:\n${details}`,
    );
    setDraftReady(true);
    window.location.href = `mailto:jela.creatives@gmail.com?subject=${subject}&body=${body}`;
  };

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="site-shell">
      <header className={`topbar ${compactNav ? 'compact' : ''}`}>
        <div className="container nav-inner">
          <a className="wordmark" href="#home" onClick={closeMenu} data-testid="link-home">
            JEROME LACIERAS<small>GRAPHIC DESIGNER</small>
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu} data-testid={`link-nav-${link.label.toLowerCase()}`}>{link.label}</a>
            ))}
            <a className="button" href="#contact" onClick={closeMenu} data-testid="link-nav-inquiry">Let's Work Together <ArrowRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="availability"><i aria-hidden="true" />Available for brands &amp; companies</div>
              <h1>Graphic Designer creating visuals that make <em>brands stand out.</em></h1>
              <p>I create social media ads, marketing creatives, brand visuals, and digital content that help brands communicate clearly and look professionally built.</p>
              <div className="hero-actions">
                <a className="button" href="#work" data-testid="link-hero-work">View My Work <ArrowRight size={16} /></a>
                <a className="text-link" href="#contact" data-testid="link-hero-contact">Let's Work Together <span><ArrowUpRight size={15} /></span></a>
              </div>
              <div className="hero-proof">5+ Years Experience &nbsp;·&nbsp; 20+ Clients &nbsp;·&nbsp; Freelance &amp; Corporate Experience</div>
            </div>
            <div className="hero-visual" aria-label="Editorial graphic composition">
              <div className="hero-art">
                <div className="hero-art-top"><span>Visual communication</span><span>01 — 04</span></div>
                <div className="hero-art-title">Make the<br />message<br />matter.</div>
                <span className="hero-art-mark">JL</span>
                <div className="hero-art-bottom"><span>Jerome Lacieras</span><span>Design / 2025</span></div>
              </div>
              <span className="hero-visual-label">Independent graphic designer · Batangas City</span>
            </div>
          </div>
        </section>

        <section className="credibility" aria-label="Experience at a glance" data-testid="section-credibility">
          <div className="container cred-grid">
            <div className="cred-item"><strong>5+ Years</strong><span>Years of Experience</span></div>
            <div className="cred-item"><strong>20+ Clients</strong><span>Local &amp; International Clients</span></div>
            <div className="cred-item"><strong>Freelance + Corporate</strong><span>Experience</span></div>
            <div className="cred-item"><strong>Digital + Print</strong><span>Design Experience</span></div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <div className="work-topline">
              <div className="section-heading">
                <span className="eyebrow">Selected work</span>
                <h2>Selected Work</h2>
                <p>A curated selection of advertising, branding, social media, and marketing design projects.</p>
              </div>
              <a className="text-link" href="https://www.behance.net/jelacierasgfx" target="_blank" rel="noreferrer" data-testid="link-all-behance">More on Behance <span><ArrowUpRight size={15} /></span></a>
            </div>
            <div className="filters" role="group" aria-label="Filter portfolio projects">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  data-testid={`button-filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                >{filter}</button>
              ))}
            </div>
            <div className="projects-grid" data-testid="grid-projects">
              {visibleProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}
            </div>
            <div className="work-footer">
              <a href="https://www.behance.net/jelacierasgfx" target="_blank" rel="noreferrer" className="button button-outline" data-testid="link-work-profile">Explore portfolio on Behance <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="case-study" aria-labelledby="case-title">
          <div className="container">
            <div className="case-head">
              <div>
                <span className="eyebrow">Featured case study</span>
                <h2 id="case-title">Brand Visuals for Lucky World Online (iGaming Brand)</h2>
              </div>
              <p>A collection of marketing and brand visuals created for Lucky World Online, covering promotional graphics, social media creatives, and marketing collateral while maintaining a consistent visual identity and PAGCOR-compliant communication.</p>
            </div>
            <div className="case-facts">
              <div className="case-fact"><span>Role</span><strong>Graphic Designer</strong></div>
              <div className="case-fact"><span>Focus</span><strong>Brand Visuals • Marketing Collateral • Social Media • Promotional Design</strong></div>
            </div>
            <div className="case-gallery">
              {luckyImages.map((image, index) => (
                <figure key={image}>
                  <PortfolioImage src={image} title="Lucky World Online" alt={`Lucky World Online brand visual ${index + 1}`} />
                </figure>
              ))}
            </div>
            <div className="case-bottom">
              <h3>Need visuals for your brand?</h3>
              <div>
                <a href="#contact" className="button button-light" data-testid="link-case-contact">Let's Work Together <ArrowRight size={15} /></a>
                <a href="https://www.behance.net/gallery/256501323/Brand-Visuals-for-Lucky-World-Online-(iGaming-Brand)" target="_blank" rel="noreferrer" className="text-link" style={{ color: 'white' }} data-testid="link-case-behance">View on Behance <span><ArrowUpRight size={15} /></span></a>
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="services-intro">
              <div className="section-heading">
                <span className="eyebrow">Ways I can help</span>
                <h2>What I Can Help You Design</h2>
                <p>Design support for brands, businesses, marketing teams, and companies that need strong visual communication.</p>
              </div>
            </div>
            <div className="services-grid">
              <article className="service-card"><span className="service-no">01 / DIGITAL</span><h3>Social Media &amp; Ad Creatives</h3><p>Static ads, promotional graphics, social media posts, campaign visuals, and digital creatives.</p></article>
              <article className="service-card"><span className="service-no">02 / IDENTITY</span><h3>Branding &amp; Visual Identity</h3><p>Logo design, visual direction, brand assets, and simple brand guidelines.</p></article>
              <article className="service-card"><span className="service-no">03 / CAMPAIGNS</span><h3>Marketing &amp; Promotional Design</h3><p>Campaign materials, promotional graphics, posters, event materials, and marketing collateral.</p></article>
              <article className="service-card"><span className="service-no">04 / DESIGN</span><h3>Graphic Design</h3><p>Layouts, typography, presentations, print materials, and custom visual design.</p></article>
              <article className="service-card"><span className="service-no">05 / CONTENT</span><h3>Content Design</h3><p>Digital content, Canva templates, creative assets, and branded content systems.</p></article>
              <article className="service-card"><span className="service-no">06 / MULTIMEDIA</span><h3>Basic Multimedia Design</h3><p>Basic video editing, short-form creative assets, and motion-oriented content.</p></article>
            </div>
            <div className="service-cta">
              <div><h3>Need design support for your brand?</h3><p>Whether you need ongoing creative support or a specific design project, let's discuss what you're working on.</p></div>
              <a className="button" href="#contact" data-testid="link-services-contact">Start a Project <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="section why-section">
          <div className="container why-layout">
            <div className="why-title">
              <span className="eyebrow">A thoughtful approach</span>
              <h2>Design that looks good — and communicates clearly.</h2>
              <p>Strong creative starts with clarity: what needs to be said, who it is for, and how it should feel.</p>
            </div>
            <div className="why-list">
              <article className="why-item"><span className="why-number">01</span><div><h3>Design-first thinking</h3><p>Strong focus on hierarchy, composition, typography, layout, and visual clarity.</p></div></article>
              <article className="why-item"><span className="why-number">02</span><div><h3>Marketing-aware design</h3><p>Design decisions are made with the message, audience, offer, and communication goal in mind.</p></div></article>
              <article className="why-item"><span className="why-number">03</span><div><h3>Flexible creative support</h3><p>Experience working across freelance and corporate environments, adapting to different briefs, industries, and workflows.</p></div></article>
              <article className="why-item"><span className="why-number">04</span><div><h3>Modern creative workflow</h3><p>Uses modern design and AI-assisted tools for ideation and asset generation, while refining the final output to maintain a polished, intentional look.</p></div></article>
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">From first note to final files</span>
              <h2>A clear creative process.</h2>
              <p>A straightforward path from your initial brief to ready-to-use design assets.</p>
            </div>
            <div className="process-grid">
              <article className="process-step"><span>01</span><h3>Brief</h3><p>We discuss the project, goals, requirements, references, and timeline.</p></article>
              <article className="process-step"><span>02</span><h3>Concept</h3><p>I develop the visual direction and design concepts based on the brief.</p></article>
              <article className="process-step"><span>03</span><h3>Design</h3><p>I refine the selected direction and develop the final creative assets.</p></article>
              <article className="process-step"><span>04</span><h3>Delivery</h3><p>Final approved files are prepared in the required formats.</p></article>
            </div>
            <div className="process-cta"><strong>Have a project in mind?</strong><a className="text-link" href="#contact" data-testid="link-process-contact">Let's Talk <span><ArrowRight size={15} /></span></a></div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="container about-layout">
            <div className="profile-card" data-testid="card-profile">
              <div className="profile-monogram" aria-hidden="true">JL</div>
              <div className="profile-main"><h3>Jerome Lacieras</h3><p>Graphic Designer · Batangas City, Philippines</p></div>
              <div className="profile-stats">
                <div><strong>5+ Years</strong><span>Experience</span></div>
                <div><strong>20+</strong><span>Local &amp; International Clients</span></div>
                <div><strong>Freelance + Corporate</strong><span>Experience</span></div>
                <div><strong>Multimedia Designer</strong><span>Current Role</span></div>
                <div><strong>Computer Engineering</strong><span>Graduate</span></div>
              </div>
            </div>
            <div className="about-copy">
              <span className="eyebrow">A little about me</span>
              <h2>Hi, I'm Jerome.</h2>
              <h3>Graphic Designer creating visuals for brands, businesses, and marketing campaigns.</h3>
              <p>I'm Jerome Lacieras, a Graphic Designer with 5+ years of experience creating visual content across digital and print platforms. My experience spans freelance and corporate environments, allowing me to work across different industries, creative briefs, and production requirements.</p>
              <p>I specialize in social media design, advertising creatives, branding, marketing visuals, and visual communication. I combine strong design fundamentals with modern creative tools to create visuals that are clear, polished, and purposeful.</p>
            </div>
          </div>
        </section>

        <section className="tools-section" aria-labelledby="tools-title">
          <div className="container tools-layout">
            <div className="tools-title"><span className="eyebrow">My toolkit</span><h2 id="tools-title">Tools for the work.</h2><p>A flexible mix of design, content, and production tools.</p></div>
            <div className="tools-main" data-testid="list-tools">
              {['Photoshop', 'Illustrator', 'Canva', 'Figma'].map((tool) => <div key={tool} className="tool-primary" data-testid={`text-tool-${tool.toLowerCase()}`}>{tool}</div>)}
              <div className="tools-secondary">
                {['CapCut', 'Premiere Pro', 'WordPress', 'HTML/CSS', 'ChatGPT', 'AI Creative Tools'].map((tool) => <span key={tool} data-testid={`text-tool-support-${tool.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{tool}</span>)}
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-inner">
            <div>
              <span className="eyebrow">Let's make something clear</span>
              <h2>Have a brand that needs better visuals?</h2>
              <p>Let's create design that looks professional, communicates clearly, and gives your brand a stronger visual presence.</p>
            </div>
            <div className="final-actions">
              <a className="button button-light" href="#contact" data-testid="link-final-start">Start a Project <ArrowRight size={15} /></a>
              <a className="button button-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,.4)' }} href="#work" data-testid="link-final-work">View My Work</a>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy">
              <span className="eyebrow">Start a conversation</span>
              <h2>Let's work together.</h2>
              <p>Tell me what you're working on, what you need designed, and your timeline. I'll get back to you with the next steps.</p>
              <div className="contact-links">
                <a className="contact-link" href="mailto:jela.creatives@gmail.com" data-testid="link-contact-email"><span><small>Email</small><strong>jela.creatives@gmail.com</strong></span><b><ArrowUpRight size={17} /></b></a>
                <a className="contact-link" href="https://www.linkedin.com/in/jeromelacieras" target="_blank" rel="noreferrer" data-testid="link-contact-linkedin"><span><small>LinkedIn</small><strong>linkedin.com/in/jeromelacieras</strong></span><b><ArrowUpRight size={17} /></b></a>
                <a className="contact-link" href="https://www.behance.net/jelacierasgfx" target="_blank" rel="noreferrer" data-testid="link-contact-behance"><span><small>Behance</small><strong>behance.net/jelacierasgfx</strong></span><b><ArrowUpRight size={17} /></b></a>
              </div>
            </div>
            <form className="inquiry-form" onSubmit={handleInquiry} data-testid="form-inquiry">
              <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" placeholder="Your name" required data-testid="input-name" /></div>
              <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required data-testid="input-email" /></div>
              <div className="field full"><label htmlFor="company">Company / Brand</label><input id="company" name="company" autoComplete="organization" placeholder="Company or brand name" required data-testid="input-company" /></div>
              <div className="field"><label htmlFor="projectType">Project Type</label><select id="projectType" name="projectType" required defaultValue="" data-testid="select-project-type"><option value="" disabled>Select a project type</option><option>Social Media / Ads</option><option>Branding</option><option>Logo Design</option><option>Marketing Materials</option><option>Poster / Event Design</option><option>Content Design</option><option>Other</option></select></div>
              <div className="field"><label htmlFor="timeline">Timeline</label><select id="timeline" name="timeline" required defaultValue="" data-testid="select-timeline"><option value="" disabled>Select a timeline</option><option>ASAP</option><option>Within 1–2 weeks</option><option>Within a month</option><option>Flexible</option></select></div>
              <div className="field full"><label htmlFor="details">Project Details</label><textarea id="details" name="details" placeholder="Tell me a little about what you need designed." required minLength={10} data-testid="input-project-details" /></div>
              <div className="form-submit">
                <button type="submit" className="button" data-testid="button-send-inquiry">Send Project Inquiry <ArrowRight size={15} /></button>
                <p className="form-note">This opens a prefilled email draft in your email app. Review it and press send to contact Jerome.</p>
              </div>
              {draftReady && <p className="form-status" role="status" data-testid="status-mail-draft">Your email draft is ready. Send it from your email app to complete your inquiry.</p>}
            </form>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-name">JEROME LACIERAS</span>
          <span>Graphic Designer · Batangas City, Philippines</span>
          <div className="footer-links">
            <a href="mailto:jela.creatives@gmail.com" data-testid="link-footer-email">Email</a>
            <a href="https://www.linkedin.com/in/jeromelacieras" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin">LinkedIn</a>
            <a href="https://www.behance.net/jelacierasgfx" target="_blank" rel="noreferrer" data-testid="link-footer-behance">Behance</a>
            <a href="#home" data-testid="link-back-to-top">Back to top ↑</a>
          </div>
        </div>
      </footer>
      {selectedProject && <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}

export default App;
