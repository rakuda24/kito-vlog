import React, { useEffect, useRef } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import './Porker.css';
import anime from 'animejs/lib/anime.es.js';
import { homeOutline, personCircleOutline, tvOutline, settingsOutline, idCardOutline, helpCircleOutline, exitOutline } from 'ionicons/icons';
import { ImOffice } from 'react-icons/im';
import Game from './src/components/Game.js';
import Result from './src/components/Result.js';

const Porker = () => {
  const navigate = useNavigate();
  const animeInstance = useRef(null);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/');  // ログアウト時にホーム画面に遷移
      })
      .catch((error) => {
        console.error('ログアウトに失敗しました:', error);
      });
  };

  function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
  }

  function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
  }

  useEffect(() => {
    const container = document.querySelector(".Porker-container");
    const blocks = [];
    for (let i = 0; i < 10; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      container.appendChild(block);
      blocks.push(block);
    }

    function animateBlocks() {
      animeInstance.current = anime({
        targets: ".block",
        translateX: () => anime.random(0, 0),
        translateY: () => anime.random(0, 0),
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
      if (animeInstance.current) animeInstance.current.pause();
      listItems.forEach((item) => {
        item.removeEventListener("click", activeLink);
      });
      blocks.forEach(block => container.removeChild(block));
    };
  }, []);

  return (
    <div className="Porker-container">
      <nav>
        <ul className="sidebar">
          <li onClick={hideSidebar}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#888888"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
          <li><Link to="/">Home</Link></li>
          <li><a href="#">Profile</a></li>
          <li><Link to="/channel">Channel</Link></li>
          <li><Link to="/weather">Weather</Link></li>
          <li><Link to="/porker">Poker</Link></li>
          <li><a href="#">Logout</a></li>
        </ul>
        <ul>
          <li className="title"><a href="#">KITO</a></li>
          <li className="hideOnMobile"><Link to="/">Home</Link></li>
          <li className="hideOnMobile"><a href="#">Profile</a></li>
          <li className="hideOnMobile"><Link to="/channel">Channel</Link></li>
          <li className="hideOnMobile"><Link to="/weather">Weather</Link></li>
          <li className="hideOnMobile"><Link to="/porker">Porker</Link></li>
          <li className="hideOnMobile"><a href="#" onClick={handleLogout}>Logout</a></li>
          <li className="menu-button" onClick={showSidebar}><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#888888"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
        </ul>
      </nav>
      <Game/>
    </div>
  );
};

export default Porker;
