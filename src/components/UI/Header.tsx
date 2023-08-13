import React from "react";
import Navigation from "./Navigation";
import Hero from "./Hero";

function Header() {
  return (
    <div className="px-4 md:px-8 bg-cyan-100/50">
      <Navigation />
      <Hero />
    </div>
  );
}

export default Header;
