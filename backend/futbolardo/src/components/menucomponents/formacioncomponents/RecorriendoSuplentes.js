import React from 'react'

const RecorriendoSuplentes = () => {

    const suplentes = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14', 'S15', 'S16']
  
    return (
    <div className='bg-[#EAEAEA] col-start-1 flex flex-col items-center border-r-2 border-black rounded-l-md'>
        {suplentes.map(e => <span className='py-0.4'>{e}</span>)}
    </div>
  )
}

export default RecorriendoSuplentes