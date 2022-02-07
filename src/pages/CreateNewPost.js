import React, { useCallback, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import useQuery from "../hooks/useQuery";
import { getTransactionUrl } from "../utils/near";

export default function CreateNewPost() {
  //get url params
  const query = useQuery();
  const navigate = useNavigate();
  const [creatingPost, setCreatingPost] = useState(false);

  const editorRef = useRef(null);
  const handleFormSubmit = useCallback(async (event) => {
    event.preventDefault();

    const title = event.target.elements.title.value;
    const body = editorRef.current.getContent();

    if (!title || !body) {
      toast.error("Please fill out all fields");
      return;
    }

    if (!window.walletConnection.isSignedIn()) {
      toast.error("You must be signed in to create a post");
      return;
    }

    try {
      setCreatingPost(true);

      const result = window.contract.create_post({
        title,
        body,
      });

      await toast.promise(result, {
        pending: "Creating post...",
        success: "Creating post successfully! Redirecting... 😄",
        error: "Creating post failed! 😞",
      });

      const postId = await result;

      navigate(`/posts/${postId}`);
    } catch (e) {
      toast.error(e.message);
    }

    setCreatingPost(false);
  });

  if (creatingPost) {
    return (
      <div className="w-full mx-auto">
        <HashLoader loading={creatingPost} />
      </div>
    );
  }

  return (
    <>
      <section className="w-full space-y-2">
        {query.get("errorCode") === "userRejected" && (
          <div className="relative grid px-4 py-3 text-red-700 bg-red-100 border border-red-400 rounded">
            <strong className="font-bold">Error!</strong>
            <div className="block sm:inline">User rejected transaction.</div>
          </div>
        )}
        {query.get("transactionHashes") && (
          <div className="relative grid px-4 py-3 text-green-700 bg-green-100 border border-green-400 rounded">
            <strong className="font-bold">Success!</strong>
            <div className="block sm:inline">
              Transaction(s) submitted to the network.
              <br />
              Transaction link:
              <a
                href={getTransactionUrl(query.get("transactionHashes"))}
                className="hover:underline"
                target="_blank"
              >
                {getTransactionUrl(query.get("transactionHashes"))}
              </a>
            </div>
          </div>
        )}

        <h1 className="text-3xl">Create New Post</h1>

        <form onSubmit={handleFormSubmit} className="space-y-2">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              className="w-full p-2 rounded ring-1 ring-gray-400"
              name="title"
            />
          </div>

          <div>
            <label htmlFor="body">Body</label>
            <Editor
              // apiKey=""
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>

          <button
            type="submit"
            className="p-2 text-white transition bg-indigo-400 rounded hover:bg-opacity-80"
          >
            Create new post
          </button>
        </form>
      </section>
    </>
  );
}
