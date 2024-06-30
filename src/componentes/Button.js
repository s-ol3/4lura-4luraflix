import React from 'react'
import styled, { css } from "styled-components"

////////////////////////////////////////////////////////////////////////////
const Button = styled.button`
height: 3.7rem;

/* width: 8.4rem; */
width: auto;  /* mas ancho, para  '...' */
padding: 0 1.2em;

font-size: 1.1rem;
text-transform: uppercase;
margin-left: 7%;
border: 2px solid var(--btn-nav);
color: var(--btn-nav);
border-radius: 20px;
display: block;
font-family: monospace, "Segoe UI", Roboto;
transition: all .5s ease;
background-color: #000000;

&:hover{
    transform: scale(0.95);
}
   @media (max-width: 1024px) {
     /* display: inline-block; */
     display: none;
   }
`
////////////////////////////////////////////////////////////////////////////
export default Button