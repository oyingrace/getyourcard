'use client'

import { useRef, useEffect, useState } from 'react'
import { UserData } from '@/app/page'

interface IDGeneratorProps {
  userData: UserData
  shouldGenerate: boolean
}

export default function IDGenerator({ userData, shouldGenerate }: IDGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null)

  // Frame image as a static asset - you'll need to put this in public/images/
  const frameImagePath = '/card-blank.png'

  const generateID = async () => {
    if (!canvasRef.current) return

    setIsGenerating(true)
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    try {
      // Set canvas size to match the frame
      canvas.width = 800
      canvas.height = 800

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Load frame image from static assets
      const frameImg = new Image()
      frameImg.onload = async () => {
        // Draw frame as background
        ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height)

        // Draw user photo in the circular area
        if (userData.image) {
          const userImg = new Image()
          userImg.onload = () => {
            // Calculate circular photo position based on the frame
            // These coordinates are specific to your frame design - positioned on the right side
            const photoX = 600 // Center X of the circular area (right side)
            const photoY = 330 // Center Y of the circular area (moved up)
            const photoRadius = 120 // Radius of the circular photo area

            // Create circular clipping mask
            ctx.save()
            ctx.beginPath()
            ctx.arc(photoX, photoY, photoRadius, 0, 2 * Math.PI)
            ctx.clip()

            // Calculate scaling to fit the image in the circle while maintaining aspect ratio
            const scale = Math.max(
              (photoRadius * 2) / userImg.width,
              (photoRadius * 2) / userImg.height
            )
            const scaledWidth = userImg.width * scale
            const scaledHeight = userImg.height * scale
            
            // Center the scaled image in the circle
            const imgX = photoX - scaledWidth / 2
            const imgY = photoY - scaledHeight / 2

            // Draw the user image
            ctx.drawImage(userImg, imgX, imgY, scaledWidth, scaledHeight)
            ctx.restore()

            // Draw text overlays
            drawText()
          }
          userImg.src = userData.image
        } else {
          drawText()
        }

        function drawText() {
          // Draw name - positioned on the right side below the emblem
          if (userData.name) {
            ctx.font = 'bold 48px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
            ctx.shadowBlur = 4
            ctx.shadowOffsetY = 2
            
            // Position for name text (right side, below emblem)
            const nameX = 600 // Right side of the canvas
            const nameY = 580
            ctx.fillText(userData.name, nameX, nameY)
          }

          // Draw role - positioned below name on the right side
          if (userData.role) {
            ctx.font = 'italic 32px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
            ctx.shadowBlur = 4
            ctx.shadowOffsetY = 2
            
            // Position for role text (right side, below name)
            const roleX = 600 // Right side of the canvas
            const roleY = 630
            ctx.fillText(userData.role, roleX, roleY)
          }

          // Generate downloadable image URL
          const imageUrl = canvas.toDataURL('image/png', 1.0)
          setGeneratedImageUrl(imageUrl)
          setIsGenerating(false)
        }
      }
      
      frameImg.onerror = () => {
        console.error('Failed to load frame image')
        setIsGenerating(false)
      }
      
      frameImg.src = frameImagePath
    } catch (error) {
      console.error('Error generating ID:', error)
      setIsGenerating(false)
    }
  }

  // Generate when shouldGenerate becomes true
  useEffect(() => {
    if (shouldGenerate) {
      generateID()
    }
  }, [shouldGenerate])

  const handleDownload = () => {
    if (!generatedImageUrl) return

    const link = document.createElement('a')
    link.download = `${userData.name.replace(/\s+/g, '_')}_HER_DAO_Badge.png`
    link.href = generatedImageUrl
    link.click()
  }

  const handleShare = async () => {
    if (!generatedImageUrl) return

    try {
      // Convert data URL to blob for sharing
      const response = await fetch(generatedImageUrl)
      const blob = await response.blob()
      const file = new File([blob], `${userData.name.replace(/\s+/g, '_')}_HER_DAO_Badge.png`, { type: 'image/png' })

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My H.E.R DAO Event ID',
          text: 'Check out my H.E.R DAO event badge!',
          files: [file]
        })
      } else {
        // Fallback: download
        handleDownload()
      }
    } catch (error) {
      console.error('Error sharing:', error)
      handleDownload()
    }
  }

  const handleRegenerateWithChanges = () => {
    setGeneratedImageUrl(null)
    generateID()
  }

  return (
    <div className="space-y-4">
      {/* Canvas for generation (hidden) */}
      <canvas
        ref={canvasRef}
        className="hidden"
        width={800}
        height={800}
      />

      {/* Generated ID Display */}
      <div className="bg-white/5 rounded-lg p-4">
        <div className="relative">
          {isGenerating ? (
            <div className="w-full max-w-md mx-auto aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-white font-medium">Generating your ID badge...</p>
                <p className="text-gray-400 text-sm">This will take just a moment</p>
              </div>
            </div>
          ) : generatedImageUrl ? (
            <div className="text-center">
              <img
                src={generatedImageUrl}
                alt="Generated ID Badge"
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl border-2 border-primary/30"
              />
              <div className="mt-4 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                <p className="text-green-400 font-medium mb-2">✓ ID Badge Generated Successfully!</p>
                <p className="text-gray-300 text-sm">Your personalized H.E.R DAO event badge is ready</p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Click "Generate ID Badge" to create your badge</p>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {generatedImageUrl && !isGenerating && (
        <div className="space-y-4">
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleDownload}
              className="px-8 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg 
                         font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 10v6m0 0l-4-4m4 4l4-4m5-4H7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2z" />
              </svg>
              Download Badge
            </button>
            
            <button
              onClick={handleShare}
              className="px-8 py-3 bg-secondary hover:bg-secondary/80 text-white rounded-lg 
                         font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share Badge
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={handleRegenerateWithChanges}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg 
                         font-medium transition-colors text-sm"
            >
              Regenerate with Current Data
            </button>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center text-sm text-gray-400 space-y-1 pt-4 border-t border-white/10">
        <p className="font-medium">💡 Tips:</p>
        <p>• Use a clear, high-quality photo for best results</p>
        <p>• Keep your name concise to fit nicely on the badge</p>
        <p>• Your role can be your job title, specialization, or community role</p>
      </div>
    </div>
  )
}