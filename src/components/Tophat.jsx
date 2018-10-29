import _ from 'lodash';
import React from 'react';
import { Logo } from '.';
import { startGame } from "../actions";

export default props => {
  const deck_id = _.get(props, "deck.deck_id");
  const showNewGame = _.isNil(deck_id);
  return (
    <div id='tophat'>
      <span className='logo'>
        <Logo />
        <span className='bar'> | </span>
        blackjack
      </span>
      {showNewGame &&
        <button onClick={startGame} id='newGame'> New game </button>
      }
    </div>
  );
};
