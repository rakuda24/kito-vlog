import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateDeck, shuffleDeck, dealCards } from '../utils/deck';
import { evaluateHand } from '../utils/pokerHands';
import { getRankValue } from '../utils/pokerHands';
import './Game.css';

const convertSuitToEnglish = (suit) => {
  switch (suit) {
    case 'スペード':
      return 'spade';
    case 'ハート':
      return 'heart';
    case 'ダイヤ':
      return 'diamond';
    case 'クラブ':
      return 'club';
    default:
      return suit;
  }
};

const suitOrder = ['スペード', 'ハート', 'ダイヤ', 'クラブ'];

const rankOrder = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
  'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

const sortHand = (hand) => {
  return hand.sort((a, b) => {
    const suitComparison = suitOrder.indexOf(a.suit) - suitOrder.indexOf(b.suit);
    if (suitComparison !== 0) return suitComparison;
    return rankOrder[b.rank] - rankOrder[a.rank];
  });
};

const Game = () => {
  const navigate = useNavigate();
  const [playerHand, setPlayerHand] = useState([]);
  const [cpuHand, setCpuHand] = useState([]);
  const [playerExchange, setPlayerExchange] = useState([]);
  const [remainingExchanges, setRemainingExchanges] = useState(3);
  const [exchangeError, setExchangeError] = useState("");
  const [showExchangeDialog, setShowExchangeDialog] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerHandDetails, setPlayerHandDetails] = useState(null);
  const [cpuHandDetails, setCpuHandDetails] = useState(null);

  const startGame = () => {
    const deck = shuffleDeck(generateDeck());
    const { playerCards, cpuCards } = dealCards(deck);
    setPlayerHand(playerCards);
    setCpuHand(cpuCards);
    setRemainingExchanges(3);
    setExchangeError("");
  };

  const handlePlayerExchange = (card) => {
    if (!playerExchange.includes(card)) {
      setPlayerExchange([...playerExchange, card]);
      setExchangeError("");
    } else {
      setPlayerExchange(playerExchange.filter(selectedCard => selectedCard !== card));
    }
  };

  const handleCardExchange = () => {
    if (playerExchange.length === 0) {
      setExchangeError("交換するカードを選んでください！");
      return;
    }

    if (remainingExchanges > 0) {
      const newPlayerHand = playerHand.filter(card => !playerExchange.includes(card));
      const deck = shuffleDeck(generateDeck());
      const newCards = deck.slice(0, playerExchange.length);

      setPlayerHand([...newPlayerHand, ...newCards]);
      setRemainingExchanges(remainingExchanges - 1);
      setPlayerExchange([]);
      setShowExchangeDialog(false);
    }
  };

  const evaluateGame = () => {
    const playerResult = evaluateHand(playerHand);
    const cpuResult = evaluateHand(cpuHand);

    let resultWinner = null;
    if (playerResult.value > cpuResult.value) {
      resultWinner = 'プレイヤー';
    } else if (cpuResult.value > playerResult.value) {
      resultWinner = 'CPU';
    } else {
      const playerHighCard = playerResult.sortedHand[0];
      const cpuHighCard = cpuResult.sortedHand[0];

      if (getRankValue(playerHighCard.rank) > getRankValue(cpuHighCard.rank)) {
        resultWinner = 'プレイヤー';
      } else if (getRankValue(cpuHighCard.rank) > getRankValue(playerHighCard.rank)) {
        resultWinner = 'CPU';
      } else {
        resultWinner = '引き分け';
      }
    }

    // 役の評価結果を保存
    setWinner(resultWinner);
    setPlayerHandDetails(playerResult);  // プレイヤーの評価結果
    setCpuHandDetails(cpuResult);        // CPUの評価結果
    setShowResultPopup(true); // 結果ポップアップを表示
  };

  const closeResultPopup = () => {
    // ゲームの状態をリセット
    setPlayerHand([]);
    setCpuHand([]);
    setPlayerExchange([]);
    setRemainingExchanges(3);
    setExchangeError("");
    setShowExchangeDialog(false);
    setShowResultPopup(false); // ポップアップを閉じる
    navigate('/porker'); // 最初のページに戻る
  };

  const renderHand = (hand) => {
    const sortedHand = sortHand(hand);
    return sortedHand.map((card, index) => (
      <div key={index} className="card">
        <img
          src={`/image_Card/${convertSuitToEnglish(card.suit)}/${convertSuitToEnglish(card.suit)}_${card.rank}.png`}
          alt={`${card.rank} of ${card.suit}`}
          className="card-image"
          style={{ maxWidth: '80px', maxHeight: '120px' }}
          onError={(e) => e.target.src = '/image_Card/placeholder.png'}
        />
      </div>
    ));
  };

  return (
    <div className="game">
      <h3>ゲーム開始!</h3>
      {!playerHand.length ? (
        <button onClick={startGame}>ゲーム開始</button>
      ) : (
        <div>
          <h3>プレイヤーの手札</h3>
          <div className="hand">
            {renderHand(playerHand)}
          </div>

          <h4>残り交換回数: {remainingExchanges}</h4>
          {exchangeError && <p className="error">{exchangeError}</p>}

          {remainingExchanges > 0 && (
            <div>
              <button onClick={() => setShowExchangeDialog(true)}>手札交換</button>
            </div>
          )}

          {showExchangeDialog && (
            <div className="exchange-dialog">
              <h4>交換するカードを選んでください</h4>
              <div className="card-selection">
                {playerHand.map((card, index) => (
                  <div
                    key={index}
                    className={`card ${playerExchange.includes(card) ? 'selected' : ''}`}
                    onClick={() => handlePlayerExchange(card)}
                    style={{
                      border: playerExchange.includes(card) ? '2px solid green' : '1px solid #ccc',
                      backgroundColor: playerExchange.includes(card) ? '#e0ffe0' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={`/image_Card/${convertSuitToEnglish(card.suit)}/${convertSuitToEnglish(card.suit)}_${card.rank}.png`}
                      alt={`${card.rank} of ${card.suit}`}
                      className="card-image"
                      style={{ maxWidth: '80px', maxHeight: '120px' }}
                      onError={(e) => e.target.src = '/image_Card/placeholder.png'}
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleCardExchange}>手札を交換する</button>
              <button onClick={() => setShowExchangeDialog(false)}>キャンセル</button>
            </div>
          )}

          <button onClick={evaluateGame}>決着をつける</button>
        </div>
      )}

      {/* 結果ポップアップ */}
      {showResultPopup && (
        <div className="result-popup">
          <h3>結果</h3>
          <p>{winner === '引き分け' ? '引き分けです！' : `${winner}の勝ち！`}</p>
          <div>
            <h4>プレイヤーの手札評価: {playerHandDetails.type}</h4>
            <div className="hand">
              {renderHand(playerHand)}
            </div>
          </div>
          <div>
            <h4>CPUの手札評価: {cpuHandDetails.type}</h4>
            <div className="hand">
              {renderHand(cpuHand)}
            </div>
          </div>
          <button onClick={closeResultPopup}>OK</button>
        </div>
      )}
    </div>
  );
};

export default Game;
