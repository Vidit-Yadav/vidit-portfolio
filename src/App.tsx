import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Cursor from './components/Cursor'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import SelectedWork from './components/SelectedWork'
import Expertise from './components/Expertise'
import About from './components/About'
import Services from './components/Services'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // ScrollTrigger integration with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2500)

    return () => {
      clearTimeout(timer)
      lenis.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [])

  // Pause Lenis during loading
  useEffect(() => {
    if (lenisRef.current) {
      if (isLoaded) {
        lenisRef.current.start()
      } else {
        lenisRef.current.stop()
      }
    }
  }, [isLoaded])

  return (
    <>
      <Cursor />
      <LoadingScreen isLoaded={isLoaded} />
      
      <div className={`app ${isLoaded ? 'loaded' : ''}`}>
        <Navigation 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <main>
          <Hero />
          <Manifesto />
          <SelectedWork />
          <Expertise />
          <About />
          <Services />
          <Process />
          <Contact />
        </main>
        
        <Footer />
      </div>

      <style>{`
        .app {
          opacity: 0;
          transition: opacity 0.6s var(--ease-out-expo);
        }
        .app.loaded {
          opacity: 1;
        }
      `}</style>
    </>
  )
}

export default App
