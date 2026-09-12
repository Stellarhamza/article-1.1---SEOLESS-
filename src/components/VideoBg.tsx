import { useEffect, useRef, useState } from 'react'

const HERO_VIDEO = '/videos/black-angel.webm'
/** Skip the first 5 seconds on every play / loop */
const START_AT = 5

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function VideoBg() {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setEnabled(false)
      return
    }

    const video = ref.current
    if (!video) return

    let cancelled = false
    video.controls = false
    video.muted = true
    video.defaultMuted = true
    video.disablePictureInPicture = true
    video.setAttribute('controlsList', 'nodownload nofullscreen noremoteplayback')

    const reveal = () => {
      if (cancelled) return
      if (!video.paused && video.currentTime >= START_AT - 0.05) {
        setReady(true)
      }
    }

    const seekAndPlay = () => {
      const startPlay = () => {
        void video.play().then(reveal).catch(() => {})
      }

      if (Math.abs(video.currentTime - START_AT) > 0.1) {
        const onSeeked = () => {
          video.removeEventListener('seeked', onSeeked)
          startPlay()
        }
        video.addEventListener('seeked', onSeeked)
        video.currentTime = START_AT
      } else {
        startPlay()
      }
    }

    const onLoadedMeta = () => seekAndPlay()

    const onTimeUpdate = () => {
      if (video.currentTime > 0 && video.currentTime < START_AT) {
        video.currentTime = START_AT
        return
      }
      reveal()
    }

    const onPlaying = () => reveal()

    const onEnded = () => {
      video.currentTime = START_AT
      void video.play().catch(() => {})
    }

    // Load after first paint — avoid competing with LCP
    const kick = () => {
      video.addEventListener('loadedmetadata', onLoadedMeta)
      video.addEventListener('timeupdate', onTimeUpdate)
      video.addEventListener('playing', onPlaying)
      video.addEventListener('ended', onEnded)
      if (video.readyState >= 1) onLoadedMeta()
      else video.load()
    }

    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(kick, { timeout: 1200 })
    } else {
      timeoutId = setTimeout(kick, 200)
    }

    return () => {
      cancelled = true
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId !== undefined) clearTimeout(timeoutId)
      video.removeEventListener('loadedmetadata', onLoadedMeta)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('ended', onEnded)
    }
  }, [])

  return (
    <div className="hero-video-wrap absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 bg-[#0e0e0e]" />
      {enabled ? (
        <video
          ref={ref}
          className={`hero-video-bg transition-opacity duration-500 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
          src={HERO_VIDEO}
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
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent" />
    </div>
  )
}
