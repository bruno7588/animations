import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import './Confetti.css'

/*
 * Confetti rain - extracted from the 5Mins.ai program launch success screen.
 *
 * 60 pieces across 3 depth tiers (far = small/slow/dim, near = big/fast) give
 * a flat rain a parallax feel. GSAP drives three tweens per piece: a fall with
 * fade in/out, a synced spin + 3D tumble, and a continuous side-sway. Pieces
 * spawn for RAIN_S seconds, then in-flight ones finish their fall.
 *
 * Deterministic (sine-hash instead of Math.random), so every mount looks the
 * same. Respects prefers-reduced-motion via gsap.matchMedia (no rain).
 *
 * Drop it into any positioned container (it fills the parent, ignores pointer
 * events). A radial mask in the CSS keeps pieces out of the centre so they
 * never cross your headline / CTA - tune the ellipse to your safe zone.
 */

const COLORS = ['#FFBB38', '#00CEE6', '#DF1642', '#18A957', '#8158EC', '#FF7A45']

// New pieces spawn for this long; in-flight ones then finish their fall.
const RAIN_S = 3

// Deterministic pseudo-random so the burst is identical every mount.
const rand = (n) => {
  const x = Math.sin(n * 999.13) * 43758.5453
  return x - Math.floor(x)
}

// Depth tiers - far pieces are smaller, slower, dimmer; near ones bigger, faster.
const TIERS = [
  { scale: 0.65, opacity: 0.75, durMin: 2.2, durSpan: 0.9 }, // far
  { scale: 0.85, opacity: 0.9, durMin: 1.7, durSpan: 0.8 }, // mid
  { scale: 1.1, opacity: 1, durMin: 1.2, durSpan: 0.7 }, // near
]

const CONFETTI = Array.from({ length: 60 }, (_, i) => {
  const tier = TIERS[Math.floor(rand(i + 23) * TIERS.length)]
  const delay = rand(i + 7) * 0.7
  const duration = tier.durMin + rand(i + 13) * tier.durSpan
  // Falls started before the RAIN_S mark complete; nothing respawns after it.
  const plays = Math.max(1, Math.ceil((RAIN_S - delay) / duration))
  return {
    left: rand(i) * 100, // scattered anywhere across the width
    delay,
    duration,
    plays,
    color: COLORS[i % COLORS.length],
    round: rand(i + 17) < 0.34,
    scale: tier.scale,
    opacity: tier.opacity,
    // 2D spin: multiple turns, random direction + amount.
    rot: (rand(i + 3) < 0.5 ? -1 : 1) * (360 + Math.round(rand(i + 5) * 720)),
    // Flutter: horizontal sway + 3D tumble.
    swayAmp: (rand(i + 43) < 0.5 ? -1 : 1) * (16 + rand(i + 29) * 44), // +/-16-60px
    swayDur: 0.6 + rand(i + 31) * 0.7, // 0.6-1.3s per half swing
    tumbleX: 180 + Math.round(rand(i + 37) * 540),
    tumbleY: 180 + Math.round(rand(i + 41) * 540),
  }
})

/** When the very last in-flight piece lands (ms). Use it to unmount the layer. */
export const CONFETTI_DURATION_MS =
  Math.max(...CONFETTI.map((c) => c.delay + c.plays * c.duration)) * 1000

export default function Confetti() {
  const layerRef = useRef(null)

  useGSAP(
    () => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const pieces = layerRef.current?.querySelectorAll('.confetti__piece') ?? []
        pieces.forEach((el, i) => {
          const c = CONFETTI[i]
          gsap.set(el, { scale: c.scale, transformPerspective: 600, autoAlpha: 0 })
          // Fall: restarts per play until the rain window closes, then runs out.
          gsap.to(el, {
            keyframes: {
              '0%': { y: '-10vh', autoAlpha: 0 },
              '8%': { autoAlpha: c.opacity },
              '90%': { autoAlpha: c.opacity },
              '100%': { y: '110vh', autoAlpha: 0 },
              easeEach: 'none',
            },
            duration: c.duration,
            delay: c.delay,
            repeat: c.plays - 1,
            ease: 'none',
          })
          // Spin + 3D tumble, synced to each fall.
          gsap.to(el, {
            rotation: c.rot,
            rotationX: c.tumbleX,
            rotationY: c.tumbleY,
            duration: c.duration,
            delay: c.delay,
            repeat: c.plays - 1,
            ease: 'none',
          })
          // Sway drifts side-to-side continuously, unsynced for variety.
          gsap.to(el, { x: c.swayAmp, duration: c.swayDur, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        })
      })
    },
    { scope: layerRef },
  )

  return (
    <div ref={layerRef} className="confetti" aria-hidden="true">
      {CONFETTI.map((c, i) => (
        <span
          key={i}
          className={`confetti__piece${c.round ? ' confetti__piece--round' : ''}`}
          style={{ left: `${c.left}%`, background: c.color }}
        />
      ))}
    </div>
  )
}
