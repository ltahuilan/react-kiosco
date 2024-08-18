import React from 'react';
import useKiosco from '../hooks/useKiosco';

export default function Categoria( {categoria} ) {

    const { handleClickCategoria,  categoriaActual } = useKiosco();
    const {icono, id, nombre} = categoria;

    const categoriaSeleccionada = () => categoriaActual.id === id ? 'bg-amber-400 dark:bg-amber-500' : 'hola';

    return (
        <div className={`${ categoriaSeleccionada() } flex gap-6 p-3 border-b border-slate-400 hover:bg-amber-400 dark:hover:bg-amber-500 transition-colors truncate`}>
            <img
                src={ `/img/icono_${icono}.svg` }
                alt={ `Icono_${icono}` }
                className='w-10 h-10'
            />
            <button
                className='dark:text-slate-50 font-bold cursor-pointer'
                onClick={ () => handleClickCategoria(id) } //sintaxis de arrow function para que se ejecute hastaque ocurra el evento
            >
                { nombre }
            </button>
        </div> 
    )
}
