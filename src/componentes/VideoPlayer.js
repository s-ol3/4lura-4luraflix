import React, { useState, useContext } from 'react';
import ReactPlayer from "react-player";
import styled from "styled-components";
import MyContext from '../Context';


////////////////////////////////////////////////////////////////////////////
const VideoContainer = styled.div`
  background-color: var(--background-principal);
  position: relative; 
  width: auto;
  height: 90vh; 
  padding-top: 1rem; 
`;

const PlayerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    opacity: 1;
    padding: 5.5em 6em 1em 6em;    

  @media (max-width: 1024px) {
    padding: 5.5em 1em 1em 1em; 
  }

  @media (max-width: 600px) {
    padding: 5.5em 1em 1em 1em; 
  }
`;

////////////////////////////////////////////////////////////////////////////
const VideoPlayer = ({ videoUrl }) => {
  
  const { videoToPlay } = useContext(MyContext);

  return (
    <VideoContainer>
      <PlayerWrapper>
        <ReactPlayer
          url={videoToPlay}
          width="100%"
          height="100%"
          controls={true} // muestra los controles del reproductor
          config={{
            youtube: {
              playerVars: {
                autoplay: 0, // no reproducir automáticamente
                modestbranding: 1, // ocultar el logotipo de YouTube
                showinfo: 1, // mostrar información del video (título, autor)
                rel: 0, // no mostrar videos relacionados al final
                controls: 1, // mostrar controles del reproductor de YouTube
              },
            },
          }}
        />
      </PlayerWrapper>
    </VideoContainer>
  );
};


export default VideoPlayer