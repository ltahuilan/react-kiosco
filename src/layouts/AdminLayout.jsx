import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar"
import { useAuth } from "../hooks/useAuth";

export default function AdminLayout() {

    //establecer el middleware para este layout
    useAuth({middleware: 'admin'});

	setTimeout(() => {		
	}, 500);
	return (
		<div className="md:flex">
			<AdminSidebar />
			<main className="flex-1 h-screen overflow-y-scroll p-4 bg-slate-200 dark:bg-slate-800">
				<Outlet />
			</main>
		</div>
	);
}
