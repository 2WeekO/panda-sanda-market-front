import React, { useEffect, useState } from "react";
import TopNavigation from './TopNavigation';
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNavigation from "./BottomNavigation";
import SideNavigation from "./SideNavigation";

const MainLayOut = () => {
  const [showHeader, setShowHeader] = useState(false);


  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return(
    <>
    
    {showHeader && <Header />}
    <TopNavigation/>
    <Outlet/>
    <Footer/>
    <SideNavigation/>
    <BottomNavigation/>
    </>
  );
};

export default MainLayOut;