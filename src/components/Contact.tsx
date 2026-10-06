import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    })

    tl.fromTo(
      '.cta-label',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      '.cta-line',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      '.cta-text',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      '.cta-actions',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      '.cta-social',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.3'
    )
  }, [])

  const handleEmailClick = () => {
    window.location.href = 'mailto:vidityadav@example.com'
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        padding: 'clamp(8rem, 20vw, 16rem) 0',
        background: '#0a0a0a',
        overflow: 'hidden'
      }}
    >
      {/* Background Elements */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 100%, rgba(201, 165, 92, 0.08) 0%, transparent 60%)
          `,
          pointerEvents: 'none'
        }}
      />

      {/* Grid Pattern */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Label */}
        <span
          className="cta-label"
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#c9a55c',
            display: 'block',
            textAlign: 'center',
            marginBottom: 'clamp(3rem, 8vw, 6rem)'
          }}
        >
          Let's Collaborate
        </span>

        {/* Main CTA */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(4rem, 10vw, 8rem)' }}>
          <div style={{ overflow: 'hidden' }}>
            <h2
              className="cta-line"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(3rem, 10vw, 10rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                color: '#f5f5f0',
                marginBottom: '0.1em'
              }}
            >
              HAVE AN IDEA
            </h2>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h2
              className="cta-line"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(3rem, 10vw, 10rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(245, 245, 240, 0.4)',
                marginBottom: '0.1em'
              }}
            >
              WORTH
            </h2>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h2
              className="cta-line"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(3rem, 10vw, 10rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                color: '#f5f5f0',
                marginBottom: '0.1em'
              }}
            >
              BUILDING?
            </h2>
          </div>
        </div>

        {/* Sub CTA */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 5rem)' }}>
          <div style={{ overflow: 'hidden' }}>
            <p
              className="cta-text"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                fontWeight: 300,
                color: '#8a8a8a',
                lineHeight: 1.4
              }}
            >
              Let's make it <span style={{ color: '#c9a55c' }}>real.</span>
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div 
          className="cta-actions"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(1rem, 3vw, 2rem)',
            flexWrap: 'wrap',
            marginBottom: 'clamp(4rem, 10vw, 6rem)'
          }}
        >
          <button
            onClick={handleEmailClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: 'Space Mono, monospace',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#0a0a0a',
              background: '#f5f5f0',
              padding: 'clamp(1rem, 2vw, 1.25rem) clamp(2rem, 4vw, 3rem)',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            data-cursor="hover"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#c9a55c'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f5f5f0'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5L10 11L17 5M3 5H17V15H3V5Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Start a Conversation
          </button>

          <a
            href="#"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              fontFamily: 'Space Mono, monospace',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#f5f5f0',
              padding: 'clamp(1rem, 2vw, 1.25rem) clamp(2rem, 4vw, 3rem)',
              border: '1px solid rgba(245, 245, 240, 0.2)',
              borderRadius: '2px',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            data-cursor="hover"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(201, 165, 92, 0.5)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245, 245, 240, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M6 10L14 10M14 10L10 6M14 10L10 14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            View LinkedIn
          </a>
        </div>

        {/* Social Links */}
        <div 
          className="cta-social"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(2rem, 5vw, 4rem)'
          }}
        >
          {[
            { label: 'LinkedIn', href: '#' },
            { label: 'GitHub', href: '#' },
            { label: 'Dribbble', href: '#' },
            { label: 'Twitter', href: '#' }
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#5a5a5a',
                transition: 'color 0.3s ease',
                position: 'relative'
              }}
              data-cursor="hover"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c9a55c'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#5a5a5a'
              }}
            >
              {social.label}
              <span
                style={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '100%',
                  height: '1px',
                  background: '#c9a55c',
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.3s ease'
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
