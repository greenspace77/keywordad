import React, { useState } from "react";
import { requestKeywordAd } from "./keywordAd";
import aiRun from "./aiGenerative";

function App() {
  const [keyword, setKeyword] = useState("");
  const [keywordAd, setKeywordAd] = useState(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const fetchKeywordAd = async () => {
    setKeywordAd(null);
    setIsLoading(true);

    if (keyword.trim() != "") {
      const keywords = await requestKeywordAd(keyword);
      setKeywordAd(keywords);

      const keywordList = keywords.map((keyword) => keyword.relKeyword);
      const typeList = new Array(keywords.length).fill(search);

      const aiResults = await aiRun(keywordList, typeList);
      console.log(aiResults);
    }

    setIsLoading(false);
  };

  return (
    <div className='App' style={{ backgroundColor: "black", color: "white" }}>
      <header className='App-header'>
        <input
          type='text'
          value={keyword}
          onChange={handleInputChange}
          placeholder='코어 키워드를 입력하세요'
          style={{
            marginTop: "30px",
            marginRight: "30px",
            width: "300px",
            height: "40px",
            backgroundColor: "black",
            color: "white",
          }}
        />
        <input
          type='text'
          value={search}
          onChange={handleSearchChange}
          placeholder='키워드 분류 타입을 입력하세요'
          style={{
            marginRight: "30px",
            width: "300px",
            height: "40px",
            backgroundColor: "black",
            color: "white",
          }}
        />
        <button
          style={{ width: "100px", height: "45px" }}
          onClick={fetchKeywordAd}
        >
          적 용
        </button>
        <div style={{ margin: "20px" }} />
        {!isLoading ? (
          keywordAd && (
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
          )
        ) : (
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>로딩 중...</p>
        )}
      </header>
    </div>
  );
}

export default App;
