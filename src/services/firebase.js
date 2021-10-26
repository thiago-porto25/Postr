import {
  db,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  doc,
  query,
  where,
  writeBatch,
  orderBy,
  startAt,
  endAt,
  limit,
} from '../firebase/config'

export async function getUserByUserId(userId) {
  const docSnap = await getDoc(doc(db, 'users', userId))

  const user = docSnap.data()

  return user
}

export async function saveProfileChanges(user, data) {
  try {
    await saveProfileChangesInUsersCollection(user, data)
    await saveProfileChangesInPosts(user, data)
  } catch (error) {
    console.error(error.message)
  }
}

async function saveProfileChangesInUsersCollection(user, data) {
  try {
    const userRef = doc(db, 'users', user.id)

    await updateDoc(userRef, {
      name: data.name,
      bio: data.bio,
      avatarPhotoUrl: data.avatar,
      backgroundPhotoUrl: data.background,
    })
  } catch (error) {
    console.error(error.message)
  }
}

export async function saveProfileChangesInPosts(user, data) {
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
        creatorAvatar: data.avatar,
      })
    })

    await Promise.all(batches.map((batch) => batch.commit()))
  } catch (error) {
    console.error(error.message)
  }
}

export async function getSearchResult(term) {
  try {
    const usersRef = collection(db, 'users')

    const q = query(
      usersRef,
      orderBy('username'),
      startAt(term),
      endAt(term + '~'),
      limit(100)
    )

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs
      .map((doc) => doc.data())
      .sort((a, b) => b.followers.length - a.followers.length)
  } catch (error) {
    console.error(error.message)
  }
}
