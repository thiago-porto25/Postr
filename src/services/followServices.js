import {
  db,
  collection,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  limit,
  serverTimestamp,
  doc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  orderBy,
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
    console.log(error.message)
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
    console.log(error.message)
  }
}
