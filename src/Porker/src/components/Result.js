import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Result = () => {
  const { state } = useLocation();

  console.log(state); // state の中身を確認

  if (!state) {
    return <p>エラー: 結果情報がありません。</p>;
  }

  const { winner, playerHandDetails, cpuHandDetails, playerHand, cpuHand } = state;

  return (
    <div className="result">
      <h3>結果</h3>
      <p>{winner === '引き分け' ? '引き分けです！' : `${winner}の勝利!`}</p>

      <h4>プレイヤーの手札:</h4>
      <div>
        {playerHand.map((card, index) => (
          <div key={index} className="card">
            <img
              src={`/image_Card/${card.suit}/${card.suit}_${card.rank}.png`}
              alt={`${card.rank} of ${card.suit}`}
              className="card-image"
            />
          </div>
        ))}
      </div>
      <h4>プレイヤーの評価: {playerHandDetails.hand}</h4>

      <h4>CPUの手札:</h4>
      <div>
        {cpuHand.map((card, index) => (
          <div key={index} className="card">
            <img
              src={`/image_Card/${card.suit}/${card.suit}_${card.rank}.png`}
              alt={`${card.rank} of ${card.suit}`}
              className="card-image"
            />
          </div>
        ))}
      </div>
      <h4>CPUの評価: {cpuHandDetails.hand}</h4>

      <Link to="/">ホームに戻る</Link>
    </div>
  );
};

export default Result;
