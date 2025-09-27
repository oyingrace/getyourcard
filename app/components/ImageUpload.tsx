'use client'

import { useRef, useState } from 'react'
import { Camera } from 'lucide-react'

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void
  acceptedTypes?: string
  label: string
  className?: string
}

export default function ImageUpload({
  onImageSelect,
  acceptedTypes = 'image/*',
  label,
  className = ''
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setPreview(imageUrl)
        onImageSelect(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={className}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-all duration-200 hover:border-primary/50
          ${dragOver ? 'border-primary bg-primary/10' : 'border-secondary-pink'}
          ${preview ? 'border-green-500' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes}
          onChange={handleFileInputChange}
          className="hidden"
        />

        {preview ? (
          <div className="space-y-3">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mx-auto"
            />
            <p className="text-green-400 font-medium">✓ Image uploaded</p>
            <p className="text-gray-400 text-sm">Click to change</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto bg-secondary-pink rounded-xl flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary-pink" />
            </div>
            <p className="text-white font-medium">{label}</p>
            <p className="text-gray-600 text-sm">
              Click to upload
            </p>
            <p className="text-gray-600 text-xs">
              JPG, PNG, GIF up to 10MB
            </p>
          </div>
        )}
      </div>
    </div>
  )
}