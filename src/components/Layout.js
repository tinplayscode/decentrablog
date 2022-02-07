import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />

      <main className="container flex flex-wrap items-center p-5 mx-auto">
        {children}
      </main>

      <Footer />
    </>
  );
}
