import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, ExternalLink, Mail, Menu } from "lucide-react";
import "./portfolioatlas.css";

const projects = [
  {
    id: "lucky-world",
    title: "Brand Visuals for Lucky World Online",
    category: "Branding",
    year: "2025",
    medium: "Brand system · Campaign",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/bb82e1256501323.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "A lively visual language for an online entertainment brand—built to keep promotional work recognizable, clear, and compliant across every touchpoint.",
    url: "https://www.behance.net/gallery/256501323/Brand-Visuals-for-Lucky-World-Online-(iGaming-Brand)",
  },
  {
    id: "axis-dance",
    title: "Social Media Posters for AXIS Dance Studio",
    category: "Social Media",
    year: "2025",
    medium: "Social campaign · Posters",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/a0fb06249092299.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "A series of high-energy social posters made to give a dance studio's announcements a rhythm of their own.",
    url: "https://www.behance.net/gallery/249092299/Social-Media-Posters-for-AXIS-Dance-Studio",
  },
  {
    id: "wrapped-ads",
    title: "2025 Wrapped: Ad Designs",
    category: "Advertising",
    year: "2025",
    medium: "Advertising · Digital",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/0e8289241547307.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "An adaptable set of digital ad creatives, shaped around a bold campaign message and designed to travel across formats.",
    url: "https://www.behance.net/gallery/241547307/2025-Wrapped-Ad-Designs",
  },
  {
    id: "petbloom",
    title: "PetBloom Ad Images",
    category: "Advertising",
    year: "2024",
    medium: "Advertising · Brand visuals",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/db11b5223100637.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "A warm, approachable visual campaign for PetBloom, bringing product storytelling and clear promotional hierarchy together.",
    url: "https://www.behance.net/gallery/223100637/PetBloom-Ad-Images",
  },
  {
    id: "pixra",
    title: "Pixra Creatives — Web & Logo",
    category: "Branding",
    year: "2024",
    medium: "Identity · Web design",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/fb12e2212944011.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "A compact identity and web direction for a creative studio, connecting a distinctive mark with a confident digital presence.",
    url: "https://www.behance.net/gallery/212944011/Pixra-Creatives-Web-Design-and-Logo-Project",
  },
  {
    id: "wrapped-canva",
    title: "2025 Wrapped: Custom Canva Kits",
    category: "Social Media",
    year: "2025",
    medium: "Template system · Social",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/30067a241548169.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "A flexible kit of branded Canva templates, giving a campaign team a consistent starting point for everyday content.",
    url: "https://www.behance.net/gallery/241548169/2025-Wrapped-Custom-Canva-Kits",
  },
  {
    id: "wrapped-posters",
    title: "2025 Wrapped: Poster Designs",
    category: "Posters",
    year: "2025",
    medium: "Poster series · Print",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/20c78d241546829.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "A poster collection that uses a repeatable campaign structure while leaving each message room to make its own impression.",
    url: "https://www.behance.net/gallery/241546829/2025-Wrapped-Poster-Designs",
  },
  {
    id: "wrapped-logos",
    title: "2025 Wrapped: Logo Designs",
    category: "Branding",
    year: "2025",
    medium: "Identity · Logo family",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/a6a0fd241546195.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "A collection of logo explorations developed for a campaign world with multiple voices and a shared visual thread.",
    url: "https://www.behance.net/gallery/241546195/2025-Wrapped-Logo-Designs",
  },
  {
    id: "sk-poblacion",
    title: "SK Poblacion Logo Design",
    category: "Branding",
    year: "2024",
    medium: "Identity · Community",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/1248d0211443831.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "A clear, civic-minded identity created for a local community organization in Poblacion.",
    url: "https://www.behance.net/gallery/211443831/SK-Poblacion-Logo-Design",
  },
  {
    id: "bske-campaign",
    title: "Campaign Materials Layout BSKE 2023",
    category: "Marketing",
    year: "2023",
    medium: "Campaign · Print & digital",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/f7afb0211443673.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "A consistent campaign layout system designed to make important messages easy to spot across print and digital placements.",
    url: "https://www.behance.net/gallery/211443673/Campaign-Materials-Layout-BSKE-2023",
  },
  {
    id: "serbisyong-bait",
    title: "Campaign Materials for Serbisyong Bait",
    category: "Marketing",
    year: "2023",
    medium: "Campaign · Community",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/ab1b2e211443339.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "Community campaign collateral with a direct message and a visual system that stays legible across formats.",
    url: "https://www.behance.net/gallery/211443339/Campaign-Materials-Layout-for-Serbisyong-Bait",
  },
  {
    id: "jaskin",
    title: "JASkin Magical Touch Logo Design",
    category: "Branding",
    year: "2023",
    medium: "Identity · Beauty",
    image: "https://mir-s3-cdn-cf.behance.net/projects/404/2fcdfe211442907.Y3JvcCwyNDI0LDE4OTYsMCww.jpg",
    description: "A polished logo direction for a beauty brand, balancing a soft feeling with a confident, ownable mark.",
    url: "https://www.behance.net/gallery/211442907/JASkin-Magical-Touch-Logo-Design",
  },
];

const categories = ["All work", "Branding", "Advertising", "Social Media", "Marketing", "Posters"];

function Artwork({ project }: { project: (typeof projects)[number] }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="pa-artwork">
      {!failed ? (
        <img src={project.image} alt={`${project.title} portfolio artwork`} onError={() => setFailed(true)} />
      ) : (
        <div className="pa-art-fallback">
          <div className="pa-fallback-stamp">JL<br /><span>VISUALS</span></div>
          <span className="pa-fallback-type">{project.category}<br />{project.year}</span>
          <strong>{project.title}</strong>
          <i />
        </div>
      )}
      <span className="pa-art-index">JL / SELECTED WORK</span>
      <span className="pa-art-number">{String(projects.findIndex((item) => item.id === project.id) + 1).padStart(2, "0")}</span>
    </div>
  );
}

export function PortfolioAtlas() {
  const [category, setCategory] = useState("All work");
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = useMemo(
    () => category === "All work" ? projects : projects.filter((project) => project.category === category),
    [category],
  );
  const selected = visibleProjects.find((project) => project.id === selectedId) ?? visibleProjects[0];
  const selectedIndex = visibleProjects.findIndex((project) => project.id === selected.id);
  const goTo = (direction: number) => {
    const next = (selectedIndex + direction + visibleProjects.length) % visibleProjects.length;
    setSelectedId(visibleProjects[next].id);
  };
  const setFilter = (next: string) => {
    setCategory(next);
    const firstProject = next === "All work" ? projects[0] : projects.find((project) => project.category === next);
    if (firstProject) setSelectedId(firstProject.id);
  };

  return (
    <main className="pa-shell">
      <header className="pa-header">
        <a href="#portfolio-atlas" className="pa-brand" aria-label="Jerome Lacieras, home">
          <span className="pa-monogram">JL</span>
          <span>JEROME LACIERAS<small>Independent graphic designer</small></span>
        </a>
        <div className="pa-header-note"><span className="pa-status-dot" /> AVAILABLE FOR SELECT PROJECTS <span className="pa-header-city">· BATANGAS CITY, PH</span></div>
        <button className="pa-menu" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <Menu size={18} />
        </button>
        <nav className={menuOpen ? "pa-nav pa-nav-open" : "pa-nav"}>
          <a href="#pa-work" onClick={() => setMenuOpen(false)}>Work <span>12</span></a>
          <a href="#pa-about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="mailto:jela.creatives@gmail.com">Contact <ArrowUpRight size={13} /></a>
        </nav>
      </header>

      <section className="pa-stage" id="portfolio-atlas">
        <aside className="pa-index" id="pa-work">
          <div className="pa-index-heading">
            <span className="pa-kicker">The work archive</span>
            <h1>Selected<br />work<span>.</span></h1>
            <p>Visual ideas made clear, memorable, and ready to work.</p>
          </div>
          <div className="pa-filter-label">BROWSE BY DISCIPLINE <ChevronDown size={12} /></div>
          <div className="pa-filters" role="group" aria-label="Filter work by category">
            {categories.map((item) => (
              <button key={item} type="button" className={category === item ? "pa-filter pa-filter-active" : "pa-filter"} onClick={() => setFilter(item)}>
                <span>{item}</span><span className="pa-filter-count">{item === "All work" ? "12" : String(projects.filter((project) => project.category === item).length).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <div className="pa-index-bottom"><span>01—12</span><span>2023—25</span></div>
        </aside>

        <div className="pa-gallery">
          <div className="pa-gallery-top">
            <span><i /> CURRENT SELECTION</span>
            <span className="pa-gallery-count">{String(selectedIndex + 1).padStart(2, "0")} <b>/</b> {String(visibleProjects.length).padStart(2, "0")}</span>
          </div>
          <Artwork key={selected.id} project={selected} />
          <div className="pa-project-line">
            <div className="pa-project-heading">
              <span className="pa-project-category">{selected.category} <i /> {selected.year}</span>
              <h2>{selected.title}</h2>
            </div>
            <div className="pa-project-controls" aria-label="Browse projects">
              <button type="button" onClick={() => goTo(-1)} aria-label="Previous project"><ArrowLeft size={18} /></button>
              <button type="button" onClick={() => goTo(1)} aria-label="Next project"><ArrowRight size={18} /></button>
            </div>
          </div>
          <div className="pa-details">
            <p>{selected.description}</p>
            <div className="pa-project-meta"><span>DISCIPLINE</span><strong>{selected.medium}</strong></div>
            <a className="pa-view-project" href={selected.url} target="_blank" rel="noreferrer">View project <ArrowUpRight size={15} /></a>
          </div>
          <div className="pa-thumbnails" aria-label="Choose a project">
            {visibleProjects.slice(0, 7).map((project, index) => (
              <button key={project.id} type="button" className={selected.id === project.id ? "pa-thumb pa-thumb-active" : "pa-thumb"} onClick={() => setSelectedId(project.id)} aria-label={`View ${project.title}`} aria-current={selected.id === project.id}>
                <span>{String(index + 1).padStart(2, "0")}</span><i />
              </button>
            ))}
            {visibleProjects.length > 7 && <span className="pa-more-count">+{visibleProjects.length - 7}</span>}
          </div>
        </div>
        <aside className="pa-vertical-note">PORTFOLIO INDEX&nbsp; / &nbsp;2023 — 2025</aside>
      </section>

      <footer className="pa-footer" id="pa-about">
        <div className="pa-footer-intro"><span className="pa-kicker">A little about me</span><p>Graphic design for brands, businesses, and campaigns. Five years of turning a brief into a visual system that says what it needs to say.</p></div>
        <div className="pa-footer-stat"><strong>5<span>+</span></strong><span>YEARS IN DESIGN</span></div>
        <div className="pa-footer-stat"><strong>20<span>+</span></strong><span>CLIENTS, LOCAL &amp; GLOBAL</span></div>
        <a className="pa-contact-link" href="mailto:jela.creatives@gmail.com"><span>Have a brief in mind?</span><strong>Let's talk <ArrowRight size={17} /></strong><small><Mail size={12} /> jela.creatives@gmail.com</small></a>
        <a className="pa-behance" href="https://www.behance.net/jelacierasgfx" target="_blank" rel="noreferrer"><ExternalLink size={14} /> BEHANCE</a>
      </footer>
    </main>
  );
}

export default PortfolioAtlas;
