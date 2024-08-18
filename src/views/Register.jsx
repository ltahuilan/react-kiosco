import React from 'react';
import { Link } from 'react-router-dom'

export default function Register() {
	return (
		<>
			<h2 className="text-center text-4xl text-slate-900 dark:text-slate-100 font-bold">
				Crea tu cuenta
			</h2>
			<p className="text-center text-2xl text-slate-900 dark:text-slate-300 mt-4">
				Ingresa tus datos para crear tu cuenta
			</p>

			<div className="bg-white dark:bg-slate-600 p-6 mt-4 rounded-lg shadow-lg">
				<form className='space-y-4'>
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
						/>
					</div>

					<input
						type="submit"
						value="Create Account"
						className="w-full p-3 mt-10 bg-indigo-600 hover:bg-indigo-800 border-none focus:outline-4 focus:outline-indigo-600 text-white font-bold rounded-lg"
						/>
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
