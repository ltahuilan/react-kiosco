import React from 'react'
import Producto from '../components/Producto'
import { productos as data} from '../data/productos'
import useKiosco from '../hooks/useKiosco'


export default function Inicio() {

	const { categoriaActual } = useKiosco();

	//filtrar productos basado en la categoria actual
	const productos = data.filter( producto => producto.categoria_id === categoriaActual.id);

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
}
