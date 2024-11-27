import React from 'react'
// import { productos as data} from '../data/productos'
import useSWR from 'swr';
import Producto from '../components/Producto'
import useKiosco from '../hooks/useKiosco'
import axiosClient from '../config/axios';
import Spinner from '../components/Spinner';


export default function Inicio() {

	const { categoriaActual } = useKiosco();

	//consulta SWR
	// const fetcher = (...args) => fetch(...args).then(res => res.json()) // https://swr.vercel.app/es-ES/docs/getting-started
	
	try {
		
		const fetcher = () => axiosClient('/api/productos')
			.then(response => response.data)
			.catch(error => console.log(error))
	
		const { data, error, isLoading } = useSWR("/api/productos", fetcher, {
			refreshInterval: 5000 //refrescar la consulta
		})

		if(isLoading) {
			return (
				<Spinner
					message={'Cargando productos...'}
				/>
			)
		}

		// {isLoading ? <Spinner/> : null}

		//filtrar productos basado en la categoria actual
		const productos = data.data.filter( producto => producto.categoria_id === categoriaActual.id);
		return (
			<>
				<h2 className='text-4xl font-bold dark:text-slate-200'>{ categoriaActual.nombre }</h2>
				<p className='text-xl dark:text-slate-200 my-3'>Elige y personaliza tu pedido</p>
				<div className='grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
					{productos.map( producto => (
						<Producto
							//props
							key={producto.imagen}
							producto={producto}
						/>
					))}
				</div>
			</>
		)
		
	} catch (error) {
		console.log(error)
		return (
			<>
				<h2 className='text-2xl font-bold dark:text-slate-200'>Error en la respuesta desde el servidor... intenta más tarde</h2>
			</>
		)
	}	
}
