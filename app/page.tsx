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
          Create Your H.E.R. DAO Member Badge
        </h1>
        <p className="text-gray-300">
          Generate your personalized membership badge and share it
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left side - Form inputs */}
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <UserForm
              userData={userData}
              onDataChange={handleUserDataChange}
            />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-md font-semibold text-white mb-4">
              Profile Photo
            </h2>
            <ImageUpload
              onImageSelect={(imageUrl) => handleUserDataChange('image', imageUrl)}
              acceptedTypes="image/*"
              label=""
              className="mb-4"
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
              {isFormValid ? 'Generate' : 'Generate'}
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

        {/* Right side - Generated ID */}
        {showGenerated && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Your Generated ID Badge
            </h2>
            
            <IDGenerator
              userData={userData}
              shouldGenerate={showGenerated}
            />
          </div>
        )}
      </div>
    </div>
  )
}