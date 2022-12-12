import * as React from "react";
import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

export default function MuiSlider(props) {

  const handleSliderChange = (e, value) => {
    props.setPriceUpperBound(value);
  };
  return (
    <>
      <Typography gutterBottom>Price($)</Typography>
      <Slider
        valueLabelDisplay="auto"
        slots={{
          valueLabel: ValueLabelComponent,
        }}
        aria-label="custom thumb label"
        value={props.priceUpperBound}
        min={2}
        max={10}
        onChange={handleSliderChange}
        sx={{
          color: "var(--color-red-dark)",
          "& .MuiSlider-thumb": {
            backgroundColor: "#fff",
            border: "2px solid currentColor",
            "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
              boxShadow: "inherit",
            },
          },
        }}
      />
    </>
  );
}
