import {
  db,
  collection,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  query,
  where,
  orderBy,
} from '../firebase/config'
import { getUserByUserId } from './firebase'
import { v4 as uuid } from 'uuid'

export const getPostComments = async (postId) => {}

export const createComment = async (postId, creatorId, content) => {
  try {
    const commentId = uuid()
    const commentsRef = doc(db, 'posts', postId, 'comments', commentId)

    await setDoc(commentsRef, {
      creatorId,
      id: commentId,
      content,
      createdAt: serverTimestamp(),
    })
  } catch (error) {
    console.error(error.message)
  }
}

export const deleteComment = async (postId, commentId) => {
  try {
    const commentRef = doc(db, 'posts', postId, 'comments', commentId)

    await deleteDoc(commentRef)
  } catch (error) {
    console.error(error.message)
  }
}
