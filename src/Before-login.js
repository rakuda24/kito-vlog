import './Before-login.css';
import React, { useState, useEffect } from 'react';
import LoginModal from './components/LoginModal.js';
import SignUpModal from './components/SignUpModal.js';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';
//ログイン後の処理
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AfterLogin from './After-login.js';

function Before_login() {
    // ログインしているユーザーの情報を管理するステート
    const [user, setUser] = useState(null);
    // モーダルの表示状態を管理するステート
    const [modals, setModals] = useState({ login: false, signUp: false });
  
    // ログインモーダルを表示する処理
    const handleLoginClick = () => {
      setModals({ login: true, signUp: false });
    };
  
    // ユーザー登録モーダルを表示する処理
    const handleSignUpClick = () => {
      setModals({ login: false, signUp: true });
    };
  
    // モーダルを閉じる処理
    const handleCloseModals = () => {
      setModals({ login: false, signUp: false });
    };
  
    // Firebaseの認証状態が変化した際の処理
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user); // ログインしている場合
        } else {
          setUser(null); // ログインしていない場合
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <div className="Before">
        <div className="container">
          <div className="mt-5">
            {user ? (
              // ログインしている場合の表示
              <Router>
                <Routes>
                  <Route path="/" element={<AfterLogin />} />
                </Routes>
              </Router>
            ) : (
              // ログインしていない場合の表示
              <>
                <div className="light"></div>
                <div className="right">
                  <h1>Welcome to Kito-Vlog</h1>
                  <Button onClick={handleLoginClick}>日常へ</Button>
                </div>
              </>
            )}
          </div>
  
          {/* ログイン用モーダル */}
          <LoginModal show={modals.login} handleClose={handleCloseModals} showSignUpModal={handleSignUpClick} />
          <SignUpModal show={modals.signUp} handleClose={handleCloseModals} showLoginModal={handleLoginClick} />
        </div>
      </div>
    );
  }
  
  export default Before_login;
  