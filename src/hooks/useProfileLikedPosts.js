import { useState, useEffect } from 'react'
import { getProfileLikedPosts } from '../services/postServices'

export default function useProfileLikedPosts(userId) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await getProfileLikedPosts(userId)

      setPosts(response)
    }

    if (userId) getPosts()
  }, [userId])

  return { posts, setPosts }
}
