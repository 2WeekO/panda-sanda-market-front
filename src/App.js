import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayOut from './layout/MainLayOut';
import PurchasePage from './pages/ProductManagement';
import PurchaseRequestForm from "./pages/Component/PurchaseRequestModal";
import LoginPage from './pages/Login';
import Main from './pages/main';
import MyStorePage from './pages/MyStore';
import NotFound from './pages/NotFound';
import ProductForm from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import SignUpPage from './pages/SignUp';
import AccountPage from './pages/Account';
import SearchResults from './pages/Component/SearchResults';
import BottomNavigation from './layout/BottomNavigation';
import UserSettingPage from './pages/UserSetting';

import './App.css';
import './CSS/HeaderStyle.css';
import './CSS/MainStyle.css';
import './CSS/ProductDetailStyle.css';
import './CSS/ProductForm.css';
import './CSS/PurchaseRequestModalStyle.css';
import './CSS/SignStyle.css';
import './CSS/ProductManagementStyle.css';
import './CSS/AccountStyle.css';
import './CSS/UserSettingStyle.css';

const App = () => {
  
  
  return (
    
    <div className='view'>
    <div className='view-width'>
      <BrowserRouter>
					<Routes>
          <Route element={<MainLayOut/>}>
            <Route path='/' element={<Main/>}></Route>
            <Route path='/mystore/:userKey' element={<MyStorePage/>}></Route>{/*마이스토어*/}
            <Route path='/purchase' element={<PurchasePage/>}></Route>{/*구매 관리*/}
            <Route path='/search' element={<SearchResults/>}></Route>{/*검색*/}
            <Route path='/product' element={<ProductForm/>}></Route>{/*판매하기*/}
            <Route path='/product/:productKey' element={<ProductForm/>}></Route>{/*상품 수정 페이지*/}
            <Route path='/product/detail/:productId' element={<ProductDetail/>}></Route> {/* 상세 페이지 라우트 설정 */}
            <Route path='/product/purchase-request' element={<PurchaseRequestForm />} /> {/*구매요청하기*/}
            <Route path='/account' element={<AccountPage></AccountPage>}></Route>{/*계좌등록*/}
            <Route path='/user' element={<UserSettingPage/>}></Route> {/*유저세팅 */}
            <Route path='*' element={<NotFound/>}></Route>

          </Route>

          <Route path='/login' element={<LoginPage/>}></Route>{/*로그인*/}
          <Route path='/signup' element={<SignUpPage/>}></Route> {/*회원가입*/}
            
          </Routes>
          <BottomNavigation/>
      </BrowserRouter>
      
      
    </div>
    
    </div>
    
  );

  
}




export default App;

