import React from 'react';
import './Card.css'; 
const Card = ({ card }) => {
  console.log(card);  // card の内容をログに出力して確認

  const suitMap = {
    'ハート': 'heart',
    'ダイヤ': 'diamond',
    'クラブ': 'club',
    'スペード': 'spade'
  };

  const imagePath = `/image_Card/${suitMap[card.suit]}/${suitMap[card.suit]}_${card.rank}.png`;



  return (
    <div className="card">
      <img src={imagePath} alt={`${card.rank} of ${card.suit}`} />
    </div>
  );
};

export default Card;
