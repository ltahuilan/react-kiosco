import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../components/Sidebar';
import Resumen from '../components/Resumen';
import ProductoModal from '../components/ProductoModal';
import useKiosco from '../hooks/useKiosco';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		// backgroundColor: "#cbd5e1"
	},
}

Modal.setAppElement('#root');

export default function Layout() {

	const { modal, handleClickModal } = useKiosco();
	const { user, error } = useAuth({middleware: 'auth'});
	const navigate = useNavigate();

	// console.log(user);
	// console.log(error);

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
				<ProductoModal />

			</Modal>

			<ToastContainer />
		</>
	)

}
