import { useState, useEffect } from 'react'
import { getPostById } from '../services/postServices'

export default function useFollowedPosts(postId) {
  const [post, setPost] = useState({})

  useEffect(() => {
    const getPosts = async () => {
      const response = await getPostById(postId)

      setPost(response)
    }

    if (postId) getPosts()
  }, [postId])

  return { post, setPost }
}
