import React from 'react';
import Categoria from './Categoria';
import useKiosco from '../hooks/useKiosco';


export default function Sidebar() {
	
	const { categorias } = useKiosco();

return (
	<aside className='md:w-72 p-4'>
		<div>
			<img
				src="/img/logo.svg"
				alt=""
				className='w-40'
			/>
		</div>

		<div className='mt-10'>
			{/* {categorias.map(categoria => {
				return (<p>Hola</p>)
			})} */}

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
					className='w-full mt-4 p-4 bg-red-500 hover:bg-red-700 text-white font-bold transition-colors truncate'
				>
					Cancelar Orden
				</button>

			</div>

	</aside>
)
}
