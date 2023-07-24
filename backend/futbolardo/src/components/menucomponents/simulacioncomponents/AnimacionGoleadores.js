import React, { useState, useEffect } from 'react';

const List = ({ dictionary }) => {
  const [names, setNames] = useState([]);
  const [showCount, setShowCount] = useState(0);

  useEffect(() => {
    // Generamos un array de componentes Name a partir del diccionario
    const nameComponents = Object.keys(dictionary).map((key) => (
      <Name key={key} name={dictionary[key]} />
    ));
    setNames(nameComponents);
    setShowCount(0);

    const randomWaitTime = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000)

    // Configuramos un temporizador para actualizar el contador cada 1000ms
    const timer = setInterval(() => {
      setShowCount((count) => count + 1);
    }, randomWaitTime);

    // Limpiamos el temporizador cuando el componente se desmonta
    return () => clearInterval(timer);
  }, [dictionary]);

  return <div>{names.slice(0, showCount)}</div>;
};

const Name = ({ name }) => {
  return <div className="py-1">{name}</div>;
};

export default List;


/*
  const randomWaitTime = Math.floor(Math.random() * (5000 - 1000 + 1) + 1000); // Genera un número aleatorio entre 1 y 5 segundos

  Debe estar funcionando pero usa siempre el mismo tiempo de espera, no se actualiza

*/

