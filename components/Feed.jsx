'use client';

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";


const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
       {data?.map(post => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState(null)
  const router = useRouter()



  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/prompt")
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.log(error);
      }
    }
    getData()
  }, [])


  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/search?q=${searchText}`)
  }


  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSearch}>
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={(e) => setSearchText(e.target.value)} required className="search_input peer" />

      </form>

      <PromptCardList 
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed