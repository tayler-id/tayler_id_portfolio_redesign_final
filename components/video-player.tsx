'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Maximize2, Volume2, VolumeX } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  className?: string
  autoPlay?: boolean
}

export function VideoPlayer({
  src,
  poster,
  title,
  className = '',
  autoPlay = false
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setProgress(progress)
    }
  }

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = x / rect.width
      videoRef.current.currentTime = percentage * videoRef.current.duration
    }
  }

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden bg-black group ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(!isPlaying)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        className="w-full h-auto cursor-pointer"
      />

      {/* Play Overlay (when paused) */}
      {!isPlaying && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
          onClick={togglePlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-10 h-10 text-white ml-1" />
          </motion.div>
        </motion.div>
      )}

      {/* Title */}
      {title && (
        <div className="absolute top-4 left-4 right-4">
          <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-white text-sm font-medium">
            {title}
          </span>
        </div>
      )}

      {/* Controls */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
        transition={{ duration: 0.2 }}
      >
        {/* Progress Bar */}
        <div
          className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
          onClick={handleSeek}
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
          <button
            onClick={handleFullscreen}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
