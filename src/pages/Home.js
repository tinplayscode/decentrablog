import React, { useCallback, useEffect, useState } from "react";
import Card from "../components/presentation/Card";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 9;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    // Get total posts
    window.contract.get_total_posts().then((totalPosts) => {
      setTotalPosts(totalPosts);
    });

    // Fetch post from page 1
    window.contract
      .get_paging_posts({ page: 1, page_size: PAGE_SIZE })
      .then((posts) => {
        setPosts(posts);
      });
  }, []);

  const handlePageClick = useCallback(
    (data) => {
      const selectedPage = data.selected + 1;
      window.contract
        .get_paging_posts({ page: selectedPage, page_size: PAGE_SIZE })
        .then((posts) => {
          setPosts(posts);

          // navigate to the selected page
          navigate(`/?page=${selectedPage}`);
        });
    },
    [setPosts]
  );

  return (
    <div>
      <h1 className="text-xl">Home</h1>
      <NewPosts posts={posts} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(totalPosts / PAGE_SIZE)}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex gap-2 mx-auto w-full items-center"
        pageClassName="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-900"
        pageActiveClassName="bg-gray-100 text-gray-900"
        previousClassName="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-900"
        nextClassName="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 hover:text-gray-900"
      />
    </div>
  );
}
function NewPosts({ posts }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -mx-4 -my-8">
          {posts.map((post) => {
            return <Card key={post.post_id} post={post} />;
          })}
        </div>
      </div>
    </section>
  );
}
