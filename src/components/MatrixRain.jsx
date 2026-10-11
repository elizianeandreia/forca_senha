import { useEffect, useRef } from 'react'

const GLYPHS = Array.from(
  'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789',
)

const LEVEL_COLORS = {
  idle: [0, 255, 140],
  critical: [255, 90, 110],
  weak: [255, 150, 80],
  fair: [241, 200, 106],
  strong: [87, 225, 210],
  excellent: [0, 255, 110],
}

const FONT_SIZE = 16
const FRAME_INTERVAL = 1000 / 28
const STATIC_STEPS = 90

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

function randomSpeed() {
  return 0.45 + Math.random() * 0.75
}

export default function MatrixRain({ level }) {
  const canvasRef = useRef(null)
  const levelRef = useRef(level)

  useEffect(() => {
    levelRef.current = level
  }, [level])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let width = 0
    let height = 0
    let drops = []
    let speeds = []
    let frameId = 0
    let lastTime = 0
    let resizeTimer = 0
    let color = [...LEVEL_COLORS.idle]

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)

      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)

      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.font = `${FONT_SIZE}px "IBM Plex Mono", ui-monospace, monospace`
      context.textBaseline = 'top'

      const columns = Math.ceil(width / FONT_SIZE)
      const rows = height / FONT_SIZE

      drops = Array.from(
        { length: columns },
        (_, index) => drops[index] ?? -Math.random() * rows,
      )

      speeds = Array.from(
        { length: columns },
        (_, index) => speeds[index] ?? randomSpeed(),
      )
    }

    function step() {
      const target = LEVEL_COLORS[levelRef.current] ?? LEVEL_COLORS.idle

      color = color.map(
        (value, index) => value + (target[index] - value) * 0.06,
      )

      const [red, green, blue] = color.map(Math.round)

      context.globalCompositeOperation = 'destination-out'
      context.fillStyle = 'rgba(0, 0, 0, 0.14)'
      context.fillRect(0, 0, width, height)
      context.globalCompositeOperation = 'source-over'

      for (let column = 0; column < drops.length; column += 1) {
        const before = Math.floor(drops[column])

        drops[column] += speeds[column]

        const row = Math.floor(drops[column])

        if (row === before) {
          continue
        }

        const x = column * FONT_SIZE
        const y = row * FONT_SIZE

        if (row > 0) {
          context.clearRect(x, y - FONT_SIZE, FONT_SIZE, FONT_SIZE)
          context.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.9)`
          context.fillText(randomGlyph(), x, y - FONT_SIZE)
        }

        if (row >= 0) {
          context.fillStyle = 'rgba(225, 255, 240, 0.95)'
          context.fillText(randomGlyph(), x, y)
        }

        if (y > height && Math.random() > 0.9) {
          drops[column] = -Math.random() * 20
          speeds[column] = randomSpeed()
        }
      }
    }

    function loop(time) {
      frameId = requestAnimationFrame(loop)

      if (time - lastTime < FRAME_INTERVAL) {
        return
      }

      lastTime = time
      step()
    }

    function start() {
      if (!frameId) {
        frameId = requestAnimationFrame(loop)
      }
    }

    function stop() {
      cancelAnimationFrame(frameId)
      frameId = 0
    }

    function renderStatic() {
      context.clearRect(0, 0, width, height)

      for (let index = 0; index < STATIC_STEPS; index += 1) {
        step()
      }
    }

    function applyMotionPreference() {
      stop()

      if (motion.matches) {
        renderStatic()
      } else if (!document.hidden) {
        start()
      }
    }

    function handleResize() {
      window.clearTimeout(resizeTimer)

      resizeTimer = window.setTimeout(() => {
        resize()

        if (motion.matches) {
          renderStatic()
        }
      }, 150)
    }

    function handleVisibility() {
      if (document.hidden) {
        stop()
      } else if (!motion.matches) {
        start()
      }
    }

    resize()
    applyMotionPreference()

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)
    motion.addEventListener('change', applyMotionPreference)

    return () => {
      stop()
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      motion.removeEventListener('change', applyMotionPreference)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true" />
}