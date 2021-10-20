import { useState, useEffect } from 'react'
import { getPostComments } from '../services/commentServices'

const usePostComments = (postId) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    const retrieveComments = async () => {
      const response = await getPostComments(postId)
      setComments(response)
    }

    if (postId) retrieveComments()
  }, [postId])

  return { comments, setComments }
}

export default usePostComments
