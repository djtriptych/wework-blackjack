export const PLAYERS = [
  'dealer',
  'player',
];

export const NUM_DECKS = 6;

export const ACE   = 'ACE';
export const QUEEN = 'QUEEN';
export const KING  = 'KING';
export const JACK  = 'JACK';

export const  INITIAL_STATE = () => ({
  deck: null,
  piles: {
    player: [],
    dealer: [],
  },
  scores: {
    player: 0,
    dealer: 0,
  }
});
