import {
  db,
  collection,
  getDocs,
  setDoc,
  serverTimestamp,
  doc,
  query,
  where,
  auth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from '../firebase/config'

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
    const lowerUsername = username.toLowerCase()

    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('username', '==', lowerUsername))
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
        username: lowerUsername,
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
