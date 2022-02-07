import "regenerator-runtime/runtime";
import React from "react";
import "./global.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateNewPost from "./pages/CreateNewPost";

import Layout from "./components/Layout";
import Error404Page from "./pages/Error404";
import AllPost from "./pages/posts/AllPost";
import PostView from "./pages/posts/PostView";
import AllProfile from "./pages/profile/AllProfile";
import ProfileView from "./pages/profile/ProfileView";

export default function App() {
  return (
    // use React Fragment, <>, to avoid wrapping elements in unnecessary divs
    <Layout>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route
          path="/create-new-post"
          exact
          element={<CreateNewPost />}
        ></Route>
        <Route path="/posts" exact element={<AllPost />}></Route>
        <Route path="/posts/:id" element={<PostView />}></Route>
        <Route path="/profile" exact element={<AllProfile />}></Route>
        <Route path="/profile/:accountId" element={<ProfileView />}></Route>

        <Route path="*" element={<Error404Page />}></Route>
      </Routes>
    </Layout>
  );
}
