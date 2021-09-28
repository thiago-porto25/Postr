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

/////////////////// AUTH FUNCTIONS ///////////////////

/////////////////// Login
export const loginWithFirebase = async ({
  email,
  password,
  setMessage,
  setEmail,
  setPassword,
  setLoading,
}) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    setLoading(false)
    setEmail('')
    setPassword('')
    setMessage(error.message)
  }
}

/////////////////// Logout
export const logoutWithFirebase = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    //setNotification({ type: 'error', text: error.message })
  }
}

/////////////////// Signup
export const signupWithFirebase = async ({
  email,
  password,
  name,
  username,
  setMessage,
  setLoading,
  setEmail,
  setPassword,
  setPasswordConfirmation,
  setUsername,
}) => {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('username', '==', username))
    const querySnapshot = await getDocs(q)
    const usernameResponse = querySnapshot.docs.map((item) => item.data())[0]

    if (!usernameResponse) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await sendEmailVerification(user)

      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email,
        name,
        username,
        createdAt: serverTimestamp(),
        birthday: null,
        avatarPhotoUrl: null,
        backgroundPhotoUrl: null,
        followers: [],
        following: [],
      })
    } else {
      throw new Error('Username already taken!')
    }
  } catch (error) {
    setMessage(error.message)
    setLoading(false)
    setEmail('')
    setPassword('')
    setPasswordConfirmation('')
    setUsername('')
  }
}

/////////////////// Reset password
export const sendResetPasswordWithFirebase = async ({
  email,
  setEmail,
  setMessage,
}) => {
  try {
    await sendPasswordResetEmail(auth, email)
    setMessage({
      type: 'success',
      text: 'The password reset link was sent. Check your e-mail!',
    })
  } catch (error) {
    setMessage({ type: 'error', text: error.message })
    setEmail('')
  }
}
