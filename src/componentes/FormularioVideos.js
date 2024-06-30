import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import MyContext from '../Context';
import Alert from './alerts';
import { API_URL } from './apiConfig';

////////////////////////////////////////////////////////////////////////////
const BoxContainer = styled.div`
  height: auto;
  background-color: var(--background-principal);
  padding: 11em 30em 8rem;
  min-width: 320px;

  @media (max-width: 1630px) {
    padding: 11rem 20% 8rem; 
  }

  @media (max-width: 1024px) {
    padding: 11em 20% 2rem; 
    font-size: .8em;
  }

  @media (max-width: 600px) {
    padding: 11em 10% 0rem;
    font-size: .8em; 
  }
`;

const ContainerWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
`;

const Titulo = styled.h2`
  text-align: center;
  color: var(--blue-flix);
  text-transform: uppercase;
  font-weight: 700;
`;

const SubTitulo = styled.h4`
  text-align: center;
  color: var(--crud-btn);
  text-transform: uppercase;
  font-weight: 400;
  padding-bottom: 2em;
  margin-bottom: 3em;
  border-bottom: 1px solid var(--blue-flix);
  letter-spacing: 1.1px;
`;

const Input = styled.input`
    color: var(--form-input);
    width: 100%;
    padding: 1em;
    border: 1px solid var(--form-input-border);
    border-radius: 12px;
    margin: .7em 0 .7em;
    font-family: monospace, 'Segoe UI', 'Roboto';

    &:focus{
      border: 1px solid var(--blue-flix);
    }

    &::placeholder {
      color: var(--form-input-placeholder); 
    }
`;

const Textarea = styled.textarea`
    color: var(--form-input);
    width: 100%;
    padding: 1em;
    border: 1px solid var(--form-input-border);
    border-radius: 12px;
    margin: .7em 0 .7em;
    font-family: monospace, 'Segoe UI', 'Roboto';

    &:focus{
      border: 1px solid var(--blue-flix);
    }
    
    &::placeholder {
      color: var(--form-input-placeholder); 
    }
`;

const Select = styled.select`
    color: var(--form-input-options);
    width: 100%;
    padding: 1em;
    border: 1px solid var(--form-input-border);
    border-radius: 12px;
    margin: .7em 0 .7em;
    font-family: monospace, 'Segoe UI', 'Roboto';

    &:focus{
      border: 1px solid var(--blue-flix);
    }

    option { color: #797979; background-color: #191919; }
`;

const Button = styled.button`
    height: 3.7rem;
    width: auto;
    font-size: 1.1rem;
    text-transform: uppercase;
    padding: 0 1em;
    border: 2px solid var(--btn-nav);
    color: var(--btn-nav);
    border-radius: 20px;
    display: block;
    font-family: monospace, "Segoe UI", Roboto;
    background-color: #000000;
    transition: all .5s ease;

   &:hover{
    transform: scale(0.95);
   }

   @media (max-width: 600px) {
    font-size: .9rem;
  }
`;

const Label = styled.label`
  color: var(--btn-nav);
  display: none;
`;

const ErrorValidacion = styled.div`
  color: var(--form-validacion); 
  font-weight: 200; 
  margin: -0px 0 15px 10px;
`;

const BtnBox = styled.div`
  display: inline-grid;
  justify-content: space-between;
  
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
  }
`;
////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
function FormularioVideos() {

  const navigate = useNavigate();
  const { forceUpdate } = useContext(MyContext);
  const [options, setOptions] = useState([]);

  //alert personalizada
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/categorias`);
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error('Error fetching data de la API:', error);
      }
    };

    fetchData();
  }, []);



  const volverMain = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  

  const { control, handleSubmit, reset, formState: { errors } } = useForm();



  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el video');
      }

      setAlertType('success');
      setAlertMessage('Video creado ✔');
      setShowAlert(true);

      setTimeout(() => {
        forceUpdate();
        volverMain();
      }, 3000); // tiempo para que se vea la alerta antes de volver al home

    } catch (error) {
      console.error('Error al crear el video:', error);

      setAlertType('error');
      setAlertMessage('Error al crear el video');
      setShowAlert(true);
    }
  };



  const resetForm = () => {
    reset();
  };



  const handleAlertClose = () => {
    setShowAlert(false);
  };







  return (
    <BoxContainer>
      <ContainerWrapper>
        {/* alert  */}
        {showAlert && <Alert type={alertType} message={alertMessage} onClose={handleAlertClose} />}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Titulo> Nuevo video</Titulo>
          <SubTitulo>Complete el formulario para crear una nueva tarjeta de video</SubTitulo>

          <div>
            <Label htmlFor="titulo">Título</Label>
            <Controller
              name="titulo"
              control={control}
              defaultValue=""
              rules={{ required: 'Titulo requerido' }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="text"
                    error={!!errors.titulo}
                    placeholder="Título del video"
                  />
                  {errors.titulo && (
                    <ErrorValidacion>{errors.titulo.message}</ErrorValidacion>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="videoLink">Video</Label>
            <Controller
              name="videoLink"
              control={control}
              defaultValue=""
              rules={{ required: 'Link requerido' }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="text"
                    error={!!errors.videoLink}
                    placeholder="Link del video"
                  />
                  {errors.videoLink && (
                    <ErrorValidacion>{errors.videoLink.message}</ErrorValidacion>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="videoImgLink">Imagen</Label>
            <Controller
              name="videoImgLink"
              control={control}
              defaultValue=""
              rules={{ required: 'Link requerido' }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="text"
                    error={!!errors.videoImgLink}
                    placeholder="Link de la imagen del video"
                  />
                  {errors.videoImgLink && (
                    <ErrorValidacion>{errors.videoImgLink.message}</ErrorValidacion>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="videoCategoria">Categoría</Label>
            <Controller
              name="videoCategoria"
              control={control}
              defaultValue=""
              rules={{ required: 'Seleccione una Categoría' }}
              render={({ field }) => (
                <div>
                  <Select
                    {...field}
                    id="categoria"
                    error={!!errors.videoCategoria}
                  >
                    <option value="" disabled defaultValue="" hidden >Seleccione una categoría</option>
                    {options.map((option) => (
                      <option key={option.id} value={option.categoriaNombre}>
                        {option.categoriaNombre}
                      </option>
                    ))}
                  </Select>
                  {errors.videoCategoria && (
                    <ErrorValidacion>{errors.videoCategoria.message}</ErrorValidacion>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Controller
              name="descripcion"
              control={control}
              defaultValue=""
              rules={{ required: 'Descripción requerida' }}
              render={({ field }) => (
                <div>
                  <Textarea
                    {...field}
                    rows={3}
                    placeholder="Descripción del video"
                    error={!!errors.descripcion}
                  />
                  {errors.descripcion && (
                    <ErrorValidacion style={{ color: 'var(--form-validacion)', fontWeight: '200' }}>{errors.descripcion.message}</ErrorValidacion>
                  )}
                </div>
              )}
            />
          </div>

          {/* botones */}
          <BtnBox>
            <div style={{ display: 'flex' }}>
              <Button type="submit" style={{ marginRight: '1em', color: 'var(--blue-flix)', borderColor: 'var(--blue-flix)' }}>
                Guardar
              </Button>
              <Button type="button" onClick={resetForm}>
                Limpiar
              </Button>
            </div>
          </BtnBox>
        </Form>
      </ContainerWrapper>
    </BoxContainer>
  );
}



export default FormularioVideos;