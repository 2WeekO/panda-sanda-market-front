import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayOut from './layout/MainLayOut';
import CartPage from './pages/Cart';
import LoginPage from './pages/Login';
import Main from './pages/main';
import MyStorePage from './pages/MyStore';
import NotFound from './pages/NotFound';
import ProductForm from './pages/Product';
import ProductDetail from './pages/ProductDetail';
import SignUpPage from './pages/SignUp';


import './App.css';
import './CSS/HeaderStyle.css';
import './CSS/MainStyle.css';
import './CSS/ProductDetailStyle.css';
import './CSS/ProductForm.css';
import './CSS/SignStyle.css';


const App = () => {
  
  return (
    
    <div className='view'>
    <div className='view-width'>
      <BrowserRouter>
					<Routes>
          <Route element={<MainLayOut/>}>
            <Route path='/' element={<Main/>}></Route>
            <Route path="mystore/:userKey" element={<MyStorePage/>}></Route>{/*마이스토어*/}
            <Route path='/cart' element={<CartPage/>}></Route>{/*장바구니*/}
            <Route path='/search'></Route>{/*검색*/}
            <Route path='/category' ></Route>{/*카테고리*/}
            <Route path='/product' element={<ProductForm/>}></Route>{/*판매하기*/}
            <Route path="/product/detail/:productId" element={<ProductDetail />} /> {/* 상세 페이지 라우트 설정 */}
            <Route path='/account' ></Route>{/*계좌등록*/}
            <Route path='*' element={<NotFound/>}></Route>
          </Route>

          <Route path='/login' element={<LoginPage/>}></Route>{/*로그인*/}
          <Route path='/signup' element={<SignUpPage/>}></Route> {/*회원가입*/}
            
          </Routes>
      </BrowserRouter>
      
    </div>
    </div>
    
  );
}

export default App;

