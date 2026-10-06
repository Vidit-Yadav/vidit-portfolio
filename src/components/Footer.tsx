import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    gsap.fromTo(
      '.footer-content > *',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%'
        }
      }
    )
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 10vw, 6rem) 0 clamp(2rem, 5vw, 3rem)',
        background: '#080808',
        borderTop: '1px solid rgba(255,255,255,0.03)'
      }}
    >
      <div className="container">
        <div className="footer-content">
          {/* Top Row */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'clamp(2rem, 5vw, 4rem)',
              marginBottom: 'clamp(4rem, 10vw, 6rem)'
            }}
          >
            {/* Brand */}
            <div>
              <h3
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: 'var(--text-xl)',
                  letterSpacing: '0.1em',
                  color: '#f5f5f0',
                  marginBottom: '0.75rem'
                }}
              >
                VIDIT YADAV
              </h3>
              <p
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#5a5a5a',
                  lineHeight: 1.6
                }}
              >
                Full-Stack Developer<br />
                Creative Developer
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#c9a55c',
                  marginBottom: '1.5rem'
                }}
              >
                Navigation
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Work', 'Expertise', 'About', 'Services', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'var(--text-sm)',
                      color: '#8a8a8a',
                      transition: 'color 0.3s ease'
                    }}
                    data-cursor="hover"
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8a8a')}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#c9a55c',
                  marginBottom: '1.5rem'
                }}
              >
                Services
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Custom Web Development',
                  'Shopify & E-Commerce',
                  'UI / UX Design',
                  'Creative Development',
                  '3D / Motion'
                ].map((item) => (
                  <span
                    key={item}
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'var(--text-sm)',
                      color: '#8a8a8a'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#c9a55c',
                  marginBottom: '1.5rem'
                }}
              >
                Connect
              </h4>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: 'Email', href: 'mailto:vidityadav@example.com' },
                  { label: 'LinkedIn', href: '#' },
                  { label: 'GitHub', href: '#' },
                  { label: 'Dribbble', href: '#' }
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: 'var(--text-sm)',
                      color: '#8a8a8a',
                      transition: 'color 0.3s ease'
                    }}
                    data-cursor="hover"
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f0')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8a8a')}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Divider */}
          <div 
            style={{
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
              marginBottom: 'clamp(2rem, 5vw, 3rem)'
            }}
          />

          {/* Bottom Row */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2rem',
                flexWrap: 'wrap'
              }}
            >
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 'var(--text-xs)',
                  letterSpacing: '0.1em',
                  color: '#5a5a5a'
                }}
              >
                © {currentYear} Vidit Yadav. All rights reserved.
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              {/* Availability Status */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 8px rgba(74, 222, 128, 0.5)'
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#5a5a5a'
                  }}
                >
                  Available for select projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Top Border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #c9a55c, transparent)'
        }}
      />
    </footer>
  )
}
