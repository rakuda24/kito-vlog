import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../utils/Home.css';  // 正しいパスに修正

const Home = () => {
  const navigate = useNavigate();  // navigateフックの取得

  // ゲーム開始の処理
  const startGame = () => {
    navigate('/game');  // ゲーム画面に遷移
  };

  return (
    <div className="home-container">
      <div className="table-background">
        <h1 className="title">ポーカーゲーム</h1>
        <button className="start-button" onClick={startGame}>
          ゲーム開始
        </button>
      </div>
    </div>
  );
};

export default Home;
