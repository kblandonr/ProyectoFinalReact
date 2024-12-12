import React, { useEffect,useState } from "react";
import './Afiche.css';
import Swal from 'sweetalert2';



function Cards(){

    const [eventos,setEventos] = useState([]);
    const [updatedData, setUpdatedData] = useState([]);

    const openImageModal = (URL) => {
        Swal.fire({
          title: 'Multimedia',
          html: `<img src="${URL}" width="500" height="600" frameborder="0" style="border-radius: 10px;"></img>`,
          showCloseButton: true,
          showConfirmButton: false,
          background: '#fff',
          width: '50%', // Ajusta el tamaño del modal
          padding: '10px',
          position: 'center',
          customClass: {
            popup: 'swal-popup'
          },
        });
      };
    

    useEffect(() =>{
        const fetchOptions = async () =>{
            const response = await fetch('https://buscadoreventos-e8cucqardnfbapfj.canadacentral-01.azurewebsites.net/api/EventoBuscadorEventos');
            const data = await response.json();
            setEventos(data);
        };
        fetchOptions();
    }, []);

    useEffect(() =>{
        const Venues = async () =>{
            const Data = await Promise.all(
                eventos.map(async (evento) =>{
                    const url = 'https://buscadoreventos-e8cucqardnfbapfj.canadacentral-01.azurewebsites.net/api/VenueBuscardorEventos/' + evento.idVenue
                    const response = await fetch(url);
                    const additionalData = await response.json();
                    return { ...evento, 
                             NombreVenue: additionalData.nombre,
                             TipoLugar: additionalData.tipoLugar
                             };
                })
            );
            setUpdatedData(Data);
        };
        if(eventos.length > 0){
            Venues();
        }
    }, [eventos]);

    console.log(updatedData);

    return <div id="container">
            <main class="grid-container">
                {updatedData.map(evento =>(
                     <div  key={evento.idEvento} class="event-card">
                     <img src={evento.multimedia} alt="Event 1"/>
                     <div class="card-info">
                         <h2>{evento.nombre}</h2>
                         <p>📅 {evento.fecha}</p>
                         <p>📍 {evento.NombreVenue}</p>
                         <p> Costo: ₡ {evento.precio}</p>
                     </div>
                     <button onClick={() => openImageModal(evento.multimedia)}>Ver Afiche</button>
                     
                 </div>
                ))}
               
            </main>
        </div>
}

export default Cards;