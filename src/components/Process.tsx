import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Deep dive into your goals, audience, and vision. Understanding the "why" before building the "what".',
    details: ['Stakeholder interviews', 'Audience research', 'Competitive analysis', 'Technical requirements']
  },
  {
    number: '02',
    title: 'Define',
    description: 'Transform insights into a clear strategy. Mapping user journeys and defining success metrics.',
    details: ['User personas', 'Information architecture', 'Content strategy', 'Technical specifications']
  },
  {
    number: '03',
    title: 'Design',
    description: 'Visual exploration meets strategic thinking. Creating interfaces that are both beautiful and functional.',
    details: ['Wireframing', 'Visual design', 'Design systems', 'Prototyping']
  },
  {
    number: '04',
    title: 'Engineer',
    description: 'Building with precision and best practices. Clean code, scalable architecture, seamless integrations.',
    details: ['Frontend development', 'Backend development', 'API integrations', 'Database design']
  },
  {
    number: '05',
    title: 'Animate',
    description: 'Adding life through motion. Transitions, micro-interactions, and immersive 3D experiences.',
    details: ['Motion design', '3D environments', 'Interactive elements', 'Performance optimization']
  },
  {
    number: '06',
    title: 'Deploy',
    description: 'Launching with confidence. Rigorous testing, security hardening, and seamless deployment.',
    details: ['Quality assurance', 'Performance testing', 'Security audit', 'Deployment automation']
  },
  {
    number: '07',
    title: 'Optimize',
    description: 'Continuous improvement. Monitoring, analytics, and iterative enhancements.',
    details: ['Performance monitoring', 'User analytics', 'A/B testing', 'Ongoing support']
  }
]

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return

    // Animate the vertical line on scroll
    gsap.fromTo(
      lineRef.current,
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1
        }
      }
    )

    // Animate each step
    processSteps.forEach((_, index) => {
      gsap.fromTo(
        `.process-step-${index}`,
        { 
          opacity: 0, 
          x: -40 
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: `.process-step-${index}`,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 15vw, 12rem) 0',
        background: '#0a0a0a',
        overflow: 'hidden'
      }}
    >
      {/* Background Gradient */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201, 165, 92, 0.1), transparent)',
          transform: 'translateY(-50%)'
        }}
      />

      <div className="container">
        {/* Header */}
        <div 
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
              Process
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
              How I Work
            </h2>
          </div>
          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'var(--text-base)',
              color: '#8a8a8a',
              maxWidth: '400px',
              lineHeight: 1.7
            }}
          >
            A refined process refined through years of delivering exceptional digital experiences.
          </p>
        </div>

        {/* Process Steps */}
        <div 
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 5vw, 4rem)'
          }}
        >
          {/* Vertical Line (Desktop) */}
          <div 
            ref={lineRef}
            style={{
              display: 'none',
              position: 'absolute',
              left: '50%',
              top: 0,
              width: '1px',
              background: 'linear-gradient(180deg, #c9a55c, transparent)',
              transform: 'translateX(-50%)',
              zIndex: 0
            }}
            className="process-line-desktop"
          />

          {processSteps.map((step, index) => (
            <div 
              key={step.number}
              className={`process-step-${index}`}
              style={{
                position: 'relative',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                background: index % 2 === 0 ? '#0d0d0d' : 'transparent',
                borderRadius: '4px',
                zIndex: 1
              }}
            >
              {/* Step Number */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}
              >
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 700,
                    color: 'rgba(201, 165, 92, 0.2)',
                    lineHeight: 1
                  }}
                >
                  {step.number}
                </span>
                <div
                  style={{
                    width: 40,
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(201, 165, 92, 0.5), transparent)'
                  }}
                />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: 'var(--text-xl)',
                  color: '#f5f5f0',
                  marginBottom: '1rem'
                }}
              >
                {step.title}
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
                {step.description}
              </p>

              {/* Details */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {step.details.map((detail) => (
                  <li 
                    key={detail}
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '0.7rem',
                      letterSpacing: '0.05em',
                      color: '#5a5a5a',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <span 
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: '#c9a55c',
                        opacity: 0.5
                      }}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .process-line-desktop {
            display: block !important;
          }
        }
      `}</style>
    </section>
  )
}
