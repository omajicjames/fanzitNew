"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isCreator: boolean
  subscriptions: string[]
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (userData: SignupData) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // ----------------------
  // 1. Client-side mounting check
  // Prevents hydration mismatch by ensuring localStorage access only happens on client
  // ----------------------
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const checkAuth = async () => {
      try {
        // Only access localStorage on client-side
        if (typeof window !== 'undefined') {
          const userData = localStorage.getItem("user")
          if (userData) {
            const parsedUser = JSON.parse(userData)
            setUser(parsedUser)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        if (typeof window !== 'undefined') {
          localStorage.removeItem("user")
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [isMounted])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser: User = {
        id: "1",
        email,
        name: "Demo User",
        avatar: "/user-profile-illustration.png",
        isCreator: true,
        subscriptions: ["sarah-fitness", "chef-marco"],
        createdAt: new Date().toISOString(),
      }

      // Store user data in localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
      setUser(mockUser)
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (userData: SignupData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful signup
      const mockUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        avatar: "/user-profile-illustration.png",
        isCreator: true,
        subscriptions: [],
        createdAt: new Date().toISOString(),
      }

      // Store user data in localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(mockUser))
      }
      setUser(mockUser)
    } catch (error) {
      throw new Error("Signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Remove user data from localStorage (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("user")
    }
    setUser(null)
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedUser = { ...user, ...data }
      // Update user data in localStorage (client-side only)
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(updatedUser))
      }
      setUser(updatedUser)
    } catch (error) {
      throw new Error("Profile update failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
