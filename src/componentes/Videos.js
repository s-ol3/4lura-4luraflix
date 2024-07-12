import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* import { Navigation } from 'swiper'; */

import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Mousewheel, Scrollbar } from 'swiper/modules'; // para scroll o flechas teclado sobre el container de videos 

import styled from 'styled-components';
import MyContext from '../Context';
import FormularioModalEdit from './FormularioModalEdit';
import Alert from './alerts';
import { API_URL } from './apiConfig';



////////////////////////////////////////////////////////////////////////////
const VideosSection = styled.div`
  @media (max-width: 1024px) {
    margin-top: 8em;
  }
`;

const VideosContainer = styled.div`
  margin-top: 5em;

  @media (max-width: 600px) {
    margin-top: 1em;
  }
`;

const CategoriaContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 900;
  height: 5rem;
`;

const CategoriaTitulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.categoriacolor};
  color: #ffff;
  width: 21rem;
  padding: 0.8rem;
  font-size: 1.5rem;
  border-radius: 20px;
  margin-top: 1em;
  margin-bottom: 2em;
  overflow: hidden;

  @media (max-width: 600px) {
    width: 100%;
    font-size: 1.1rem;
    text-align: center;
  }
`;

const SwiperContainer = styled.div`
  width: 100%;
  position: relative;
`;

const SwiperStyle = styled(Swiper)`
  padding: 20px 4px;
  margin-bottom: 5em;

  @media (max-width: 1024px) {
    margin-bottom: 5em;
  }



  /* *****con scrollbar-----------scrollbar quedan presentes siempre aunque no haya mas para navegar, y unifican alturas entre categorias, los swiper btn aparecen solo cuando hay mas para navegar--porque los puse abajo-- y cuando no hay mas, quedan todas apiladas las categorias- */
 /*  overflow-x: scroll !important; */  /* auto para que aparezca solo cuando hay mas para navegar */

  ::-webkit-scrollbar {
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-x);
    border-radius: 10px;
  }
  white-space: nowrap; /* evitar que los elementos se envuelvan a multiples lineas */
  /* *****con scrollbar------------- */



  //apago los dos , dejo scrollbar de react swiper



  /* *****con swiper btn------------- no deja desplazar con pad notebook, ver*/
  .swiper-button-prev,
  .swiper-button-next {
    display: none;

    /* position: fixed; */
    position: sticky;
    z-index: 1000;
    background-color: #0000007a;
    color: #797979;
   /*  padding: 1em 2em; */
    border-radius: 50%;
    height: 3.5rem;
    width: 3.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    --swiper-navigation-size: 20px;
  }

  .swiper-button-prev {
    /* left: 15px; */
    left: 65px;
    top: 86%; /* posición vertical deseada desde el borde superior */
    transform: translateY(-50%);
    /*  &:hover {
          background-color: #1d1d1d;
    } */
  }

  .swiper-button-next {
   /* right: 15px;  */
    right: 35px; 
    top: 56%; /* posición vertical deseada desde el borde superior */
    transform: translateY(-50%);
    /* &:hover {
          background-color: #1d1d1d;
    } */
  }

    /* &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      background-color: white;
    }
  } */
  .swiper-button-prev.swiper-button-disabled,
  .swiper-button-next.swiper-button-disabled {
    opacity: 0; /* opacidad del botón si no hay más elementos para navegar */
    cursor: auto;
    pointer-events: none;
  }




  /* ***** swiper scrollbar------------- apague scrollbar comun y btn swiper */
  .swiper-scrollbar {
    //width: 50%; /* ancho scrollbar */
    height: 5px;
    margin: 1em 0;
  }

  .swiper-scrollbar-drag {
    background-color: var(--scrollbar-x); /* color del handle */
    border-radius: 10px; 
    margin: 1em 0;
  }

  .swiper-scrollbar-drag:hover {
    background-color: var(--scrollbar-x-hover); /* handle when hover */
  }

`;



const SwiperVideos = styled(SwiperSlide)`
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  transition: 0.5s all;

  &:hover {
    transform: scale(0.95);
  }

  .videoImg {
    height: auto;
    max-width: 99%;
    outline: 1px solid ${(props) => props.categoriacolor};
    box-shadow: ${(props) => props.categoriacolor} 0px 0px 6px;
    border-radius: 20px;
    margin: 1em 0 0em;
    width: 30em;
  }
`;

const Crud = styled.div`
  font-size: 1.1em;
  color: var(--crud-btn);
  cursor: pointer;
  display: flex;
  gap: 1em;
  position: absolute;
  bottom: 2%;
  right: 1%;
  margin: 0.3em;

  i {
    background: var(--crud-btn-bg);
    border-radius: 25px;
    margin: 0.1em 0px;
    padding: 0.5em;
    height: 2em;
    width: 2em;
    box-shadow: black 1px 1px 4px;
    transition: 250ms all;
  }

  i:first-child {
    margin-right: 0em;
    font-size: 1em;
  }

  & i:hover {
    background: var(--crud-btn-bg-hover);
  }
`;

////////////////////////////////////////////////////////////////////////////







////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const Videos = ({ categorias, videos }) => {

  const [showModal, setShowModal] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const { forceUpdate, setVideoToPlay } = useContext(MyContext);
  const navigate = useNavigate();



  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/categorias`);
      const data = await response.json();

    } catch (error) {
      console.error('Error fetching data de la API:', error);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);



  const volverMain = () => {
    navigate('/');
  };



  const deleteVideo = async (id) => {
    try {
      await fetch(`${API_URL}/videos/${id}`, {
        method: 'DELETE',
      });
      fetchData();
      forceUpdate();
      setAlertType('success');
      setAlertMessage('Video eliminado ✔');
      setShowAlert(true);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };



  const handleAlertClose = () => {
    setShowAlert(false);
  };



  const handleVideoClick = (videoUrl) => {
    setVideoToPlay(videoUrl);
  };



  useEffect(() => {
    if (videoToEdit && !showModal) {
      setShowModal(true);
    }
  }, [videoToEdit, showModal]);



  const handleOpenModal = (videoId) => {
    const video = videos.find((v) => v.id === videoId);
    if (video) {
      setVideoToEdit(video);
    }
  };



  const handleCloseModal = () => {
    setShowModal(false);
    setVideoToEdit(null);
  };






  return (
    <div>
      {showAlert && <Alert type={alertType} message={alertMessage} onClose={handleAlertClose} />}

      <VideosSection>
        {categorias.map((categoria) => (
          <VideosContainer key={categoria.id}>
            {videos.some((video) => video.videoCategoria === categoria.categoriaNombre) && (
              <SwiperContainer>
                <CategoriaContainer>
                  <CategoriaTitulo categoriacolor={categoria.categoriaColor}>
                    {categoria.categoriaNombre}
                  </CategoriaTitulo>
                </CategoriaContainer>

                <SwiperStyle
                  spaceBetween={10}
                  slidesPerView={3}
                  slidesPerGroup={1}
                  navigation={true}

                  // modules={[Navigation]}
                  modules={[Navigation, Keyboard, Mousewheel, Scrollbar]}
                  //mousewheel //dificulta un poco el scroll vertical, ver
                  mousewheel={{ passive: true }} //solo daba una advertencia en consola
                  keyboard //desplazarse con teclado sobre container videos, mousewhell para lo mismo scrolleando sobre container
                  scrollbar={{ draggable: true }}

                  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                    1200: { slidesPerView: 3 },
                  }}
                >
                  {videos.map(
                    (video) =>
                      video.videoCategoria === categoria.categoriaNombre && (
                        <SwiperVideos key={video.id} categoriacolor={categoria.categoriaColor}>
                          <Link to="/videoPlayer" onClick={() => handleVideoClick(video.videoLink)}>
                            <div>
                              <img className="videoImg" src={video.videoImgLink} alt="Video imagen presentación" />
                            </div>
                          </Link>

                          <Crud>
                            <i className="fa-solid fa-pen" onClick={() => handleOpenModal(video.id)}></i>
                            <i className="fa-solid fa-xmark" onClick={() => deleteVideo(video.id)}></i>
                          </Crud>
                        </SwiperVideos>
                      )
                  )}
                </SwiperStyle>
              </SwiperContainer>
            )}
          </VideosContainer>
        ))}
      </VideosSection>

      <FormularioModalEdit
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        videoToEdit={videoToEdit}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        setAlertType={setAlertType}
        setAlertMessage={setAlertMessage}
      />
    </div>
  );
};

export default Videos;