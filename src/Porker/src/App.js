import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Game from './components/Game';
import Result from './components/Result';  // Result コンポーネントをインポート

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />   {/* /home -> /home に変更 */}
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />  {/* /result にマッチ */}
      </Routes>
    </Router>
  );
}

export default App;
