import { useAtom } from 'jotai'
import React, { useEffect } from 'react'
import { postAtom } from '@/atoms'
import { useSocket } from '@/contexts/SocketContext';
import { getAll } from '@/apis/Posts';

const FeedIndex = () => {
  const [posts, setPosts] = useAtom(postAtom);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('new_post', () => {
        fetchNewPosts();
      })
    }
  }, [socket])

  const fetchNewPosts = async () => {
    const res = await getAll();
    const data = res?.data?.reverse();
    setPosts(data);
  }
  
  return (
    <div>
    {posts.length > 0 ? (
      posts.map((post) => <div key={post.id}>{post.title}</div>)
    ) : (
      <div>No posts available</div>
    )}
  </div>
  )
}

export default FeedIndex