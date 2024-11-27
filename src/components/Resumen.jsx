import React from 'react';
import useKiosco from '../hooks/useKiosco';
import { useAuth } from '../hooks/useAuth';
import ResumenPedido from './ResumenPedido';
import { formatoDinero } from '../helpers';

export default function Resumen() {

	const { pedido, total, pedidoIsEmpty, handleFinalizarPedido } = useKiosco();
	const { logout } = useAuth({});

	const handleSubmit = (event) => {
		event.preventDefault();

		//en KioscoProvider
		handleFinalizarPedido(logout);
	}
return (
	<aside className='w-72 h-screen overflow-y-scroll p-5'>
		<h1 className='text-3xl text-center dark:text-slate-200 font-black'>
			Mi pedido
		</h1>

		<p className='text-lg font-bold dark:text-slate-200 text-center mt-6'>
			Resumen y totales de tu pedido
		</p>

		<div className='my-10'>
			{pedido.length === 0 ? (
				<p className='text-lg font-bold dark:text-slate-200 text-center'>
					No hay elementos en tu pedido</p>
			) : (

				pedido.map(producto => (
					<ResumenPedido
						key={producto.id}
						producto={producto} 
					/>
				))
			)}
		</div>

		<p className='text-2xl font-bold dark:text-slate-200'>
			Total: { formatoDinero(total) }
		</p>

		<form>
			<div className='mt-5'>
				<button
					type='submit'
					className={`${pedidoIsEmpty() ? 'bg-indigo-200 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} w-full text-white font-bold uppercase p-3 transition-colors`}
					disabled={pedidoIsEmpty()}
					onClick={handleSubmit}
				>
					Finalizar Pedido
				</button>
			</div>
		</form>
	</aside>
)
}	
