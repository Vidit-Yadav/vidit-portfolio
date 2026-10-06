import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return

    const lines = textRef.current.querySelectorAll('.reveal-line')
    
    lines.forEach((line, i) => {
      gsap.fromTo(
        line,
        { 
          y: 100,
          opacity: 0,
          clipPath: 'inset(0 0 100% 0)'
        },
        {
          y: 0,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          },
          delay: i % 2 === 0 ? 0 : 0.1
        }
      )
    })

    // Parallax effect on background
    gsap.to('.manifesto-bg', {
      y: 150,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="manifesto-bg"
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 15vw, 12rem) 0',
        overflow: 'hidden'
      }}
    >
      {/* Background accent */}
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201, 165, 92, 0.1), transparent)'
        }}
      />

      <div className="container">
        <div ref={textRef}>
          {/* Label */}
          <div 
            className="reveal-line"
            style={{
              marginBottom: 'clamp(3rem, 8vw, 6rem)'
            }}
          >
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#c9a55c'
              }}
            >
              Philosophy
            </span>
          </div>

          {/* Main Statement */}
          <div 
            className="reveal-line"
            style={{
              marginBottom: 'clamp(4rem, 10vw, 8rem)'
            }}
          >
            <h2
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#f5f5f0',
                maxWidth: '1000px'
              }}
            >
              Code is the medium.{' '}
              <span style={{ color: '#c9a55c' }}>Design</span> is the language.{' '}
              The browser is the canvas.
            </h2>
          </div>

          {/* Supporting Text */}
          <div 
            className="reveal-line"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)'
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.8,
                  color: '#8a8a8a',
                  marginBottom: '1.5rem'
                }}
              >
                I don't just build websites. I craft digital experiences where 
                every interaction, every transition, every pixel serves a purpose.
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.8,
                  color: '#8a8a8a',
                  marginBottom: '1.5rem'
                }}
              >
                My work sits at the intersection of engineering precision and 
                creative vision — building experiences that are as technically 
                excellent as they are visually compelling.
              </p>
            </div>
          </div>

          {/* Stats/Highlights */}
          <div 
            className="reveal-line"
            style={{
              marginTop: 'clamp(4rem, 10vw, 8rem)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)',
              paddingTop: 'clamp(3rem, 8vw, 5rem)',
              borderTop: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            {[
              { value: '6+', label: 'Years Experience' },
              { value: '50+', label: 'Projects Delivered' },
              { value: 'Full', label: 'Stack Capabilities' },
              { value: 'Premium', label: 'Client Focus' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    color: '#f5f5f0',
                    marginBottom: '0.5rem'
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#5a5a5a'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
