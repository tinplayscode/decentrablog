import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { Link } from "react-router-dom";
import { DocumentIcon } from "@heroicons/react/solid";

export default function ProfileView() {
  const { accountId } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (accountId) {
      window.contract.get_user_posts({ user_id: accountId }).then((posts) => {
        setPosts(posts);
      });
    }
  }, [accountId]);

  return (
    <>
      <h1 className="text-xl">{accountId}'s profile</h1>
      <div className="flex items-center w-full gap-2">
        <h1 className="text-xl">name: {accountId}</h1>

        <div className="flex-grow m-2">
          <h2 className="text-2xl">Posts</h2>
          <ul className="w-full">
            {posts.map((post) => (
              <Link to={`/posts/${post.post_id}`}>
                <div className="flex items-center gap-1 p-2 bg-gray-300 hover:bg-gray-200">
                  <DocumentIcon className="w-4 h-4" />
                  <h2>{post.title}</h2>
                </div>{" "}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
