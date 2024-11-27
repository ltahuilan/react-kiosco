import React from 'react'
import axiosClient from '../config/axios';
import useSWR from 'swr';

export default function Ordenes() {

    //recuperar el token
    const token = localStorage.getItem('AUTH_TOKEN');

    const fetcher = () => axiosClient('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const {data, error, isLoading} = useSWR('/api/pedidos', fetcher);

    // console.log(data?.data);
    // console.log(error);
    // console.log(isLoading);

  return (
    <>
        <h2 className='text-4xl font-bold dark:text-slate-200'>Ordenes</h2>
        <p className='text-xl dark:text-slate-200 my-3'>Gestiona tus ordenes</p>
    </>
  )
}
