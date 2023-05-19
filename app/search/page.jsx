'use client'

import React, { useEffect, useState } from 'react'
import PromptCard from '@components/PromptCard'
import { useSearchParams } from 'next/navigation';

const Search = () => {

    const [data, setData] = useState(null)
    const searchParams = useSearchParams()
    const query = searchParams.get("q")

    useEffect(() => {
        const getPosts = async () => {
          try {
              const res = await fetch(`/api/search/${query}`)
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
        <span className="blue_gradient">Search</span>
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

export default Search