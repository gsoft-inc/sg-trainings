import { animated, useSpring } from "react-spring";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { animConfig, wobblyButton } from "../../utils/configs";

const Spring = () => {
  const [toggle, setToggle] = useState(false);
  const [pressed, setPressed] = useState(false);
  const props = useSpring({
    opacity: toggle ? 1 : 0,
    transform: toggle ? "translate3d(0,0,0)" : "translate3d(0, 50px, 0)",
    config: animConfig
  });

  const buttonProps = useSpring({
    transform: pressed ? "scale(1.3) " : "scale(1)",
    transformOrigin: "center center",
    config: wobblyButton
  });

  return (
    <div>
      <animated.div className="inline-flex" style={buttonProps}>
        <Button
          onMouseDown={() => setPressed(true)}
          onClick={() => {
            setToggle(!toggle);
            setPressed(false);
          }}
          onMouseLeave={() => setPressed(false)}
        >
          Toggle
        </Button>
      </animated.div>

      <animated.div style={props}>
        <p className="f1">Hello World</p>
      </animated.div>
    </div>
  );
};

export default Spring;
