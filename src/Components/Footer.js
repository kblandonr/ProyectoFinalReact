import React from "react";
import Logo from '../Logos/Logo.png';
import '../Components/Footer.css';

function footer(){
   return  <div id="ContainerFooter">
                <footer class="bg-body-tertiary text-center">
                    <img src={Logo} alt="Logo"></img>
                    <div class="text-center p-3">
                    BuscadorEventos 2024 Copyright ©
                    </div>
                </footer>
            </div>
}

export default footer;

