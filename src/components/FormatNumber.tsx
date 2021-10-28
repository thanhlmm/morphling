import { formatUnits } from "@ethersproject/units";

// TODO: Add animation when change
const FormatNumber = ({ number, format = "ether", unit = "" }) => {
  return (
    <span>
      {formatUnits(number, format)} {unit}
    </span>
  );
};

export default FormatNumber;
