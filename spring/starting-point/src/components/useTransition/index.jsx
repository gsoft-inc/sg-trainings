import React, { useState } from "react";
import { Button } from "semantic-ui-react";

function Transition() {
  const [on, toggle] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <Button onClick={() => toggle(!on)}>Show</Button>
      </div>
      <div>{on && <p className="f1">Hello World</p>}</div>
    </>
  );
}

export default Transition;
