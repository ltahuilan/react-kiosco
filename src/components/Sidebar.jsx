import React from 'react';
import Categoria from './Categoria';
import useKiosco from '../hooks/useKiosco';
import { useAuth } from '../hooks/useAuth';


export default function Sidebar() {
	
	const { categorias } = useKiosco();
	const { logout, user} = useAuth( {middleware: 'auth'} );

	// console.log(user?.name)

return (
	<aside className='md:w-72 p-4'>
		<div>
			<img
				src="/img/logo.svg"
				alt=""
				className='w-40'
			/>
		</div>

		<p className='my-10 text-center text-xl dark:text-slate-200'>
			Hola: <span className='font-bold'>{user?.name}</span>
		</p>

		<div className='mt-10'>

			{categorias.map( categoria => (
				<Categoria
					/**
					 * props
					 * React espera un prop key unico, comunmente es el id
					 * pero puede ser cualquier otra propiedad cuyo valor sea unico
					 */
					key={categoria.id}
					categoria={categoria}
				/>
			) )}
		</div>

		<div className='p-4'>
			<button
				type='click'
				className='w-full mt-4 p-4 bg-red-500 hover:bg-red-700 text-white font-bold uppercase transition-colors truncate'
				onClick={logout}
			>
				Cancelar Orden
			</button>
			
		</div>

	</aside>
)
}
