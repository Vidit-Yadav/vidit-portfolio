import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(
      '.about-label',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      '.about-title',
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      '.about-text',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(
      '.about-visual',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo(
      '.about-details > *',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.8'
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 15vw, 12rem) 0',
        background: '#0a0a0a',
        overflow: 'hidden'
      }}
    >
      {/* Background Accent */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(180deg, rgba(201, 165, 92, 0.02) 0%, transparent 100%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center'
          }}
        >
          {/* Left Column - Visual */}
          <div 
            className="about-visual"
            style={{
              gridColumn: 'span 5',
              position: 'relative'
            }}
          >
            <div 
              ref={imageRef}
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                background: '#141414',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              {/* Abstract portrait representation */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    radial-gradient(circle at 50% 30%, rgba(201, 165, 92, 0.15) 0%, transparent 50%),
                    linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)
                  `
                }}
              />
              {/* Initials */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(4rem, 10vw, 8rem)',
                  fontWeight: 700,
                  color: 'rgba(201, 165, 92, 0.1)',
                  letterSpacing: '0.1em'
                }}
              >
                VY
              </div>
              {/* Decorative elements */}
              <div
                style={{
                  position: 'absolute',
                  top: '2rem',
                  left: '2rem',
                  right: '2rem',
                  bottom: '2rem',
                  border: '1px solid rgba(201, 165, 92, 0.1)',
                  borderRadius: '2px'
                }}
              />
            </div>

            {/* Floating accent */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                border: '1px solid rgba(201, 165, 92, 0.3)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite'
              }}
            />
          </div>

          {/* Right Column - Content */}
          <div 
            style={{
              gridColumn: 'span 7',
              paddingLeft: 'clamp(0rem, 5vw, 4rem)'
            }}
          >
            <span
              className="about-label"
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#c9a55c',
                display: 'block',
                marginBottom: '1.5rem'
              }}
            >
              About
            </span>

            <h2
              className="about-title"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#f5f5f0',
                marginBottom: '2.5rem'
              }}
            >
              Building at the intersection of design & engineering
            </h2>

            <div className="about-text" style={{ maxWidth: '560px' }}>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.8,
                  color: '#8a8a8a',
                  marginBottom: '1.5rem'
                }}
              >
                I'm a full-stack developer with a strong design and visual background 
                who bridges the gap between engineering precision and creative vision.
              </p>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.8,
                  color: '#8a8a8a',
                  marginBottom: '1.5rem'
                }}
              >
                With expertise spanning React ecosystems, backend architectures, 
                UI/UX design, motion graphics, and 3D web experiences, I bring a 
                holistic approach to every project.
              </p>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.8,
                  color: '#8a8a8a'
                }}
              >
                My work philosophy centers on creating digital experiences where 
                every technical decision serves the creative vision, and every 
                design choice is grounded in engineering reality.
              </p>
            </div>

            {/* Details */}
            <div 
              className="about-details"
              style={{
                marginTop: '3rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '2rem'
              }}
            >
              {[
                { label: 'Based in', value: 'India' },
                { label: 'Focus', value: 'Premium Web Experiences' },
                { label: 'Languages', value: 'English, Hindi' },
                { label: 'Availability', value: 'Select Projects' }
              ].map((detail, i) => (
                <div key={i}>
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
                    {detail.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'var(--text-sm)',
                      color: '#f5f5f0'
                    }}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </section>
  )
}
