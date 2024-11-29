export const generateDeck = () => {
  const suits = ['クラブ', 'スペード', 'ダイヤ', 'ハート']; // スートの順番を調整
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  let deck = [];
  for (let suit of suits) {  // スートを外側に
    for (let rank of ranks) {  // ランクを内側に
      deck.push({ rank, suit });
    }
  }
  return deck;
};

export const shuffleDeck = (deck) => {
  return deck.sort(() => Math.random() - 0.5);
};

export const dealCards = (deck) => {
  const playerCards = deck.slice(0, 5);
  const cpuCards = deck.slice(5, 10);
  return { playerCards, cpuCards };
};
