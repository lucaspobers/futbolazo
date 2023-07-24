import React from 'react'
import MenuBotones from './menucomponents/MenuBotones'
import SiguientePartido from './menucomponents/SiguientePartido'
import TablaPosiciones from './menucomponents/TablaPosiciones'
import TablaGoleadores from './menucomponents/TablaGoleadores'
import FormacionMenu from './menucomponents/formacioncomponents/FormacionMenu'


const Menu = () => {

  return (
    <div className='grid grid-cols-[20%_40%_40%] h-screen overflow-hidden ' >
      <SiguientePartido/>
      <MenuBotones/>
      <FormacionMenu/>
      <TablaPosiciones/>
      <TablaGoleadores/>
    </div>
    
  )
}
window.localStorage.clear()

export default Menu

/*
  GRID ROWS - Tengo que resolver para que se adapte correctamente al tamaño de la pantalla

 */
