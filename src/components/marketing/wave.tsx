'use client'

import { useEffect, useRef } from 'react'

export default function MorphingBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Handle interactive gradient if needed
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const interactive = containerRef.current.querySelector('.interactive') as HTMLElement
      if (interactive) {
        interactive.style.transform = `translate(${x}px, ${y}px)`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-black via-black to-[#001242]">
      {/* SVG Filter */}
      <svg className="fixed top-0 left-0 w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
          </filter>
        </defs>
      </svg>

      {/* Gradients Container */}
      <div className="w-full h-full" style={{ filter: 'url(#goo) blur(40px)' }}>
        {/* Gradient 1 */}
        <div 
          className="absolute w-4/5 h-4/5 top-[10%] left-[10%] opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 192, 18, 0.8) 0, rgba(255, 137, 18, 0) 50%)',
            mixBlendMode: 'hard-light',
            animation: 'moveVertical 30s ease infinite'
          }}
        />

        {/* Gradient 2 */}
        <div 
          className="absolute w-4/5 h-4/5 top-[10%] left-[10%] opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(221,74,255,0.8) 0, rgba(221,74,255,0) 50%)',
            mixBlendMode: 'hard-light',
            transformOrigin: 'calc(50% - 400px)',
            animation: 'moveInCircle 20s reverse infinite'
          }}
        />

        {/* Gradient 3 */}
        <div 
          className="absolute w-4/5 h-4/5 top-[calc(10%+200px)] left-[calc(10%-500px)] opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 108, 100, 0.84) 0, rgba(100,220,255,0) 50%)',
            mixBlendMode: 'hard-light',
            transformOrigin: 'calc(50% + 400px)',
            animation: 'moveInCircle 40s linear infinite'
          }}
        />

        {/* Gradient 4 */}
        <div 
          className="absolute w-4/5 h-4/5 top-[10%] left-[10%] opacity-70"
          style={{
            background: 'radial-gradient(circle at center, rgba(200,50,50,0.8) 0, rgba(200,50,50,0) 50%)',
            mixBlendMode: 'hard-light',
            transformOrigin: 'calc(50% - 200px)',
            animation: 'moveHorizontal 40s ease infinite'
          }}
        />

        {/* Gradient 5 */}
        <div 
          className="absolute w-[160%] h-[160%] top-[-30%] left-[-30%] opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(180,180,50,0.8) 0, rgba(180,180,50,0) 50%)',
            mixBlendMode: 'hard-light',
            transformOrigin: 'calc(50% - 800px) calc(50% + 200px)',
            animation: 'moveInCircle 20s ease infinite'
          }}
        />

        {/* Interactive Gradient */}
        <div 
          className="interactive absolute w-full h-full top-[-50%] left-[-50%] opacity-70"
          style={{
            background: 'radial-gradient(circle at center, rgba(140,100,255,0.8) 0, rgba(140,100,255,0) 50%)',
            mixBlendMode: 'hard-light'
          }}
        />
      </div>
    </div>
  )
}