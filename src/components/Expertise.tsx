import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    id: '01',
    title: 'Digital Experiences',
    description: 'Creating immersive web experiences that captivate and convert through thoughtful design and cutting-edge technology.',
    technologies: ['React', 'Next.js', 'Vue.js', 'Three.js', 'GSAP', 'WebGL'],
    icon: '◈'
  },
  {
    id: '02',
    title: 'Full-Stack Engineering',
    description: 'Building robust, scalable applications from database architecture to frontend interfaces with modern frameworks.',
    technologies: ['Node.js', 'Python', 'Django', 'Laravel', 'Ruby on Rails', 'PostgreSQL'],
    icon: '⬡'
  },
  {
    id: '03',
    title: 'Commerce',
    description: 'Developing high-converting e-commerce experiences that blend beautiful design with seamless checkout flows.',
    technologies: ['Shopify', 'WordPress', 'WooCommerce', 'Stripe', 'Headless Commerce'],
    icon: '◆'
  },
  {
    id: '04',
    title: 'UI / UX Design',
    description: 'Crafting intuitive interfaces and experiences that balance aesthetics with functionality and accessibility.',
    technologies: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility'],
    icon: '◇'
  },
  {
    id: '05',
    title: 'Motion & 3D',
    description: 'Bringing interfaces to life through purposeful animation and immersive 3D web experiences.',
    technologies: ['GSAP', 'Framer Motion', 'Three.js', 'R3F', 'Cinema 4D', 'After Effects'],
    icon: '◎'
  },
  {
    id: '06',
    title: 'Web Security',
    description: 'Implementing robust security measures and best practices to protect applications and user data.',
    technologies: ['SSL/TLS', 'OWASP', 'Authentication', 'API Security', 'Performance Optimization'],
    icon: '◉'
  }
]

export default function Expertise() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      '.expertise-header',
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

    gsap.fromTo(
      '.capability-item',
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.capabilities-grid',
          start: 'top 80%'
        }
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="expertise"
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 15vw, 12rem) 0',
        background: '#0d0d0d'
      }}
    >
      {/* Background Pattern */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(201, 165, 92, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(201, 165, 92, 0.02) 0%, transparent 40%)
          `,
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Header */}
        <div 
          className="expertise-header"
          style={{
            marginBottom: 'clamp(4rem, 10vw, 8rem)'
          }}
        >
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
            Capabilities
          </span>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#f5f5f0',
              maxWidth: '600px'
            }}
          >
            What I Build
          </h2>
        </div>

        {/* Capabilities Grid */}
        <div 
          className="capabilities-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}
        >
          {capabilities.map((cap, index) => (
            <article
              key={cap.id}
              className="capability-item"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{
                position: 'relative',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                background: activeIndex === index ? '#141414' : 'transparent',
                border: '1px solid',
                borderColor: activeIndex === index ? 'rgba(201, 165, 92, 0.2)' : 'rgba(255,255,255,0.05)',
                borderRadius: '4px',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'default'
              }}
              data-cursor="hover"
            >
              {/* Icon */}
              <div
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '1.5rem',
                  color: activeIndex === index ? '#c9a55c' : '#3a3a3a',
                  marginBottom: '1.5rem',
                  transition: 'color 0.4s ease'
                }}
              >
                {cap.icon}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: 'var(--text-xl)',
                  color: '#f5f5f0',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 'var(--text-xs)',
                    color: '#5a5a5a'
                  }}
                >
                  {cap.id}
                </span>
                {cap.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.7,
                  color: '#8a8a8a',
                  marginBottom: '1.5rem'
                }}
              >
                {cap.description}
              </p>

              {/* Technologies */}
              <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  opacity: activeIndex === index ? 1 : 0.5,
                  transform: activeIndex === index ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.4s ease'
                }}
              >
                {cap.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      color: '#8a8a8a',
                      padding: '0.35rem 0.75rem',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '2px',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover Accent Line */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #c9a55c, transparent)',
                  transform: activeIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </article>
          ))}
        </div>

        {/* Tech Stack Visual */}
        <div 
          className="expertise-header"
          style={{
            marginTop: 'clamp(6rem, 15vw, 10rem)'
          }}
        >
          <h3
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 500,
              fontSize: 'var(--text-lg)',
              color: '#5a5a5a',
              textAlign: 'center',
              marginBottom: '3rem'
            }}
          >
            Technologies I Work With
          </h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 'clamp(0.75rem, 2vw, 1.5rem)'
            }}
          >
            {[
              'React', 'Next.js', 'Node.js', 'Python', 'Django', 
              'Laravel', 'Vue.js', 'PostgreSQL', 'Shopify', 'WordPress',
              'Framer', 'Figma', 'GSAP', 'Three.js', 'AWS', 'Vercel', 'Supabase'
            ].map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.1em',
                  color: '#8a8a8a',
                  padding: '0.5rem 1rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 165, 92, 0.3)'
                  e.currentTarget.style.color = '#c9a55c'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.color = '#8a8a8a'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
