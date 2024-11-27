import React from 'react';
import { createRef, useState} from 'react';
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import ErroresFormulario from '../components/ErroresFormulario';
import Spinner from '../components/Spinner';

export default function Register() {

	//createRef() permite crear un objeto de referencia a un elemento del DOM, en este caso un input
	const nameRef = createRef();
	const emailRef = createRef();
	const passwordRef = createRef();
	const passwordConfirmationRef = createRef();

	//state para manejar los errores
	const [errors, setErrors] = useState([]);
	const [spinnerRegister, setSpinnerRegister] = useState(false);

	//hook
	const {register} = useAuth({
		middleware: 'guest',
		url: '/'
	});

	const handleSubmit = async event => {
		
		event.preventDefault();

		//se accede al value de un input utilizando current.value
		const dataForm = {
			name: nameRef.current.value,
			email: emailRef.current.value,
			password: passwordRef.current.value,
			password_confirmation: passwordConfirmationRef.current.value
		}

		register(dataForm, setErrors, setSpinnerRegister);
	}

	return (
		<>
			<h2 className="text-center text-4xl text-slate-900 dark:text-slate-100 font-bold">
				Crea tu cuenta
			</h2>
			<p className="text-center text-2xl text-slate-900 dark:text-slate-300 mt-4">
				Ingresa tus datos para crear tu cuenta
			</p>


			<div className="bg-white dark:bg-slate-600 p-6 mt-4 rounded-lg shadow-lg">
				
				{ errors ? errors.map((error, i) => <ErroresFormulario key={i}>{error}</ErroresFormulario>) : null }

				<form
					className='space-y-4'
					onSubmit={handleSubmit}
					noValidate
				>
					<div>
						<label
							htmlFor="name"
							className="w-full text-lg font-bold dark:text-slate-200"
						>Name</label>
						<input
							type="text"
							name="name"
							className="w-full mt-2 p-3 bg-slate-100 focus:outline-4 focus:outline-indigo-300 rounded-lg"
							placeholder="Your name"
							ref={nameRef}
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="w-full text-lg font-bold dark:text-slate-200"
						>Email</label>
						<input
							type="email"
							name="email"
							className="w-full mt-2 p-3 bg-slate-100 focus:outline-4 focus:outline-indigo-300 rounded-lg"
							placeholder="Your email"
							ref={emailRef}
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="w-full text-lg font-bold dark:text-slate-200"
						>Password</label>
						<input
							type="password"
							name="password"
							className="w-full mt-2 p-3 bg-slate-100 focus:outline-4 focus:outline-indigo-300 rounded-lg"
							placeholder="Your password"
							ref={passwordRef}
						/>
					</div>

					<div>
						<label
							htmlFor="password_confirmation"
							className="w-full text-lg font-bold dark:text-slate-200"
						>Confirmar Password</label>
						<input
							type="password"
							name="password_confirmation"
							className="w-full mt-2 p-3 bg-slate-100 focus:outline-4 focus:outline-indigo-300 rounded-lg"
							placeholder="Confirm password"
							ref={passwordConfirmationRef}
						/>
					</div>

					<input
						type="submit"
						value="Create Account"
						className="w-full p-3 bg-indigo-600 hover:bg-indigo-800 border-none focus:outline-4 focus:outline-indigo-600 text-white font-bold rounded-lg"
						/>
					
				{spinnerRegister ? <Spinner message={'Creando cuenta...'}/> : ''}
				</form>
			</div>

			<nav className='mt-6'>
				<Link to="/auth/login" className='text-slate-600 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium'>
					¿Ya tienes cuenta? Inicio sesión
				</Link>
			</nav>
		</>
	);
}
