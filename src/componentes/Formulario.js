/* Orden de las cosas
1) todo lo que sea REACT
2) luego los métodos
3) y porúltimo el render
*/

import React, { Component } from 'react';

class Formulario extends Component {
    state = {
        cantidad: '',
        plazo: ''
    }

    calcularPrestamo = (e) => {
        e.preventDefault();

        // Aplicar destructuring
        const {cantidad, plazo} = this.state;

        // Pasarlo al componente padre

        this.props.datosPrestamo(cantidad, plazo);
    }

    actualizarState = (e) => {

        // Leer los datos del formulario
        //console.log(e.target.value);

        const {name, value} = e.target; //Uso destructuring para que tome cada campo 

        //Para actualizar el state, se utiliza setState()
        this.setState({
            [name]: Number(value)
        })
        
    }

    habilitarSubmit = () => {
        // Aplicarun destructuring
        const {cantidad, plazo} = this.state;

        // Leer las variables
        const noValido = !cantidad || !plazo;
        //console.log(noValido);
        
        // Retornar la respuesta
        return noValido;
    }


    render() {
        return ( 
        <form onSubmit={this.calcularPrestamo}>
            <div>
                <label>Cantidad Préstamo:</label>
                <input 
                    onChange = {this.actualizarState} // lo que esté entre llaves dentro del return es código JS
                    type="number" 
                    name="cantidad" 
                    className="u-full-width"  
                    placeholder="Ejmplo: 3000" />
            </div>
            <div>
                <label>PLazo para pagar:</label>
                <select onChange = {this.actualizarState} name="plazo" className="u-full-width">
                    <option value="">Seleccionar</option>
                    <option value="3">3 meses</option>
                    <option value="6">6 meses</option>
                    <option value="12">12 meses</option>
                    <option value="24">24 meses</option>
                </select>
            </div>
            <div>
                <input 
                    disabled={this.habilitarSubmit()}
                    type="submit" 
                    value="Calcular" 
                    className="u-full-width button-primary" />
            </div>
        </form>);
        }
    }

    export default Formulario;