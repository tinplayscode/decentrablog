import React, { useCallback, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import Interweave from "interweave";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/solid";
import { Helmet } from "react-helmet";
import moment from "moment";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  // get current user vote status: None, Upvoted or Downvoted
  const [voteStatus, setVoteStatus] = useState(null);

  // an array with 2 items, first item is upvote, second item is downvote
  const [voteStatis, setVoteStatis] = useState(null);

  // Dialog for checking voting list
  let [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id) {
          const loadPost = window.contract.get_post({ post_id: parseInt(id) });

          const loadComments = window.contract.get_paging_comments({
            post_id: parseInt(id),
            page: 1,
            page_size: 10,
          });

          const loadUpvoteState = window.contract.get_user_vote_status({
            post_id: parseInt(id),
            user_id: window.walletConnection.getAccountId(),
          });

          const loadPoint = window.contract.get_votes_statistics({
            post_id: parseInt(id),
          });

          const [post, comments, voteStatus, point] = await Promise.all([
            loadPost,
            loadComments,
            loadUpvoteState,
            loadPoint,
          ]);

          setPost(post);
          setComments(comments);
          setVoteStatus(voteStatus);
          setVoteStatis(point);

          console.log(post, comments, voteStatus, point);
        }
      } catch (e) {
        console.log(e);
        toast.error("Post not found... redirecting to home ☹️");

        navigate("/");
      }
    };

    loadData();
  }, []);

  if (!post) {
    return (
      <div className="w-full mx-auto">
        <HashLoader loading={post} />
      </div>
    );
  }

  const handleUpvoteButton = async () => {
    try {
      const result =
        voteStatus === "Upvoted"
          ? window.contract.remove_upvote({
              post_id: parseInt(id),
            })
          : window.contract.upvote({
              post_id: parseInt(id),
            });

      await toast.promise(result, {
        pending:
          voteStatus === "Upvoted" ? "Removing upvote..." : "Upvoting...",
        success:
          voteStatus === "Upvoted"
            ? "Upvote removed successfully! 😄"
            : "Upvote added successfully! 😄",
        error:
          voteStatus === "Upvoted"
            ? "Upvote removing failed! 😞"
            : "Upvote adding failed! 😞",
      });

      //Decrease when user change his mind
      const newDownvoteStatis =
        voteStatis[1] - 1 * (voteStatus === "Downvoted");

      const newVoteStatus = voteStatus === "Upvoted" ? "None" : "Upvoted";
      const newPoint =
        voteStatus === "Upvoted" ? voteStatis[0] - 1 : voteStatis[0] + 1;

      setVoteStatus(newVoteStatus);
      setVoteStatis([newPoint, newDownvoteStatis]);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const handleDownvoteButton = async () => {
    try {
      const result =
        voteStatus === "Downvoted"
          ? window.contract.remove_downvote({
              post_id: parseInt(id),
            })
          : window.contract.downvote({
              post_id: parseInt(id),
            });

      await toast.promise(result, {
        pending:
          voteStatus === "Downvoted" ? "Removing downvote..." : "Downvoting...",
        success:
          voteStatus === "Downvoted"
            ? "Downvote removed successfully! 😄"
            : "Downvote added successfully! 😄",
        error:
          voteStatus === "Downvoted"
            ? "Downvote removing failed! 😞"
            : "Downvote adding failed! 😞",
      });

      const newUpvoteStatis = voteStatis[0] - 1 * (voteStatus === "Upvoted");

      const newVoteStatus = voteStatus === "Downvoted" ? "None" : "Downvoted";
      const newPoint =
        voteStatus === "Downvoted" ? voteStatis[1] - 1 : voteStatis[1] + 1;

      setVoteStatus(newVoteStatus);
      setVoteStatis([newUpvoteStatis, newPoint]);
    } catch (e) {
      toast.error(e.message);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const { title, body, author, post_id } = post;

  return (
    <>
      <Helmet>
        <title>{title} - humanofnear.com</title>
      </Helmet>

      {/* Back button */}
      <button className="px-4 py-2 mb-4 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700">
        <Link to="/">Back</Link>
      </button>

      <div className="top-[35%] shadow-md ring-1 ring-black ring-opacity-10 left-3 bg-gray-100 rounded p-4 fixed flex flex-col items-center justify-center">
        {voteStatis && (
          <span className="text-2xl">{voteStatis[0] - voteStatis[1]}</span>
        )}
        {/* Upvote/downvote */}
        <button
          className={`px-4 py-2 mb-1 font-bold text-white ${
            voteStatus === "Upvoted" ? "bg-blue-500" : "bg-gray-400"
          } rounded-full hover:bg-blue-700 transition`}
          onClick={handleUpvoteButton}
        >
          <ThumbUpIcon className="w-4 h-4" />
        </button>
        <button
          className={`px-4 py-2 mb-1 font-bold text-white ${
            voteStatus === "Downvoted" ? "bg-blue-500" : "bg-gray-400"
          } rounded-full hover:bg-blue-700 transition`}
          onClick={handleDownvoteButton}
        >
          <ThumbDownIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col items-center w-full gap-2">
        <h1 className="text-3xl">{title}</h1>

        <p className="">
          author: {author} / post_id: {post_id}
        </p>
      </div>

      <div className="flex items-center w-full gap-2 p-2 text-lg shadow-xl ring-1 ring-black ring-opacity-5">
        <Interweave content={body}></Interweave>
      </div>

      {/* Comment section */}
      <div className="w-full gap-2 p-2">
        <h1 className="text-xl">Comments</h1>

        <CommentForm post_id={post_id} />

        {comments.map((comment) => (
          <div key={comment.comment_id}>
            <p>
              <Link to={`/profile/{comment.author}`} title={comment.author}>
                {comment.author} -{" "}
                {moment(Date(comment.created_at / 1000000)).fromNow()}
              </Link>
              :{comment.body}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

function CommentForm({ post_id }) {
  const navigate = useNavigate();
  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();

    const body = e.target.elements.body.value;
    const post_id = e.target.elements.post_id.value;

    try {
      const result = window.contract.create_comment({
        body,
        post_id: parseInt(post_id),
      });

      await toast.promise(result, {
        pending: "Creating comment...",
        success: "Creating comment successfully! 😄",
        error: `Creating comment failed, your comment may be too short! 😞`,
      });

      setTimeout(() => {
        // reload
        window.location.reload();
      }, 2000);
    } catch (e) {}
  }, []);

  return (
    <form onSubmit={handleFormSubmit}>
      <textarea
        id="body"
        className="w-full p-2 rounded ring-1 ring-gray-400"
      ></textarea>

      <input type="hidden" name="post_id" value={post_id} />
      <button
        type="submit"
        className="p-2 text-white transition bg-indigo-400 rounded hover:bg-opacity-80"
      >
        Send comment
      </button>
    </form>
  );
}
