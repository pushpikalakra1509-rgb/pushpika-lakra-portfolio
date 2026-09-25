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
  education,
  project,
  softSkills,
  socialLinks,
  technicalSkills,
} from "@/data/portfolio";

const navItems = [
  ["ABOUT", "about"],
  ["SKILLS", "skills"],
  ["WORK", "work"],
  ["CERTIFICATIONS", "certifications"],
  ["EDUCATION", "education"],
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
  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      event.key.toLowerCase() === "p" &&
      event.target instanceof HTMLElement &&
      !["INPUT", "TEXTAREA"].includes(event.target.tagName)
    ) {
      document
        .getElementById("ask-pushpika")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
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
            src="/pushpika-lakra-portfolio/pushpika-portrait.png"
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
      <a
        href="/pushpika-lakra-portfolio/resume/Pushpika-Lakra-Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="resume-button"
      >
        DOWNLOAD CV ↗
      </a>
    </section>
    
  );
}

function Education() {
  return (
    <section className="section education-section" id="education">
      <div className="section-index">06 / EDUCATION</div>

      <div className="story-title">
        <p className="micro">The foundation behind the work.</p>
        <h2>
          Learning with <span>purpose.</span>
        </h2>
      </div>

      <div className="education-list">
        {education.map((item) => (
          <article className="education-row" key={item.number}>
            <div className="education-number">{item.number}</div>

            <div className="education-main">
              <p className="micro">{item.status}</p>
              <h3>{item.degree}</h3>
              <h4>{item.field}</h4>
              <p>{item.institution}</p>

              {item.affiliation && (
                <small>{item.affiliation}</small>
              )}
            </div>

            <div className="education-detail">
              {item.detail}
            </div>
          </article>
        ))}
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
function AskPushpika() {
  const questions = [
  {
    question: "What is Pushpika currently studying?",
    keywords: [
      "study",
      "studying",
      "msc",
      "master",
      "masters",
      "degree",
      "university",
      "current degree",
    ],
    answer:
      "Pushpika is currently pursuing an MSc in Artificial Intelligence & Data Science at Indira University.",
  },

  {
    question: "What did Pushpika study for her bachelor's?",
    keywords: [
      "bachelor",
      "bachelors",
      "bachelor's",
      "bsc",
      "computer science degree",
      "undergraduate",
      "college",
      "christ college",
      "cgpa",
    ],
    answer:
      "Pushpika completed a B.Sc. in Computer Science from Christ College, Pune, affiliated with Savitribai Phule Pune University, with a CGPA of 9.27/10.",
  },

  {
    question: "Tell me about CityPulse.",
    keywords: [
      "citypulse",
      "traffic project",
      "urban mobility",
      "urban traffic",
      "traffic analytics",
      "traffic analysis",
      "data project",
      "streamlit project",
    ],
    answer:
      "CityPulse is an end-to-end urban traffic analytics project built with Python, Pandas, SQL, statistical analysis, Plotly and Streamlit. It explores congestion patterns, rush hours, anomalies and junction-level traffic behaviour.",
  },

  {
    question: "What are Pushpika's technical skills?",
    keywords: [
      "technical skills",
      "technical",
      "programming",
      "programming languages",
      "python",
      "sql",
      "machine learning",
      "generative ai",
      "power bi",
      "data visualization",
      "data analytics",
      "artificial intelligence",
    ],
    answer:
      "Her technical areas include Artificial Intelligence, Data & Analytics, Python, SQL, Generative AI, Machine Learning, Data Visualization, Power BI and Research.",
  },

  {
    question: "What are Pushpika's soft skills?",
    keywords: [
      "soft skills",
      "team management",
      "communication",
      "leadership",
      "collaboration",
      "organisation",
      "organization",
      "problem solving",
      "adaptability",
      "learning mindset",
    ],
    answer:
      "Her soft skills include Team Management, Communication, Leadership, Collaboration, Organisation, Problem Solving, Adaptability and a strong Learning Mindset.",
  },

  {
    question: "What leadership experience does Pushpika have?",
    keywords: [
      "leadership experience",
      "leadership",
      "science association",
      "organising head",
      "organizing head",
      "event coordination",
      "team management experience",
    ],
    answer:
      "Pushpika served as Organising Head of her college Science Association, where she led and coordinated the organising team and developed experience in team management, communication, leadership and event coordination.",
  },

  {
    question: "What practical experience does Pushpika have?",
    keywords: [
      "experience",
      "practical experience",
      "internship",
      "training",
      "evolvability",
      "c programming",
      "code reading",
      "college project",
    ],
    answer:
      "Her practical experience includes a 40-hour C Programming & Code Reading internship/training experience with Evolvability Tech Pvt. Ltd. in 2024, along with a three-month college project experience involving team-based practical work.",
  },

  {
    question: "What certifications does Pushpika have?",
    keywords: [
      "certifications",
      "certificates",
      "certificate",
      "ai certification",
      "machine learning certification",
      "generative ai certification",
      "power bi certification",
      "research certification",
    ],
    answer:
      "Her certifications and training include AI–Machine Learning Engineer Foundation, Getting Started with Generative AI from IBM SkillsBuild, Create Image Captioning Models, Power BI for Beginners, Research Methodology for Computer Science, Red Hat Java EE, Business Email, Graphic Design Essentials, Canva's Visual Suite, and C Programming & Code Reading.",
  },

  {
    question: "What is Pushpika currently exploring?",
    keywords: [
      "exploring",
      "currently learning",
      "learning",
      "interests",
      "career interests",
      "future",
      "what is she interested in",
    ],
    answer:
      "She is currently exploring AI, data science, generative AI and practical ways to turn technical ideas into useful projects.",
  },

  {
    question: "How can I contact Pushpika?",
    keywords: [
      "contact",
      "email",
      "linkedin",
      "github",
      "connect",
      "reach",
      "message",
    ],
    answer:
      "You can connect with Pushpika through LinkedIn, GitHub or email. Her contact links are available in the Contact section of this portfolio.",
  },
];
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [input, setInput] = useState("");

  const handleAsk = () => {
  const query = input.trim().toLowerCase();

  if (!query) return;

  const normalizedQuery = query
    .replace(/[?!.,]/g, "")
    .replace(/\s+/g, " ");

  const aliases = [
    {
      match: ["who is pushpika", "tell me about pushpika", "about pushpika"],
      index: 0,
    },
    {
      match: [
        "education",
        "where did she study",
        "where does she study",
        "academic background",
        "qualification",
      ],
      index: 1,
    },
    {
      match: [
        "citypulse",
        "what did she build",
        "what projects",
        "her project",
        "projects",
      ],
      index: 2,
    },
    {
      match: [
        "skills",
        "what does she know",
        "what can she do",
        "technologies",
        "tech stack",
        "technical abilities",
      ],
      index: 3,
    },
    {
      match: [
        "soft skills",
        "how does she work",
        "strengths",
        "personal skills",
      ],
      index: 4,
    },
    {
      match: [
        "leadership",
        "leader",
        "organising",
        "organizing",
        "science association",
      ],
      index: 5,
    },
    {
      match: [
        "experience",
        "internship",
        "work experience",
        "practical experience",
      ],
      index: 6,
    },
    {
      match: [
        "certifications",
        "certificates",
        "courses",
        "training",
      ],
      index: 7,
    },
    {
      match: [
        "interests",
        "what is she learning",
        "what is she exploring",
        "what is she working toward",
      ],
      index: 8,
    },
    {
      match: [
        "contact",
        "email",
        "linkedin",
        "github",
        "how can i reach her",
        "how do i contact her",
      ],
      index: 9,
    },
  ];

  const aliasMatch = aliases.find((group) =>
    group.match.some((phrase) =>
      normalizedQuery.includes(phrase)
    )
  );

  if (aliasMatch) {
    setActiveQuestion(aliasMatch.index);
    setInput("");
    return;
  }

  const keywordMatch = questions.findIndex((item) =>
    item.keywords.some((keyword) =>
      normalizedQuery.includes(keyword.toLowerCase())
    )
  );

  if (keywordMatch !== -1) {
    setActiveQuestion(keywordMatch);
  }

  setInput("");
};
  return (
    <section className="section ask-pushpika" id="ask-pushpika">
      <div className="section-index">
        07 / ASK PUSHPIKA
      </div>

      <p className="micro">A SMALL PORTFOLIO ASSISTANT</p>

      <div className="ask-layout">
        <div>
          <h2>
            Ask
            <br />
            <span>Pushpika.</span>
          </h2>

          <p className="ask-intro">
            Ask about my work, skills, education or what I&apos;m currently
            exploring.
          </p>
        </div>

        <div className="ask-card">
          <div className="ask-card-top">
            <span>PORTFOLIO / AI ASSISTANT</span>
            <span>● ONLINE</span>
          </div>

          <div className="ask-answer">
            <p className="ask-label">PUSHPika&apos;S ASSISTANT</p>

            <p className="ask-user-question">
              {questions[activeQuestion].question}
            </p>

            <p className="ask-response">
              {questions[activeQuestion].answer}
            </p>
          </div>

          <div className="ask-input-row">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleAsk();
                }
              }}
              placeholder="Ask about Pushpika, her work, skills or projects..."
              aria-label="Ask something about Pushpika"
            />

            <button type="button" onClick={handleAsk}>
              ASK ↗
            </button>
          </div>

          <div className="ask-questions">
            {questions.slice(0, 5).map((item, index) =>  (
              <button
                key={item.question}
                type="button"
                className={activeQuestion === index ? "active" : ""}
                onClick={() => setActiveQuestion(index)}
              >
                <span>0{index + 1}</span>
                {item.question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function HowIBuiltThis() {
  const buildSteps = [
    {
      number: "01",
      title: "IDEA",
      text: "I wanted the portfolio to feel more like an interactive experience than a traditional resume page.",
    },
    {
      number: "02",
      title: "DESIGN",
      text: "The visual direction combines an editorial layout, cinematic typography, dark surfaces and subtle motion.",
    },
    {
      number: "03",
      title: "BUILD",
      text: "Built with Next.js, TypeScript, React and CSS, with reusable components for the main portfolio sections.",
    },
    {
      number: "04",
      title: "AI-ASSISTED",
      text: "AI was used as a development collaborator for generating ideas, code, debugging and iterating on the interface.",
    },
    {
      number: "05",
      title: "ITERATE",
      text: "The portfolio was repeatedly tested and adjusted, especially for responsive behaviour and mobile layouts.",
    },
    {
      number: "06",
      title: "DEPLOY",
      text: "The final site is deployed through GitHub Pages with an automated GitHub Actions workflow.",
    },
  ];

  return (
    <section className="section build-section" id="how-i-built-this">
      <div className="section-index">
        07 / HOW I BUILT THIS
      </div>

      <div className="build-heading">
        <div>
          <p className="micro">THE PROCESS BEHIND THE PORTFOLIO</p>

          <h2>
            Built,
            <br />
            <span>not just designed.</span>
          </h2>
        </div>

        <p className="build-intro">
          This portfolio is also an experiment in learning by building —
          using technology, iteration and AI as part of the process.
        </p>
      </div>

      <div className="build-grid">
        {buildSteps.map((step) => (
          <article className="build-card" key={step.number}>
            <span className="build-number">{step.number}</span>

            <h3>{step.title}</h3>

            <p>{step.text}</p>
          </article>
        ))}
      </div>

      <div className="build-stack">
        <span>STACK</span>

        <div>
          <b>Next.js</b>
          <b>React</b>
          <b>TypeScript</b>
          <b>CSS</b>
          <b>GitHub</b>
          <b>GitHub Pages</b>
          <b>AI-assisted development</b>
        </div>
      </div>
    </section>
  );
}
function FloatingAskButton() {
  return (
    <a
      href="#ask-pushpika"
      className="floating-ask-button"
      aria-label="Ask Pushpika"
    >
      ASK PUSHPIKA <span>↗</span>
    </a>
  );
}
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<
    "idle" | "transmitting" | "sent"
  >("idle");

  const handleTransmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!name.trim() || !email.trim() || !message.trim()) {
    return;
  }

  setStatus("transmitting");

  try {
    const response = await fetch(
      "https://formspree.io/f/mwlpqybl",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          reason,
          message,
        }),
      }
    );

    if (response.ok) {
      setStatus("sent");
    } else {
      setStatus("idle");
      alert("Something went wrong. Please try again.");
    }
  } catch {
    setStatus("idle");
    alert("Unable to transmit signal. Please try again.");
  }
};

  return (
    <section className="section contact" id="contact">
      <div className="contact-glow" aria-hidden="true" />

      <div className="section-index">
        08 / CONTACT
      </div>

      <p className="micro">
        Open to conversations, collaborations &amp; opportunities.
      </p>

      <h2>
        Let&apos;s make the
        <br />
        <span>next thing.</span>
      </h2>

      <div className="contact-bottom">
        <div className="contact-message">
          <p>
            Have a project idea, opportunity, question or simply want to
            connect?
          </p>

          <div className="signal-status">
            <span className="signal-dot" />
            DIRECT CHANNEL AVAILABLE
          </div>

          <div className="socials">
            <div className="social-item">
              <span>LINKEDIN</span>
              <MagneticLink href={socialLinks.linkedin}>
                linkedin.com/in/pushpika-lakra-022079374 ↗
              </MagneticLink>
            </div>

            <div className="social-item">
              <span>EMAIL</span>
              <MagneticLink href={socialLinks.email}>
                pushpikalakra1509@gmail.com ↗
              </MagneticLink>
            </div>

            <div className="social-item">
              <span>GITHUB</span>
              <MagneticLink href={socialLinks.github}>
                github.com/pushpikalakra1509-rgb ↗
              </MagneticLink>
            </div>
          </div>
        </div>

        <form
          className={`signal-form ${
            status === "sent" ? "signal-form-sent" : ""
          }`}
          onSubmit={handleTransmit}
        >
          {status === "sent" ? (
            <div className="signal-success">
              <div className="signal-success-icon">
                ✓
              </div>

              <p className="signal-label">
                SIGNAL RECEIVED
              </p>

              <h3>
                Message transmitted.
              </h3>

              <p>
                Your message has been prepared for Pushpika.
                Thank you for reaching out.
              </p>

              <button
                type="button"
                className="signal-reset"
                onClick={() => {
                  setStatus("idle");
                  setName("");
                  setEmail("");
                  setReason("");
                  setMessage("");
                }}
              >
                SEND ANOTHER ↗
              </button>
            </div>
          ) : (
            <>
              <div className="signal-form-top">
                <span>DIRECT CHANNEL</span>

                <span>
                  {status === "transmitting"
                    ? "● TRANSMITTING"
                    : "● READY"}
                </span>
              </div>

              <div className="signal-field">
                <label htmlFor="signal-name">
                  YOUR NAME
                </label>

                <input
                  id="signal-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  disabled={status === "transmitting"}
                />
              </div>

              <div className="signal-field">
                <label htmlFor="signal-email">
                  YOUR EMAIL
                </label>

                <input
                  id="signal-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={status === "transmitting"}
                />
              </div>

              <div className="signal-field">
                <label>
                  WHAT IS THIS ABOUT?
                </label>

                <div className="signal-reasons">
                  {[
                    "INTERNSHIP",
                    "PROJECT",
                    "COLLABORATION",
                    "OTHER",
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={
                        reason === item
                          ? "active"
                          : ""
                      }
                      onClick={() => setReason(item)}
                      disabled={
                        status === "transmitting"
                      }
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="signal-field">
                <label htmlFor="signal-message">
                  MESSAGE
                </label>

                <textarea
                  id="signal-message"
                  name="message"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Tell me what’s on your mind..."
                  rows={5}
                  required
                  disabled={status === "transmitting"}
                />
              </div>

              <button
                type="submit"
                className="signal-submit"
                disabled={status === "transmitting"}
              >
                {status === "transmitting"
                  ? "TRANSMITTING..."
                  : "TRANSMIT ↗"}
              </button>

              {status === "transmitting" && (
                <div className="signal-progress">
                  <span />
                </div>
              )}
            </>
          )}
        </form>
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
        <FloatingAskButton />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Certifications />
        <Education/>
        <AskPushpika/>
        <HowIBuiltThis />
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