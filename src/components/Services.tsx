import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: '01',
    title: 'Custom Web Development',
    description: 'Bespoke websites and web applications built from the ground up, tailored to your specific needs and goals.',
    price: 'From $3,000',
    timeline: '4-8 weeks'
  },
  {
    id: '02',
    title: 'Shopify & E-Commerce',
    description: 'High-converting online stores with premium design, seamless checkout, and powerful store management.',
    price: 'From $4,000',
    timeline: '6-10 weeks'
  },
  {
    id: '03',
    title: 'UI / UX Design',
    description: 'Strategic interface design that balances aesthetics with usability, creating experiences users love.',
    price: 'From $2,500',
    timeline: '3-6 weeks'
  },
  {
    id: '04',
    title: 'Creative Development',
    description: 'Bringing designs to life with immersive animations, 3D experiences, and cutting-edge web technologies.',
    price: 'From $3,500',
    timeline: '4-8 weeks'
  },
  {
    id: '05',
    title: '3D / Motion Experiences',
    description: 'WebGL-powered 3D environments and cinematic motion design that captivate and engage.',
    price: 'From $5,000',
    timeline: '6-12 weeks'
  },
  {
    id: '06',
    title: 'WordPress Development',
    description: 'Custom themes, plugins, and headless WordPress solutions for flexible content management.',
    price: 'From $2,000',
    timeline: '3-6 weeks'
  },
  {
    id: '07',
    title: 'Framer Development',
    description: 'Rapid, premium website development using Framer for fast deployment without compromising quality.',
    price: 'From $1,500',
    timeline: '2-4 weeks'
  },
  {
    id: '08',
    title: 'Web Security & Optimization',
    description: 'Performance tuning, security audits, and optimization to ensure your site is fast and safe.',
    price: 'From $1,000',
    timeline: '1-3 weeks'
  }
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeService, setActiveService] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      '.services-header',
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
      '.service-item',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-list',
          start: 'top 80%'
        }
      }
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(6rem, 15vw, 12rem) 0',
        background: '#0d0d0d'
      }}
    >
      {/* Background Grid */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none'
        }}
      />

      <div className="container">
        {/* Header */}
        <div 
          className="services-header"
          style={{
            marginBottom: 'clamp(4rem, 10vw, 6rem)',
            textAlign: 'center'
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
            Services
          </span>
          <h2
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              color: '#f5f5f0',
              marginBottom: '1.5rem'
            }}
          >
            What I Offer
          </h2>
          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'var(--text-base)',
              color: '#8a8a8a',
              maxWidth: '500px',
              margin: '0 auto'
            }}
          >
            Premium digital services tailored for ambitious brands seeking exceptional results.
          </p>
        </div>

        {/* Services Grid */}
        <div 
          className="services-list"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}
        >
          {services.map((service, index) => (
            <article
              key={service.id}
              className="service-item"
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
              style={{
                position: 'relative',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                background: activeService === index ? '#141414' : '#0d0d0d',
                transition: 'background 0.4s ease',
                cursor: 'pointer'
              }}
              data-cursor="hover"
            >
              {/* Service Number */}
              <span
                style={{
                  position: 'absolute',
                  top: 'clamp(1rem, 2vw, 1.5rem)',
                  right: 'clamp(1rem, 2vw, 1.5rem)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 'var(--text-xs)',
                  color: '#3a3a3a',
                  transition: 'color 0.3s ease'
                }}
              >
                {service.id}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 600,
                  fontSize: 'var(--text-lg)',
                  color: '#f5f5f0',
                  marginBottom: '1rem',
                  paddingRight: '3rem'
                }}
              >
                {service.title}
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
                {service.description}
              </p>

              {/* Meta */}
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.1em',
                    color: activeService === index ? '#c9a55c' : '#5a5a5a',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {service.price}
                </span>
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.1em',
                    color: '#5a5a5a'
                  }}
                >
                  {service.timeline}
                </span>
              </div>

              {/* Hover Accent */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '3px',
                  background: '#c9a55c',
                  transform: activeService === index ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'bottom',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </article>
          ))}
        </div>

        {/* Note */}
        <p
          style={{
            marginTop: '3rem',
            textAlign: 'center',
            fontFamily: 'Space Mono, monospace',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
            color: '#5a5a5a'
          }}
        >
          Pricing varies based on project scope and complexity. Let's discuss your specific needs.
        </p>
      </div>
    </section>
  )
}
