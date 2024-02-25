'use client'
import React, { useRef, useState, useEffect } from 'react'
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube'
import { AnimatePresence, motion } from 'framer-motion'

import { useMediaQuery } from 'usehooks-ts'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../primitives/dialog-primitive'
const PLAY_SVG =
  'https://images.ctfassets.net/ocgec2v7knct/48cI5IJVn9WRiZPTgfvyTf/cae5e207196d1a9591b345199c33189a/sav.svg'

interface Props {
  videoId: string
  title: string
}
const YoutubeVideo: React.FC<Props> = ({
  videoId,
  title = 'Youtube Video'
}) => {
  const playerRef = useRef<YouTubePlayer | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [calculatedHeight, setalculatedHeight] = useState<string>('')
  const [calculatedWidth, setCalculatedWidth] = useState<string>('')
  const [duration, setDuration] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)

  const isMobile = useMediaQuery('(max-width: 768px)')
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
  const isMediumDevice = useMediaQuery(
    'only screen and (min-width : 769px) and (max-width : 992px)'
  )
  const isLargeDevice = useMediaQuery(
    'only screen and (min-width : 993px) and (max-width : 1200px)'
  )
  const isExtraLargeDevice = useMediaQuery(
    'only screen and (min-width : 1201px)'
  )

  // Event handler for video playback
  const handleVideoProgress = (event: { target: YouTubePlayer }): void => {
    const currentTime = event.target.getCurrentTime()
    setCurrentTime(currentTime)
  }

  // Event handler for video duration change
  const handleVideoReady = (event: { target: YouTubePlayer }): void => {
    const duration = event.target?.getDuration()

    setDuration(duration)
  }

  const calculateVideoDimensions = () => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    let width: any, height: any

    if (screenWidth >= 1024) {
      // Desktop layout
      height = Math.min(600, screenHeight)
      width = Math.min((16 / 9) * height, screenWidth)
    } else if (screenWidth >= 768) {
      // tablet layout
      width = '768px'
      height = '432px'
    } else {
      // Mobile layout
      width = '320px'
      height = '180px'
    }

    return { width, height }
  }

  useEffect(() => {
    const { width, height } = calculateVideoDimensions()
    setCalculatedWidth(width)
    setalculatedHeight(height)
    const resizeVideo = () => {
      const { width, height } = calculateVideoDimensions()
      if (playerRef.current) {
        playerRef.current.setSize(width, height)
      }
    }

    window.addEventListener('resize', resizeVideo)
    resizeVideo()
    return () => {
      window.removeEventListener('resize', resizeVideo)
    }
  }, [])

  const makeFullscreen = () => {
    const playerElement = playerRef.current?.getInternalPlayer()
    if (playerElement) {
      if (playerElement.requestFullscreen) {
        playerElement.requestFullscreen()
      } else if (playerElement.mozRequestFullScreen) {
        playerElement.mozRequestFullScreen()
      } else if (playerElement.webkitRequestFullScreen) {
        playerElement.webkitRequestFullScreen()
      }
    }
  }

  const opts = {
    width: calculatedWidth,
    height: calculatedHeight,

    // height: '390',
    // width: isMobile ? '280' : '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  }

  if (!videoId) {
    return (
      <div className=''>
        <div className='flex flex-col h-full w-full items-center justify-center justify-items-center'>
          <img src={PLAY_SVG} alt='' className='' />
        </div>
      </div>
    )
  }

  return (
    <div className=' flex w-full'>
      <AnimatePresence>
        <Dialog>
          <DialogTrigger>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className='w-20 h-20 relative bg-primary py-4 rounded-[20px] flex items-center justify-items-center justify-center'
            >
              <div className=''>
                <img src={PLAY_SVG} alt='' className='' />
              </div>
            </motion.div>
          </DialogTrigger>
          <DialogContent className=''>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <div
              ref={containerRef}
              style={{ width: '100%', height: '100%', position: 'relative' }}
              className='flex flex-col  items-center md:min-w-[300px] min-h-[300px] h-full max-w-fullx w-full p-4x m-auto'
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
                className='w-fullx flex items-center  m-auto bg-primary'
              >
                {calculatedHeight && (
                  <YouTube
                    videoId={videoId}
                    opts={opts}
                    onReady={handleVideoReady}
                    onPlaybackRateChange={handleVideoProgress}
                    onStateChange={handleVideoProgress}
                    onPlay={makeFullscreen}
                    ref={playerRef}
                  />
                )}
              </motion.div>
            </div>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    </div>
  )
}

export default YoutubeVideo
