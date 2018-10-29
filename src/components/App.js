import _ from 'lodash';
import React from 'react';

import './App.css';
import { Board, Card, Hand, Tophat } from ".";
import { flipCard } from "../actions";
import { cardFlips, decks, piles, scores } from "../game";
import { INITIAL_STATE, PLAYERS } from "../constants.js";

class App extends React.Component {
  constructor() {
    super();
    this.state = _.extend({}, INITIAL_STATE());
  }

  componentDidMount() {
    // State updates from game logic.
    piles.onValue(piles => {
      this.setState({ piles });
    });
    decks.onValue(deck => {
      this.setState({ deck });
    });
    scores.onValue(scores => {
      this.setState({ scores });
    });
    cardFlips.onValue(action => {
      this.setState({
        piles: _.extend({}, this.state.piles)
      });
    });
  }

  render() {
    return (
      <div>
        <Tophat />
        <Board>
          {_.map(PLAYERS, (player, index) => (
            <Hand
              key={index}
              deck={this.state.deck}
              playerName={player}
              cards={this.state.piles[player]}
              score={this.state.scores[player]}
            >
              {_.map(this.state.piles[player], (card, index) => (
                <Card key={index} flipCard={flipCard} card={card} />
              ))}
            </Hand>
          ))}
        </Board>
      </div>
    );
  }
}

export default App;
