import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
	return (
		<main className='max-w-4xl mx-auto md:flex md:justify-evenly gap-8 my-10'>
			<img
				src="/img/logo.svg" // la '/' apunta a public..,
				alt="img_logo"
				className='max-w-xs'
			/>

			<div className='flex-1'>
				<Outlet />
			</div>
		</main>
	)
}
