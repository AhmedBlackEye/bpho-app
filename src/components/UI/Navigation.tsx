import { Image } from "@chakra-ui/react";

function Navigation() {
  return (
    <div className="flex justify-between py-2">
      <Image
        boxSize="50px"
        objectFit="cover"
        src="./Logo.webp"
        alt="Dan Abramov"
      />
      <nav>
        <a href="#" className="text-lg font-semibold cursor-pointer">
          Source Code
        </a>
      </nav>
    </div>
  );
}

export default Navigation;
