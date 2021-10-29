import { formatUnits } from "@ethersproject/units";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), { ssr: false });

// TODO: Add animation when change
const FormatNumber = ({ number, format = "ether", unit = "", fixed = 5 }) => {
  return (
    <span>
      <AnimatedNumbers
        includeComma
        animateToNumber={Number(Number(formatUnits(number, format)).toFixed(fixed))}
        configs={[
          { mass: 1, tension: 300, friction: 100 },
          { mass: 1, tension: 300, friction: 100 },
          { mass: 1, tension: 300, friction: 100 },
          { mass: 1, tension: 300, friction: 100 },
          { mass: 1, tension: 300, friction: 100 },
          { mass: 1, tension: 300, friction: 100 },
        ]}
      ></AnimatedNumbers>
      {unit}
    </span>
  );
};

export default FormatNumber;
