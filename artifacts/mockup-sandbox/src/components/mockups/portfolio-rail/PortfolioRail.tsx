import { useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import './portfoliorail.css';

const projectFilters = ['All', 'Advertising', 'Social Media', 'Branding', 'Marketing', 'Posters'] as const;
type ProjectFilter = (typeof projectFilters)[number];

const portfolioProjects = [
  {
    id: 'lucky-world',
    title: 'Brand Visuals for Lucky World Online (iGaming Brand)',
    category: 'Branding' as const,
    tags: ['Branding', 'Marketing', 'Advertising', 'Social Media'] as ProjectFilter[],
    image: 'https://mir-s3-cdn-cf.behance.net/projects/404/bb82e1256501323.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    url: 'https://www.behance.net/gallery/256501323/Brand-Visuals-for-Lucky-World-Online-(iGaming-Brand)',
    featured: true,
  },
  {
    id: 'axis-dance',
    title: 'Social Media Posters for AXIS Dance Studio',
    category: 'Social Media' as const,
    tags: ['Social Media', 'Posters', 'Marketing'] as ProjectFilter[],
    image: 'https://mir-s3-cdn-cf.behance.net/projects/404/a0fb06249092299.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    url: 'https://www.behance.net/gallery/249092299/Social-Media-Posters-for-AXIS-Dance-Studio',
    featured: true,
  },
  {
    id: 'wrapped-ads',
    title: '2025 Wrapped: Ad Designs',
    category: 'Advertising' as const,
    tags: ['Advertising', 'Marketing', 'Social Media'] as ProjectFilter[],
    image: 'https://mir-s3-cdn-cf.behance.net/projects/404/0e8289241547307.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    url: 'https://www.behance.net/gallery/241547307/2025-Wrapped-Ad-Designs',
    featured: true,
  },
  {
    id: 'petbloom',
    title: 'PetBloom Ad Images',
    category: 'Advertising' as const,
    tags: ['Advertising', 'Marketing'] as ProjectFilter[],
    image: 'https://mir-s3-cdn-cf.behance.net/projects/404/db11b5223100637.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    url: 'https://www.behance.net/gallery/223100637/PetBloom-Ad-Images',
    featured: true,
  },
  {
    id: 'pixra',
    title: 'Pixra Creatives — Web Design and Logo Project',
    category: 'Branding' as const,
    tags: ['Branding', 'Marketing'] as ProjectFilter[],
    image: 'https://mir-s3-cdn-cf.behance.net/projects/404/fb12e2212944011.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    url: 'https://www.behance.net/gallery/212944011/Pixra-Creatives-Web-Design-and-Logo-Project',
    featured: true,
  },
  {
    id: 'wrapped-posters',
    title: '2025 Wrapped: Poster Designs',
    category: 'Posters' as const,
    tags: ['Posters', 'Marketing'] as ProjectFilter[],
    image: 'https://mir-s3-cdn-cf.behance.net/projects/404/20c78d241546829.Y3JvcCwyNDI0LDE4OTYsMCww.jpg',
    url: 'https://www.behance.net/gallery/241546829/2025-Wrapped-Poster-Designs',
    featured: false,
  },
];

const services = [
  ['01', 'Social Media & Ad Creatives', 'Static ads, promotional graphics, social media posts, campaign visuals, and digital creatives.'],
  ['02', 'Branding & Visual Identity', 'Logo design, visual direction, brand assets, and simple brand guidelines.'],
  ['03', 'Marketing & Promotional Design', 'Campaign materials, promotional graphics, posters, event materials, and marketing collateral.'],
  ['04', 'Graphic Design', 'Layouts, typography, presentations, print materials, and custom visual design.'],
  ['05', 'Content Design', 'Digital content, Canva templates, creative assets, and branded content systems.'],
  ['06', 'Basic Multimedia Design', 'Basic video editing, short-form creative assets, and motion-oriented content.'],
];

const approach = [
  ['01', 'Design-first thinking', 'Strong focus on hierarchy, composition, typography, layout, and visual clarity.'],
  ['02', 'Marketing-aware design', 'Design decisions are made with the message, audience, offer, and communication goal in mind.'],
  ['03', 'Flexible creative support', 'Experience across freelance and corporate environments, adapting to different briefs, industries, and workflows.'],
  ['04', 'Modern creative workflow', 'Modern design and AI-assisted tools support ideation; every final output is refined to feel polished and intentional.'],
];

const process = [
  ['01', 'Brief', 'We discuss the project, goals, requirements, references, and timeline.'],
  ['02', 'Concept', 'I develop the visual direction and design concepts based on the brief.'],
  ['03', 'Design', 'I refine the selected direction and develop the final creative assets.'],
  ['04', 'Delivery', 'Final approved files are prepared in the required formats.'],
];

function ProjectLink({ project, index }: { project: (typeof portfolioProjects)[number]; index: number }) {
  return (
    <a
      className={`rail-project ${project.featured ? 'rail-project--feature' : ''}`}
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`View ${project.title} on Behance`}
    >
      <div className="rail-project__visual">
        <div className="rail-project__fallback">{project.title}</div>
        <img src={project.image} alt={`${project.title} portfolio artwork`} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
        <span className="rail-project__index">{String(index + 1).padStart(2, '0')}</span>
        <span className="rail-project__open"><ArrowUpRight size={18} strokeWidth={1.6} /></span>
      </div>
      <div className="rail-project__caption">
        <h3>{project.title}</h3>
        <span>{project.category}</span>
      </div>
    </a>
  );
}

function PortfolioRail() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [draftReady, setDraftReady] = useState(false);
  const visibleProjects = portfolioProjects.filter((project) => (
    activeFilter === 'All' || project.tags.includes(activeFilter)
  ));

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const company = String(formData.get('company') ?? '');
    const type = String(formData.get('projectType') ?? '');
    const timeline = String(formData.get('timeline') ?? '');
    const details = String(formData.get('details') ?? '');
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany / Brand: ${company}\nProject Type: ${type}\nTimeline: ${timeline}\n\nProject Details:\n${details}`);
    setDraftReady(true);
    window.location.href = `mailto:jela.creatives@gmail.com?subject=${subject}&body=${body}`;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="jl-rail">
      <aside className="jl-rail__aside">
        <a className="jl-rail__brand" href="#home" onClick={closeMenu}>
          <span className="jl-rail__monogram">JL</span>
          <span className="jl-rail__brand-name">JEROME<br />LACIERAS</span>
          <span className="jl-rail__brand-title">GRAPHIC DESIGNER</span>
        </a>
        <button className="jl-rail__toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`jl-rail__nav ${menuOpen ? 'is-open' : ''}`} aria-label="Portfolio sections">
          <span className="jl-rail__nav-label">INDEX <i>01—05</i></span>
          <a href="#work" onClick={closeMenu}><b>01</b> Selected work</a>
          <a href="#services" onClick={closeMenu}><b>02</b> Services</a>
          <a href="#approach" onClick={closeMenu}><b>03</b> Approach</a>
          <a href="#about" onClick={closeMenu}><b>04</b> About Jerome</a>
          <a href="#contact" onClick={closeMenu}><b>05</b> Contact</a>
        </nav>
        <div className="jl-rail__aside-bottom">
          <span className="jl-rail__availability"><i /> Available for brands &amp; companies</span>
          <span className="jl-rail__location">BATANGAS CITY<br />PHILIPPINES</span>
          <a className="jl-rail__email" href="mailto:jela.creatives@gmail.com">Send an inquiry <ArrowUpRight size={14} /></a>
        </div>
      </aside>

      <main className="jl-rail__main" id="home">
        <header className="jl-rail__topline">
          <span>Independent graphic designer</span>
          <span className="jl-rail__edition">PORTFOLIO / 2025</span>
        </header>

        <section className="jl-rail__hero" aria-labelledby="rail-hero-title">
          <div className="jl-rail__hero-copy">
            <span className="jl-rail__eyebrow"><i /> Visual communication, with a point of view</span>
            <h1 id="rail-hero-title">Graphic Designer<br />creating visuals<br />that make<br /><em>brands stand out.</em></h1>
            <p>I create social media ads, marketing creatives, brand visuals, and digital content that help brands communicate clearly and look professionally built.</p>
            <div className="jl-rail__hero-actions">
              <a className="jl-rail__button" href="#work">Explore selected work <ArrowRight size={16} /></a>
              <a className="jl-rail__simple-link" href="#contact">Start a project <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="jl-rail__poster" aria-label="Graphic composition: Make the message matter">
            <div className="jl-rail__poster-orbit jl-rail__poster-orbit--outer" />
            <div className="jl-rail__poster-orbit jl-rail__poster-orbit--inner" />
            <div className="jl-rail__poster-top"><span>VISUAL COMMUNICATION</span><span>01—04</span></div>
            <div className="jl-rail__poster-copy">Make the<br /><i>message</i><br />matter<span>.</span></div>
            <div className="jl-rail__poster-stamp">JL<br /><small>DESIGN</small></div>
            <div className="jl-rail__poster-bottom"><span>Jerome Lacieras</span><span>Design / 2025</span></div>
            <span className="jl-rail__poster-caption">An independent practice<br />in clear visual thinking</span>
          </div>
          <div className="jl-rail__credentials" aria-label="Experience at a glance">
            <div><strong>5<span>+</span></strong><small>Years of experience</small></div>
            <div><strong>20<span>+</span></strong><small>Local &amp; international clients</small></div>
            <div><strong>Freelance<br />+ Corporate</strong><small>Creative experience</small></div>
            <div><strong>Digital<br />+ Print</strong><small>Design experience</small></div>
          </div>
          <a className="jl-rail__scroll" href="#work"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </section>

        <section className="jl-rail__work" id="work">
          <div className="jl-rail__section-head">
            <div>
              <span className="jl-rail__eyebrow">01 / Selected work</span>
              <h2>A few things<br /><em>made to be seen.</em></h2>
              <p>A curated selection of advertising, branding, social media, and marketing design projects.</p>
            </div>
            <a className="jl-rail__simple-link" href="https://www.behance.net/jelacierasgfx" target="_blank" rel="noreferrer">More on Behance <ArrowUpRight size={15} /></a>
          </div>
          <div className="jl-rail__filters" role="group" aria-label="Filter portfolio projects">
            {projectFilters.map((filter) => (
              <button key={filter} type="button" aria-pressed={activeFilter === filter} className={activeFilter === filter ? 'is-active' : ''} onClick={() => setActiveFilter(filter)}>{filter}</button>
            ))}
            <span className="jl-rail__work-count">{String(visibleProjects.length).padStart(2, '0')} PROJECTS</span>
          </div>
          <div className="jl-rail__gallery">
            {visibleProjects.map((project, index) => <ProjectLink key={project.id} project={project} index={index} />)}
          </div>
          <div className="jl-rail__case">
            <div className="jl-rail__case-kicker">A closer look <span>CASE 001</span></div>
            <div className="jl-rail__case-heading">
              <h3>Brand Visuals for<br /><em>Lucky World Online</em></h3>
              <p>A collection of marketing and brand visuals created for Lucky World Online, covering promotional graphics, social media creatives, and marketing collateral while maintaining a consistent visual identity and PAGCOR-compliant communication.</p>
            </div>
            <div className="jl-rail__case-facts">
              <span><small>ROLE</small> Graphic Designer</span>
              <span><small>FOCUS</small> Brand visuals · Marketing collateral · Social media · Promotional design</span>
            </div>
            <div className="jl-rail__case-gallery">
              {[
                'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/ef200e256501323.6abe06033d310.jpg',
                'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/f17733256501323.6abe06033f9cb.jpg',
                'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200_webp/994568256501323.6abe06033bf4f.jpg',
              ].map((image, index) => (
                <div className={`jl-rail__case-image jl-rail__case-image--${index + 1}`} key={image}>
                  <img src={image} alt={`Lucky World Online campaign visual ${index + 1}`} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                </div>
              ))}
            </div>
            <a className="jl-rail__case-link" href="https://www.behance.net/gallery/256501323/Brand-Visuals-for-Lucky-World-Online-(iGaming-Brand)" target="_blank" rel="noreferrer">View the full case on Behance <ArrowUpRight size={15} /></a>
          </div>
        </section>

        <section className="jl-rail__services" id="services">
          <div className="jl-rail__section-head jl-rail__section-head--services">
            <div>
              <span className="jl-rail__eyebrow">02 / Ways I can help</span>
              <h2>Good work starts<br />with a <em>clear brief.</em></h2>
              <p>Design support for brands, businesses, marketing teams, and companies that need strong visual communication.</p>
            </div>
            <div className="jl-rail__service-callout"><span>NEED CREATIVE SUPPORT?</span><strong>Let's find the right<br />visual direction.</strong><a href="#contact">Start a project <ArrowRight size={14} /></a></div>
          </div>
          <div className="jl-rail__service-list">
            {services.map(([number, title, description]) => (
              <article className="jl-rail__service-row" key={number}>
                <span className="jl-rail__row-number">{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <ArrowUpRight className="jl-rail__row-icon" size={17} />
              </article>
            ))}
          </div>
        </section>

        <section className="jl-rail__approach" id="approach">
          <div className="jl-rail__approach-intro">
            <span className="jl-rail__eyebrow">03 / A thoughtful approach</span>
            <h2>Looks good.<br /><em>Reads clearly.</em></h2>
            <p>Strong creative starts with clarity: what needs to be said, who it is for, and how it should feel.</p>
            <div className="jl-rail__toolkit">
              <span>MY TOOLKIT</span>
              <strong>Photoshop</strong><strong>Illustrator</strong><strong>Canva</strong><strong>Figma</strong>
              <small>CapCut · Premiere Pro · WordPress · HTML/CSS · ChatGPT · AI creative tools</small>
            </div>
          </div>
          <div className="jl-rail__approach-list">
            {approach.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="jl-rail__process">
          <div className="jl-rail__process-head">
            <span className="jl-rail__eyebrow">04 / From first note to final files</span>
            <h2>A clear creative<br /><em>process.</em></h2>
            <p>A straightforward path from your initial brief to ready-to-use design assets.</p>
          </div>
          <div className="jl-rail__process-list">
            {process.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span><h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
          <div className="jl-rail__process-foot"><strong>Have a project in mind?</strong><a href="#contact">Let's talk <ArrowRight size={15} /></a></div>
        </section>

        <section className="jl-rail__about" id="about">
          <div className="jl-rail__about-card">
            <div className="jl-rail__about-card-top"><span>THE DESIGNER</span><span>PH / 13°45'N</span></div>
            <div className="jl-rail__about-mark">JL</div>
            <div className="jl-rail__about-name"><span>Graphic Designer</span><h3>Jerome<br />Lacieras</h3><p>Batangas City, Philippines</p></div>
            <div className="jl-rail__about-stats">
              <span><strong>5+ Years</strong>Experience</span>
              <span><strong>20+ Clients</strong>Local &amp; international</span>
              <span><strong>Multimedia Designer</strong>Current role</span>
              <span><strong>Computer Engineering</strong>Graduate</span>
            </div>
          </div>
          <div className="jl-rail__about-copy">
            <span className="jl-rail__eyebrow">A little about me</span>
            <h2>Hi, I'm<br /><em>Jerome.</em></h2>
            <h3>Graphic Designer creating visuals for brands, businesses, and marketing campaigns.</h3>
            <p>I'm Jerome Lacieras, a Graphic Designer with 5+ years of experience creating visual content across digital and print platforms. My experience spans freelance and corporate environments, allowing me to work across different industries, creative briefs, and production requirements.</p>
            <p>I specialize in social media design, advertising creatives, branding, marketing visuals, and visual communication. I combine strong design fundamentals with modern creative tools to create visuals that are clear, polished, and purposeful.</p>
          </div>
        </section>

        <section className="jl-rail__contact" id="contact">
          <div className="jl-rail__contact-copy">
            <span className="jl-rail__eyebrow">05 / Start a conversation</span>
            <h2>Let's work<br /><em>together.</em></h2>
            <p>Tell me what you're working on, what you need designed, and your timeline. I'll get back to you with the next steps.</p>
            <div className="jl-rail__contact-links">
              <a href="mailto:jela.creatives@gmail.com"><span><small>EMAIL</small><strong>jela.creatives@gmail.com</strong></span><ArrowUpRight size={17} /></a>
              <a href="https://www.linkedin.com/in/jeromelacieras" target="_blank" rel="noreferrer"><span><small>LINKEDIN</small><strong>linkedin.com/in/jeromelacieras</strong></span><ArrowUpRight size={17} /></a>
              <a href="https://www.behance.net/jelacierasgfx" target="_blank" rel="noreferrer"><span><small>BEHANCE</small><strong>behance.net/jelacierasgfx</strong></span><ArrowUpRight size={17} /></a>
            </div>
          </div>
          <form className="jl-rail__form" onSubmit={submitInquiry}>
            <div className="jl-rail__form-head"><span>PROJECT INQUIRY</span><span>LET'S START WITH THE BASICS</span></div>
            <div className="jl-rail__form-grid">
              <label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
              <label className="jl-rail__form-wide">Company / Brand<input name="company" autoComplete="organization" placeholder="Company or brand name" required /></label>
              <label>Project Type<select name="projectType" defaultValue="" required><option value="" disabled>Select a project type</option><option>Social Media / Ads</option><option>Branding</option><option>Logo Design</option><option>Marketing Materials</option><option>Poster / Event Design</option><option>Content Design</option><option>Other</option></select></label>
              <label>Timeline<select name="timeline" defaultValue="" required><option value="" disabled>Select a timeline</option><option>ASAP</option><option>Within 1–2 weeks</option><option>Within a month</option><option>Flexible</option></select></label>
              <label className="jl-rail__form-wide">Project Details<textarea name="details" placeholder="Tell me a little about what you need designed." required minLength={10} /></label>
            </div>
            <div className="jl-rail__form-submit">
              <button type="submit">Send project inquiry <ArrowRight size={15} /></button>
              <span>This opens a prefilled email draft for you to review and send.</span>
            </div>
            {draftReady && <p className="jl-rail__form-status" role="status">Your email draft is ready. Send it from your email app to complete your inquiry.</p>}
          </form>
        </section>

        <footer className="jl-rail__footer">
          <a href="#home" className="jl-rail__footer-mark">JEROME LACIERAS</a>
          <span>Graphic Designer · Batangas City, Philippines</span>
          <div><a href="mailto:jela.creatives@gmail.com">Email</a><a href="https://www.linkedin.com/in/jeromelacieras" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.behance.net/jelacierasgfx" target="_blank" rel="noreferrer">Behance</a><a href="#home">Back to top ↑</a></div>
        </footer>
      </main>
    </div>
  );
}

export default PortfolioRail;
