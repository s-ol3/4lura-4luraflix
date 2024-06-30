import React, { useState, useEffect  } from 'react';
import FormularioCategorias from './FormularioCategorias';
import FormularioVideos from './FormularioVideos';
import Alert from './alerts'; 


////////////////////////////////////////////////////////////////////////////
function FormulariosCrud() {
  // estado y funciones para la alerta
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // función para cerrar la alerta
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    // asegurar que la pagina se abra en la parte superior cuando se carga
    window.scrollTo(0, 0);
  }, []); // solo se ejecuta una vez despues de montar el componente

  return (
    <>
      {/* pasar el estado y las funciones de alerta como props a los formularios */}
      <FormularioVideos
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        setAlertType={setAlertType}
        setAlertMessage={setAlertMessage}

        /* showAlert={showAlert}
        setShowAlert={setShowAlert}
        alertType={alertType}
        setAlertType={setAlertType}
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage} */
      />

      <FormularioCategorias
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        setAlertType={setAlertType}
        setAlertMessage={setAlertMessage}
      />

      {/* mostrar el componente de alerta si showAlert es true */}
      {showAlert && (
        <Alert type={alertType} message={alertMessage} onClose={handleAlertClose} />
      )}
    </>
  );
}



export default FormulariosCrud;