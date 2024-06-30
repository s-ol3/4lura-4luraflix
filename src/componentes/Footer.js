import React from 'react'
import styled, { css } from "styled-components"
import logo from '../assets/LogoAluraflix.png'

////////////////////////////////////////////////////////////////////////////
const FooterContainer = styled.div`
    display:flex;
    align-items: top;
    justify-content:center;
    background-color: var(--background-nav-footer);
    height: 10vh;
    min-width: 320px;
    padding-top: 1rem;
  /*   border-top: 2px solid var(--blue-flix);
    box-shadow: var(--shadow-footer); */
    z-index: 2000;   
`
const Logo = styled.img`
    height: 3rem;
    /* margin-left: 2%; */
    filter: grayscale() brightness(.2);

   @media (max-width: 1024px) {
    margin: 0 auto; 
  }
  @media (max-width: 600px) {
    max-height: 50%;
  }
`

////////////////////////////////////////////////////////////////////////////
function Footer() {
  return (
    <FooterContainer>
      <Logo src={logo} alt="Aluraflix Logo" />
    </FooterContainer>
  )
}

export default Footer