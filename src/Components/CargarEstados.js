import React, { useEffect, useState } from "react";

function CargarEstados({regis, Change}){
    const [estados, SetEstados] = useState([]);

    useEffect(() =>{
        const fetchOptions = async () =>{
            const response = await fetch('https://buscadoreventos-e8cucqardnfbapfj.canadacentral-01.azurewebsites.net/api/EstadoEventoBuscadorEventos');
            const data = await response.json();
            SetEstados(data);
        };
        fetchOptions();
    }, []);

    return (
        <select class="form-select" name="idEstado" {...regis("idEstado",{ required: true })} onChange={Change} >
            <option value="">Seleccione un Estado</option>
            {estados.map(estado =>(
                <option key={estado.idEstado} value={estado.idEstado}>
                    {estado.descripcion}
                </option>
            ))}
        </select>
    );
}

export default CargarEstados;