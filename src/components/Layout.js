import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <div className="px-6 mx-auto max-w-7xl">{children}</div>

      <Footer />
    </>
  );
}
