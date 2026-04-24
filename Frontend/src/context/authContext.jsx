import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
const AuthContext = createContext()


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const verifyUser = async () => {
    const token = localStorage.getItem('token')
    if(!token){
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify`,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      if(response.data.success){
        setUser(response.data.user)
      }else{
      setUser(null)
    }
  } catch (error) {
        setUser(null)
    }
    finally{
          setLoading(false)
        }
      }
      useEffect(() =>{
  verifyUser()}, [])
  useEffect(() => {
    const handleStorageChange = (e) => {
      if(e.key === 'token'){
        const token = localStorage.getItem('token')
        if(!token){
          setUser(null)
        }else{
          verifyUser()
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)

  }, [] )

  const login = (userData, token) => {
    setUser(userData)
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("token") 
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export default AuthProvider
