import React, { useEffect, useState } from "react";
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AfterLogin from './After-login/After-login.js';  
import BeforeLogin from './Before-login/Before-login.js';
import Profile from './Profile/Profile.js';  
import Channel from './Channel/Channel.js';

function App() {
  // ログインしているユーザーの情報を管理するステート
  const [user, setUser] = useState(null);
  // モーダルの表示状態を管理するステート
  const [modals, setModals] = useState({ login: false, signUp: false });
  
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [stalkerPosition, setStalkerPosition] = useState({ x: 0, y: 0 });

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

  // mousemove イベントでカーソル位置を更新
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setStalkerPosition({x: e.clientX, y: e.clientY});
      }, 150);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    
    // クリーンアップ関数でイベントリスナーを削除
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // モーダル関連の処理
  const handleLoginClick = () => {
    setModals({ login: true, signUp: false });
  };

  const handleSignUpClick = () => {
    setModals({ login: false, signUp: true });
  };

  const handleCloseModals = () => {
    setModals({ login: false, signUp: false });
  };

  return (
    <>
      <div className={user ? "App" : ""}>
        <Router>
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<AfterLogin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/channel" element={<Channel />} />
              </>
            ) : (
              <Route path="/" element={<BeforeLogin />} />
            )}
          </Routes>
        </Router>
        {/* ログイン用モーダル */}
        <LoginModal show={modals.login} handleClose={handleCloseModals} showSignUpModal={handleSignUpClick} />
        <SignUpModal show={modals.signUp} handleClose={handleCloseModals} showLoginModal={handleLoginClick} />
      </div>

      {/* カーソルの設定 */}
      <div
        id="cursor"
        style={{
          position: 'absolute',
          top: `${cursorPosition.y}px`,
          left: `${cursorPosition.x}px`,
          pointerEvents: 'none',
        }}
      ></div>
      <div
        id="stalker"
        style={{
          position: 'absolute',
          top: `${stalkerPosition.y}px`,
          left: `${stalkerPosition.x}px`,
          pointerEvents: 'none',
        }}
      ></div>
    </>
  );
}

export default App;
