import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoadingScreenProps {
  isLoaded: boolean
}

export default function LoadingScreen({ isLoaded }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current || !progressRef.current) return

    // Animate text
    gsap.fromTo(
      textRef.current.querySelectorAll('.char'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.3
      }
    )

    // Animate progress
    gsap.to(progressRef.current, {
      scaleX: 1,
      duration: 2,
      ease: 'power2.inOut',
      delay: 0.5
    })
  }, [])

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      const tl = gsap.timeline()
      
      tl.to(textRef.current?.querySelectorAll('.char') || [], {
        y: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.in'
      })
      .to(progressRef.current, {
        scaleX: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      }, '-=0.3')
      .to(containerRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power3.inOut'
      })
      .set(containerRef.current, { display: 'none' })
    }
  }, [isLoaded])

  const chars = 'VIDIT'.split('')

  return (
    <div 
      ref={containerRef}
      className="loading-screen"
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0a0a',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem'
      }}
    >
      <div 
        ref={textRef}
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(3rem, 10vw, 8rem)',
          fontWeight: 700,
          letterSpacing: '0.3em',
          color: '#f5f5f0',
          display: 'flex',
          gap: '0.05em'
        }}
      >
        {chars.map((char, i) => (
          <span 
            key={i} 
            className="char"
            style={{ 
              display: 'inline-block',
              opacity: 0
            }}
          >
            {char}
          </span>
        ))}
      </div>
      
      <div 
        style={{
          width: '200px',
          height: '1px',
          background: 'rgba(255,255,255,0.1)',
          overflow: 'hidden'
        }}
      >
        <div 
          ref={progressRef}
          style={{
            width: '100%',
            height: '100%',
            background: '#c9a55c',
            transform: 'scaleX(0)',
            transformOrigin: 'left'
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
