import React, { useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './After-login.css';
import anime from 'animejs/lib/anime.es.js';

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
    for (let i = 0; i < 2; i++) {
      const block = document.createElement("div");
      block.classList.add("block");
      container.appendChild(block);
    }

    // anime.js を使ってアニメーションを開始
    function animateBlocks() {
		anime({
			targets: ".block",
			translateX: function () {
				return anime.random(-700, 700);
			},
			translateY: function () {
				return anime.random(-500, 500)
			},
			scale: function() {
				return anime.random(0.5, 2)
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
    	<div>
        	<h2>Animate JavaScript</h2>
    	</div>
	</div>
	<button onClick={handleLogout} className="logout-button">ログアウト</button>
	</>
  );
};

export default AfterLogin;
