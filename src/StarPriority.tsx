import { useState } from "react";

const containerStyle = { display: "flex", alignItems: "center", gap: "16px" };
const starContainerStyle = { display: "flex" };

type PriorityRatingProps = {
  printMessage?: boolean;
  disableSettingPriority?: boolean;
  maxPriority?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: string[];
  defaultPriority?: number;
  onSetPriority?: (priority: number) => void;
};

export default function StarPriority({
  printMessage = true,
  disableSettingPriority = false,
  maxPriority = 5,
  color = "#81a2d2",
  size = 48,
  className = "",
  messages = ["Interesting game", "High priority", "Must watch"],
  defaultPriority = 0,
  onSetPriority,
}: PriorityRatingProps) {
  const [priority, setPriority] = useState(defaultPriority);
  const [tempPriority, setTempPriority] = useState(0);

  function handlePriority(nextPriority: number) {
    if (disableSettingPriority) return;

    setPriority(nextPriority);
    onSetPriority?.(nextPriority);
  }

  const textStyle = {
    lineHeight: "0",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  // color means color:color

  return (
    <>
      <div style={containerStyle} className={className}>
        <div style={starContainerStyle}>
          {Array.from({ length: maxPriority }, (_, i) => (
            <Star
              key={i}
              full={
                tempPriority
                  ? tempPriority >= i + 1
                  : priority >= i + 1
              }
              onPrioritize={() => handlePriority(i + 1)}
              onHoverIn={() =>
                disableSettingPriority === true ? "" : setTempPriority(i + 1)
              }
              onHoverOut={() => setTempPriority(0)}
              size={size}
              color={color}
            />
          ))}
        </div>
      </div>
      <span style={textStyle}>
        {printMessage === false
          ? ""
          : messages.length === maxPriority
            ? messages[tempPriority ? tempPriority - 1 : priority - 1]
            : tempPriority || priority || ""}
      </span>
    </>
  );
}

type StarProps = {
  onPrioritize: () => void;
  full: boolean;
  onHoverIn: () => void;
  onHoverOut: () => void;
  color: string;
  size: number;
};

function Star({ onPrioritize, full, onHoverIn, onHoverOut, color, size }: StarProps) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };
  //
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onPrioritize}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
