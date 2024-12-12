import React, { useEffect, useState } from "react";

function CargarVenues({regis, Change}){
    const [venues, SetVenues] = useState([]);

    useEffect(() =>{
        const fetchOptions = async () =>{
            const response = await fetch('https://buscadoreventos-e8cucqardnfbapfj.canadacentral-01.azurewebsites.net/api/VenueBuscardorEventos');
            const data = await response.json();
            SetVenues(data);
        };
        fetchOptions();
    }, []);

    return (
        <select class="form-select" name="idVenue" {...regis("idVenue",{ required: true })} onChange={Change} >
            <option value="">Seleccione un Venue</option>
            {venues.map(venue =>(
                <option key={venue.idVenue} value={venue.idVenue}>
                    {venue.nombre}
                </option>
            ))}
        </select>
    );
}

export default CargarVenues;