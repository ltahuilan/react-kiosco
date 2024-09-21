import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { categorias as categoriasDB} from '../data/categorias';

const KioscoContext = createContext();

const KioscoProvider = ({ children }) => {
    
    //nota: 1, 2
    const [ categorias ] = useState(categoriasDB);
    const [ categoriaActual, setCategoriaActual ] = useState(categorias[0]);
    const [ modal, setModal ] = useState(false);
    const [ producto, setProducto ] = useState({}); //inicia con un obj vacío
    const [ pedido, setPedido ] = useState([]); //inicia con un arreglo vacio
    const [ total, setTotal ] = useState(0);


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
            toast.success('Producto agregado correctamente', {autoClose: 1500, theme: "dark"})
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

    const pedidoIsEmpty = () => {
        return pedido.length === 0;
    }

    useEffect( () => {
        if(pedido.length !== 0) {
            const totalAcumulado = pedido.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0 )
            setTotal(totalAcumulado)
        }
    }, [pedido])

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
                pedidoIsEmpty
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