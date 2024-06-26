"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import { CustomSession, Post } from "@global-types";

const Page = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const username = searchParams.get("username");
  const router = useRouter();
  const pageId = (session?.user as CustomSession)?.id;

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: Post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt ?"
    );
    if (!hasConfirmed) {
      return;
    }
    try {
      await fetch(`/api/prompt/${post._id?.toString()}`, {
        method: "DELETE",
      });
      const filteredPosts = posts.filter((p: Post) => p._id !== post._id);

      setPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${userId}/posts`);
      const data = await res.json();
      setPosts(data);
    };

    if (userId) fetchPosts();
  }, [userId]);
  return (
    <Profile
      name={pageId !== userId ? username + "'s" || "" : "My "}
      desc={`Welcome to ${
        pageId !== userId ? username + "'s" || "" : "your profile "
      }`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Page;
