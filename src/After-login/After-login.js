import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './After-login.css';
import anime from 'animejs/lib/anime.es.js';
import imageSrc from './kitologo.jpg'

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
    // .container内に100個の .block 要素を追加
    const container = document.querySelector(".container");
    for (let i = 0; i < 20; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      container.appendChild(block);
    }

    // anime.js を使ってアニメーションを開始
    function animateBlocks() {
		anime({
			targets: ".block",
			translateX: function () {
				// return Math.random() > 0.5 ? anime.random(-700, -150) : anime.random(150, 700);
        return anime.random(-950, 850)
			},
			translateY: function () {
        // return Math.random() > 0.5 ? anime.random(-380, -400) : anime.random(200, 450);
        return anime.random(-500, 450)
			},
			scale: function() {
				return anime.random(0.5, 1)
			},
			duration: 2500,
			delay: anime.stagger(2),
			complete: animateBlocks,
		});
    }

    animateBlocks();
  }, []);

  return (
	<>
	<div className="container">
    <img src={imageSrc} alt="Beautiful landscape"/>
    {/* <div>
        <h2>KITO-VLOG</h2>
    </div> */}
	</div>
	<button onClick={handleLogout} className="logout-button">ログアウト</button>
	</>
  );
};

export default AfterLogin;
