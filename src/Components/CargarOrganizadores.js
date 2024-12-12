import React, { useEffect, useState } from "react";

function Organizadores({regis, Change}){
    const [organizadores, SetOrganizadores] = useState([]);

    useEffect(() =>{
        const fetchOptions = async () =>{
            const response = await fetch('https://buscadoreventos-e8cucqardnfbapfj.canadacentral-01.azurewebsites.net/api/OrganizadoresBuscadorEventos');
            const data = await response.json();
            SetOrganizadores(data);
        };
        fetchOptions();
    }, []);

    return (
        <select class="form-select" name="idOrganizador" {...regis("idOrganizador",{ required: true })} onChange={Change} >
            <option value="">Seleccione un organizador</option>
            {organizadores.map(organizador =>(
                <option key={organizador.idOrganizador} value={organizador.idOrganizador}>
                    {organizador.nombre}
                </option>
            ))}
        </select>
    );
}

export default Organizadores;