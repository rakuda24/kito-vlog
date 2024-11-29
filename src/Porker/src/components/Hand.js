import React from 'react';
import Card from './Card';

const Hand = ({ hand, onExchange }) => {
  return (
    <div className="hand">
      {hand.map((card, index) => (
        <Card 
          key={index} 
          card={card} 
          onClick={() => onExchange(card)} 
          isSelected={false} // 交換選択中は追加で設定できます
        />
      ))}
    </div>
  );
};

export default Hand;
