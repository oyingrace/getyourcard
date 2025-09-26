'use client'

import { useState } from 'react'
import ImageUpload from '@/app/components/ImageUpload'
import UserForm from '@/app/components/UserForm'
import IDGenerator from '@/app/components/IDGenerator'

export interface UserData {
  name: string
  role: string
  image: string | null
}

export default function Home() {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    role: '',
    image: null
  })

  const [showGenerated, setShowGenerated] = useState(false)

  const handleUserDataChange = (field: keyof UserData, value: string | null) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }))
    // Hide generated card when user makes changes
    setShowGenerated(false)
  }

  const handleGenerate = () => {
    if (userData.name && userData.role && userData.image) {
      setShowGenerated(true)
    }
  }

  const isFormValid = userData.name && userData.role && userData.image

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">
          H.E.R DAO Event ID Generator
        </h1>
        <p className="text-gray-300">
          Create your personalized event badge
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left side - Form inputs */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Upload Your Photo
            </h2>
            <ImageUpload
              onImageSelect={(imageUrl) => handleUserDataChange('image', imageUrl)}
              acceptedTypes="image/*"
              label="Upload Your Profile Picture"
              className="mb-4"
            />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Your Information
            </h2>
            <UserForm
              userData={userData}
              onDataChange={handleUserDataChange}
            />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <button
              onClick={handleGenerate}
              disabled={!isFormValid}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                isFormValid
                  ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isFormValid ? 'Generate ID Badge' : 'Fill all fields to generate'}
            </button>
            
            {!isFormValid && (
              <div className="mt-3 text-sm text-gray-400 text-center">
                <p>Please complete all fields:</p>
                <div className="flex justify-center gap-4 mt-2">
                  <span className={userData.image ? 'text-green-400' : 'text-gray-400'}>
                    ✓ Photo
                  </span>
                  <span className={userData.name ? 'text-green-400' : 'text-gray-400'}>
                    ✓ Name
                  </span>
                  <span className={userData.role ? 'text-green-400' : 'text-gray-400'}>
                    ✓ Role
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Generated ID or Preview */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            {showGenerated ? 'Your Generated ID Badge' : 'Preview'}
          </h2>
          
          {showGenerated ? (
            <IDGenerator
              userData={userData}
              shouldGenerate={showGenerated}
            />
          ) : (
            <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-600 rounded-xl">
              <div className="text-center text-gray-400">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-lg font-medium">ID Badge Preview</p>
                <p className="text-sm">Complete the form and click generate to see your badge</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}