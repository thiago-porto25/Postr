import {
  db,
  collection,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  limit,
  serverTimestamp,
  doc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  orderBy,
  auth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
} from '../firebase/config'
import { v4 as uuid } from 'uuid'

export const getProfilePosts = async (userId) => {
  try {
    const postsRef = collection(db, 'posts')

    const postsQuery = query(
      postsRef,
      where('creatorId', '==', userId),
      limit(100)
    )
    const rePostsQuery = query(
      postsRef,
      where('rePosts', 'array-contains', userId),
      limit(50)
    )

    const query1Snapshot = await getDocs(postsQuery)
    const query2Snapshot = await getDocs(rePostsQuery)

    const profilePosts = query1Snapshot.docs.map((doc) => doc.data())
    const profileRePosts = query2Snapshot.docs.map((doc) => doc.data())

    const returnedPosts = [...profilePosts, ...profileRePosts].sort(
      (a, b) => a.createdAt - b.createdAt
    )

    return returnedPosts
  } catch (error) {
    console.log(error.message)
  }
}

export const createPost = async ({
  user,
  postValue,
  setPostValue,
  setLoading,
}) => {
  try {
    const newPostId = uuid()

    const postsRef = doc(db, 'posts', newPostId)

    await setDoc(postsRef, {
      id: newPostId,
      creatorId: user.id,
      content: postValue.trim(),
      createdAt: serverTimestamp(),
      likes: [],
    })

    setPostValue('')
  } catch (error) {
    setPostValue('')
    setLoading(false)
  }
}
