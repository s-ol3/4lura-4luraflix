import React from 'react'
import styled from "styled-components"
import Banner from './Banner'
import Videos from './Videos'
//import Footer from './Footer'

////////////////////////////////////////////////////////////////////////////
const HomeSectionContainer = styled.div`
    background-color: var(--background-principal);
    padding:2em 7%;

  @media (max-width: 1024px) {
    padding-top: 1.5rem;
  }   
`;

////////////////////////////////////////////////////////////////////////////
function HomeSection ({categorias, videos}) {
  
  return (
    <>
    <Banner/>
    <HomeSectionContainer>        
          <Videos categorias={categorias } videos={videos}/>  
    </HomeSectionContainer>
   {/*  <Footer /> */}
    </>
  )
}

export default HomeSection;