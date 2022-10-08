import React from 'react'
import MenuBotones from './menucomponents/MenuBotones'
import SiguientePartido from './menucomponents/SiguientePartido'
import InformacionPartida from './menucomponents/InformacionPartida'
import TablaPosiciones from './menucomponents/TablaPosiciones'
import TablaGoleadores from './menucomponents/TablaGoleadores'
import FormacionMenu from './menucomponents/formacioncomponents/FormacionMenu'




const Menu = () => {


  return (
    <div className='big-container'>
      <SiguientePartido/>
      <InformacionPartida/>
      <MenuBotones/>
      <FormacionMenu/>
      <TablaPosiciones/>
      <TablaGoleadores/>
    </div>
    
  )
}

export default Menu