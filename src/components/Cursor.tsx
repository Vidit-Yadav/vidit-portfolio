import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

type CursorVariant = 'default' | 'hover' | 'view' | 'drag' | 'link' | 'project' | 'text'

interface CursorProps {}

export default function Cursor({}: CursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorTextRef = useRef<HTMLSpanElement>(null)
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Check if touch device
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    // Set initial positions off-screen
    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 })

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Animation loop
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.15
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.15

      gsap.set(cursor, { x: posRef.current.x, y: posRef.current.y })
      gsap.set(dot, { x: targetRef.current.x, y: targetRef.current.y })

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    // Hover handlers for interactive elements
    const addHoverListeners = () => {
      const hoverElements = document.querySelectorAll('a, button, [data-cursor="hover"]')
      const viewElements = document.querySelectorAll('[data-cursor="view"]')
      const dragElements = document.querySelectorAll('[data-cursor="drag"]')
      const linkElements = document.querySelectorAll('[data-cursor="link"]')
      const projectElements = document.querySelectorAll('[data-cursor="project"]')
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span:not(.no-select)')

      hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => setVariant('hover'))
        el.addEventListener('mouseleave', () => setVariant('default'))
      })

      viewElements.forEach(el => {
        el.addEventListener('mouseenter', () => setVariant('view'))
        el.addEventListener('mouseleave', () => setVariant('default'))
      })

      dragElements.forEach(el => {
        el.addEventListener('mouseenter', () => setVariant('drag'))
        el.addEventListener('mouseleave', () => setVariant('default'))
      })

      linkElements.forEach(el => {
        el.addEventListener('mouseenter', () => setVariant('link'))
        el.addEventListener('mouseleave', () => setVariant('default'))
      })

      projectElements.forEach(el => {
        el.addEventListener('mouseenter', () => setVariant('project'))
        el.addEventListener('mouseleave', () => setVariant('default'))
      })

      textElements.forEach(el => {
        el.addEventListener('mouseenter', () => setVariant('text'))
        el.addEventListener('mouseleave', () => setVariant('default'))
      })
    }

    // Initial setup and re-apply on mutations
    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [isTouchDevice, isVisible])

  if (isTouchDevice) return null

  const size = variant === 'default' ? 12 : variant === 'text' ? 8 : 60
  const opacity = isVisible ? 1 : 0

  return (
    <>
      {/* Outer ring cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: size,
          height: size,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity,
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, border 0.3s',
          background: variant === 'hover' ? 'rgba(201, 165, 92, 0.1)' : 
                     variant === 'view' ? 'transparent' :
                     variant === 'project' ? 'rgba(201, 165, 92, 0.2)' : 'transparent',
          border: variant === 'hover' ? '1px solid rgba(201, 165, 92, 0.5)' :
                  variant === 'view' ? '1px solid rgba(245, 245, 240, 0.3)' :
                  variant === 'project' ? '1px solid rgba(201, 165, 92, 0.8)' :
                  '1px solid rgba(245, 245, 240, 0.5)',
          mixBlendMode: 'difference',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {variant === 'view' && (
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              color: '#f5f5f0',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              mixBlendMode: 'difference'
            }}
          >
            VIEW
          </span>
        )}
        {variant === 'drag' && (
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              color: '#f5f5f0',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              mixBlendMode: 'difference'
            }}
          >
            DRAG
          </span>
        )}
        {variant === 'link' && (
          <span
            ref={cursorTextRef}
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              color: '#f5f5f0',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              mixBlendMode: 'difference'
            }}
          >
            →
          </span>
        )}
      </div>

      {/* Inner dot cursor */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: '#c9a55c',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity,
          mixBlendMode: 'normal'
        }}
      />

      <style>{`
        @media (pointer: coarse) {
          .cursor, .cursor-dot { display: none !important; }
        }
      `}</style>
    </>
  )
}
