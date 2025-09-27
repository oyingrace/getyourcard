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
        <label htmlFor="name" className="block text-sm font-semibold text-gray-800 mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          value={userData.name}
          onChange={(e) => onDataChange('name', e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-secondary-pink 
                     text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-primary focus:border-transparent backdrop-blur-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-semibold text-gray-800 mb-2">
          Role/Title
        </label>
        <input
          type="text"
          id="role"
          value={userData.role}
          onChange={(e) => onDataChange('role', e.target.value)}
          placeholder="e.g., Developer, Designer, Project Manager"
          className="w-full px-4 py-3 rounded-lg bg-white/20 border border-secondary-pink 
                     text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                     focus:ring-primary focus:border-transparent backdrop-blur-sm"
          required
        />
      </div>

    </div>
  )
}