import React, { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import imageSrc from './kitologo.png';
import { IonIcon } from '@ionic/react';
import { homeOutline, personCircleOutline, tvOutline, settingsOutline, idCardOutline, helpCircleOutline, exitOutline } from 'ionicons/icons';
import imageOni from './oni.png';

const Profile = () => {
  const navigate = useNavigate();

  // アクティブなタブを管理する状態
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        navigate('/');  // ログアウト後、ホーム画面へ遷移
      })
      .catch((error) => {
        console.error('ログアウトに失敗しました:', error);
      });
  };

  // タブがクリックされたときにアクティブタブを更新する関数
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <div className="navigation">
        <ul>
          <li
            className={`list ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleTabClick('home')}
          >
            <Link to="/" className="list">
              <span className="icon"><IonIcon icon={homeOutline} /></span>
              <span className="title">ホーム</span>
            </Link>
          </li>
          <li
            className={`list ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabClick('profile')}
          >
            <a href="#">
              <span className="icon"><IonIcon icon={personCircleOutline} /></span>
              <span className="title">プロフィール</span>
            </a>
          </li>
          <li
            className={`list ${activeTab === 'channel' ? 'active' : ''}`}
            onClick={() => handleTabClick('channel')}
          >
            <Link to="/channel" className="list">
              <span className="icon"><IonIcon icon={tvOutline} /></span>
              <span className="title">チャンネル</span>
            </Link>
          </li>
          <li
            className={`list ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => handleTabClick('settings')}
          >
            <Link to="/setting" className="list">
              <span className="icon"><IonIcon icon={settingsOutline} /></span>
              <span className="title">設定</span>
            </Link>
          </li>
          <li
            className={`list ${activeTab === 'personalInfo' ? 'active' : ''}`}
            onClick={() => handleTabClick('personalInfo')}
          >
            <a href="#">
              <span className="icon"><IonIcon icon={idCardOutline} /></span>
              <span className="title">個人情報</span>
            </a>
          </li>
          <li
            className={`list ${activeTab === 'help' ? 'active' : ''}`}
            onClick={() => handleTabClick('help')}
          >
            <a href="#">
              <span className="icon"><IonIcon icon={helpCircleOutline} /></span>
              <span className="title">ヘルプ</span>
            </a>
          </li>
          <li
            className="list"
            onClick={handleLogout}
          >
            <a href="#">
              <span className="icon"><IonIcon icon={exitOutline} /></span>
              <span className="title">サインアウト</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="container">
        <h1>プロフィール</h1>
        <img src={imageSrc} alt="KITO logo" className="kitologo-image" />
        <img src={imageOni} alt="Beautiful landscape" className="imageOni" />
      </div>
    </>
  );
};

export default Profile;
