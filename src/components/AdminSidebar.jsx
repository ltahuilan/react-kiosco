import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function AdminSidebar() {

    const { logout } = useAuth({middleware: 'auth'});
    
return (
    <aside className='md:w-72 p-4'>
        <div>
            <img
                src="/img/logo.svg"
                alt="logo fresh coffee"
                className='w-40'
            />
        </div>

        <div className='flex flex-col space-y-4 my-10'>
            <Link to="/admin" className='dark:text-slate-200 text-xl font-bold'>Ordenes</Link>
            <Link to="/admin/productos" className='dark:text-slate-200 text-xl font-bold'>Productos</Link>
        </div>

        <div className='p-4'>
            <button
                type='click'
                className='w-full mt-4 p-4 bg-red-500 hover:bg-red-700 text-white font-bold uppercase transition-colors truncate'
                onClick={logout}
            >
                Cerrar Sesión
            </button>
            
        </div>

    </aside>
)
}
