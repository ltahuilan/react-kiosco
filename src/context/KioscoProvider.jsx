import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { categorias as categoriasDB} from '../data/categorias'; //desde un array 
import axiosClient from "../config/axios";

// Definir un nuevo context
const KioscoContext = createContext();

// Las funciones y variables registradas en KioscoProvider esta disponibles en toda la app
const KioscoProvider = ({ children }) => {
    
    //nota: 1, 2
    const [ categorias, setCategorias ] = useState([]); //inicia las categorias con un arreglo vacío
    const [ categoriaActual, setCategoriaActual ] = useState({});
    const [ modal, setModal ] = useState(false);
    const [ producto, setProducto ] = useState({}); //inicia con un obj vacío
    const [ pedido, setPedido ] = useState([]); //inicia con un arreglo vacio
    const [ total, setTotal ] = useState(0);

    //obtener las categorias desde un API utilizando axios
    const getCategorias = async () => {
        //axiosClient definido en assets/config/axios.js
        
        const token = localStorage.getItem('AUTH_TOKEN');

        try {
            const {data} = await axiosClient('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        getCategorias()
    }, []);


    const handleClickCategoria = id => {        
        // filtrar la categoria seleccionada
        const categoria = categorias.filter( categoria => categoria.id === id)[0]; //[0] accede al primer elemento para asignar el obj
 
        setCategoriaActual(categoria);//modificar categoriaActual
    }

    const handleClickModal = () => {
        setModal( !modal );
    }

    const handleProductoModal = producto => {
        setProducto(producto);
    }

    const handleAgregarAlPedido = ({categoria_id, ...producto}) => {
        //si existe modificar el producto, .map devuelve un array nuevo con el elemento modificado
        if(pedido.some(pedidoState => pedidoState.id === producto.id )) {
            const pedidoActualizado = pedido.map(pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Producto actualizado correctamente', {autoClose: 1500, theme: "dark"})
        }else {
            //si no existe agregar al pedido
            setPedido( [...pedido, producto ] )
            toast.success('Producto agregado correctamente', {autoClose: 1000, theme: "dark"})
        }
    }

    const handleEditarProducto = id => {
        if(pedido.some(pedidoState => pedidoState.id === id)) {
            const pedidoEditado = pedido.filter(producto => producto.id === id)[0]
            handleProductoModal(pedidoEditado);
            handleClickModal();
        }
    }

    const handleEliminarProducto = (id) => {
        if(pedido.some(pedidoState => pedidoState.id === id)) {
            const pedidoActualizado = pedido.filter(producto => producto.id !== id);
            setPedido(pedidoActualizado)
            toast.success('Producto eliminado correctamente', {autoClose: 1500, theme: "dark"})
        }
    }

    const handleFinalizarPedido = async (logout) => {

        //recuperar el token
        const token = localStorage.getItem('AUTH_TOKEN');

        try {
            //enviar datos hacia la API
            const {data} = await axiosClient.post('/api/pedidos', 
                {
                    productos: pedido.map(producto => {
                        return {
                            id: producto.id,
                            cantidad: producto.cantidad
                        }
                    }),
                    total
                },
                {
                    headers: {
                        Authorization : `Bearer ${token}`
                    }                    
                }
            );
            
            //mostrar notificacion, el mensaje es recuperado desde la respuesta retornada por la API
            toast.success(data.message, {autoClose: 1500, theme: 'dark'});
            
            //vaciar el pedido y reset al total
            setPedido([]);
            setTotal(0);
            
            //mostrar notificacion
            toast.warn('La sesión ha finalizado...', {autoClose: 3000, theme: 'dark'});
            
            setTimeout(() => {
                //eliminar el token y cerrar sesión
                localStorage.removeItem('AUTH_TOKEN');
                // logout();
            }, 3000);

        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }

    /**
     * COMPLETAR PEDIDO
     */
    const handleCompletarPedido = async (id) => {

        //recuperar el token
        const token = localStorage.getItem('AUTH_TOKEN');

        //enviar peticion de actualizar un registro, buscara el metodo update
        //utiliza el route model binding
        try {
            await axiosClient.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleProductoAgotado = async (id) => {
        const token = localStorage.getItem('AUTH_TOKEN');

        try {
            await axiosClient.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    const pedidoIsEmpty = () => {
        return pedido.length === 0;
    }

    useEffect( () => {
        if(pedido.length !== 0) {
            const totalAcumulado = pedido.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0 )
            setTotal(totalAcumulado)
        }
    }, [pedido])

    /**
     * Retorna el KioscoContext con las variables y funciones que requieran estar disponibles
     * en cualquier componente por medio de un hook, en este caso definido como useKiosco
     */
    return (
        <KioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleProductoModal,
                pedido,
                handleAgregarAlPedido,
                handleEditarProducto,
                handleEliminarProducto,
                total,
                pedidoIsEmpty,
                handleFinalizarPedido,
                handleCompletarPedido,
                handleProductoAgotado
            }}
        >{ children }</KioscoContext.Provider>
    );
};

//export nombrado
export {
    KioscoProvider
};

export default KioscoContext;




/**
 * Nota 1:
 * Toda la logica se declara antes del return, los datos que se requieran hacer disponibles
 * se pasa en el prop value de KioscoContext
 */

/**
 * Nota 2:
 * categorias => nombre del state
 * setCategorias => func para modificar el state
 * useState => contiene el valor inicial del state, en este caso las categorias
 */