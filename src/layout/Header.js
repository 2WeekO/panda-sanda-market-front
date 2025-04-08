import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo_Image from './image/LOGO.png';
import Search_Image from './image/search_icon.svg';

const Header = () => {

  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태

  // 검색
  const handleSearch = () => {
    console.log("검색어:", searchKeyword); // 검색어 확인용 로그
      if (searchKeyword.trim()) {
        navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
      }
  };


  return (
    
    <div className="header-container">
      <div className="header-content">

        <div className='logo-width'>
          <a href="/" className="logo"><img className="logo-img" src={Logo_Image}></img></a>
        </div>
        
        <div className="nav">
          <div className='nav-center'>
            
            <div className="search-box">
              <input
                  className="search-input"
                  type="text"
                  placeholder="상품 검색"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(); // 엔터 키를 누르면 검색 실행
                    }
                }}
              />

              <button onClick={handleSearch}>
                <img className="search-btn" src={Search_Image} alt="검색" />
              </button>

            </div>

          </div>
          
        </div>
          
      </div>
    </div>


  );
};

export default Header;
