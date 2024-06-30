import React, { useState, useEffect, useReducer } from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import MyContext from '../src/Context';
import HomeSection from './componentes/HomeSection';
import VideoPlayer from './componentes/VideoPlayer';
import FormularioCategorias from './componentes/FormularioCategorias';
import FormularioVideos from './componentes/FormularioVideos';
import FormulariosCrud from './componentes/FormulariosCrud';
import { API_URL } from './componentes/apiConfig';

function App() {
  const [categorias, setCategorias] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoToPlay, setVideoToPlay] = useState();
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    fetch(`${API_URL}/categorias`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setCategorias(data))
      .catch(error => console.error('Fetch error:', error));
  }, [reducerValue]);

  useEffect(() => {
    fetch(`${API_URL}/videos`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setVideos(data))
      .catch(error => console.error('Fetch error:', error));
  }, [reducerValue]);

  const handleVideoLoading = (videoUrl) => {
    setVideoToPlay(videoUrl);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<HomeSection categorias={categorias} videos={videos} />} />
        <Route path="/videoPlayer" element={<VideoPlayer />} />
        <Route path="/formulariovideos" element={<FormularioVideos />} />
        <Route path="/formulariocategorias" element={<FormularioCategorias />} />
        <Route path="/formularioscrud" element={<FormulariosCrud />} />
      </Route>
    )
  );


  
  return (
    <main>
      <MyContext.Provider value={{ handleVideoLoading, setVideoToPlay, videoToPlay, forceUpdate }}>
        <RouterProvider router={router} />
      </MyContext.Provider>
    </main>
  );
}

export default App;