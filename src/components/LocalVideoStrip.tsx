import { useEffect, useRef, useState } from 'react'

const REVIEWS_VIDEO = '/videos/reviews-neon.webm'
/** Skip the first 5 seconds on every play / loop */
const START_AT = 5

type LocalVideoStripProps = {
  className?: string
  src?: string
  startAt?: number
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function LocalVideoStrip({
  className = '',
  src = REVIEWS_VIDEO,
  startAt = START_AT,
}: LocalVideoStripProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const root = wrapRef.current
    if (!root) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    const video = ref.current
    if (!video) return

    let cancelled = false
    video.controls = false
    video.muted = true
    video.disablePictureInPicture = true
    video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback')

    const reveal = () => {
      if (cancelled) return
      if (!video.paused && video.currentTime >= startAt - 0.05) {
        setReady(true)
      }
    }

    const seekAndPlay = () => {
      const startPlay = () => {
        void video.play().then(reveal).catch(() => {})
      }

      const target = video.duration && video.duration > startAt ? startAt : 0

      if (Math.abs(video.currentTime - target) > 0.1) {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked)
          startPlay()
        }
        video.addEventListener('seeked', onSeeked)
        video.currentTime = target
      } else {
        startPlay()
      }
    }

    const onLoadedMeta = () => seekAndPlay()

    const onTimeUpdate = () => {
      if (video.duration > startAt && video.currentTime > 0 && video.currentTime < startAt) {
        video.currentTime = startAt
        return
      }
      reveal()
    }

    const onPlaying = () => reveal()

    const onEnded = () => {
      const target = video.duration > startAt ? startAt : 0
      video.currentTime = target
      void video.play().catch(() => {})
    }

    video.addEventListener('loadedmetadata', onLoadedMeta)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('ended', onEnded)

    if (video.readyState >= 1) onLoadedMeta()
    else video.load()

    return () => {
      cancelled = true
      video.removeEventListener('loadedmetadata', onLoadedMeta)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('ended', onEnded)
    }
  }, [active, src, startAt])

  return (
    <div
      ref={wrapRef}
      className={`video-strip relative w-full overflow-hidden pointer-events-none select-none ${className}`.trim()}
    >
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      {active ? (
        <video
          ref={ref}
          className={`video-strip-local transition-opacity duration-500 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
          src={src}
          muted
          playsInline
          loop
          preload="none"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
        />
      ) : null}
    </div>
  )
}
