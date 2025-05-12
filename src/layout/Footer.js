import styled from "styled-components";
import React from "react";

const FooterWrapper = styled.footer`
  bottom: 100%;
  margin-bottom: 50px;
  color: white;
  text-align: center;
  padding: 20px;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const FooterNav = styled.nav`
  margin-top: 10px;

  a {
    color: white;
    margin: 0 15px;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <p>© 2025 판다산다. All rights reserved.</p>
      <FooterNav>
        <a href="/terms">이용약관</a>
        <a href="/privacy">개인정보처리방침</a>
        <a href="/contact">문의하기</a>
      </FooterNav>
    </FooterWrapper>
  );
}

export default Footer;