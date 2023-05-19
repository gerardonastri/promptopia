'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const ProfilePage = () => {
    
    const router = useRouter()
    const [posts, setPosts] = useState(null)
   

    useEffect(() => {
      if(window){
        const getData = async () => {
          const id = window.location.pathname.split("/")[2]
          try {
            const res = await fetch(`/api/users/${id}/posts`)
            const data = await res.json()
            setPosts(data)
          } catch (error) {
            console.log(error);
          }
        }
        if(id){
          getData()
        }
      }
    }, [])



  return (
    <Profile
        name=""
        desc="Welcome to profile page"
        data={posts}
        handleEdit={() => {}}
        handleDelete={() => {}}
    />
  )
}

export default ProfilePage