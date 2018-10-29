// Game and API logic.

import _ from "lodash";
import api from "./api";
import Bacon from "baconjs";

import { actions, Action } from "./actions";
import { ACE, QUEEN, KING, JACK, PLAYERS } from "./constants.js";

const scoreForCard = card => {
  // Ignore cards that are facing down.
  if (card.facing === "down") {
    return 0;
  }
  switch (card.value) {
    case QUEEN:
    case KING:
    case JACK:
      return 10;
    case ACE:
      return 1;
    default:
      return _.toNumber(card.value);
  }
};

const actionsByType = actionType =>
  actions.filter(action => action.type === actionType);

// Chain promises from Fetch api to retrieve a json response.
const jsonResponse = req =>
  Bacon.fromPromise(req).flatMap(response =>
    Bacon.fromPromise(response.json())
  );

// New decks from the api.
const decks = actionsByType(Action.newDeck)
  .map(action => api.deck.create())
  .flatMapLatest(jsonResponse);

// Drawn cards from the api, fetched in groups then flattened to a 1d card
// stream.
const cards = actionsByType(Action.drawCards)
  .map(action => api.deck.draw(action.deck_id, action.count))
  .flatMap(jsonResponse)
  .map(".cards")
  .flatMap(cards => {
    return Bacon.fromArray(cards);
  })
  .map(card => _.extend(card, { facing: "down" }));

// The first time a card is flipped, toggle it to face-up. 2nd and subsequent
// clicks are effectively ignored.
const cardFlips = actionsByType(Action.flipCard).doAction(action => {
  action.card.facing = action.card.facing === "down" ? "up" : "up";
});

// As incoming cards come in from the api, distribute them to all players.
const alternatingPlayers = i => Bacon.once(PLAYERS[i % PLAYERS.length]);
const players = Bacon.repeat(alternatingPlayers);
const playerDraws = cards.flatMap(card => {
  return Bacon.once(card).zip(players.take(1), (card, player) => ({
    card,
    player
  }));
});

const hits = actionsByType(Action.hit)
  .map(action => api.deck.draw(action.deck_id, 1))
  .flatMap(jsonResponse)
  .map(".cards")
  .flatMap(cards => {
    return Bacon.fromArray(cards);
  })
  .map(card => _.extend(card, { facing: "down" }));

// "Piles", or player's hands, are a fold of the incoming cards.
const piles = playerDraws.scan({}, (piles, playerDraw) => {
  const { player, card } = playerDraw;
  if (!piles[player]) {
    piles[player] = [];
  }
  piles[player].push(card);
  return piles;
});

// Scores are sums of the piles.
const scores = piles
  .toProperty()
  // We recalculate scores every time a card flips.
  .sampledBy(cardFlips)
  .map(piles => {
    const scores = {};
    for (let player in piles) {
      const cards = piles[player];
      const sum = _.sumBy(cards, scoreForCard);
      scores[player] = sum;
    }
    return scores;
  });

export { decks, cardFlips, piles, scores };
