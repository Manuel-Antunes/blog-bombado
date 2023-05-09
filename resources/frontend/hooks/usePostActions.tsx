import axios from 'axios'
import { useCallback, useState } from 'react'
import { Post } from '../components/post/PostCard'
import { useStardust } from '../contexts/Stardust'
import { toast } from '../services/toast'

export const usePostActions = (post: Post) => {
  const [postState, setPostState] = useState<Post>(post)

  const stardust = useStardust()

  const like = useCallback(async () => {
    try {
      const { data } = await axios.post(
        stardust.route('posts_likes.store', {
          post_id: post.id,
        })
      )
      setPostState({ ...post, liked: data.liked, likes_count: data.likes_count })
    } catch (err) {
      toast.error((err as any).response.data)
    }
  }, [setPostState, post, stardust])

  return {
    postState,
    like,
  }
}
