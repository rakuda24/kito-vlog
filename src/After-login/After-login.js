import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './After-login.css';
import anime from 'animejs/lib/anime.es.js';
import imageSrc from './kitologo.jpg';
import { IonIcon } from '@ionic/react';
import { homeOutline, personCircleOutline, tvOutline, settingsOutline, idCardOutline, helpCircleOutline, exitOutline } from 'ionicons/icons';

const AfterLogin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('ログアウトに失敗しました:', error);
      });
  };

  useEffect(() => {
    const container = document.querySelector("body");
    for (let i = 0; i < 10; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      container.appendChild(block);
    }

    function animateBlocks() {
      anime({
        targets: ".block",
        translateX: () => anime.random(-950, 850),
        translateY: () => anime.random(-500, 450),
        scale: () => anime.random(0.5, 2.5),
        duration: 2500,
        delay: anime.stagger(2),
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
      listItems.forEach((item) => {
        item.removeEventListener("click", activeLink);
      });
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
            <a href="#">
              <span className="icon"><IonIcon icon={personCircleOutline} /></span>
              <span className="title">プロフィール</span>
            </a>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon"><IonIcon icon={tvOutline} /></span>
              <span className="title">チャンネル</span>
            </a>
          </li>
          <li className="list">
            <a href="#">
              <span className="icon"><IonIcon icon={settingsOutline} /></span>
              <span className="title">設定</span>
            </a>
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
        <img src={imageSrc} alt="KITO logo" className="kitologo-image" />
      </div>
    </>
  );
};

export default AfterLogin;
