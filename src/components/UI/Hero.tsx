import { Badge, Image } from "@chakra-ui/react";

function Hero() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="space-y-8">
        <div>
          <h1 className="max-w-xl">2023 Computional Physics Challenge</h1>
          <h4>By Ahmed Elsayed</h4>
        </div>
        <div className="space-y-2">
          <h5>Technologies:</h5>
          <div className="space-x-2">
            <Badge
              colorScheme="teal"
              fontSize="1rem"
              rounded="sm"
              padding="1.5"
            >
              React
            </Badge>
            <Badge
              colorScheme="teal"
              fontSize="1rem"
              rounded="sm"
              padding="1.5"
            >
              Rust
            </Badge>
          </div>
        </div>
      </div>
      {/* <div> */}
      <Image
        boxSize="500px"
        objectFit="cover"
        src="./Hero_Earth.webp"
        alt="Dan Abramov"
      />
      {/* </div> */}
    </div>
  );
}

export default Hero;
