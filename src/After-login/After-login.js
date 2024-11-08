// After-login.js
import React from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './After-login.css'; 

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

  return (
    <body>
      <div class="container">
        <h2>Animete Javascript</h2>
      </div>
      <script src='anime.js'></script>
    </body>
  );
};

export default AfterLogin;
{/* <button onClick={handleLogout} className="logout-button">ログアウト</button> */}