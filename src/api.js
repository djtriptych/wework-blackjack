// Deck of Card API.
// cf. deckofcardsapi.com

import { NUM_DECKS } from "./constants.js";

const DEFAULT_FETCH_OPTIONS = {};

const request = (url, options = DEFAULT_FETCH_OPTIONS) => fetch(url, options);

const api = {
  deck: {
    create: (deck_count = NUM_DECKS) => {
      const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck_count}`;
      return request(url);
    },
    draw: (deck_id, count) => {
      const url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${count}`;
      return request(url);
    }
  },
  pile: {
    create: (deck_count = NUM_DECKS) => {
      const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${deck_count}`;
      return request(url);
    }
  }
};

export default api;
