import React from "react";
import "../CSS/BottomNavigationStyle.css";

import exchange_icon from "./image/nav/exchange_icon.svg";
import home_icon from "./image/nav/home_icon.svg";
import product_icon from "./image/nav/product_icon.svg";
import user_icon from "./image/nav/user_icon.svg";
import wallet_icon from "./image/nav/wallet_icon.svg";
const BottomNavigation = () => {



  return(
  <div>

  <div className="bottom-nav">
    <li><a href="/"><img src={home_icon} alt=""/></a></li>
    <li><a href="/account"><img src={wallet_icon} alt="" /></a></li>
    <li className="product_icon"><a href="/product"><img src={product_icon} alt="" /></a></li>
    <li><a href="/purchase"><img src={exchange_icon} alt="" /></a></li>
    <li> <a href="/user"><img src={user_icon} alt="" /></a></li>
  </div>

  </div>
  )

}




export default BottomNavigation;