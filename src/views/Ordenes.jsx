import React from 'react'
import useKiosco from '../hooks/useKiosco';
import axiosClient from '../config/axios';
import useSWR from 'swr';
import { formatoDinero } from '../helpers';
import Spinner from '../components/Spinner';

export default function Ordenes() {

    const {handleCompletarPedido} = useKiosco();

    //obtener el token
    const token = localStorage.getItem('AUTH_TOKEN');

    const fetcher = () => axiosClient('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const {data, error, isLoading} = useSWR('/api/pedidos', fetcher, {
        refreshInterval: 1000
    } );

    // console.log(data?.data.data);
    // console.log(error);
    // console.log(isLoading);

    if(isLoading) {
        // return(<p className='text-center text-xl dark:text-slate-200 my-3'>Cargando datos...</p>);
        return (
            <Spinner message="Esperando al servidor...">
            </Spinner>
        )
    }

return (
    <>
        <h2 className="text-4xl font-bold dark:text-slate-200">Ordenes</h2>
        <p className="text-xl dark:text-slate-200 my-6">Gestiona tus ordenes</p>

        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {data.data.data.map((pedido) => (
                <div key={pedido.id} className="flex flex-col dark:bg-slate-700 space-y-3 p-5 rounded">
                
                    <p className="text-lg font-bold dark:text-slate-200">
                    Contenido del pedido: {pedido.id}
                    </p>

                    {pedido.producto.map((producto) => (
                        <div key={producto.id} className="dark:text-slate-200 border-b dark:border-slate-400 last-of-type:border-none p-4">
                            <p className="text-sm">Producto ID: {producto.id}</p>
                            <p className="text-sm">{producto.nombre}</p>
                            <p className="text-sm">
                            Cantidad:{" "}
                            <span className="text-lg font-bold">
                                {producto.pivot.cantidad}
                            </span>
                            </p>
                        </div>
                    ))}

                    <p className="text-lg font-bold dark:text-slate-200">Ordenante: {pedido.user.name}</p>
                    <p className='flex-1 text-2xl text-amber-500'>
                        Total a pagar: <span className='text-slate-300 font-bold'>{formatoDinero( pedido.total)}</span>
                    </p>

                    <button
                        type="submit"
                        className='bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-bold uppercase p-5 rounded'
                        onClick={() => handleCompletarPedido(pedido.id)}
                    >
                        Completar
                    </button>
                </div>
            ))}
        </div>
    </>
);
}
