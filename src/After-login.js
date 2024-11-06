// After-login.js
import React from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import './After-login.css'; // CSSをインポート

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
    <div className="after-login-container">
      <div className="after-login-content">
        <h2 className="after-login-heading">Welcome to the After-Login Page!</h2>
        <p className="after-login-paragraph">This is the page you see after logging in.</p>
        <button onClick={handleLogout} className="logout-button">ログアウト</button>
      </div>
    </div>
  );
};

export default AfterLogin;
