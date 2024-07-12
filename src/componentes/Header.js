import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/LogoAluraflix.png';
import Button from '../componentes/Button';
import ButtonIcon from '../componentes/ButtonIcon';

////////////////////////////////////////////////////////////////////////////
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5.5rem;
  align-items: center;
  background-color: var(--background-nav-footer);
  border-bottom: 2px solid var(--blue-flix);
  box-shadow: var(--shadow-nav);
  position: fixed;
  width: 100%;
  z-index: 5000;
`;

const Logo = styled.img`
  max-height: 60%;
  margin-left: 6%; /* 7 */
  cursor: pointer;
  
  @media (max-width: 600px) {
    max-height: 40%;
  }
`;

const BtnBox = styled.div`
  display: flex;
  margin-right: 7%;

  @media (max-width: 1024px) {
    display: flex;
  }
`;


////////////////////////////////////////////////////////////////////////////
const Header = () => {

  const navigate = useNavigate();
  const topRef = useRef(null);


  const volverMain = () => {
    navigate('/');
  };


  const scrollToTop = () => {
    // scroll hacia arriba de manera suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleClick = () => {
    //navigate('/formulariovideos');
    navigate('/formularioscrud');
  };




  
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Aluraflix Logo" onClick={() => { volverMain(); scrollToTop(); }} />

      <BtnBox>

        {/* pantalla grande ----------------------------*/}
        <Button onClick={() => { volverMain(); scrollToTop(); }} style={{ color: 'var(--blue-flix)', borderColor: 'var(--blue-flix)' }}>
          Home
        </Button>
        <Button onClick={handleClick}>
          {/* add video */}
          <i className="fa-solid fa-ellipsis"></i>
        </Button>

        {/* pantalla chica ---------------------------- */}
        <ButtonIcon onClick={() => { volverMain(); scrollToTop(); }} style={{ color: 'var(--blue-flix)', borderColor: 'var(--blue-flix)' }}>
          <i className="fa-solid fa-house"></i>
        </ButtonIcon>
        <ButtonIcon onClick={handleClick}>
          {/* <i className="fa-solid fa-plus"></i> */}
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </ButtonIcon>
        
      </BtnBox>
    </HeaderContainer>
  );
};



export default Header;