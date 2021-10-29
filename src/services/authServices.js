import {
  db,
  collection,
  collectionGroup,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  query,
  where,
  auth,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  limit,
  writeBatch,
  arrayRemove,
  increment,
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
    if (setMessage) setMessage({ type: 'error', text: error.message })
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
        bio: '',
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

/////////////////// Delete User
export const deleteUserFromDb = async (user) => {
  await deleteUser(user)
  await deleteDoc(doc(db, 'users', user.uid))
  await deleteUserFromFollow(user.uid, 'followers')
  await deleteUserFromFollow(user.uid, 'following')
  await deleteUserInteractions(user.uid, 'likes')
  await deleteUserInteractions(user.uid, 'rePosts')
  await deleteUserPosts(user.uid)
  await deleteUserComments(user.uid)
}

const deleteUserFromFollow = async (userId, follow) => {
  try {
    let currentBatch = writeBatch(db)
    let currentBatchSize = 0
    const batches = [currentBatch]

    const usersRef = collection(db, 'users')
    const q = query(usersRef, where(follow, 'array-contains', userId))
    const querySnapshot = await getDocs(q)

    querySnapshot.docs.forEach((doc) => {
      if (++currentBatchSize >= 500) {
        currentBatch = writeBatch(db)
        batches.push(currentBatch)
        currentBatchSize = 1
      }

      currentBatch.update(doc.ref, { [follow]: arrayRemove(userId) })
    })

    await Promise.all(batches.map((batch) => batch.commit()))
  } catch (error) {
    console.error(error.message)
  }
}

const deleteUserPosts = async (userId) => {
  try {
    let currentBatch = writeBatch(db)
    let currentBatchSize = 0
    const batches = [currentBatch]

    const postsRef = collection(db, 'posts')
    const q = query(postsRef, where('creatorId', '==', userId))
    const querySnapshot = await getDocs(q)

    querySnapshot.docs.forEach((doc) => {
      if (++currentBatchSize >= 500) {
        currentBatch = writeBatch(db)
        batches.push(currentBatch)
        currentBatchSize = 1
      }

      currentBatch.delete(doc.ref)
    })

    await Promise.all(batches.map((batch) => batch.commit()))
  } catch (error) {
    console.error(error.message)
  }
}

const deleteUserInteractions = async (userId, interaction) => {
  try {
    let currentBatch = writeBatch(db)
    let currentBatchSize = 0
    const batches = [currentBatch]

    const postsRef = collection(db, 'posts')
    const q = query(postsRef, where(interaction, 'array-contains', userId))
    const querySnapshot = await getDocs(q)

    querySnapshot.docs.forEach((doc) => {
      if (++currentBatchSize >= 500) {
        currentBatch = writeBatch(db)
        batches.push(currentBatch)
        currentBatchSize = 1
      }

      currentBatch.update(doc.ref, { [interaction]: arrayRemove(userId) })
    })

    await Promise.all(batches.map((batch) => batch.commit()))
  } catch (error) {
    console.error(error.message)
  }
}

const deleteUserComments = async (userId) => {
  try {
    let currentBatch = writeBatch(db)
    let currentBatchSize = 0
    const batches = [currentBatch]

    const commentsRef = collectionGroup(db, 'comments')
    const q = query(commentsRef, where('creatorId', '==', userId))
    const querySnapshot = await getDocs(q)

    for await (const document of querySnapshot.docs) {
      if (++currentBatchSize >= 500) {
        currentBatch = writeBatch(db)
        batches.push(currentBatch)
        currentBatchSize = 1
      }
      const postRef = doc(db, 'posts', document.data().postId)

      await updateDoc(postRef, { commentsNumber: increment(-1) })

      currentBatch.delete(document.ref)
    }

    await Promise.all(batches.map((batch) => batch.commit()))
  } catch (error) {
    console.error(error.message)
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

/////////////////// Save changes to user Posts
export const saveChangesToUserPosts = async (user, data) => {
  try {
    let currentBatch = writeBatch(db)
    let currentBatchSize = 0
    const batches = [currentBatch]

    const postsRef = collection(db, 'posts')

    const q = query(postsRef, where('creatorId', '==', user.id))

    const querySnapshot = await getDocs(q)

    querySnapshot.docs.forEach((doc) => {
      if (++currentBatchSize >= 500) {
        currentBatch = writeBatch(db)
        batches.push(currentBatch)
        currentBatchSize = 1
      }

      currentBatch.update(doc.ref, {
        creatorName: data.name,
        creatorUsername: data.username,
      })
    })

    await Promise.all(batches.map((batch) => batch.commit()))
  } catch (error) {
    console.log(error.message)
  }
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

      await saveChangesToUserPosts(user, { name, username })

      return
    }

    const usernameResponse = await findUserByUsername(username)

    if (usernameResponse) {
      throw new Error("Username already taken, changes weren't saved!")
    }

    const userRef = doc(db, 'users', user.id)

    await setDoc(userRef, { name, username, birthday }, { merge: true })
    await saveChangesToUserPosts(user, { name, username })
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

    const q = query(usersRef, where('id', '!=', user.id), limit(30))

    const response = await getDocs(q)

    const usersList = response.docs
      .map((user) => user.data())
      .filter((profile) => !user.following.includes(profile.id))

    return usersList
  } catch (error) {
    console.log(error.message)
  }
}
