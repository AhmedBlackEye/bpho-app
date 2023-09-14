import Navigation from "./Navigation";
import Hero from "./Hero";

function Header() {
  return (
    <div className="px-4 md:px-16 bg-gradient-to-b from-indigo-50 ">
      <Navigation />
      <Hero />
    </div>
  );
}

export default Header;
