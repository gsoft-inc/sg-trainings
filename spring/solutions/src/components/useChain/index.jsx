import { animated, config, useChain, useTransition } from "react-spring";
import React, { useRef, useState } from "react";
import { Button } from "semantic-ui-react";
import data from "./data";

function UseChain() {
  const [cardOpened, setCard] = useState(false);

  const cardRef = useRef();
  const cardTransition = useTransition(cardOpened, null, {
    ref: cardRef,
    from: { opacity: 0, transform: "translate3d(0,50px,0) scale(0.8)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
    leave: { opacity: 0, transform: "translate3d(0,-50px,0) scale(0.98)" },
    config: config.stiff
  });

  const tilesRef = useRef();
  const tilesTransition = useTransition(
    cardOpened ? data : [],
    item => item.name,
    {
      ref: tilesRef,
      from: { opacity: 0, transform: "scale(0.98)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0.98)" },
      trail: 400 / data.length
    }
  );

  useChain(cardOpened ? [cardRef, tilesRef] : [tilesRef, cardRef], [
    0,
    cardOpened ? 0.1 : 0.6
  ]);

  return (
    <>
      <div>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setCard(!cardOpened);
            }}
          >
            Chain
          </Button>
        </div>
        {cardTransition.map(
          ({ item, key, props }) =>
            item && (
              <animated.div style={props} key={key} className="modal">
                <div className="gradient-wrapper shadow-4">
                  {tilesTransition.map(({ item, key, props }) => (
                    <animated.div
                      className="gradient-box"
                      key={key}
                      style={{ ...props, background: item.css }}
                    />
                  ))}
                </div>
              </animated.div>
            )
        )}
      </div>
    </>
  );
}

export default UseChain;
