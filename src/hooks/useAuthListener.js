import { useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  auth,
  onSnapshot,
  doc,
  db,
} from '../firebase/config'

export default function useAuthListener() {
  const [user, setUser] = useState(null)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser)
        onSnapshot(doc(db, 'users', authUser.uid), (doc) => {
          setUserObj(doc.data())
        })
      } else {
        setUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return { authUser: user, user: userObj, setUser: setUserObj }
}
