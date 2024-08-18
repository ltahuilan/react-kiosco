import React from 'react'
import useKiosco from '../hooks/useKiosco'


export default function Productos({producto}) {

    const { handleClickModal, handleProductoModal } = useKiosco();
    const { imagen, nombre, precio } = producto;


    return (
        <>
            <div className='flex flex-col border border-slate-500'>
                <img
                    src={`/img/${imagen}.jpg`}
                    alt={`Imagen ${imagen}`}
                />
                <p className='flex-1 text-xl dark:text-slate-200 font-bold p-2'>{ nombre }</p>
                <p className='text-amber-500 text-4xl font-bold p-2'>{ `$${ precio }0` }</p>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3"
                    onClick={ () => {
                        handleClickModal(),
                        handleProductoModal(producto)
                    } }
                >
                    Agregar
                </button>
            </div>
        </>
    )
}
