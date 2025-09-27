'use client'

import { useRef, useEffect, useState } from 'react'
import { UserData } from '@/app/page'
import { Download, Upload, RotateCcw } from 'lucide-react'

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
            const photoX = 560 // Center X of the circular area (right side)
            const photoY = 317 // Center Y of the circular area (moved up)
            const photoRadius = 105 // Radius of the circular photo area

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
          if (!ctx) return
          
          // Draw name - positioned on the right side below the emblem
          if (userData.name) {
            ctx.font = 'bold 48px Arial'
            ctx.fillStyle = 'white'
            ctx.textAlign = 'center'
            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
            ctx.shadowBlur = 4
            ctx.shadowOffsetY = 2
            
            // Position for name text (right side, below emblem)
            const nameX = 550 // Right side of the canvas
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
            const roleX = 550 // Right side of the canvas
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

  const handleShare = () => {
    if (!generatedImageUrl) return

    const text = `I'm thrilled to announce that I just became a member of H.E.R. DAO! 🎉

${window.location.href}`
    
    // Check if it's a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      // Try Twitter app first on mobile
      const twitterAppUrl = `twitter://post?message=${encodeURIComponent(text)}`
      const twitterWebUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`
      
      // Create a temporary link to test if the app is available
      const link = document.createElement('a')
      link.href = twitterAppUrl
      link.style.display = 'none'
      document.body.appendChild(link)
      
      // Try to open the app, fallback to web after a short delay
      const timeout = setTimeout(() => {
        window.open(twitterWebUrl, '_blank')
      }, 1000)
      
      link.click()
      
      // Clear timeout if app opens successfully
      setTimeout(() => {
        clearTimeout(timeout)
        document.body.removeChild(link)
      }, 100)
    } else {
      // Direct web sharing for desktop
      const twitterWebUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`
      window.open(twitterWebUrl, '_blank')
    }
  }

  const handleStartFresh = () => {
    window.location.reload()
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
                <p className="text-white font-medium">Generating...</p>
              </div>
            </div>
          ) : generatedImageUrl ? (
            <div className="text-center">
              <div className="mb-4 p-4">
                <h2 className="text-gray-800 text-2xl font-semibold mb-2">Your Badge is Ready!</h2>
                <p className="text-gray-800 text-sm">Welcome to H.E.R. DAO, {userData.name}! 🎉</p>
              </div>
              <img
                src={generatedImageUrl}
                alt="Generated ID Badge"
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl border-2 border-primary/30"
              />
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Click "Generate" to create your badge</p>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {generatedImageUrl && !isGenerating && (
        <div className="space-y-5">
          <button
            onClick={handleShare}
            className="w-full px-8 py-3 bg-primary text-white rounded-lg 
                       font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <Upload className="w-5 h-5" />
            Share on X
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 px-8 py-3 bg-white text-primary-pink rounded-lg border border-secondary-pink
                         font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            
            <button
              onClick={handleStartFresh}
              className="flex-1 px-6 py-3 bg-white text-primary-pink rounded-lg 
                         font-medium transition-colors text-sm border border-secondary-pink flex items-center 
                         justify-center gap-2 hover:shadow-xl"
            >
              <RotateCcw className="w-5 h-5" />
              Create New
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