import {
  db,
  collection,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
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
