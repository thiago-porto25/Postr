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
  const usersRef = collection(db, 'users')

  const q = query(usersRef, where('userId', '==', userId))

  const querySnapshot = await getDocs(q)

  const user = querySnapshot.docs.map((item) => ({ ...item.data() }))[0]

  return user
}
