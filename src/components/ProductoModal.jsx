import React, { useEffect } from 'react'
import { createContext, useState } from 'react';
import useKiosco from '../hooks/useKiosco';
import { formatoDinero } from '../helpers';


export default function ProductoModal() {

    //cantidad se agrega al objeto de pedido al agregar el pedido

    const { producto, handleClickModal, pedido, handleAgregarAlPedido } = useKiosco();
    const [ cantidad, setCantidad ] = useState(1); //useState disponible solo en este archivo
    const [ modoEdicion, setModoEdicion ] = useState(false);

    const decrementarCantidad = (cantidad) => {
        if(cantidad <= 1) return;
        setCantidad(cantidad - 1);
    }

    const incrementarCantidad = (cantidad) => {
        if(cantidad >= 5) return;
        setCantidad(cantidad + 1);
    }

    useEffect(() => {

        if(pedido.some(pedidoState => pedidoState.id === producto.id)) {
            const productoEdicion = pedido.filter(pedidoState => pedidoState.id === producto.id)[0]
            setCantidad(productoEdicion.cantidad);
            setModoEdicion(true);
        }
    }, [pedido]) //cuando el pedido se actualice se vuelve a ejecutar el useEffect

    return (
        <div className='flex gap-10'>
            <div className='w-1/3 max-w-96'>
                <img src={`/img/${producto.imagen}.jpg`} alt={`Imagen de ${producto.nombre}`} className=''/>
            </div>

            <div className='w-2/3 flex flex-col justify-between'>

                <div className='flex justify-end'>
                    <button onClick={handleClickModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-600 font-extrabold rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>

                <h1 className=' font-bold text-3xl'>
                    {producto.nombre}
                </h1>

                <p className=' font-bold text-5xl text-amber-500'>
                    { formatoDinero(producto.precio) }
                </p>

                <div className='flex items-center '>
                    
                    {/* Botón para disminuir la cantidad */}
                    <button
                        onClick={() => decrementarCantidad(cantidad) }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                    <p className='text-3xl font-bold mx-4'>
                        {cantidad}
                    </p>

                    {/*Boton para incrementar la cantidad */}
                    <button
                        onClick={ () => incrementarCantidad(cantidad) }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>

                <button
                    className=' p-3 bg-indigo-600 hover:bg-indigo-800 text-white font-bold uppercase rounded'
                    onClick={() => {
                        handleAgregarAlPedido({...producto, cantidad})
                        handleClickModal()
                    }}
                >
                    {modoEdicion ? 'Guardar cambios' : 'Agregar al pedido'}
                </button>
            </div>

        </div>
    )
}
