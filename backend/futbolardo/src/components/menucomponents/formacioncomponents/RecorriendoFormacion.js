import React from 'react';
import Plantel from './Plantel';
import { useSelector } from 'react-redux';
import _ from 'underscore';

const RecorriendoFormacion = (props) => {
    
    const formacionActual = useSelector((state) => state.fecha.dibujo_formacion);
    const jugadores = props.jugadores;

    // Pasamos la formacion a string y separamos cada numero
    const formacionString = formacionActual.toString();
    let DibujoTactico = formacionString.split('').map(Number);

    let formacion = ['Arquero']
    
    // Dependiendo el dibujo tactico elegido ponemos las posiciones que correspondan
    DibujoTactico.map((e, index) => {  
        switch (index) {
            case 0:
                for (let i = 0; i < e; i++) {
                    formacion.push('Defensor')}
                break;
            case 1:
                for (let i = 0; i < e; i++) {
                    formacion.push('Mediocampista')}
                break;
            case 2:
                for (let i = 0; i < e; i++) {
                    formacion.push('Delantero')}
        }
    })


    let jugadoresConMarca = [];

    // Le pongo una marca a los TITULARES que están fuera de posición
    if (jugadores.length === 11) {
        jugadoresConMarca = props.jugadores.map((e, index) => {
            const jugadorPosicion = e.posicion;
            const posicionEnFormacion = formacion[index];
            const fueraDePosicion = jugadorPosicion !== posicionEnFormacion;
            return {
                ...e,
                fueraDePosicion: fueraDePosicion,
            };
        });
    } else {
        jugadoresConMarca = jugadores;
    }

    return (
        <div className='col-start-2 flex flex-col'>
            {jugadoresConMarca?.map((e, index) => (
                <Plantel
                    e={e}
                    key={e.id}
                    id={e.id}
                    nombre={e.nombre}
                    apellido={e.apellido}
                    pais={e.pais}
                    valoracion={e.valoracion}
                    posicion={e.posicion}
                    index={index}
                    fueraDePosicion={e.fueraDePosicion}
                />
            ))}
        </div>
    );
};

export default RecorriendoFormacion;


// A RecorriendoFOrmacion le tiene que llegar como props desde Formacion el json y pasarselo a plantel

// Como prop, al principio la formacion me llega bien y despues undefined, supongo que si lo uso
// desde el state deberia funcionar bien

