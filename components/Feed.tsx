"use client";

import { useState, useEffect, ChangeEvent, useRef } from "react";

import PromptCard from "./PromptCard";
import { Post } from "@global-types";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: Post[];
  handleTagClick: (tag: string) => void;
}) => {
  return (
    <div className="mt-16 prompt_layout ">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const setSearchTag = useRef(false);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `/api/prompt${searchText === "" ? "" : "?query=" + searchText}`
      );
      const data = await res.json();
      setPosts(data);
    };
    if (setSearchTag.current) {
      fetchPosts();
      setSearchTag.current = false;
      return;
    }
    const timer = setTimeout(() => {
      fetchPosts();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchText]);
  const handleTagClick = (tag: string) => {
    setSearchText(tag);
    setSearchTag.current = true;
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};
export default Feed;
