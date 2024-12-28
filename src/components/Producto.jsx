import React from 'react'
import useKiosco from '../hooks/useKiosco'
import { formatoDinero } from '../helpers';


export default function Productos({producto, botonAgotado = false, botonAgregar = false}) {

    const { handleClickModal, handleProductoModal, handleProductoAgotado } = useKiosco();
    const { imagen, nombre, precio } = producto;


    return (
        <div className='flex flex-col p-3 border border-slate-500'>
            <img
                src={`/img/${imagen}.jpg`}
                alt={`Imagen ${imagen}`}
            />
            <p className='flex-1 text-xl dark:text-slate-200 font-bold p-2'>{ nombre }</p>
            <p className='text-amber-500 text-4xl font-bold p-2'>{ formatoDinero(precio) }</p>

            {botonAgregar && (
                <button
                    type="button"
                    className="mt-6 bg-indigo-600 hover:bg-indigo-800 text-white font-bold uppercase p-3 transition-colors"
                    onClick={ () => {
                        handleClickModal(),
                        handleProductoModal(producto)
                    } }
                >
                    Agregar
                </button>
            )}

            {botonAgotado && (
                <>
                    <button
                        type="button"
                        className="mt-6 bg-pink-600 hover:bg-pink-800 text-white font-bold uppercase p-3 transition-colors"
                        onClick={ () => { handleProductoAgotado(producto.id) } }
                    >
                        Marcar como agotado
                    </button>
                    <button
                        type="button"
                        className="mt-6 bg-orange-400 hover:bg-orange-500 text-white font-bold uppercase p-3 transition-colors"
                        onClick={ () => {} }
                    >
                        Editar
                    </button>
                </>
            )}
        </div>

    )
}
