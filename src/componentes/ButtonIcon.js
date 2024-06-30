import React from 'react'
import styled, { css } from "styled-components"

////////////////////////////////////////////////////////////////////////////
const ButtonIcon = styled.button`
    height: 2.6rem;
    width: 3rem;
    font-size: .9rem;
    margin-left: 7%;
    border: 2px solid var(--btn-nav);
    color: var(--btn-nav);
    border-radius: 30px;
    display: block;
    transition: all .5s ease-in-out;

  &:hover{
    transform: scale(0.95);
  }

  @media (min-width: 1024px) {  
     display: none;
  }
`
////////////////////////////////////////////////////////////////////////////
export default ButtonIcon