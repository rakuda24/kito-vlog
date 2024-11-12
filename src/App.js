import React, { useState, useEffect } from 'react';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
// ログイン後の処理
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AfterLogin from './After-login/After-login.js';  // ログイン後に遷移する画面のコンポーネント
import BeforeLogin from './Before-login/Before-login.js';
import Profile from './Profile/Profile.js';  // Homeページのインポート
import Channel from './Channel/Channel.js';
import Setting from './Setting/Setting.js';

function App() {
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
    <div className={user ? "App" : ""}>
        <Router>
            <Routes>
                {user ? (
                    <>
                        <Route path="/" element={<AfterLogin />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/channel" element={<Channel />} />
                        <Route path="/setting" element={<Setting />} />
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
  );
}

export default App;
