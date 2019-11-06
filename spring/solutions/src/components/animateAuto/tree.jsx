import React, { memo, useState } from "react";
import { useSpring, a } from "react-spring";
import { usePrevious } from "./helpers";
import * as Icons from "../../assets/icons";
import { useMeasure } from "./use-measure";

const Tree = memo(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [bind, { height: viewHeight }] = useMeasure();
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      transform: `translate3d(${isOpen ? 0 : 20}px,0,0)`
    }
  });
  const Icon =
    Icons[`${children ? (isOpen ? "Minus" : "Plus") : "Close"}SquareO`];

  return (
    <div className="frame">
      <Icon
        className="toggle"
        style={{ opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <span className="title">{name}</span>
      <a.div
        className="content"
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height
        }}
      >
        <a.div style={{ transform }} {...bind} children={children} />
      </a.div>
    </div>
  );
});
export default Tree;
