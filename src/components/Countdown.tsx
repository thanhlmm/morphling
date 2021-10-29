import { useCountDown } from "ahooks";
import { useEffect } from "react";

const Countdown = ({ date, showDay = true }) => {
  const [countdown, setTargetDate, format] = useCountDown({
    targetDate: date,
  });

  useEffect(() => {
    setTargetDate(date);
  }, [date]);

  return (
    <div className="grid grid-flow-col gap-5 place-items-end auto-cols-max w-72">
      {showDay && (
        <div>
          <span className="font-mono text-xl">
            <span>{format.days}</span>
          </span>
          days
        </div>
      )}
      <div>
        <span className="font-mono text-xl">
          <span>{format.hours}</span>
        </span>
        hours
      </div>
      <div>
        <span className="font-mono text-xl">
          <span>{format.minutes}</span>
        </span>
        min
      </div>
      <div>
        <span className="font-mono text-xl">
          <span>{format.seconds}</span>
        </span>
        sec
      </div>
    </div>
  );
};

export default Countdown;
