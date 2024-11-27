import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axios";
import useSWR from 'swr';

export const useAuth = ({middleware, url='/'}) => {

    //recuperar el token desde local storage
    const token = localStorage.getItem('AUTH_TOKEN');

    const navigate = useNavigate();

    

    //=======================================================
    // const fetcher = async () => {
    //     const response = await axiosClient('/api/user', {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //         }
    //     });
    //     const user = response;
    //     console.log(`User desde asyn fetcher: ${response}`);
    // }
    // fetcher();

    //=======================================================




    //Revalidar el usuario autenticado con SWR - data: user renombra la variable data
    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axiosClient('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw Error(error.response.data.errors)
        }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    
    /**
     * ======== REGISTER ==========
     */
    const register = async (dataForm, setErrors, setSpinnerRegister) => {
        try {
			const {data} = await axiosClient.post('api/register', dataForm)
            localStorage.setItem('AUTH_TOKEN', data.token);
			setErrors([]); //reset a los errores
            setSpinnerRegister(true);
            await mutate();
		} catch (error) {
			setErrors( Object.values(error?.response?.data?.errors) )
		}
    }
    
    /**
    * ======== LOGIN ==========
    */
    const login = async (dataForm, setErrors, setSpinnerLogin) => {
        try {
			const {data} = await axiosClient.post('api/login', dataForm);
			localStorage.setItem('AUTH_TOKEN', data.token);
			setErrors([]);
            setSpinnerLogin(true);
            await mutate();
		} catch (error) {
            //pasar los errores al state
			setErrors( Object.values(error?.response?.data?.errors) )
		}
    }

    /**
    * ======== LOGOUT ==========
    */
    const logout = async () => {
        // console.log('click en cancelar ')
        try {
            await axiosClient.post('/api/logout', null, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            });
            
            localStorage.removeItem('AUTH_TOKEN');
            await mutate(undefined);

        } catch (error) {
            throw Error(error.response.data.error)
        }
    }

    //escuchar los cambios ocurridos en las variables user y error
    useEffect(() => {

        if(middleware === 'guest' && user && !user.admin) {
            navigate('/');
        }

        if(middleware === 'guest' && user && user.admin) {
            navigate('/admin');
        }

        if(middleware === 'admin' && user && !user?.admin ) {
            navigate('/');
        }

        if(middleware === 'auth' && error ) {
            navigate('/auth/login');
        }
    }, [user, error]);

    // console.log(error);
    // console.log(user);
    // console.log(url);
    // console.log(middleware)

    return {
        register, 
        login,
        logout,
        user,
        error,
    }
}
