// utils/pokerHands.js

// カードランクに対応する数値を返す
// pokerHands.js

export const getRankValue = (rank) => {
    const rankValues = {
      '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
      '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
    };
    return rankValues[rank] || 0;
  };
  
  
  // ハンドの役を評価する関数
  export const evaluateHand = (hand) => {
    const sortedHand = hand.sort((a, b) => getRankValue(b.rank) - getRankValue(a.rank)); // 高い順に並べ替え
    const isFlush = checkFlush(sortedHand);
    const isStraight = checkStraight(sortedHand);
    const handRank = getHandRank(sortedHand, isFlush, isStraight);
    
    return {
      type: handRank.type,
      value: handRank.value,
      sortedHand
    };
  };
  
  // ストレートかどうかを判定
  const checkStraight = (hand) => {
    for (let i = 1; i < hand.length; i++) {
      if (getRankValue(hand[i - 1].rank) - getRankValue(hand[i].rank) !== 1) {
        return false;
      }
    }
    return true;
  };
  
  // フラッシュかどうかを判定
  const checkFlush = (hand) => {
    const suit = hand[0].suit;
    return hand.every(card => card.suit === suit);
  };
  
  // 役を評価する
  const getHandRank = (hand, isFlush, isStraight) => {
    const counts = getRankCounts(hand);
    const mostCommon = Math.max(...Object.values(counts));
  
    if (isFlush && isStraight) {
      if (getRankValue(hand[0].rank) === 14) {
        return { type: 'ロイヤルフラッシュ', value: 10 }; // A, K, Q, J, 10 の同じスーツ
      } else {
        return { type: 'ストレートフラッシュ', value: 9 }; // 同じスーツで連続するランク
      }
    }
  
    if (mostCommon === 4) {
      return { type: 'フォーカード', value: 8 }; // 4枚同じランク
    }
  
    if (mostCommon === 3 && Object.values(counts).includes(2)) {
      return { type: 'フルハウス', value: 7 }; // 3枚同じランク + 2枚同じランク
    }
  
    if (isFlush) {
      return { type: 'フラッシュ', value: 6 }; // 同じスーツで5枚
    }
  
    if (isStraight) {
      return { type: 'ストレート', value: 5 }; // 連続するランク
    }
  
    if (mostCommon === 3) {
      return { type: 'スリーカード', value: 4 }; // 3枚同じランク
    }
  
    if (Object.values(counts).filter(count => count === 2).length === 2) {
      return { type: 'ツーペア', value: 3 }; // 2枚同じランク + 2枚同じランク
    }
  
    if (Object.values(counts).includes(2)) {
      return { type: 'ワンペア', value: 2 }; // 2枚同じランク
    }
  
    return { type: 'ハイカード', value: 1 }; // 役がない場合、最も高いカード
  };
  
  // 各カードのランクの出現回数をカウントする
  const getRankCounts = (hand) => {
    return hand.reduce((counts, card) => {
      counts[card.rank] = (counts[card.rank] || 0) + 1;
      return counts;
    }, {});
  };
  