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
  limit,
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
export const logoutWithFirebase = async ({ setMessage }) => {
  try {
    await signOut(auth)
  } catch (error) {
    setMessage({ type: 'error', text: error.message })
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
    const usernameResponse = await findUserByUsername(username)

    if (!usernameResponse) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await sendEmailVerification(user)

      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: email.trim(),
        name: name.trim(),
        username: username.toLowerCase().trim(),
        createdAt: serverTimestamp(),
        birthday: '',
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
    if (setEmail) setEmail('')
  }
}

/////////////////// Find user by username
export const findUserByUsername = async (username) => {
  const lowerUsername = username.toLowerCase().trim()

  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('username', '==', lowerUsername))
  const querySnapshot = await getDocs(q)

  const usernameResponse = querySnapshot.docs.map((item) => item.data())[0]

  return usernameResponse
}

/////////////////// Save changes to user
export const saveChangesToUser = async ({
  name,
  username,
  birthday,
  user,
  setMessage,
  setName,
  setUsername,
  setBirthday,
}) => {
  try {
    if (username === user.username) {
      const userRef = doc(db, 'users', user.id)

      await setDoc(userRef, { name, birthday }, { merge: true })

      return
    }

    const usernameResponse = await findUserByUsername(username)

    if (usernameResponse) {
      throw new Error("Username already taken, changes weren't saved!")
    }

    const userRef = doc(db, 'users', user.id)

    await setDoc(userRef, { name, username, birthday }, { merge: true })
  } catch (error) {
    setMessage({ type: 'error', text: error.message })
    setName(user.name)
    setUsername(user.username)
    setBirthday(user.birthday)
  }
}

/////////////////// getSuggestedFollows
export const getSuggestedFollows = async ({ user }) => {
  try {
    const usersRef = collection(db, 'users')

    const q = query(usersRef, where('id', '!=', user.id), limit(10))

    const response = await getDocs(q)

    const usersList = response.docs
      .map((user) => user.data())
      .filter((profile) => !user.following.includes(profile.id))

    return usersList
  } catch (error) {
    console.log(error.message)
  }
}
