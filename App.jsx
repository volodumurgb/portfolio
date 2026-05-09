import { useEffect, useRef } from 'react';
import './App.css';
import PhotoP from './PhotoP.jpg';

/*PARTICLE BACKGROUND*/
function ParticleBg() {
  useEffect(() => {
    const canvas = document.getElementById('bg');
    const ctx = canvas.getContext('2d');
    let W, H, particles, raf;
    const rand = (a, b) => Math.random() * (b - a) + a;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    const mkP = () => ({
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.12, 0.12), vy: rand(-0.22, -0.04),
      r: rand(0.4, 2.2),
      a: rand(0.04, 0.35),
      col: ['#8B5CF6', '#5B21B6', '#C9A84C', '#4C1D95'][Math.floor(rand(0, 4))],
    });

    const init = () => { resize(); particles = Array.from({ length: 90 }, mkP); };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4) { p.y = H + 4; p.x = rand(0, W); }
        if (p.x < -4) p.x = W + 4;
        if (p.x > W + 4) p.x = -4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col;
        ctx.globalAlpha = p.a;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    init(); draw();
    window.addEventListener('resize', init);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', init); };
  }, []);
  return null;
}

/*FADE IN HOOK*/
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/*ANIMATED SKILL BAR*/
function SkillBar({ name, pct }) {
  const ref = useRef(null);
  useEffect(() => {
    const fill = ref.current;
    if (!fill) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { fill.classList.add('grow'); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(fill);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" ref={ref} style={{ '--w': `${pct}%` }} />
      </div>
    </div>
  );
}

/* ─── PHOTO PLACEHOLDER ─── */
function PhotoFrame() {
  return (
    <div className="photo-frame">
      <div className="corner tl" />
      <div className="corner tr" />
      <div className="corner bl" />
      <div className="corner br" />
      <div className="photo-inner">
        <img 
          src={PhotoP} 
          alt="Gorbach Volodumur" 
          className="photo-img"
        />
      </div>
    </div>
  );
}

/*ORNAMENTAL DIVIDER*/
const Ornament = () => (
  <div className="ornament"><span>✦ ✦ ✦</span></div>
);

/*DATA*/
const DEV = {
  name: 'Gorbach Volodymyr',
  title: 'Developer',
  location: 'Lviv, Ukraine',
  tagline: 'Life sucks, but code doesn\'t have to.',
  badges: ['Open to Work', 'Remote Ready', 'Open Source'],

  career: 'A passionate developer with a little expirience, open to new opportunities and challenges. I thrive in dynamic environments where I can learn, grow, and contribute to impactful projects. With a strong foundation in software development and a keen eye for detail, I am eager to bring my skills and enthusiasm to a forward-thinking team.',

  stats: [
    { num: '2+', label: 'Years Active' },
    { num: '2', label: 'Terms survived' },
    { num: '9', label: 'Core Technologies' },
  ],

  skills: [
    { name: 'TypeScript / JavaScript', pct: 60 },
    { name: 'React', pct:20 },
    { name: 'Node.js', pct: 40 },
    { name: 'SQL', pct: 50 },
    { name: 'Python', pct: 60 },
    { name: 'Docker', pct: 20 },
    { name: 'C', pct: 70 },
    { name: 'C++', pct: 80 },
    { name: 'Java', pct: 25 },
  ],

  spec: [
    { icon: '⚙️', title: 'Systems Architecture', desc: 'Designing distributed systems with graceful degradation, zero single points of failure, and cold-blooded scalability.' },
    { icon: '🕸️', title: 'Backend Engineering', desc: 'Building APIs and services that perform under siege — RESTful, GraphQL, gRPC, and event-driven architectures.' },
    { icon: '🖤', title: 'Frontend Craftsmanship', desc: 'Creating performant, accessible, and visually compelling interfaces using React, Next.js, and modern design systems.' },
    { icon: '🔐', title: 'Security & Hardening', desc: 'OAuth flows, secret management, threat modeling, and defense-in-depth architecture for production systems.' },
  ],

  exp: [
    {
      period: '2024 — Present',
      role: 'Freelance Developer',
      org: 'Self-Employed',
      desc: 'Developing full-stack web applications and contributing to open source projects. Collaborating with clients to deliver custom solutions that meet their needs and exceed expectations.',
    },
    {}
  ],

  edu: [
    {
      period: '2025 — Present',
      role: 'Focusing on new opportunities, and deep learning.',
      org: 'LNU · Lviv',
      desc: 'Studuing at Lviv National University, majoring in Sofware Engineering. Engaging in personal projects and open source contributions to sharpen my skills and explore new technologies.',
    },
    {
      period: '2022 — 2025',
      role: 'School',
      org: 'LFML · Lviv',
      desc: 'Lviv Physics and Mathematics Lyceum. Completed with honors,excelliing in mathemitcs, physics, and computer science. Participated in mane financial and mathemetics competetions, in region levels. After graduation, I decided to focus on my personal growth and development, exploring various technologies and honing my skills through self-directed learning and projects.',
    },
  ],

  contacts: [
    { icon: '✉', label: 'Email', val: 'volodumur.gb@gmail.com', href: 'mailto:volodumur.gb@gmail.com' },
    { icon: '⌨', label: 'GitHub', val: 'link', href: 'https://github.com/volodumurgb' },/*
    { icon: '💼', label: 'LinkedIn(for now i did not have one)', val: '', href: '' },*/
    { icon: '📍', label: 'Location', val: 'Lviv, Ukraine', href: null },
    { icon: '📱', label: 'Telegram', val: '@Tyripipiptyrrip', href: 'https://t.me/Tyripipiptyrrip' },
  ],
};

/* ─── ROOT APP ─── */
export default function App() {
  const r1 = useFadeIn();
  const r2 = useFadeIn();
  const r3 = useFadeIn();
  const r4 = useFadeIn();
  const r5 = useFadeIn();
  const r6 = useFadeIn();

  return (
    <>
      {}
      <canvas id="bg" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
      <div id="vignette" style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(6,5,15,0.85) 100%)',
      }} />
      <ParticleBg />

      <div className="wrap">

        {/* HERO */}
        <section className="hero">
          <div className="hero-text">
            <div className="hero-overline">✦ &nbsp; Developer Portfolio &nbsp; ✦</div>
            <h1 className="hero-name">{DEV.name}</h1>
            <div className="hero-title">{DEV.title}</div>
            <p className="hero-tagline">{DEV.tagline}</p>
            <div className="hero-badges">
              {DEV.badges.map(b => <span className="badge" key={b}>{b}</span>)}
            </div>
          </div>
          <PhotoFrame />
        </section>

        {/* CAREER REVIEW */}
        <section className="section fade" ref={r1}>
          <h2 className="sec-title">Career Review</h2>
          <Ornament />
          <div className="career-body"><p>{DEV.career}</p></div>
          <div className="career-stats">
            {DEV.stats.map(s => (
              <div className="stat" key={s.label}>
                <span className="stat-num">{s.num}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="section fade" ref={r2}>
          <h2 className="sec-title">Skills</h2>
          <Ornament />
          <div className="skills-grid">
            {DEV.skills.map(s => <SkillBar key={s.name} name={s.name} pct={s.pct} />)}
          </div>
        </section>

        {/* SPECIALIZATION */}
        <section className="section fade" ref={r3}>
          <h2 className="sec-title">Specialization</h2>
          <Ornament />
          <div className="spec-grid">
            {DEV.spec.map(s => (
              <div className="spec-card" key={s.title}>
                <span className="spec-icon">{s.icon}</span>
                <div className="spec-title">{s.title}</div>
                <p className="spec-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WORK EXPERIENCE */}
        <section className="section fade" ref={r4}>
          <h2 className="sec-title">Work Experience</h2>
          <Ornament />
          <div className="timeline">
            {DEV.exp.map(e => (
              <div className="tl-item" key={e.role}>
                <div className="tl-period">{e.period}</div>
                <div className="tl-role">{e.role}</div>
                <div className="tl-org">{e.org}</div>
                <p className="tl-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section fade" ref={r5}>
          <h2 className="sec-title">Education</h2>
          <Ornament />
          <div className="timeline">
            {DEV.edu.map(e => (
              <div className="tl-item" key={e.role}>
                <div className="tl-period">{e.period}</div>
                <div className="tl-role">{e.role}</div>
                <div className="tl-org">{e.org}</div>
                <p className="tl-desc">{e.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACTS */}
        <section className="section fade" ref={r6}>
          <h2 className="sec-title">Contacts</h2>
          <Ornament />
          <div className="contacts-grid">
            {DEV.contacts.map(c =>
              c.href
                ? <a className="contact-item" href={c.href} key={c.label} target="_blank" rel="noopener noreferrer">
                  <span className="contact-icon">{c.icon}</span>
                  <div>
                    <span className="contact-label">{c.label}</span>
                    <span className="contact-val">{c.val}</span>
                  </div>
                </a>
                : <div className="contact-item" key={c.label}>
                  <span className="contact-icon">{c.icon}</span>
                  <div>
                    <span className="contact-label">{c.label}</span>
                    <span className="contact-val">{c.val}</span>
                  </div>
                </div>
            )}
          </div>
        </section>

        <footer className="footer">
          ✦ &nbsp; Gorbach Volodymyr · 21.08.2008 · All Rights Reserved(i guess) &nbsp; ✦
        </footer>

      </div>
    </>
  );
}
