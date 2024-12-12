import React, { useEffect, useState } from "react";

function CargaCategorias({regis, Change}){
    const [categorias, SetCategorias] = useState([]);

    useEffect(() =>{
        const fetchOptions = async () =>{
            const response = await fetch('https://buscadoreventos-e8cucqardnfbapfj.canadacentral-01.azurewebsites.net/api/CategoriaBuscadorEventos');
            const data = await response.json();
            SetCategorias(data);
        };
        fetchOptions();
    }, []);

    return (
        <select class="form-select" name="idCategoria" {...regis("idCategoria",{ required: true })} onChange={Change} >
            <option value="">Seleccione una categoria</option>
            {categorias.map(categoria =>(
                <option key={categoria.idCategoria} value={categoria.idCategoria}>
                    {categoria.nombre}
                </option>
            ))}
        </select>
    );
}

export default CargaCategorias;