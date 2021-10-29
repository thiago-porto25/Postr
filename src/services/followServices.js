import {
  db,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  query,
  where,
} from '../firebase/config'

export const followUser = async (followerId, followedId, setIsFollowing) => {
  try {
    const followerRef = doc(db, 'users', followerId)
    const followedRef = doc(db, 'users', followedId)

    await Promise.all([
      updateDoc(followerRef, { following: arrayUnion(followedId) }),
      updateDoc(followedRef, { followers: arrayUnion(followerId) }),
    ])

    setIsFollowing(true)
  } catch (error) {
    console.error(error.message)
  }
}

export const unFollowUser = async (followerId, followedId, setIsFollowing) => {
  try {
    const followerRef = doc(db, 'users', followerId)
    const followedRef = doc(db, 'users', followedId)

    await Promise.all([
      updateDoc(followerRef, { following: arrayRemove(followedId) }),
      updateDoc(followedRef, { followers: arrayRemove(followerId) }),
    ])

    setIsFollowing(false)
  } catch (error) {
    console.error(error.message)
  }
}

export const getProfileFollowers = async (followers) => {
  try {
    const usersRef = collection(db, 'users')

    const mutableFollowers = followers.map((item) => item)
    const result = []

    while (mutableFollowers.length) {
      const batch = mutableFollowers.splice(0, 10)

      const querySnapshot = await getDocs(
        query(usersRef, where('id', 'in', [...batch]))
      )

      result.push(...querySnapshot.docs.map((doc) => doc.data()))
    }

    console.log(result)

    return result
  } catch (error) {
    console.error(error.message)
  }
}

export const getProfileFollowing = async (following) => {
  try {
    const usersRef = collection(db, 'users')

    const mutableFollowing = following.map((item) => item)
    const result = []

    while (mutableFollowing.length) {
      const batch = mutableFollowing.splice(0, 10)

      const querySnapshot = await getDocs(
        query(usersRef, where('id', 'in', [...batch]))
      )

      result.push(...querySnapshot.docs.map((doc) => doc.data()))
    }

    console.log(result)

    return result
  } catch (error) {
    console.error(error.message)
  }
}
