// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';  // createRootをインポート
import App from './App';  // Appコンポーネントをインポート

// React 18ではcreateRootを使用
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
