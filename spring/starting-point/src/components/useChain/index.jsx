import React from "react";
import { Button } from "semantic-ui-react";
import data from "./data";

function UseChain() {
  return (
    <>
      <div>
        <div className="flex justify-center">
          <Button>Chain</Button>
        </div>
        <div className="modal">
          <div className="gradient-wrapper shadow-4">
            {data.map(item => (
              <div
                className="gradient-box"
                key={item.name}
                style={{ backgroundImage: item.css }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UseChain;
