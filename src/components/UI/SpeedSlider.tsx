import { useState } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

interface SpeedSliderProps {
  onValueChangeEnd: (value: number) => void;
  colorScheme?: string;
}

function SpeedSlider({ onValueChangeEnd, colorScheme }: SpeedSliderProps) {
  const [sliderValue, setSliderValue] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };

  return (
    <Slider
      defaultValue={sliderValue}
      min={0.5}
      max={2}
      step={0.1}
      colorScheme={colorScheme || "teal"}
      onChange={handleSliderChange}
      onChangeEnd={onValueChangeEnd}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {[0.5, 1, 1.5, 2].map((val) => (
        <SliderMark key={val} value={val} mt="1" ml="-2.5" fontSize="sm">
          {val}x
        </SliderMark>
      ))}
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${sliderValue}x`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
}

export default SpeedSlider;
