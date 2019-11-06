import React, { useState } from "react";
import { Button } from "semantic-ui-react";

const Spring = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div className="inline-flex">
        <Button onClick={() => setToggle(!toggle)}>Toggle</Button>
      </div>

      <div>{toggle && <p className="f1">Hello World</p>}</div>
    </div>
  );
};

export default Spring;
