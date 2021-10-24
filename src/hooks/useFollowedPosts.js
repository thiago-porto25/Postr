import { useState, useEffect } from 'react'
import { getFollowedPosts } from '../services/postServices'

export default function useFollowedPosts(userObj) {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const response = await getFollowedPosts(userObj)

      setPosts(response)
    }

    if (userObj && userObj.following[0]) getPosts()
  }, [userObj])

  return { posts, setPosts }
}
