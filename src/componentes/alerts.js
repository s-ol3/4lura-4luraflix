import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

///////////////////////////////css styled-components
const StyledAlert = styled.div`
  /* estilos base del alert */
  opacity: 1;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  animation: fadeInUp 0.5s ease-in-out;

  /* estilos específicos para cada tipo de alert */
  &.success {
    background-color: #000000;
    border: 2px solid var(--blue-flix);
    color: #9f9f9f;
    position: fixed;
    border-radius: 20px;
    top: 79%;
    right: 5.7%;
    z-index: 5000;
    height: 3.8em;
    align-items: center;
    display: flex;
    padding: 0 1em;

    @media (max-width: 600px) {
    /*   left: calc(50% - 150px); 
      margin-left: -150px;
      transform: translateX(-50%); */


      /* right: unset; 
      left: 50%; 
      margin-left: 0;  */
    }
    
  }

  &.indicacion {
    background-color: #919191;
    border: 2px solid var(--blue-flix);
    font-weight: 500;
    color: #222222;
    position: fixed;
    border-radius: 20px;
    top: 79%;
    right: 5.7%;
    z-index: 5000;
    height: 3.8em;
    align-items: center;
    display: flex;
    padding: 0 1em;

    @media (max-width: 600px) {
      /* right: 10%;
      left: 10%; */

      //transform: translateX(-50%); /* para centrar exactamente, rompe animacion*/
  
      left: 50%; /* asegura que este centrado horizontalmente */
      margin-left: -150px; /* ajuste del margen izquierdo para centrar exactamente */
      right: unset; /* elimina el ajuste de right */

    }
  }

  &.error {
    color: #f2dede;
    border-color: #ebccd1;
    background-color: #a94442;

    @media (max-width: 600px) {
      /* left: 50%; 
      margin-left: -150px; 
      right: unset; */
    }
  }

  /* animaciones */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* cierre del alert */
  &.closing {
    opacity: 0;
    transform: translateY(20px);
  }
`;


////////////////////////////////////////////////////////////////////////////
const Alert = ({ type, message, onClose }) => {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <StyledAlert className={`alert ${type} ${closing ? 'closing' : ''}`}>
      <p>{message}</p>
      {/* <span className="close-btn" onClick={handleClose}>&times;</span> */}
    </StyledAlert>
  );
};

export default Alert;