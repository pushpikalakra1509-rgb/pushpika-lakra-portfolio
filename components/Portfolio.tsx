"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  achievements,
  certifications,
  project,
  softSkills,
  socialLinks,
  technicalSkills,
} from "@/data/portfolio";

const navItems = [
  ["WORK", "work"],
  ["ABOUT", "about"],
  ["SKILLS", "skills"],
  ["CONTACT", "contact"],
] as const;

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 42 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function MagneticLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function move(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    setOffset({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.14,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.14,
    });
  }

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={move}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      }}
    >
      {children}
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <a className="brand" href="#top">
        PUSHPIKA
      </a>

      <nav className="navlinks" aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>

      <button
        className="mobile-menu"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open ? "CLOSE" : "MENU"}
      </button>

      {open && (
        <motion.div
          className="mobile-nav"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 90]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.06]
  );

  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -55]
  );

  return (
    <section
      ref={sectionRef}
      className="hero-static-section"
      id="top"
    >
      <div className="hero-stage">
        <div
          className="hero-gridline"
          aria-hidden="true"
        />

        <motion.div
          className="hero-copy"
          style={
            reduce
              ? undefined
              : { y: copyY }
          }
        >
          <motion.p
            className="eyebrow"
            initial={
              reduce
                ? false
                : { opacity: 0, y: 20 }
            }
            animate={
              reduce
                ? undefined
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.7 }}
          >
            COMPUTER SCIENCE · AI · DATA
          </motion.p>

          <motion.h1
            className="hero-title"
            initial={
              reduce
                ? false
                : { opacity: 0, y: 35 }
            }
            animate={
              reduce
                ? undefined
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: 0.9,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span>Hi, I&apos;m</span>
            <span className="name-line">
              Pushpika.
            </span>
          </motion.h1>

          <motion.p
            className="hero-intro"
            initial={
              reduce
                ? false
                : { opacity: 0, y: 25 }
            }
            animate={
              reduce
                ? undefined
                : { opacity: 1, y: 0 }
            }
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            I&apos;m figuring out what I can build,
            <br />
            one project at a time.
          </motion.p>

          <motion.p
            className="hero-detail"
            initial={
              reduce
                ? false
                : { opacity: 0 }
            }
            animate={
              reduce
                ? undefined
                : { opacity: 1 }
            }
            transition={{
              duration: 0.8,
              delay: 0.45,
            }}
          >
            Computer Science graduate · MSc
            Artificial Intelligence &amp; Data Science
          </motion.p>
        </motion.div>

        <motion.div
          className="portrait-scene static-portrait-frame"
          style={
            reduce
              ? undefined
              : {
                  y: imageY,
                  scale: imageScale,
                }
          }
        >
          <Image
            className="portrait"
            src="/pushpika-portrait.png"
            alt="Pushpika Lakra"
            fill
            priority
            sizes="(max-width: 900px) 76vw, 48vw"
          />

          <div className="portrait-shade" />
          <div className="portrait-scan" />

          <span className="portrait-label">
            P / 01 — PUSHPIKA LAKRA
          </span>

          <span className="portrait-coordinate">
            INDIA / 2026
          </span>
        </motion.div>

        <div className="hero-side-note">
          CURRENTLY EXPLORING{" "}
          <strong>AI + DATA</strong>
        </div>

        <div className="hero-meta">
          <span>2026 / PORTFOLIO</span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>

        <div
          className="hero-orbit orbit-one"
          aria-hidden="true"
        />

        <div
          className="hero-orbit orbit-two"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function About() {
  return (
    <section
      className="section about"
      id="about"
    >
      <div className="section-index">
        01 / ABOUT
      </div>

      <div className="story-title">
        <p className="micro">
          A work in progress.
        </p>

        <h2>
          I don&apos;t want to simply{" "}
          <span>learn technology.</span> I want
          to understand what we can do with it.
        </h2>
      </div>

      <div className="about-layout">
        <div className="about-side">
          Starting with curiosity.
          <br />
          <span>Building with purpose.</span>
        </div>

        <div className="about-copy">
          <p>
            I completed my Bachelor&apos;s degree
            in Computer Science and I&apos;m now
            pursuing my MSc in Artificial
            Intelligence &amp; Data Science at
            Indira University.
          </p>

          <p>
            I&apos;m at an early stage of the
            journey — learning, experimenting,
            making mistakes and slowly turning
            ideas into things I can show. This
            website is a record of that process.
          </p>

          <p>
            I&apos;m a quick learner when something
            genuinely interests me. I also tend
            to overthink and chase perfection, so
            I&apos;m learning to keep moving, build
            consistently and let imperfect work
            become part of the process.
          </p>
        </div>
      </div>

      <div
        className="about-word"
        aria-hidden="true"
      >
        CURIOUS
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section
      className="section skills-section"
      id="skills"
    >
      <div className="section-index">
        02 / SKILLS
      </div>

      <div className="story-title">
        <p className="micro">
          What I know — and how I work.
        </p>

        <h2>
          Technical skills are only{" "}
          <span>half the story.</span>
        </h2>
      </div>

      <div className="skills-columns">
        <div>
          <div className="subheading">
            TECHNICAL / BUILDING WITH
          </div>

          <div className="skill-list">
            {technicalSkills.map((skill, i) => (
              <Reveal
                key={skill}
                delay={i * 0.025}
              >
                <div className="skill-row">
                  <span>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <strong>{skill}</strong>

                  <i>↗</i>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="soft-skills">
          <div className="subheading">
            HOW I WORK
          </div>

          {softSkills.map((skill, i) => (
            <Reveal
              key={skill.title}
              delay={i * 0.03}
            >
              <article className="soft-skill">
                <span>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3>{skill.title}</h3>
                  <p>{skill.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section
      className="section work-section"
      id="work"
    >
      <div className="section-index">
        03 / WORK
      </div>

      <div className="work-heading">
        <p className="micro">
          One project. One story. More to come.
        </p>

        <h2>
          City<span>Pulse.</span>
        </h2>
      </div>

      <Reveal>
        <article className="featured-project">
          <div className="project-visual">
            <div
              className="project-word"
              aria-hidden="true"
            >
              CITYPULSE
            </div>

            <div className="dashboard-window">
              <div className="dashboard-top">
                <span>CityPulse</span>
                <span>
                  URBAN MOBILITY / 2026
                </span>
              </div>

              <div className="dashboard-grid">
                <div className="metric metric-large">
                  <small>FOCUS</small>
                  <b>TRAFFIC</b>
                  <span>
                    patterns · peaks · anomalies
                  </span>
                </div>

                <div className="metric">
                  <small>STACK</small>
                  <b>PY / SQL</b>
                  <span>
                    analysis + data workflow
                  </span>
                </div>

                <div className="chart">
                  <div className="chart-line" />

                  <div className="chart-bars">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>

                  <span className="chart-caption">
                    JUNCTION / TIME / FLOW
                  </span>
                </div>
              </div>

              <div className="dashboard-footer">
                <span>
                  {project.tags.join(" · ")}
                </span>

                <span>LIVE DATA STORY</span>
              </div>
            </div>
          </div>

          <div className="project-info">
            <div>
              <span className="project-kicker">
                {project.number} / {project.status}
              </span>

              <h3>
                {project.title}
                <small>
                  {project.subtitle}
                </small>
              </h3>

              <p>{project.description}</p>
            </div>

            <div className="project-actions">
              <MagneticLink
                href={project.live}
                className="action-link"
              >
                LIVE DEMO <span>↗</span>
              </MagneticLink>

              <MagneticLink
                href={project.github}
                className="action-link"
              >
                GITHUB <span>↗</span>
              </MagneticLink>
            </div>
          </div>
        </article>
      </Reveal>
    </section>
  );
}

function Achievements() {
  return (
    <section
      className="section achievements"
      id="achievements"
    >
      <div className="section-index">
        04 / ACHIEVEMENTS
      </div>

      <div className="achievement-heading">
        <p className="micro">
          Things that happened outside the
          syllabus.
        </p>

        <h2>
          Small milestones.
          <br />
          <span>Real ones.</span>
        </h2>
      </div>

      <div className="achievement-list">
        {achievements.map((item) => (
          <Reveal key={item.number}>
            <article className="achievement-row">
              <span className="achievement-number">
                {item.number}
              </span>

              <div className="achievement-main">
                <span>{item.type}</span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>

              {item.file ? (
                <a
                  className="achievement-mark"
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${item.title}`}
                >
                  ↗
                </a>
              ) : (
                <span className="achievement-mark">
                  —
                </span>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  const [active, setActive] = useState(0);

  const activeCert = certifications[active];

  return (
    <section
      className="section credentials"
      id="certifications"
    >
      <div className="section-index">
        05 / CERTIFICATIONS
      </div>

      <div className="story-title">
        <p className="micro">
          An archive, not a trophy wall.
        </p>

        <h2>
          Learning is already{" "}
          <span>in motion.</span>
        </h2>
      </div>

      <div className="credentials-layout">
        <div
          className="credential-list"
          role="list"
        >
          {certifications.map((cert, i) => (
            <button
              className={`credential-item ${
                active === i ? "active" : ""
              }`}
              key={cert.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              type="button"
            >
              <span>
                {String(i + 1).padStart(2, "0")}
              </span>

              <strong>{cert.title}</strong>

              <em>{cert.category}</em>
            </button>
          ))}
        </div>

        <motion.div
          className="credential-preview"
          key={activeCert.title}
          initial={{
            opacity: 0,
            x: 22,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.45,
          }}
        >
          <div className="preview-top">
            <span>
              {activeCert.category}
            </span>

            <span>
              {String(active + 1).padStart(2, "0")}
              {" / "}
              {String(
                certifications.length
              ).padStart(2, "0")}
            </span>
          </div>

          <div className="preview-mark">
            ✦
          </div>

          <div>
            <h3>{activeCert.title}</h3>

            <p>{activeCert.issuer}</p>

            <small>
              {activeCert.detail}
            </small>
          </div>

          {activeCert.file ? (
            <a
              className="preview-link"
              href={activeCert.file}
              target="_blank"
              rel="noopener noreferrer"
            >
              VIEW CREDENTIAL ↗
            </a>
          ) : (
            <span className="preview-muted">
              Credential file not supplied
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      className="section contact"
      id="contact"
    >
      <div
        className="contact-glow"
        aria-hidden="true"
      />

      <div className="section-index">
        06 / CONTACT
      </div>

      <p className="micro">
        Open to conversations, collaborations
        &amp; opportunities.
      </p>

      <h2>
        Let&apos;s make the
        <br />
        <span>next  thing.</span>
      </h2>

      <div className="contact-bottom">
        <p>
          The portfolio is a work in progress —
          just like the person behind it. For
          conversations about AI, data and
          building, find me here.
        </p>

        <div className="socials">
          <MagneticLink href={socialLinks.linkedin}>
            LINKEDIN ↗
          </MagneticLink>

          <MagneticLink href={socialLinks.github}>
            GITHUB ↗
          </MagneticLink>

          <MagneticLink href={socialLinks.email}>
            EMAIL ↗
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();

  const progress = useSpring(
    scrollYProgress,
    {
      stiffness: 120,
      damping: 30,
      mass: 0.2,
    }
  );

  return (
    <div className="site">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progress }}
      />

      <div className="grain" />

      <Nav />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />

        <section className="statement-section">
          <Reveal>
            <p>
              Still learning.
              <br />
              <span>Still building.</span>
              <br />
              Still figuring it out.
            </p>
          </Reveal>
        </section>

        <Contact />
      </main>

      <footer className="footer">
        <span>PUSHPIKA LAKRA</span>
        <span>
          AI × DATA × COMPUTER SCIENCE
        </span>
        <span>2026</span>
      </footer>
    </div>
  );
}