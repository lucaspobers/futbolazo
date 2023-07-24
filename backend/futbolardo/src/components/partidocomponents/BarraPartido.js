import React from 'react'
import Pelota from '../../img/pelota.png'
import { useState} from 'react'

var _ = require('underscore');

const BarraPartido = (props) => {
    const [cambios, setCambios] = useState('pre_animacion_partido')

    if (props.ejecutarCodigo) {
        setTimeout(()=> {
            setCambios('animacion_partido')
        }, "500")
    }

    if (props.ejecutarCodigo) {
        return (
            <div className='grid grid-cols-[90%_10%] py-2 items-center relative mb-8 w-[80vh] border-2 border-black bg-components-menu bg-[#F4F4F4]'>
                <div className='border border-black ml-2 bg-black'></div>
                <span className='text-center m-0 p-0'>90'</span>
                <img className={cambios} src={Pelota} />
            </div>
        )
    }
  };
    

export default BarraPartido