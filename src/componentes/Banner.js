import React from 'react';
import styled, { css, keyframes } from "styled-components";
import bannerBackground from "../assets/bannerBackground.png";
import bannerCard from '../assets/bannerCard.png';
//import frontImg from '../assets/frontNeon.png';
//import challengeImg from '../assets/ChallengeNeon.png';
import frontImg from '../assets/front.png';
import challengeImg from '../assets/react.png';
//import challengeImg from '../assets/react2.gif';

////////////////////////////////////////////////////////////////////////////
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 99.5vh;
  min-width: 320px;

  @media (max-width: 1024px) {
    /* height: 65vh; */
    display: none;
  }
`;

const BannerBackground = styled.div`
  position: relative;
  background-image: url(${bannerBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  /* height: 90vh; */
  height: 99.5vh;
  /* filter: blur(1.5em);  blurea todo */
  /* filter: grayscale(); */
  
  @media (max-width: 1024px) {
    /* height: 65vh; */
    display: none;
  }
`;

const Overlay = styled.div`
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99.5vh;
  /* background-color: rgba(0, 0, 0, 0.8); */
  z-index: 10;
  opacity: 0.8;
  background: rgb(4 7 11) !important;
  box-shadow: var(--blue-flix) 0px 0px 1.2rem;

  @media (max-width: 1024px) {
    /* height: 65vh; */
    display: none;
  }
`;

const BannerContent = styled.div`
  position: absolute;
  height: 40vh;
  top: 33vh;
  left: 5%;
  right: 5%;
  gap: 3em;
  z-index: 100;
  display: flex;
  justify-content: space-around;
`;

const BannerTextBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 45%;
  height: 20vh;
  /* margin-top: 2rem; */
  justify-content: space-between;

  @media (max-width: 1024px) {
    display: none;
  }

  /* NO BORRAR- para que se vea en phone tit y subt, sin card video alura, pero sacar los display none, ajustar margenes etc, si hay tiempo */
  /*   position: absolute;
    bottom: 5%;
    top: 50%;
    z-index: 5000;
    display: flex;
    flex-direction: column;
    max-width: 75%;
    height: 20vh;
    -webkit-box-pack: justify;
    justify-content: space-between;
    font-size: larger; */
`;

const Titulo = styled.div` // titulo y subt use img con letra = al logo
  color: var(--banner-text-titulo);
  /* height: 6rem; */
  width: 20rem;
  display: flex;
  /* align-items: center; */
  /* justify-content: center; */
  /* font-family: 'Roboto', sans-serif; */
  font-size: 2.4rem;
  font-weight: 700;
  text-shadow: var(--blue-flix) 0px 0px 0.7rem;
  z-index: 5000;
  height: 6rem;
`;

const Subtitulo = styled.div`
  /* font-family: 'Roboto', sans-serif; */
  /* font-family: monospace, 'Segoe UI', 'Roboto' !important; */
  color: var(--banner-text-subtitulo);
  font-size: 2.4rem;
  font-weight: 700;
  /* margin-top: 1.5rem; */
  text-shadow: var(--blue-flix) 0px 0px 0.7rem;

  /*
  transform: rotate(15deg) skew(17deg) translate(-22px,0px);
  -webkit-transform: rotate(15deg) skew(17deg) translate(-22px,0px);
  -moz-transform: rotate(15deg) skew(17deg) translate(-22px,0px);

  transform: skew(20deg);
  -webkit-transform: skew(20deg);
  -moz-transform: skew(20deg);
  */

  @media (max-width: 1024px) {
    font-size: 2.5rem;
    min-width: 320px;
    font-weight: 203;
    margin-left: 8%;
  }
`;

const Parrafo = styled.div`
  color: var(--banner-text-parrafo);
  margin-top: 3rem;
  /* font-family: monospace, 'Segoe UI', 'Roboto' !important; */
  font-weight: light;
  font-size: 1.5rem;
`;

const BannerCard = styled.img`
  /* max-height: 100%; */
  height: 45vh;
  border-radius: 20px;
  border: 1px solid var(--blue-flix);
  box-shadow: var(--blue-flix) 1px 1px 14px 1px;
  cursor: pointer;
  filter: opacity(0.8);
  /* transition: all ease-in-out 0.2s; */
  /* transition: 550ms all; */
  transition: all 0.5s ease;

  &:hover {
    transform: scale(0.95);
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Neon = styled.img`
  width: 6em;
  margin: 0px 0px 0 0em;
  /* filter: hue-rotate(18deg) brightness(0.8); */
  /* opacity: .8; */

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ChallengeNeon = styled.img`
  width: 26em;
  margin: 0px 0px 0 -1em;
  /* filter: hue-rotate(18deg) brightness(0.8); */
  /* opacity: .8; */

  @media (max-width: 1024px) {
    display: none;
  }
`;

const handleImageClick = () => {
  window.open('https://www.youtube.com/watch?v=ov7vA5HFe6w', '_blank'); // abre video en una nueva pestaña
};

//animaciones

/*
const signalAnimation = keyframes`
  0% {
    opacity: .7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .7;
  }

  --------------animation: ${signalAnimation} 8s linear infinite;   y esto va abajo dentro del elemento, para usar
`;

const shadowAnimation = keyframes`
  0%, 100% {
    text-shadow: var(--blue-flix) 0px 0px 2.9rem;
  }
  50% {
    text-shadow: var(--blue-flix) 0px 0px 0.3rem;
  }
`;

const shadowAnimationCard = keyframes`
  0%, 100% {
    box-shadow: var(--blue-flix) 0px 0px 1.9rem;
  }
  50% {
    box-shadow: var(--blue-flix) 0px 0px 0.3rem;
  }
`;


 
//--------------------------------------animacion text-shadow en banner 
// + animation: ${shadowAnimation} 4s ease-in-out infinite;   en componentes titulo y subt, saque, puse en nav, luego saque  

const shadowAnimation = keyframes
  0%, 100% {
    text-shadow: var(--blue-flix) 0px 0px 2.9rem;
  }
  50% {
    text-shadow: var(--blue-flix) 0px 0px 0.3rem;
  }
;

const shadowAnimationCard = keyframes
  0%, 100% {
    box-shadow: var(--blue-flix) 0px 0px 1.9rem;
  }
  50% {
    box-shadow: var(--blue-flix) 0px 0px 0.3rem;
  }
;

*/

////////////////////////////////////////////////////////////////////////////
const Banner = () => {
  return (
    <Container>
      <BannerBackground>
        <BannerContent>
          <BannerTextBox>
            <Neon src={frontImg} alt="Front End" />
            <ChallengeNeon src={challengeImg} alt="Challenge React" />
            <Parrafo>
              Este challenge es una forma de aprendizaje. Es un mecanismo donde podrás comprometerte en la resolución de un problema para poder aplicar todos los conocimientos adquiridos en la formación React.
            </Parrafo>
          </BannerTextBox>
          <BannerCard src={bannerCard} alt="Aluraflix Logo" onClick={handleImageClick} />
        </BannerContent>
      </BannerBackground>
      <Overlay />
    </Container>
  );
};

export default Banner;
