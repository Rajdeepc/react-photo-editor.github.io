import React from "react";
import Slider from "../Slider/Slider";

export default function Sidebar({ options, handleSliderChange }) {
  return options.map((item) => (
    <div>
      <p className="slider-name">{item.name}</p>
      <Slider
        min={item.range.min}
        max={item.range.max}
        value={item.value}
        handleChange={(e) => handleSliderChange(e, item.name)}
      />
    </div>
  ));
}
