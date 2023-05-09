import axios from 'axios'
import { useCallback, useState } from 'react'
import { Post } from '../components/post/PostCard'
import { toast } from '../services/toast'

export const usePostActions = (post: Post) => {
  const [postState, setPostState] = useState<Post>(post)

  const like = useCallback(async () => {
    try {
      const { data } = await axios.post(`/posts/${post.id}/likes`)
      setPostState({ ...post, liked: data.liked, likes_count: data.likes_count })
    } catch (err) {
      toast.error((err as any).response.data.message)
    }
  }, [setPostState, post])

  return {
    postState,
    like,
  }
}
