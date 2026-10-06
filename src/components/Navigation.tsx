import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface NavigationProps {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}

export default function Navigation({ isMobileMenuOpen, setIsMobileMenuOpen }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    // Check viewport
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 768)
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  useEffect(() => {
    if (!navRef.current) return

    const nav = navRef.current
    
    const onScroll = () => {
      const scrollY = window.scrollY
      setScrolled(scrollY > 100)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    
    // Initial animation
    gsap.fromTo(
      nav.querySelectorAll('.nav-item, .nav-logo, .nav-status'),
      { y: -30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 2.6
      }
    )

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      const offset = 80
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1.5rem, 5vw, 5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          background: scrolled ? 'rgba(10, 10, 10, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.03)' : '1px solid transparent'
        }}
      >
        {/* Logo */}
        <a 
          href="#"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
            letterSpacing: '0.15em',
            color: '#f5f5f0',
            opacity: 0
          }}
          data-cursor="hover"
        >
          VIDIT YADAV
        </a>

        {/* Desktop Navigation */}
        {isDesktop && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(2rem, 4vw, 4rem)' }}>
            {/* Nav Items */}
            <div style={{ display: 'flex', gap: 'clamp(1.5rem, 3vw, 3rem)' }}>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-item"
                  onClick={(e) => { e.preventDefault(); scrollToSection(item.href) }}
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#8a8a8a',
                    opacity: 0,
                    transition: 'color 0.3s ease',
                    position: 'relative'
                  }}
                  data-cursor="hover"
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f5f5f0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#8a8a8a')}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Status Indicator */}
            <div 
              className="nav-status"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: 0
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#4ade80',
                  boxShadow: '0 0 10px rgba(74, 222, 128, 0.5)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
              />
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#5a5a5a'
                }}
              >
                Available
              </span>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        {!isDesktop && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: 0,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              zIndex: 101
            }}
            data-cursor="hover"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              style={{
                width: 24,
                height: 1,
                background: '#f5f5f0',
                transition: 'all 0.3s ease',
                transform: isMobileMenuOpen ? 'rotate(45deg) translateY(4.5px)' : 'none'
              }}
            />
            <span
              style={{
                width: 24,
                height: 1,
                background: '#f5f5f0',
                transition: 'all 0.3s ease',
                transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'none'
              }}
            />
          </button>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0a0a0a',
          zIndex: 99,
          display: isMobileMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          opacity: isMobileMenuOpen ? 1 : 0,
          transition: 'opacity 0.4s ease'
        }}
      >
        {navItems.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => { e.preventDefault(); scrollToSection(item.href) }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2rem, 8vw, 4rem)',
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: '#f5f5f0',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ease ${i * 0.1}s`
            }}
            data-cursor="hover"
          >
            {item.label}
          </a>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  )
}
