import React, { useState, useEffect } from 'react';
import './App.css';
import { requestKeywordAd } from './keywordAd';

function App() {
  const [keywordAd, setKeywordAd] = useState(null);

  useEffect(() => {
    const fetchKeywordAd = async () => {
      const keywordAd = await requestKeywordAd();
      setKeywordAd(keywordAd);
    };

    fetchKeywordAd();
  }
  , []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {keywordAd ? JSON.stringify(keywordAd) : 'Loading...'}
        </p>
      </header>
    </div>
  );
}

export default App;
