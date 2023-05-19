'use client'

import React, { useEffect, useState } from 'react'
import PromptCard from '@components/PromptCard'
import { useSearchParams } from 'next/navigation';

const Category = () => {

    const [data, setData] = useState(null)
    const id = window.location.pathname.split("/")[2]

    useEffect(() => {
        const getPosts = async () => {
          try {
              const res = await fetch(`/api/tag/${id}`)
              const resData = await res.json()
              setData(resData)
          } catch (error) {
              console.log(error);
          }
        }
         
        getPosts()
    }, [])



  return (
    <section className="w-full">
      <h1>
        <span className="blue_gradient">Category</span>
      </h1>
      <div className="mt-10 prompt_layout">
        {data?.map(post => (
          <PromptCard
            key={post._id}
            post={post}
          />
        ))}
      </div>
    </section>
  )
}

export default Category