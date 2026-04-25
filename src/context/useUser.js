import { useState, useEffect } from 'react'

// Generate a simple unique ID (not UUID, but simple alphanumeric)
const generateUserId = () => {
  return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36)
}

export const useUser = () => {
  const [userId, setUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user ID exists in localStorage
    const storedUserId = localStorage.getItem('movienight_user_id')
    
    if (storedUserId) {
      // Use existing user ID
      setUserId(storedUserId)
    } else {
      // Generate new user ID for first-time visitors
      const newUserId = generateUserId()
      localStorage.setItem('movienight_user_id', newUserId)
      setUserId(newUserId)
    }
    
    setIsLoading(false)
  }, [])

  // Get user-specific storage key
  const getUserStorageKey = (key) => {
    return `${userId}_${key}`
  }

  return {
    userId,
    isLoading,
    getUserStorageKey
  }
}
