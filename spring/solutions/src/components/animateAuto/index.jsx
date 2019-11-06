import React from "react";
import Tree from "./tree";

function AnimateAuto() {
  return (
    <div className="root">
      <Tree name="main">
        <Tree name="hello" />
        <Tree name="subtree with children">
          <Tree name="hello" />
          <Tree name="sub-subtree with children">
            <Tree name="child 1" style={{ color: "#37ceff" }} />
            <Tree name="child 2" style={{ color: "#37ceff" }} />
            <Tree name="child 3" style={{ color: "#37ceff" }} />
            <Tree name="custom content">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 200,
                  padding: 10
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "black",
                    borderRadius: 5
                  }}
                />
              </div>
            </Tree>
          </Tree>
          <Tree name="hello" />
        </Tree>
        <Tree name="world" />
        <Tree
          name={
            <span>
              <span role="img" aria-label="screaming cat">
                🙀
              </span>{" "}
              something something
            </span>
          }
        />
      </Tree>
    </div>
  );
}

export default AnimateAuto;
