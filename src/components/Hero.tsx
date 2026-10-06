import { useEffect, useRef, Suspense, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

gsap.registerPlugin(ScrollTrigger)

// Hook to detect reduced motion preference
function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  return reducedMotion
}

// Hook to detect touch device
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  
  return isTouch
}

// 3D Monogram Component
function Monogram() {
  const meshRef = useRef<THREE.Group>(null)
  const { viewport, mouse } = useThree()
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    // Subtle rotation based on mouse position
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.y * 0.1,
      0.05
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 0.15,
      0.05
    )
    
    // Continuous subtle animation
    meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={meshRef} scale={viewport.width > 10 ? 1 : viewport.width * 0.1}>
        {/* V Shape */}
        <VLetter position={[0, 0, 0]} />
      </group>
    </Float>
  )
}

function VLetter({ position }: { position: [number, number, number] }) {
  const meshRefs = useRef<THREE.Mesh[]>([])
  
  useFrame((state) => {
    meshRefs.current.forEach((mesh) => {
      if (mesh) {
        mesh.rotation.y = state.clock.elapsedTime * 0.1
      }
    })
  })

  const roundedBoxGeometry = new RoundedBoxGeometry(0.4, 2.5, 0.3, 4, 0.05)

  return (
    <group position={position}>
      {/* Left arm */}
      <mesh position={[-0.8, 0.5, 0]} rotation={[0, 0, Math.PI * 0.15]}>
        <primitive object={roundedBoxGeometry} attach="geometry" />
        <MeshDistortMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          distort={0.1}
          speed={1}
        />
      </mesh>
      
      {/* Right arm */}
      <mesh position={[0.8, 0.5, 0]} rotation={[0, 0, -Math.PI * 0.15]}>
        <primitive object={roundedBoxGeometry.clone()} attach="geometry" />
        <MeshDistortMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          distort={0.1}
          speed={1}
        />
      </mesh>
      
      {/* Center connection */}
      <mesh position={[0, -0.8, 0]} rotation={[0, 0, Math.PI * 0.5]}>
        <primitive object={new RoundedBoxGeometry(0.35, 1.2, 0.3, 4, 0.05)} attach="geometry" />
        <MeshDistortMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          distort={0.1}
          speed={1}
        />
      </mesh>
      
      {/* Accent glow ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#c9a55c" transparent opacity={0.3} />
      </mesh>
      
      {/* Outer ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#c9a55c" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

// Particle field
function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 200
  
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }
  
  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#c9a55c"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const isTouch = useIsTouchDevice()
  const shouldShow3D = !reducedMotion && !isTouch

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return

    const tl = gsap.timeline({ delay: 2.8 })
    
    // Animate title
    tl.fromTo(
      titleRef.current.querySelectorAll('.line'),
      { y: 120, skewY: 5 },
      {
        y: 0,
        skewY: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out'
      }
    )
    .fromTo(
      subtitleRef.current.querySelectorAll('.reveal'),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out'
      },
      '-=0.6'
    )
    .fromTo(
      '.hero-cta',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      },
      '-=0.4'
    )

    // Parallax on scroll
    if (canvasRef.current) {
      gsap.to(canvasRef.current, {
        y: 200,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })
    }

    gsap.to(titleRef.current, {
      y: -100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'center top',
        end: 'bottom top',
        scrub: 1
      }
    })
  }, [])

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0a0a0a 100%)'
      }}
    >
      {/* Grid Background */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)'
        }}
      />

      {/* 3D Canvas */}
      {shouldShow3D && (
        <div 
          ref={canvasRef}
          style={{
            position: 'absolute',
            right: '-5%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(400px, 60vw, 900px)',
            height: 'clamp(400px, 60vw, 900px)',
            opacity: 0.8
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#f5f5f0" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c9a55c" />
              <spotLight
                position={[0, 10, 0]}
                angle={0.3}
                penumbra={1}
                intensity={1}
                color="#c9a55c"
              />
              <Monogram />
              <Particles />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
        </div>
      )}

      {/* Fallback for reduced motion / touch devices */}
      {!shouldShow3D && (
        <div 
          ref={canvasRef}
          style={{
            position: 'absolute',
            right: '-5%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(200px, 40vw, 500px)',
            height: 'clamp(200px, 40vw, 500px)',
            opacity: 0.3
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            border: '1px solid rgba(201, 165, 92, 0.2)',
            borderRadius: '50%',
            animation: 'pulse 4s ease-in-out infinite'
          }} />
        </div>
      )}

      {/* Content */}
      <div 
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: 'clamp(6rem, 15vw, 10rem)',
          paddingBottom: 'clamp(4rem, 10vw, 8rem)'
        }}
      >
        {/* Main Title */}
        <div 
          ref={titleRef}
          style={{
            marginBottom: 'clamp(2rem, 5vw, 4rem)'
          }}
        >
          <div className="line" style={{ overflow: 'hidden' }}>
            <h1
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(4rem, 15vw, 14rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                color: '#f5f5f0',
                marginBottom: '0.05em'
              }}
            >
              VIDIT
            </h1>
          </div>
          <div className="line" style={{ overflow: 'hidden' }}>
            <h1
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(4rem, 15vw, 14rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.03em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(245, 245, 240, 0.4)',
                marginLeft: 'clamp(2rem, 10vw, 12rem)'
              }}
            >
              YADAV
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <div 
          ref={subtitleRef}
          style={{
            maxWidth: '600px',
            marginLeft: 'auto'
          }}
        >
          <div className="reveal" style={{ overflow: 'hidden' }}>
            <span
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
              Creative Developer
            </span>
          </div>
          <div className="reveal" style={{ overflow: 'hidden' }}>
            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'var(--text-lg)',
                lineHeight: 1.6,
                color: '#8a8a8a',
                maxWidth: '480px'
              }}
            >
              I design and engineer high-performance digital experiences 
              where design, engineering, and motion operate as one system.
            </p>
          </div>
          
          {/* CTA */}
          <div className="hero-cta" style={{ marginTop: '3rem', display: 'flex', gap: '2rem' }}>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#f5f5f0',
                padding: '1rem 2rem',
                border: '1px solid rgba(245, 245, 240, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              data-cursor="hover"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(245, 245, 240, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(245, 245, 240, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(245, 245, 240, 0.2)'
              }}
            >
              View Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 'clamp(2rem, 5vw, 4rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <span
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#5a5a5a'
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 60,
            background: 'linear-gradient(to bottom, #5a5a5a, transparent)',
            animation: 'scrollLine 2s ease-in-out infinite'
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes scrollLine {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(0.6); }
        }
      `}</style>
    </section>
  )
}
