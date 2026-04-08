import { useState, useEffect } from 'react';
import { type Muestra } from '../types/muestra';                // Importamos el archivo de datos

export const useMuestras = () => { 
    /*
    Estado inicial para intentar cargar desde localStorage o caso contrario inicia vacío
    */
  const [muestras, setMuestras] = useState<Muestra[]>(() => {
    const saved = localStorage.getItem('gpath_muestras');       // Buscamos la caja en el navegador
    return saved ? JSON.parse(saved) : [];                     // En caso de que exista la caja, la abrimos y leemos el contenido, si no, empezamos con una lista vacía
  });

   /*
    Cada vez que muestras cambie, actualizamos el almacenamiento local de igual forma
   */
  useEffect(() => {
    const dataString = JSON.stringify(muestras);                // Conversion de la lista en texto plano
    localStorage.setItem('gpath_muestras', dataString);        // Guardamos en el disco duro local (localStorage)
  }, [muestras]);                                             // Se dispara cuando la lista cambia


   
 //Seccion: Funciones para modificar y eliminar la lista de muestras
   
   /*
    1. Función para añadir una muestra nueva a la lista
   */
  const agregarMuestra = (nueva: Muestra) => {
    setMuestras([...muestras, nueva]);                          // Copiamos la lista anterior y pegamos la nueva
  };

   /*
    2. Función para eliminar una muestra mediante su ID único 
   */
 const eliminarMuestra = (id: string) => {
  setMuestras(muestras.filter(m => m.id !== id));              // Filtramos por id cada muestra, si el id no coincide con el que queremos eliminar, se queda en la lista, si coincide, se borra
};

   /*
    Devolvemos el estado de las muestras y las funciones
    para que puedan ser usadas en cualquier componente que importe este hook.
   */
  return {
    muestras,
    agregarMuestra,
    eliminarMuestra
  };
};