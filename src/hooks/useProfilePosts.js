import { useState, useEffect } from 'react'
import { getProfilePosts } from '../services/postServices'

export default function useProfilePosts(userId) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await getProfilePosts(userId)

      setPosts(response)
    }

    if (userId) getPosts()
  }, [userId])

  return { posts, setPosts }
}
