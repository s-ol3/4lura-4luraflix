import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import MyContext from '../Context';
import Alert from './alerts';
import { API_URL } from './apiConfig';

////////////////////////////////////////////////////////////////////////////
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: ${(props) => (props.show ? 'block' : 'none')};
  z-index: 6000;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--background-principal);
  color: var(--crud-btn);
  padding: 1.9rem 2rem;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.show ? 'block' : 'none')};
  outline: 1px solid var(--blue-flix);
  font-size: 0.95em;
  max-height: 95vh;
  overflow-y: auto; /* aparece scrollbar cuando es necesario */

  ::-webkit-scrollbar {
    width: 0px;
  }
  ::-webkit-scrollbar-track {
    /* background: var(--scrollbar-track); */
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-x);
    border-radius: 10px;
  }

  @media (max-width: 600px) {
    width: 90%;
    font-size: 0.8em;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BoxContainer = styled.div`
  height: auto;
  background-color: var(--background-principal);
  padding: 1em 1em 2em;
  min-width: 25em;

  @media (max-width: 600px) {
    min-width: 2em;
  }
`;

const ContainerWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: grid;
  gap: 0px;
`;

const Titulo = styled.h2`
  text-align: center;
  color: var(--blue-flix);
  text-transform: uppercase;
  font-weight: 700;
`;

const Input = styled.input`
  color: var(--form-input);
  width: 100%;
  padding: 0.9em;
  border: 1px solid var(--form-input-border);
  border-radius: 12px;
  margin: 0.7em 0 1.3em;
  font-family: monospace, 'Segoe UI', 'Roboto';

  &:focus {
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
  margin: 0.7em 0 1.3em;
  font-family: monospace, 'Segoe UI', 'Roboto';

  &:focus {
    border: 1px solid var(--blue-flix);
  }

  &::placeholder {
    color: var(--form-input-placeholder);
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar);
    border-radius: 10px;
  }
`;

const Select = styled.select`
  color: var(--form-input-options);
  width: 100%;
  padding: 0.9em;
  border: 1px solid var(--form-input-border);
  border-radius: 12px;
  margin: 0.7em 0 1.3em;
  font-family: monospace, 'Segoe UI', 'Roboto';

  &:focus {
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
  font-family: monospace, 'Segoe UI', Roboto;
  background-color: #000000;
  transition: all 0.5s ease;
  margin-top: 0.6em;

  &:hover {
    transform: scale(0.95);
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

const Label = styled.label`
  color: var(--form-label);
`;

const ErrorValidacion = styled.div`
  color: var(--form-validacion);
  font-weight: 200;
  margin: -9px 0 15px 10px;
`;
////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const FormularioModalEdit = ({
  showModal,
  handleCloseModal,
  videoToEdit,
  showAlert,
  setShowAlert,
  alertType,
  alertMessage,
  setAlertType,
  setAlertMessage,
}) => {
  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [categorias, setCategorias] = useState([]);

  const { forceUpdate } = useContext(MyContext);


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCategorias = await fetch(`${API_URL}/categorias`);
        const data = await responseCategorias.json();
        setCategorias(data);

        setValue('titulo', videoToEdit.titulo);
        setValue('videoLink', videoToEdit.videoLink);
        setValue('videoImgLink', videoToEdit.videoImgLink);
        setValue('videoCategoria', videoToEdit.videoCategoria);
        setValue('descripcion', videoToEdit.descripcion);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (videoToEdit) {
      fetchData();
    }
  }, [videoToEdit, setValue]);



  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/videos/${videoToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      handleCloseModal();

      setAlertType('success');
      setAlertMessage('Video editado ✔');
      setShowAlert(true);

      forceUpdate();
    } catch (error) {
      console.error('Error updating video:', error);

      setAlertType('error');
      setAlertMessage('Error al editar el video');
      setShowAlert(true);
    }
  };



  const resetForm = () => {
    reset();
  };



  const handleAlertClose = () => {
    setShowAlert(false);
  };



  React.useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);






  return (
    <ModalOverlay show={showModal}>
      {showAlert && <Alert type={alertType} message={alertMessage} onClose={handleAlertClose} />}
      <ModalContainer show={showModal}>
        <ModalHeader>
          <button onClick={() => { reset(); handleCloseModal(); }} style={{ marginLeft: 'auto' }}>
            <i className="fa-solid fa-x"></i>
          </button>
        </ModalHeader>
        <BoxContainer>
          <ContainerWrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Titulo>Editar video</Titulo>
              <hr style={{ border: '1px solid var(--blue-flix)', width: '100%', marginBottom: '2em' }}></hr>

              <div>
                <Label htmlFor="titulo">Título</Label>
                <Controller
                  name="titulo"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Título requerido' }}
                  render={({ field }) => (
                    <div>
                      <Input {...field} type="text" placeholder="Título del video" />
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
                      <Input {...field} type="text" placeholder="Link del video" />
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
                      <Input {...field} type="text" placeholder="Link de la imagen del video" />
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
                  rules={{ required: 'Categoría requerida' }}
                  render={({ field }) => (
                    <div>
                      <Select {...field}>
                        {<option value="" disabled defaultValue="" hidden>Selecciona una categoría</option>}
                        {categorias.map((categoria) => (
                          <option key={categoria.id} value={categoria.categoriaNombre}>
                            {categoria.categoriaNombre}
                          </option>
                        ))}
                      </Select>
                      {errors.categoria && (
                        <ErrorValidacion>{errors.categoria.message}</ErrorValidacion>
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
                      <Textarea {...field} rows="2" placeholder="Ingresa una descripción" />
                      {errors.descripcion && (
                        <ErrorValidacion>{errors.descripcion.message}</ErrorValidacion>
                      )}
                    </div>
                  )}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit">Actualizar</Button>
              </div>
            </Form>
          </ContainerWrapper>
        </BoxContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};



export default FormularioModalEdit;