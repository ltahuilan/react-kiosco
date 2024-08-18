import React from 'react'
import useKiosco from '../hooks/useKiosco';


export default function ProductoModal() {

    const { producto, handleClickModal } = useKiosco();

    return (
        <div className='flex gap-3'>
            <div className='w-1/3'>
                <img src={`/public/img/${producto.imagen}.jpg`} alt={`Imagen de ${producto.nombre}`} />
            </div>

            <div className='w-2/3'>

                <div className='flex justify-end'>
                    <button onClick={handleClickModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 font-extrabold rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>

                <h1 className='mt-5 font-bold text-2xl'>
                    {producto.nombre}
                </h1>
                <p className='mt-5 font-bold text-5xl text-amber-500'>
                    {`$${producto.precio}0`}
                </p>
                <button
                    className='mt-5 p-3 bg-indigo-600 hover:bg-indigo-800 text-white font-bold rounded'
                >
                    Agregar al pedido    
                </button>
            </div>

        </div>
    )
}
