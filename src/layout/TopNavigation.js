
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Link 컴포넌트 가져오기
import Search_Image from './image/search_icon.svg';

const TopNavigation = () => {

    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색 키워드 상태


    const handleSearch = () => {
        console.log("검색어:", searchKeyword); // 검색어 확인용 로그
        if (searchKeyword.trim()) {
        navigate(`/search?keyword=${encodeURIComponent(searchKeyword)}`);
        }
    };
    
    
    return (
        <div>
            
            <div className="search-box">
                <input
                    className="search-input"
                    type="text"
                    placeholder="검색어를 입력해주세요."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => {if (e.key === "Enter") {handleSearch();}}}
                />
                <button onClick={handleSearch}>
                    <img src={Search_Image} alt="검색"/>
                </button>
            </div>
            
            

        </div>
    );
};

export default TopNavigation;
