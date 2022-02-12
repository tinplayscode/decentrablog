import React from "react";
import { Link } from "react-router-dom";
import Interweave from "interweave";
import moment from "moment";

export default function Card({ post }) {
  const { post_id, title, body, author, created_at } = post;

  const time = new Date(created_at / 1000000);
  const month = moment(time).format("MMM");
  const day = moment(time).format("DD");

  return (
    <div className="px-4 py-8 lg:w-1/3">
      <div className="flex items-start h-full">
        <div className="flex flex-col flex-shrink-0 w-12 leading-none text-center">
          <span className="pb-2 mb-2 text-gray-500 border-b-2 border-gray-200">
            {month}
          </span>
          <span className="text-lg font-medium leading-none text-gray-800 title-font">
            {day}
          </span>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="mb-1 text-xs font-medium tracking-widest text-indigo-500 title-font">
            CATEGORY
          </h2>
          <Link to={`/posts/${post.post_id}`}>
            <h1 className="mb-3 text-xl font-medium text-gray-900 title-font">
              {title.length > 50 ? title.slice(0, 50) + "..." : title}
            </h1>
          </Link>
          <div className="mb-5 leading-relaxed line-clamp-2">
            <Interweave
              content={
                body.length > 100 ? body.substring(0, 100) + "..." : body
              }
            />
          </div>
          <Link to={`profile/${author}`} className="inline-flex items-center">
            <img
              alt="blog"
              src="https://dummyimage.com/103x103"
              className="flex-shrink-0 object-cover object-center w-8 h-8 rounded-full"
            />
            <span className="flex flex-col flex-grow pl-3">
              <span className="font-medium text-gray-900 title-font">
                {author}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
