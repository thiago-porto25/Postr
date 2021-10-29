import {
  db,
  collection,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  limit,
  serverTimestamp,
  doc,
  query,
  where,
  orderBy,
} from '../firebase/config'
import { v4 as uuid } from 'uuid'
import { deletePostComments } from './commentServices'

export const getPostById = async (postId) => {
  try {
    const postRef = doc(db, 'posts', postId)

    const post = await getDoc(postRef)

    return post.data()
  } catch (error) {
    console.error(error.message)
  }
}

export const ToggleInteraction = async (
  docId,
  interaction,
  hasInteracted,
  setInteraction,
  userId,
  setPosts,
  setLikedPosts,
  setPost
) => {
  try {
    const postRef = doc(db, 'posts', docId)

    await updateDoc(postRef, {
      [interaction]: hasInteracted ? arrayRemove(userId) : arrayUnion(userId),
    })

    setInteraction((prev) => !prev)

    if (setPosts) {
      if (hasInteracted) {
        setPosts((prev) =>
          prev.map((post) => {
            if (post.id === docId) {
              return {
                ...post,
                [interaction]: post[interaction].filter(
                  (item) => item !== userId
                ),
              }
            }
            return post
          })
        )

        if (setLikedPosts && interaction === 'likes')
          setLikedPosts((prev) => prev.filter((post) => post.id !== docId))
      } else {
        let newLikedPost

        setPosts((prev) =>
          prev.map((post) => {
            if (post.id === docId) {
              newLikedPost = {
                ...post,
                [interaction]: [...post[interaction], userId],
              }
              return newLikedPost
            }
            return post
          })
        )

        if (setLikedPosts && interaction === 'likes')
          setLikedPosts((prev) => [...prev, newLikedPost])
      }
    }

    if (setPost) {
      if (hasInteracted) {
        setPost((prevPost) => ({
          ...prevPost,
          [interaction]: prevPost[interaction].filter(
            (item) => item !== userId
          ),
        }))
      } else
        setPost((prevPost) => ({
          ...prevPost,
          [interaction]: [...prevPost[interaction], userId],
        }))
    }
  } catch (error) {
    console.error(error.message)
  }
}

export const getFollowedPosts = async (userObj) => {
  try {
    const postsRef = collection(db, 'posts')

    const mutableFollowing = userObj.following.map((item) => item)
    const result = []

    while (mutableFollowing.length) {
      const batch = mutableFollowing.splice(0, 10)

      const q = query(
        postsRef,
        where('creatorId', 'in', [...batch]),
        orderBy('createdAt', 'desc'),
        limit(300)
      )

      const querySnapshot = await getDocs(q)

      result.push(
        ...querySnapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }))
      )
    }

    return result
  } catch (error) {
    console.error(error.message)
  }
}

export const getProfilePosts = async (userId) => {
  try {
    const postsRef = collection(db, 'posts')

    const postsQuery = query(
      postsRef,
      where('creatorId', '==', userId),
      limit(300)
    )
    const rePostsQuery = query(
      postsRef,
      where('rePosts', 'array-contains', userId),
      limit(300)
    )

    const query1Snapshot = await getDocs(postsQuery)
    const query2Snapshot = await getDocs(rePostsQuery)

    const profilePosts = query1Snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }))
    const profileRePostsBeforeFilter = query2Snapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }))

    const profileRePosts = profileRePostsBeforeFilter.filter(
      (post) => post.creatorId !== userId
    )

    const returnedPosts = [...profilePosts, ...profileRePosts].sort(
      (a, b) => b.createdAt - a.createdAt
    )

    return returnedPosts
  } catch (error) {
    console.error(error.message)
  }
}

export const getProfileLikedPosts = async (userId) => {
  try {
    const postsRef = collection(db, 'posts')

    const q = query(postsRef, where('likes', 'array-contains', userId))

    const querySnapshot = await getDocs(q)

    const likedPosts = querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...doc.data(),
    }))

    return likedPosts.sort((a, b) => b.createdAt - a.createdAt)
  } catch (error) {
    console.error(error.message)
  }
}

export const createPost = async ({
  user,
  postValue,
  setPostValue,
  setLoading,
  profileUser,
  setProfilePosts,
}) => {
  try {
    const newPostId = uuid()

    const postsRef = doc(db, 'posts', newPostId)

    await setDoc(postsRef, {
      id: newPostId,
      creatorId: user.id,
      creatorName: user.name,
      creatorUsername: user.username,
      creatorAvatar: user.avatarPhotoUrl,
      content: postValue.trim(),
      createdAt: serverTimestamp(),
      likes: [],
      rePosts: [],
      commentsNumber: 0,
    })

    setPostValue('')

    if (profileUser && setProfilePosts && user.id === profileUser.id) {
      setProfilePosts((prev) => [
        {
          id: newPostId,
          creatorId: user.id,
          creatorName: user.name,
          creatorUsername: user.username,
          creatorAvatar: user.avatarPhotoUrl,
          content: postValue.trim(),
          createdAt: new Date(),
          likes: [],
          rePosts: [],
          commentsNumber: 0,
        },
        ...prev,
      ])
    }
  } catch (error) {
    setPostValue('')
    setLoading(false)
  }
}

export const deletePost = async (
  postId,
  setProfilePosts,
  setLikedPosts,
  redirect
) => {
  try {
    const postRef = doc(db, 'posts', postId)

    await deleteDoc(postRef)
    await deletePostComments(postId)

    if (setProfilePosts)
      setProfilePosts((prev) => prev.filter((post) => post.id !== postId))

    if (setLikedPosts)
      setLikedPosts((prev) => prev.filter((post) => post.id !== postId))

    if (redirect) redirect()
  } catch (error) {
    console.error(error.message)
  }
}
