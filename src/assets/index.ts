import MercuryImg from "./Mercury.png";
import VenusImg from "./Venus.png";
import EarthImg from "./Earth.png";
import MarsImg from "./Mars.png";
import JupiterImg from "./Jupiter.png";
import SaturnImg from "./Saturn.png";
import UranusImg from "./Uranus.png";
import NeptuneImg from "./Neptune.png";
import PlutoImg from "./Pluto.png";

import SunImg from "./Sun.png";

export type PlanetImageMap = {
  [planetName: string]: string;
};

export const planetImageLookup: PlanetImageMap = {
  Mercury: MercuryImg,
  Venus: VenusImg,
  Earth: EarthImg,
  Mars: MarsImg,
  Jupiter: JupiterImg,
  Saturn: SaturnImg,
  Uranus: UranusImg,
  Neptune: NeptuneImg,
  Pluto: PlutoImg,
};

export {
  MercuryImg,
  VenusImg,
  EarthImg,
  MarsImg,
  JupiterImg,
  SaturnImg,
  UranusImg,
  NeptuneImg,
  PlutoImg,
  SunImg,
};
