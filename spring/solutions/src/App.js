import React from "react";
import Spring from "./components/useSpring";
import Transition from "./components/useTransition";
import Inner from "./components/inner";
import UseChain from "./components/useChain";
import AnimateAuto from "./components/animateAuto";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>useSpring</h1>
      <div className="area gradient-2 tc">
        <Spring></Spring>
      </div>
      <h1>Inner Text</h1>
      <p className="tl mb4">
        Change this animation in order to make it animate from 0 to 100%. Try
        different configs, do you notice a problem?
        <br />
        <strong>Spoiler </strong>
        <mark>
          <em>
            {" "}
            you will need to use the{" "}
            <a
              href="https://www.react-spring.io/docs/hooks/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              interpolate API
            </a>
            .
          </em>
        </mark>
      </p>
      <div className="area gradient-6 tc">
        <Inner></Inner>
      </div>
      <h1>useTransition</h1>
      <div className="area gradient-3 tc">
        <Transition></Transition>
      </div>
      <h1>Use Chain</h1>
      <p className="tl mb4">
        Starting from this basic useTransition animation make the card appear
        then make the inner items appears (2 step animation)
      </p>
      <div className="area gradient-8 tc">
        <UseChain></UseChain>
      </div>
      <h1>Animating auto</h1>
      <p className="tl mb4">
        Animating to an unknown height can be a challenge using hooks since
        Hooks differ from renderprops in that they don't know the view.
        Therefore handling "auto" is out of scope of the hooks api. See{" "}
        <a
          href="https://twitter.com/0xca0a/status/1094683974679621633"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://twitter.com/0xca0a/status/1094683974679621633
        </a>
        .
      </p>
      <div className="tl">
        <AnimateAuto></AnimateAuto>
      </div>
    </div>
  );
}

export default App;
