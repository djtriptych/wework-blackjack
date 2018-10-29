import _ from "lodash";
import React from "react";
import { startGame, drawCards } from "../actions";

export default props => {
  const deck_id = _.get(props, "deck.deck_id");
  const dealDisabled = _.isNil(deck_id);
  return (
    <div id="board">
      <button onClick={startGame}>Start Game</button>
      <button disabled={dealDisabled} onClick={() => drawCards(deck_id, 2)}>
        Deal
      </button>
      {props.children}
    </div>
  );
};
