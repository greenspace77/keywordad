import React, { useState, useEffect } from 'react';
import { requestKeywordAd } from './keywordAd';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBKW58fOycg7MJv8vqowK5BrVy0so2OqjQ');
const model = genAI.getGenerativeModel({ model: "gemini=pro"} );

function App() {
  const [keyword, setKeyword] = useState('');
  const [keywordAd, setKeywordAd] = useState(null);
  const [search, setSearch] = useState('');

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const fetchKeywordAd = async () => {
    setKeywordAd(null);
    if (keyword.trim() != '') {
      const keywordAd = await requestKeywordAd(keyword);
      setKeywordAd(keywordAd);
    }
  };


  return (
    <div className="App">
      <header className="App-header">
        <input 
          type="text" 
          value={keyword} 
          onChange={handleInputChange}
          placeholder='키워드를 입력하세요'
          style={{ width: '300px', height: '20px' }}
        />
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder='키워드 분류 타입을 입력하세요'
          style={{ width: '300px', height: '20px' }}
        />
        <button onClick={fetchKeywordAd}>검색</button>
        <div style={{ margin: '20px 0'}} />
        {keywordAd ? (
          <table>
            <thead>
              <tr>
                <th>키워드</th>
                <th>PC 월간 검색수</th>
                <th>모바일 월간 검색수</th>
                <th>PC 월평균 클릭수</th>
                <th>모바일 월평균 클릭수</th>
                <th>PC 월평균 노출 광고수</th>
                <th>경쟁 정도</th>
              </tr>
            </thead>
            <tbody>
              {keywordAd.map((keyword, index) => {
                return (
                  <tr key={index}>
                    <td>{keyword.relKeyword}</td>
                    <td>{keyword.monthlyPcQcCnt}</td>
                    <td>{keyword.monthlyMobileQcCnt}</td>
                    <td>{keyword.monthlyAvePcClkCnt}</td>
                    <td>{keyword.monthlyAveMobileClkCnt}</td>
                    <td>{keyword.plAvgDepth}</td>
                    <td>{keyword.compIdx}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p style={{ fontWeight: 'bold', fontSize: '20px'}}>로딩 중...</p>
        )}
      </header>
    </div>
  );
}

export default App;