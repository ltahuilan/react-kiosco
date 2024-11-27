import React from 'react';
import { createRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ErroresFormulario from '../components/ErroresFormulario';
import Spinner from '../components/Spinner';


export default function Login() {

	const emailRef = createRef();
	const passwordRef = createRef();

	//states
	const [errors, setErrors] = useState([]);
	const [spinnerLogin, setSpinnerLogin] = useState(false);

	//hooks 
	const { login } = useAuth({
		middleware: 'guest',
		url: '/'
	});

	const handleSubmit = async event => {
		event.preventDefault();

		//crear un objeto con los datos obtenidos del formulario
		const dataForm = {
			email: emailRef.current.value,
			password: passwordRef.current.value
		}

		login(dataForm, setErrors, setSpinnerLogin);
	}


	return (
		<>
			<h2 className="text-center text-4xl text-slate-900 dark:text-slate-100 font-bold">
				Login
			</h2>
			<p className="text-center text-2xl text-slate-900 dark:text-slate-300 mt-4">
				Inicia sesión para comprar
			</p>

			<div className="bg-white dark:bg-slate-600 p-6 mt-4 rounded-lg shadow-lg">

				{/* mostrar errores */}
				{errors ? errors.map((error, i) => <ErroresFormulario key={i}>{error}</ErroresFormulario>) : null}

				<form
					className='space-y-4'
					onSubmit={handleSubmit}
					noValidate
				>

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

					<input
						type="submit"
						value="Login"
						className="w-full p-3 mt-10 bg-indigo-600 hover:bg-indigo-800 border-none focus:outline-4 focus:outline-indigo-600 text-white font-bold rounded-lg"
						/>

					{spinnerLogin ? <Spinner message={'Autenticando...'}/> : null }

				</form>
			</div>

			<nav className='mt-6'>
				<Link to="/auth/register" className='text-slate-600 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium'>
					¿No tienes cuenta? Registrate
				</Link>
			</nav>

		</>
	)
}
