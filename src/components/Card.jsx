import React from "react";

import { ACE, QUEEN, KING, JACK } from "../constants.js";

const shortName = card => {
  switch (card.value) {
    case ACE:
    case QUEEN:
    case KING:
    case JACK:
      return card.value[0];
    default:
      return card.value;
  }
};

const suitLabel = {
  SPADES: "♠ ",
  CLUBS: "♣",
  HEARTS: "♥",
  DIAMONDS: "♦"
};

class Card extends React.Component {
  render() {
    const { flipCard, card, style } = this.props;
    const cardName = shortName(card);
    const suit = suitLabel[card.suit];
    return (
      <div
        onClick={() => flipCard(card)}
        style={style}
        className={`${card.suit} cardContainer facing-${card.facing}`}
      >
        <div className="back" />
        <div className="front">
          <div className="short-label upper-left-label">
            <div>{cardName}</div>
            <div className={card.suit}>{suit}</div>
          </div>
          <div className="short-label lower-right-label">
            <div>{cardName}</div>
            <div className={card.suit}>{suit}</div>
          </div>
          <div className="big-suit">
            <div className={card.suit}>{suit}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
