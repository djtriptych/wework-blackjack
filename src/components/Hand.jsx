import _ from "lodash";
import React from "react";

import { hit } from "../actions";

class Score extends React.Component {
  render() {
    const { score } = this.props;
    const className = score > 21 ? "bust" : "hittable";
    return <span className={`score ${className}`}>{score}</span>;
  }
}

class Hand extends React.Component {
  render() {
    const { playerName, score, deck, children } = this.props;

    // Arrange cards into a fan.
    const mid = (children.length - 1) / 2;
    const twoPi = 2 * Math.PI;
    const fannedCards = React.Children.map(this.props.children, (child, i) => {
      const angle = (i - mid) * 1;
      const top = Math.sin(twoPi) * 15;
      return React.cloneElement(child, {
        style: {
          transform: `rotate(${angle}deg)`,
          top: `${top}px`
        }
      });
    });

    return (
      <div className="hand">
        <header>
          {_.capitalize(playerName)}
          <Score score={score} />
          {deck && <button onClick={() => hit()}>hit</button>}
        </header>
        <div className="cards">{fannedCards}</div>
      </div>
    );
  }
}

export default Hand;
