import React from 'react';
import { Outlet } from 'react-router-dom';
import Modal from 'react-modal';
import Sidebar from '../components/Sidebar';
import Resumen from '../components/Resumen';
import useKiosco from '../hooks/useKiosco';
import ProductoModal from '../components/ProductoModal';

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
}

Modal.setAppElement('#root');

export default function Layout() {

	const { modal, handleClickModal } = useKiosco();


	return (
		<>
			<div className='md:flex'>
				<Sidebar />
				<main className='flex-1 h-screen overflow-y-scroll p-4 bg-slate-200 dark:bg-slate-800'>
					<Outlet />
				</main>
				<Resumen />
			</div>

			<Modal
				isOpen={modal}
				style={customStyles}
			>
				<ProductoModal>

				</ProductoModal>
			</Modal>
		</>
	)
}
