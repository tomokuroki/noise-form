import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react';

const IMAGE_1 = 'https://images.unsplash.com/photo-1762967027613-8b75dcf2e309?auto=format&fit=crop&fm=jpg&q=88&w=2400';
const IMAGE_2 = 'https://images.unsplash.com/photo-1465918424371-da226f85990b?auto=format&fit=crop&fm=jpg&q=88&w=2400';
const IMAGE_3 = 'https://images.unsplash.com/photo-1768696083096-2f1cb7c3a9dd?auto=format&fit=crop&fm=jpg&q=88&w=2200';

const projects = [
  {
    title: 'MONOLITH',
    tags: 'Identity · Digital · 2026',
    image: IMAGE_1,
    className: 'project-a',
  },
  {
    title: 'REDLINE',
    tags: 'Art direction · Campaign · 2026',
    image: IMAGE_3,
    className: 'project-b',
  },
  {
    title: 'COMMON GROUND',
    tags: 'Website · Experience · 2025',
    image: IMAGE_2,
    className: 'project-c',
  },
];

const services = [
  ['Brand systems', 'Naming, identity, type, image language and the rules that hold it together.'],
  ['Digital', 'Websites and interfaces with a clear point of view, not another component library demo.'],
  ['Campaigns', 'Launch ideas, art direction and visual systems that can survive more than one post.'],
  ['Design partner', 'A small senior team for brands that need consistent design without building an in-house studio.'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 700);
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? window.scrollY / h : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <div className={`loader ${loaded ? 'loader--gone' : ''}`} aria-hidden="true">
        <div className="loader__mark">N/F</div>
        <div className="loader__rule" />
        <div className="loader__meta">ALMATY — BERLIN</div>
      </div>

      <div className="progress" style={{ transform: `scaleX(${scrollProgress})` }} />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Noise Form home">NOISE/FORM</a>
        <div className="topbar__meta">ALMATY / BERLIN<br />AVAILABLE WORLDWIDE</div>
        <nav className="desktop-nav" aria-label="Primary">
          <a href="#work">Work</a>
          <a href="#studio">Studio</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={22} strokeWidth={1.7} />
        </button>
      </header>

      <div className={`menu ${menuOpen ? 'menu--open' : ''}`}>
        <button className="menu__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <X size={30} strokeWidth={1.5} />
        </button>
        <div className="menu__aside">NOISE/FORM<br />INDEPENDENT DESIGN OFFICE</div>
        <div className="menu__links">
          {['Work', 'Studio', 'Services', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
        <div className="menu__footer">Websites and identities for people who are tired of looking like everyone else.</div>
      </div>

      <main id="top">
        <section className="hero">
          <div className="hero__eyebrow">INDEPENDENT CREATIVE OFFICE <span>EST. 2022</span></div>
          <h1 className="hero__title" aria-label="Make a little noise">
            <span>MAKE A</span>
            <span className="hero__line--offset">LITTLE</span>
            <span>NOISE.</span>
          </h1>

          <figure className="hero__image-wrap" data-reveal>
            <img className="hero__image" src={IMAGE_1} alt="Brutalist concrete architecture" />
            <figcaption>
              <span>DÜSSELDORF</span>
              <span>SPRING 2026</span>
            </figcaption>
          </figure>

          <div className="hero__copy" data-reveal>
            Websites and identities for brands that are tired of looking like everyone else.
          </div>
          <a className="scroll-cue" href="#work"><ArrowDown size={18} /> SEE THE WORK</a>
        </section>

        <section className="ticker" aria-label="Services ticker">
          <div className="ticker__track">
            <span>IDENTITY</span><i>✳</i><span>DIGITAL</span><i>✳</i><span>ART DIRECTION</span><i>✳</i><span>CAMPAIGNS</span><i>✳</i><span>IDENTITY</span><i>✳</i><span>DIGITAL</span><i>✳</i><span>ART DIRECTION</span><i>✳</i><span>CAMPAIGNS</span><i>✳</i>
          </div>
        </section>

        <section className="work" id="work">
          <div className="work-intro">
            <h2>Selected work</h2>
            <p>Recent things we liked making. A mix of identity, web and campaign work.</p>
          </div>

          {projects.map((project) => (
            <article className={`project ${project.className}`} key={project.title} data-reveal>
              <div className="project__media">
                <img src={project.image} alt="" />
                <div className="project__overlay">VIEW CASE <ArrowUpRight size={34} strokeWidth={1.2} /></div>
              </div>
              <div className="project__info">
                <h3>{project.title}</h3>
                <div>{project.tags}</div>
              </div>
            </article>
          ))}
        </section>

        <section className="statement" id="studio">
          <div className="statement__main" data-reveal>
            <p>SMALL<br />ON<br />PURPOSE.</p>
          </div>
          <div className="statement__side" data-reveal>
            <p>NOISE/FORM is a compact design office working across identity, websites and image-making.</p>
            <p>Fewer handoffs. Fewer meetings about meetings. The people you talk to are the people making the work.</p>
            <a href="#contact">Talk to us <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section className="services" id="services">
          <div className="services__lead" data-reveal>
            <span>What we actually do</span>
            <p>Enough range to build a brand properly. Small enough that the work still feels authored.</p>
          </div>
          <div className="services__list">
            {services.map(([title, desc]) => (
              <article className="service" key={title} data-reveal>
                <h3>{title}</h3>
                <p>{desc}</p>
                <ArrowUpRight size={26} strokeWidth={1.3} />
              </article>
            ))}
          </div>
        </section>

        <section className="notes">
          <p className="notes__kicker">A few things we believe</p>
          <div className="note note--left" data-reveal>
            <h3>Look longer.</h3>
            <p>Most visual problems are not solved by adding another effect. We spend more time finding the right thing to say.</p>
          </div>
          <div className="note note--right" data-reveal>
            <h3>Cut harder.</h3>
            <p>If an element has no job, it goes. Clarity usually arrives after the third version, not the first.</p>
          </div>
          <div className="note note--low" data-reveal>
            <h3>Leave a fingerprint.</h3>
            <p>Consistency matters. Sameness does not. Each project should keep something that could only belong to it.</p>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact__small">GOT SOMETHING IN MIND?</div>
          <a href="mailto:hello@noiseform.studio" className="contact__mail" data-reveal>
            SAY<br />HELLO <ArrowUpRight size={42} strokeWidth={1} />
          </a>
          <div className="contact__address">hello@noiseform.studio</div>
          <div className="contact__bottom">
            <span>INSTAGRAM / BEHANCE / ARE.NA</span>
            <span>© {year} NOISE/FORM</span>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
