import { useState, useEffect } from 'react'
import { onAuthStateChanged, auth } from '../firebase/config'

export default function useAuthListener() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
  }, [])

  return { authUser: user }
}
