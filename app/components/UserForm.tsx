'use client'

import { UserData } from '@/app/page'

interface UserFormProps {
  userData: UserData
  onDataChange: (field: keyof UserData, value: string) => void
}

export default function UserForm({ userData, onDataChange }: UserFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          value={userData.name}
          onChange={(e) => onDataChange('name', e.target.value)}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 
                     text-white placeholder-gray-300 focus:outline-none focus:ring-2 
                     focus:ring-primary focus:border-transparent backdrop-blur-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
          Role/Title *
        </label>
        <input
          type="text"
          id="role"
          value={userData.role}
          onChange={(e) => onDataChange('role', e.target.value)}
          placeholder="e.g., Developer, Designer, Community Member"
          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 
                     text-white placeholder-gray-300 focus:outline-none focus:ring-2 
                     focus:ring-primary focus:border-transparent backdrop-blur-sm"
          required
        />
      </div>

      <div className="pt-2">
        <div className="flex items-center space-x-4 text-sm text-gray-300">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              userData.name ? 'bg-green-500' : 'bg-gray-500'
            }`} />
            Name {userData.name ? '✓' : ''}
          </div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              userData.role ? 'bg-green-500' : 'bg-gray-500'
            }`} />
            Role {userData.role ? '✓' : ''}
          </div>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              userData.image ? 'bg-green-500' : 'bg-gray-500'
            }`} />
            Photo {userData.image ? '✓' : ''}
          </div>
        </div>
      </div>
    </div>
  )
}