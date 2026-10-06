import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: '01',
    title: 'Suncube AI',
    category: 'AI Platform / Dashboard',
    role: 'Lead Developer',
    tech: ['React', 'Vite', 'TypeScript'],
    description: 'Solar energy management platform with AI-powered insights, customer portals, and technician ecosystems.',
    color: '#0f172a',
    accent: '#60a5fa'
  },
  {
    id: '02',
    title: 'House of Serene',
    category: 'E-Commerce / Luxury',
    role: 'Full-Stack Developer',
    tech: ['Shopify', 'Liquid', 'JavaScript'],
    description: 'Premium Dubai-based interiors brand featuring luxury rugs, tables, and décor with sophisticated digital presence.',
    color: '#1c1917',
    accent: '#d4a574'
  },
  {
    id: '03',
    title: 'Suri Agro Fresh',
    category: 'Brand Web Experience',
    role: 'Creative Developer',
    tech: ['React', 'Three.js', 'GSAP'],
    description: 'Conversion-focused agricultural brand experience combining editorial design with immersive web interactions.',
    color: '#14532d',
    accent: '#86efac'
  },
  {
    id: '04',
    title: 'Lyfberry',
    category: 'Brand Identity / Digital',
    role: 'Designer & Developer',
    tech: ['Figma', 'Framer', 'Webflow'],
    description: 'Premium acai bowl brand with sophisticated visual identity spanning packaging, digital, and social direction.',
    color: '#2d1b4e',
    accent: '#c4b5fd'
  }
]

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate section header
    gsap.fromTo(
      '.work-header',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    )

    // Stagger project items
    gsap.fromTo(
      '.project-item',
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-list',
          start: 'top 80%'
        }
      }
    )
  }, [])

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (activeProject !== index) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
    })
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 15vw, 12rem) 0',
        background: '#0a0a0a'
      }}
    >
      <div className="container">
        {/* Header */}
        <div 
          className="work-header"
          style={{
            marginBottom: 'clamp(4rem, 10vw, 8rem)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '2rem'
          }}
        >
          <div>
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#c9a55c',
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              Selected Work
            </span>
            <h2
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: '#f5f5f0'
              }}
            >
              Recent Projects
            </h2>
          </div>
          <div
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em',
              color: '#5a5a5a',
              maxWidth: '300px',
              textAlign: 'right'
            }}
          >
            A curated selection of digital experiences built with precision and purpose.
          </div>
        </div>

        {/* Projects List */}
        <div className="projects-list" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 5vw, 4rem)' }}>
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-item"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => { setActiveProject(null); setMousePos({ x: 0, y: 0 }) }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              style={{
                position: 'relative',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                paddingBottom: 'clamp(2rem, 5vw, 4rem)',
                cursor: 'pointer'
              }}
              data-cursor="view"
            >
              {/* Project Number */}
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 'clamp(4rem, 10vw, 8rem)',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.02)',
                  lineHeight: 1,
                  transition: 'color 0.5s ease',
                  ...(activeProject === index && { color: 'rgba(201, 165, 92, 0.05)' })
                }}
              >
                {project.id}
              </span>

              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: 'clamp(1rem, 3vw, 2rem)',
                  alignItems: 'center'
                }}
              >
                {/* Project Visual Placeholder */}
                <div 
                  style={{
                    gridColumn: 'span 5',
                    aspectRatio: '16/10',
                    background: project.color,
                    borderRadius: '4px',
                    overflow: 'hidden',
                    position: 'relative',
                    transform: `perspective(1000px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
                    transition: 'transform 0.1s ease-out, box-shadow 0.5s ease',
                    boxShadow: activeProject === index 
                      ? `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}20` 
                      : '0 0 0 0 transparent'
                  }}
                >
                  {/* Abstract visual representation */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `linear-gradient(135deg, ${project.accent}30 0%, transparent 50%, ${project.accent}10 100%)`,
                      opacity: activeProject === index ? 1 : 0.3,
                      transition: 'opacity 0.5s ease'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) scale(${activeProject === index ? 1.1 : 1})`,
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'clamp(1rem, 3vw, 2rem)',
                      fontWeight: 700,
                      color: project.accent,
                      letterSpacing: '0.1em',
                      opacity: 0.5,
                      transition: 'transform 0.5s ease, opacity 0.5s ease'
                    }}
                  >
                    {project.title.split(' ')[0]}
                  </div>
                </div>

                {/* Project Info */}
                <div 
                  style={{
                    gridColumn: 'span 7',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                  }}
                >
                  {/* Title & Category */}
                  <div>
                    <h3
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 600,
                        fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                        lineHeight: 1.1,
                        color: '#f5f5f0',
                        marginBottom: '0.5rem',
                        transform: `translateX(${activeProject === index ? mousePos.x * 0.05 : 0}px)`,
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      {project.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: 'var(--text-xs)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: '#5a5a5a'
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'var(--text-base)',
                      lineHeight: 1.7,
                      color: '#8a8a8a',
                      maxWidth: '500px',
                      transform: `translateX(${activeProject === index ? mousePos.x * 0.03 : 0}px)`,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Meta Info */}
                  <div 
                    style={{
                      display: 'flex',
                      gap: 'clamp(1.5rem, 4vw, 3rem)',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '0.65rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: '#5a5a5a',
                          display: 'block',
                          marginBottom: '0.5rem'
                        }}
                      >
                        Role
                      </span>
                      <span
                        style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: 'var(--text-sm)',
                          color: '#f5f5f0'
                        }}
                      >
                        {project.role}
                      </span>
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '0.65rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: '#5a5a5a',
                          display: 'block',
                          marginBottom: '0.5rem'
                        }}
                      >
                        Stack
                      </span>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            style={{
                              fontFamily: 'Space Mono, monospace',
                              fontSize: '0.65rem',
                              color: project.accent,
                              padding: '0.25rem 0.5rem',
                              border: `1px solid ${project.accent}30`,
                              borderRadius: '2px'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* View Project Link */}
                  <div style={{ marginTop: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'Space Mono, monospace',
                        fontSize: 'var(--text-xs)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: activeProject === index ? project.accent : '#5a5a5a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transform: `translateX(${activeProject === index ? 10 : 0}px)`,
                        transition: 'transform 0.3s ease, color 0.3s ease'
                      }}
                    >
                      View Case Study
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none"
                        style={{ transform: activeProject === index ? 'translateX(5px)' : 'none', transition: 'transform 0.3s ease' }}
                      >
                        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div 
          style={{
            marginTop: 'clamp(4rem, 10vw, 6rem)',
            textAlign: 'center'
          }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: 'Space Mono, monospace',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#f5f5f0',
              padding: '1.25rem 2.5rem',
              border: '1px solid rgba(245, 245, 240, 0.2)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            data-cursor="hover"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(245, 245, 240, 0.05)'
              e.currentTarget.style.borderColor = 'rgba(201, 165, 92, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(245, 245, 240, 0.2)'
            }}
          >
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  )
}
