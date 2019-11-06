import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { config, useSpring, animated } from "react-spring";

function Inner() {
  const [number, setNumber] = useState(0);
  const props = useSpring({
    number: number,
    from: { number: 0 },
    config: config.molasses
  });

  return (
    <>
      <div className="flex justify-center">
        <Button onClick={() => setNumber(number === 0 ? 1 : 0)}>
          Increase / Decrease Number
        </Button>
      </div>
      <p className="f1">
        <animated.span>
          {props.number.interpolate(x => `${Math.round(x * 100)}%`)}
        </animated.span>
      </p>
    </>
  );
}

export default Inner;
