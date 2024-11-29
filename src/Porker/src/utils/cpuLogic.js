// src/utils/cpuLogic.js

import { shuffleDeck, generateDeck } from './deck';  // shuffleDeckとgenerateDeckをインポート

export const cpuExchangeCards = (
  cpuHand, 
  generateDeck, 
  evaluateHand, 
  getRankValue, 
  setExchangedCards, 
  setCpuHand, 
  remainingCpuExchanges, 
  setRemainingCpuExchanges
) => {
  // CPUの交換回数が残っていない場合は何もしない
  if (remainingCpuExchanges <= 0) {
    return;
  }

  // CPUの手札を評価する
  const cpuHandDetails = evaluateHand(cpuHand);

  // 交換対象のカードを選ぶ
  const cardsToExchange = cpuHandDetails.sortedHand
    .slice(0, 3)  // 仮で最初の3枚を交換対象にする
    .map(card => card.card);

  // 交換するためのデッキを生成する
  const deck = shuffleDeck(generateDeck());

  // 交換後の新しいCPUの手札を決定する
  const newCpuHand = cpuHand.filter(card => !cardsToExchange.includes(card));  // 交換しないカードを残す
  const newCards = deck.slice(0, cardsToExchange.length);  // 新しいカードをデッキから取得

  // 交換されたカードの情報を保存
  const exchangedCards = cardsToExchange.map((oldCard, index) => ({
    oldCard,
    newCard: newCards[index]
  }));

  // 交換されたカードをセット
  setExchangedCards(exchangedCards);

  // CPUの手札を更新
  setCpuHand([...newCpuHand, ...newCards]);

  // 残り交換回数を減らす
  setRemainingCpuExchanges(remainingCpuExchanges - 1);
};
