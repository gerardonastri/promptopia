'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    
    const {data: session} = useSession()
    const router = useRouter()
    const [posts, setPosts] = useState(null)

    useEffect(() => {
      const getData = async () => {
        try {
          const res = await fetch(`/api/users/${session?.user.id}/posts`)
          const data = await res.json()
          setPosts(data)
        } catch (error) {
          console.log(error);
        }
      }
      if(session?.user.id){
        getData()
      }
    }, [])

    
    const handleEdit = (postId) => {
      // console.log(postId);
      router.push(`/update-prompt?id=${postId}`)
    }

    const handleDelete = async (postId) => {
      const hasConfirmed = confirm("Are you sure you want to delete?")

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${postId}`, {
            method: "DELETE"
          })

          const filteresPosts = posts.filter(post => post._id !== postId)
        } catch (error) {
          console.log(error);
        }
      }
    }

  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile