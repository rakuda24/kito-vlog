import React, { useEffect, useRef } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import './After-login.css';
import anime from 'animejs/lib/anime.es.js';
import imageSrc from './kitologo.png';
import { IonIcon } from '@ionic/react';
import { homeOutline, personCircleOutline, tvOutline, settingsOutline, idCardOutline, helpCircleOutline, exitOutline } from 'ionicons/icons';
import imageOni from './oni.png';

const AfterLogin = () => {
  const navigate = useNavigate();
  const animeInstance = useRef(null); // useRefを使ってanimeInstanceを保持

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/');  // ログアウト時にホーム画面に遷移
      })
      .catch((error) => {
        console.error('ログアウトに失敗しました:', error);
      });
  };

  useEffect(() => {
    // Floating blocks animation setup
    const container = document.querySelector(".container");
    const blocks = [];
    for (let i = 0; i < 30; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      container.appendChild(block);
      blocks.push(block);
    }

    function animateBlocks() {
      animeInstance.current = anime({
        targets: ".block",
        translateX: () => anime.random(-950, 850),
        translateY: () => anime.random(-500, 450),
        scale: () => anime.random(0.5, 2.5),
        duration: 2500,
        delay: anime.stagger(30),
        complete: animateBlocks,
      });
    }

    animateBlocks();

    const listItems = document.querySelectorAll(".list");

    function activeLink() {
      listItems.forEach(item => {
        item.classList.remove("active");
      });
      this.classList.add("active");
    }

    listItems.forEach((item) => {
      item.addEventListener("click", activeLink);
    });

    return () => {
      // クリーンアップ: アニメーションを停止し、イベントリスナーとブロックを削除
      if (animeInstance.current) animeInstance.current.pause();
      listItems.forEach((item) => {
        item.removeEventListener("click", activeLink);
      });
      blocks.forEach(block => container.removeChild(block));
    };
  }, []);

  return (
    <>
      <div className="navigation">
        <ul>
          <li className="list active">
            <a href="#">
              <span className="icon"><IonIcon icon={homeOutline} /></span>
              <span className="title">ホーム</span>
            </a>
          </li>
          <li className="list">
            <Link to="/profile" className="list">
              <span className="icon"><IonIcon icon={personCircleOutline} /></span>
              <span className="title">プロフィール</span>
            </Link>
          </li>
          <li className="list">
            <Link to="/channel" className="list"> 
              <span className="icon"><IonIcon icon={tvOutline} /></span>
              <span className="title">チャンネル</span>
            </Link>
          </li>
          <li className="list">
            <Link to="/setting" className="list"> 
              <span className="icon"><IonIcon icon={settingsOutline} /></span>
              <span className="title">設定</span>
            </Link>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon"><IonIcon icon={idCardOutline} /></span>
              <span className="title">個人情報</span>
            </a>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon"><IonIcon icon={helpCircleOutline} /></span>
              <span className="title">ヘルプ</span>
            </a>
          </li>
          <li className="list" onClick={handleLogout}>
            <a href="#">
              <span className="icon"><IonIcon icon={exitOutline} /></span>
              <span className="title">サインアウト</span>
            </a>
          </li>
        </ul>
      </div>
      
      <div className="container">
        <h1>ホーム</h1>
        <img src={imageSrc} alt="KITO logo" className="kitologo-image" />
        <img src={imageOni} alt="Beautiful landscape" className="imageOni"/>
      </div>
      
    </>
  );
};

export default AfterLogin;
