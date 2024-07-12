import React, { useState, useEffect, useContext } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form'; 
import styled from 'styled-components';
import MyContext from '../Context';
import { useNavigate } from 'react-router-dom';
//import jsonData from '../db.json';
import { API_URL } from './apiConfig';



//styled components ////////////////////////////////////////////////////////
const FormContainer = styled.div`
  background-color:var(--background-principal);
  padding: 2rem 30rem 8rem; /* Padding por defecto */

  min-width: 320px;

  /* @media (min-width: 1948px) {
    padding: 8em 20em 8rem; 
  }
 */
  @media (max-width: 1630px) {
    padding: 8rem 20% 8rem; 
  }

  @media (max-width: 1024px) {
    padding: 8em 20% 8rem; 
    font-size: .8em;
  }

  @media (max-width: 600px) {
    padding: 8em 8% 8rem;
    font-size: .8em;
  }
`;


const FormWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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
  margin: 0.7em 0;
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
  margin: 0.7em 0;
  font-family: monospace, 'Segoe UI', 'Roboto';
  
  &:focus {
    border: 1px solid var(--blue-flix);
  }

  &::placeholder {
      color: var(--form-input-placeholder); 
  }
`;

const Label = styled.label`
  color: var(--btn-nav);
  color: black;
  display: none;
`;

const Button = styled.button`
  height: 3.7rem;
  /* width: auto; */
  min-width: 6.5rem;
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
  /* transition: all .5s ease 0s; 0s: es un retraso opcional antes de que comience la transición*/
  transition: all .5s ease;

  &:hover {
    transform: scale(0.95);
  }

  @media (max-width: 600px) {
    font-size: .9rem;
  }
`;

const Table = styled.table`
  width: 100%;
  margin-top: 2rem;
  list-style: none;
  border-spacing: initial;
  color: var(--form-input);

  @media (max-width: 800px) {
    width: 100%;  /* 95%; */
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TableHead = styled.thead`
  background-color: #000000;
`;

const TableBody = styled.tbody`
  background-color: var(--background-principal);
`;

const TableRow = styled.tr`
  height: 3.5em;
`;

const TableCell = styled.td`
  padding: 1em 0.5rem;
  border-bottom: 1px solid var(--form-input-options);
  
  &:hover button{
    color: #393939;
    cursor: pointer;
    transition: all .5s ease;
  }
  @media (max-width: 800px) {
    /* oculta la columna de descripcion en pantallas de 600px y menos */
    &:nth-child(2) {
      display: none;
    }
  }
`;

const CircleContainer = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

const ColorSelector2 = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const CircleSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

const CircleShape = ({ color }) => (
  <CircleSVG viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5" fill={color} />
  </CircleSVG>
);

const ErrorValidacion = styled.div`
  color: var(--form-validacion); 
  font-weight: 200; 
  margin: -0px 0 15px 10px;
`;


const BtnBox = styled.div`
  display: inline-grid;
  justify-content: space-between;
  margin-top: 3em;
  
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
  }
`;

////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
const FormularioCategorias = ({ showAlert, setShowAlert, setAlertType, setAlertMessage }) => {
  const methods = useForm();
  const { control, handleSubmit, reset, formState: { errors } } = methods;
  const { setValue, watch } = methods;
  const { forceUpdate } = useContext(MyContext);
  const [categorias, setCategorias] = useState([]);
  const [editingCategoria, setEditingCategoria] = useState(null);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);



  useEffect(() => {
    fetchData();
  }, []);



  const resetForm = () => {
    reset({
      categoriaNombre: '',
      categoriaDescripcion: '',
      categoriaColor: '#ffffff'
    });
    setEditingCategoria(null);
  };



  const volverUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/categorias`);
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };



  const deleteCategoria = async (id) => {
    try {
      await fetch(`${API_URL}/categorias/${id}`, {
        method: 'DELETE'
      });
      fetchData(); // refetch data after 

      setAlertType('success');
      setAlertMessage('Categoría eliminada ✔');
      setShowAlert(true);

      resetForm();

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };



  const onSubmit = async (data) => {
    try {
      if (editingCategoria) {
        data.categoriaColor = data.categoriaColor || editingCategoria.categoriaColor;

        await fetch(`${API_URL}/categorias/${editingCategoria.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        const response = await fetch(`${API_URL}/videos`);
        const videos = await response.json();

        const updatedVideos = videos.map(video => {
          if (video.videoCategoria === editingCategoria.categoriaNombre) {
            video.videoCategoria = data.categoriaNombre;
            fetch(`${API_URL}/videos/${video.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(video)
            });
          }
          return video;
        });

        setAlertType('success');
        setAlertMessage('Categoría editada ✔');
        setShowAlert(true);

        setVideos(updatedVideos);
        fetchData();
        forceUpdate();

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        data.categoriaColor = data.categoriaColor || '#ffffff';

        await fetch(`${API_URL}/categorias`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        setAlertType('success');
        setAlertMessage('Categoría creada ✔');
        setShowAlert(true);

        setTimeout(() => {
          window.location.reload();
        }, 3000);

        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 3000);
      }
      fetchData();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  };



  const editCategoria = (id) => {
    const categoria = categorias.find((c) => c.id === id);
    reset({
      categoriaNombre: categoria.categoriaNombre,
      categoriaDescripcion: categoria.categoriaDescripcion,
      categoriaColor: categoria.categoriaColor,
    });
    setEditingCategoria(categoria);

    setAlertType('indicacion');
    setAlertMessage('Edita la categoría seleccionada');
    setShowAlert(true);

    fetchData();
  };



  /* te lleva hasta el form despues de clickear en editar la categoria */
  const editHere = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const offset = 0.1 * windowHeight;

    window.scrollTo({
      top: scrollHeight - windowHeight - offset,
      behavior: 'smooth'
    });
  };




  return (
    <FormContainer>
      <Titulo style={{ marginBottom: '2em' }}>Categorías</Titulo>

      <SubTitulo>Categorías existentes</SubTitulo>
      <Table>
        <TableHead>
          <TableRow style={{ color: 'var(--blue-flix)' }}>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Color</TableCell>
            <TableCell style={{ textAlign: 'center', paddingLeft: '1em' }}>Editar</TableCell>
            <TableCell style={{ textAlign: 'center' }}>Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.categoriaNombre}</TableCell>
              <TableCell>{row.categoriaDescripcion}</TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: row.categoriaColor,
                  border: '1px solid #ccc',
                  display: 'inline-block'
                }}></div>
              </TableCell>
              <TableCell style={{ textAlign: 'center', paddingLeft: '1em' }}>
                <button onClick={() => { editCategoria(row.id); editHere(); }} style={{ marginLeft: 'auto' }}>
                  <i className="fa-solid fa-pen"></i>
                </button>
              </TableCell>
              <TableCell style={{ textAlign: 'center' }}>
                <button onClick={() => deleteCategoria(row.id)}><i className="fa-solid fa-xmark"></i></button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <SubTitulo style={{ marginTop: '5em' }}>Crear o editar una categoría</SubTitulo>
      <FormWrapper>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="categoriaNombre">Nombre</Label>
              <Controller
                name="categoriaNombre"
                control={control}
                defaultValue={editingCategoria ? editingCategoria.categoriaNombre : ''}
                rules={{ required: 'Nombre requerido' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Nombre de la categoría"
                  />
                )}
              />
              {errors.categoriaNombre && (
                <ErrorValidacion>{errors.categoriaNombre.message}</ErrorValidacion>
              )}
            </div>
            <div>
              <Label htmlFor="categoriaDescripcion">Descripción</Label>
              <Controller
                name="categoriaDescripcion"
                control={control}
                defaultValue={editingCategoria ? editingCategoria.categoriaDescripcion : ''}
                rules={{ required: 'Descripción requerida' }}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    rows={3}
                    placeholder="Descripción de la categoría"
                  />
                )}
              />
              {errors.categoriaDescripcion && (
                <ErrorValidacion>{errors.categoriaDescripcion.message}</ErrorValidacion>
              )}
            </div>

            <div style={{ marginBottom: '2em' }}>
              <Label htmlFor="categoriaColor">Color</Label>
              <Controller
                name="categoriaColor"
                control={control}
                defaultValue={editingCategoria ? editingCategoria.categoriaColor : '#ffffff'}
                render={({ field }) => (
                  <CircleContainer>
                    <ColorSelector2
                      {...field}
                      type="color"
                    />
                    <CircleShape color={field.value} />
                  </CircleContainer>
                )}
              />
            </div>

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
          </form>
        </FormProvider>
      </FormWrapper>
    </FormContainer>
  );
};

export default FormularioCategorias;