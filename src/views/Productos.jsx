import React from 'react';
import useSWR from 'swr';
import axiosClient from '../config/axios';
import Spinner from '../components/Spinner';
import Producto from '../components/Producto';

export default function Productos() {
    //leer el token desde local storage
    const token = localStorage.getItem('AUTH_TOKEN');

    const fetcher = () => axiosClient('/api/productos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const { data, error, isLoading} = useSWR('/api/productos', fetcher, { refreshInterval: 5000 });

    console.log(data?.data);

    if(isLoading) {
        return (
            <Spinner message={'Esperando al servidor...'}>
            </Spinner>
        )
    }

    return (
        <>
            <h2 className="text-4xl font-bold dark:text-slate-200">Productos</h2>
            <p className="text-xl dark:text-slate-200 my-3">Administra tus productos</p>

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {data.data.data.map((producto) => (
                    <Producto
                        //props
                        key={producto.imagen}
                        producto={producto}
                        botonAgotado={true}
                    />
                ))}
            </div>
        </>
    );
}
