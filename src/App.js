import React, { Component, Fragment } from 'react';

import './normalize.css';
import './skeleton.css';

import Formulario from './componentes/Formulario';
import {calcularTotal} from './helpers';
import Resultado from './componentes/Resultado';
import Mensaje from './componentes/Mensaje'
import Spinner from './componentes/Spinner';



class App extends Component {

    state = {
        total: '',
        cantidad: '',
        plazo: '',
        cargando: false
    }

    // Enviamos el fmormulario por PROPS (siempre de coponente padre a hijo)

    datosPrestamo = (cantidad, plazo) => {
        const total = calcularTotal(cantidad, plazo);

        // Colocar el resultado en el state junto a la cantidad y el plazo

       this.setState({
           cargando: true
       }, () => { // usamos un callback
            setTimeout(() => {
                this.setState ({
                    total,
                    cantidad,
                    plazo,
                    cargando: false
                })
            }, 3000);
       })
    }

    render() {
        const {total, cantidad, plazo, cargando} =this.state;

        // Cargar un componente CONDICIONALMENTE
        let componente;

        if (total === '' && !cargando) {
            componente = <Mensaje />
        } else if (cargando) {
            componente = <Spinner />
        } else {
            componente = <Resultado 
                            total={total}
                            cantidad={cantidad}
                            plazo={plazo}
                        />
        }
        return (
            <Fragment>
                <h1>Cotizador de Préstamos</h1>
                <div className="container">
                    <Formulario 
                        datosPrestamo={this.datosPrestamo} // lo que se usa es el de la izquierda del =
                    
                    />
                    <div className="mensajes">
                        {componente}
                    </div>
                </div>
                
            </Fragment>


        );
    }
}

export default App;