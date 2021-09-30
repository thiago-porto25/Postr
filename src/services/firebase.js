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

export async function getUserByUserId(userId) {
  const docSnap = await getDoc(doc(db, 'users', userId))

  const user = docSnap.data()

  return user
}
