import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/userContext'
import { getUserByUserId } from '../services/firebase'

export default function useUser() {
  const [activeUser, setActiveUser] = useState({})
  const { authUser } = useContext(UserContext)

  useEffect(() => {
    async function getUserObjByUserId() {
      const response = await getUserByUserId(authUser.uid)
      setActiveUser(response)
    }
    if (authUser && authUser.uid) {
      getUserObjByUserId()
    }
  }, [authUser])

  return { user: activeUser }
}
