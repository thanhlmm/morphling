import { formatUnits } from "@ethersproject/units";

// TODO: Add animation when change
const FormatNumber = ({ number, format = "ether", unit = "", fixed = 5 }) => {
  return (
    <span>
      {Number(formatUnits(number, format)).toFixed(fixed)} {unit}
    </span>
  );
};

export default FormatNumber;
