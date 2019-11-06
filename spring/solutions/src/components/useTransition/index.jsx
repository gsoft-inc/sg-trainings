import React, { useState } from "react";
import { animated, useTransition } from "react-spring";
import { Button } from "semantic-ui-react";

function Transition() {
  const [on, toggle] = useState(false);

  const transition = useTransition(on, null, {
    from: { opacity: 0, transform: "translate3d(0, 50px, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(0, -100px, 0)" }
  });

  return (
    <>
      <div className="flex justify-center">
        <Button onClick={() => toggle(!on)}>Show</Button>
      </div>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div style={props} key={key}>
              <p className="f1">Hello World</p>
            </animated.div>
          )
      )}
    </>
  );
}

export default Transition;
