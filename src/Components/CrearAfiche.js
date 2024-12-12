import React , {useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';


import './CrearEvento.css';
import Organizadores from "./CargarOrganizadores";
import Categorias from "./CargarCategorias";
import Estados from "./CargarEstados";
import Venues from './CargarVenues';

function CrearAfiche(){

    const { register, handleSubmit, formState: {errors} } = useForm();

    const [file, setFile] = useState("");
    const[evento,SetEvento]=useState({
        nombre:"",
        fecha:"",
        precio:"",
        idOrganizador:"",
        idCategoria:"",
        idEstado:"",
        capacidad:"",
        multimedia:"",
        idVenue:""
    });

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };

    
    const handleReset = () => {
        const formElements = document.querySelectorAll('input');
        formElements.forEach(element => {
          element.value = '';
        });
      };

      const handleResetSelects = () => {
        const selects = document.querySelectorAll('select');
        selects.forEach(select => {
          select.value = '';
        });
      };

    const handleInputChange = (e) =>{
        const{name,value} = e.target
        SetEvento({
            ...evento,
            [name]:value
        })
    };

    const handleFileUpload = async () => {
        if (!file) {
          alert('Por favor selecciona un archivo');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          // Aquí debes reemplazar 'URL_DEL_SERVIDOR' con la URL real de tu servidor
          const response = await axios.post('https://buscadoreventos-e8cucqardnfbapfj.canadacentral-01.azurewebsites.net/api/SubirArchivoBlob', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          // Verificar la respuesta del servidor
          if (response.status === 200) {
            evento.multimedia = response.data.toString();
          } else {
            alert('Error al subir el archivo');
          }
        } catch (error) {
          console.error('Error al subir el archivo:', error);
          alert('Hubo un error al intentar subir el archivo');
        }
      };

    const handleForm = async (e) => {
        
        try{

            await handleFileUpload();

            const response = await fetch('https://buscadoreventos-e8cucqardnfbapfj.canadacentral-01.azurewebsites.net/api/EventoBuscadorEventos',
                {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(evento)
                });
                if(!response.ok)
                {
                    throw new Error('Error en la petición');
                }
                else{
                    const result = await response.json();
                    alert("Enviado con exito");
                    console.log(result);
                    handleReset();
                    handleResetSelects();
                }
        }catch(error){
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <div>
        <div class="container mt-5">
        <div class="card">
            <div class="card-body">
            <h5 className="card-title">Creacion de Evento</h5>
                <form onSubmit={handleSubmit(handleForm)}>
                    {/*Nombre*/}
                    <div class="mb-3">
                        <label class="form-label">Nombre del evento</label>
                        <input type='text' class="form-control"  {...register("nombre",{ required: true })} name="nombre"  placeholder='Nombre' onChange={handleInputChange}></input>
                        {errors.nombre && <span className="error-message">El campo es requerido</span>}
                    </div>
                    {/*Fecha del evento*/}
                    <div class="mb-3">
                        <label class="form-label">Fecha del evento</label>
                        <input type='date' class="form-control" {...register("fecha",{ required: true })}   name="fecha" placeholder='Fecha del Evento' onChange={handleInputChange}></input>
                        {errors.fecha && <span className="error-message">El campo es requerido</span>}
                    </div>
                    {/*Precio*/}
                    <div class="mb-3">
                        <label class="form-label">Precio</label>
                        <input type='number' min="0" class="form-control" {...register("precio",{ required: true })} name="precio" placeholder='Precio' onChange={handleInputChange}></input>
                        {errors.precio && <span className="error-message">El campo es requerido</span>}
                    </div>
                      {/*Venue*/}
                      <div class="mb-3">
                        <label class="form-label">Venue</label>
                        <Venues regis={register} Change={handleInputChange}></Venues>
                        {errors.idVenue && <span className="error-message">Debe seleccionar un Venue</span>}
                    </div>
                    {/*Organizador*/}
                    <div class="mb-3">
                        <label class="form-label">Organizador</label>
                        <Organizadores regis={register} Change={handleInputChange}></Organizadores>
                        {errors.idOrganizador && <span className="error-message">Debe seleccionar un Organizador</span>}
                    </div>
                    {/*Categoria*/}
                    <div class="mb-3">
                        <label class="form-label">Categoria</label>
                        <Categorias regis={register} Change={handleInputChange}></Categorias>
                        {errors.idCategoria && <span className="error-message">Debe seleccionar una Categoria</span>}
                    </div>
                     {/*Estados*/}
                     <div class="mb-3">
                        <label class="form-label">Estado</label>
                        <Estados regis={register} Change={handleInputChange}></Estados>
                        {errors.idEstado && <span className="error-message">El campo es requerido</span>}
                    </div>
                    {/*Capacidad*/}
                    <div class="mb-3">
                        <label class="form-label">Capacidad</label>
                        <input type='number' class="form-control"  {...register("capacidad",{ required: true })} name="capacidad"  placeholder='capacidad' onChange={handleInputChange}></input>
                        {errors.capacidad && <span className="error-message">El campo es requerido</span>}
                    </div>
                    {/*Multimedia*/}
                    <div class="mb-3">
                        <label class="form-label">Multimedia del evento</label>
                        <input type='file' class="form-control"  {...register("multimedia",{ required: true })} name="multimedia"  placeholder='multimedia' onChange={handleFileChange}></input>
                        {errors.capacidad && <span className="error-message">El campo es requerido</span>}
                    </div>
                    <div class="mb-3">
                        <button type="submit" id="Enviar" class="btn btn-primary">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
        </div>
    </div>
    )
}

export default CrearAfiche;