import { createContext, useState } from "react";
import { categorias as categoriasDB} from '../data/categorias';

const KioscoContext = createContext();

const KioscoProvider = ({ children }) => {
    
    //nota: 1, 2
    const [ categorias, setCategorias ] = useState(categoriasDB);
    const [ categoriaActual, setCategoriaActual ] = useState(categorias[0]);
    const [ modal, setModal ] = useState(false);
    const [ producto, setProducto ] = useState({});


    const handleClickCategoria = (id) => {        
        // filtrar la categoria seleccionada
        const categoria = categorias.filter( categoria => categoria.id === id)[0]; //[0] accede al primer elemento para asignar el obj
        
        //modificar categoriaActual
        setCategoriaActual(categoria);
    }

    const handleClickModal = () => {
        setModal( !modal );
    }

    const handleProductoModal = producto => {
        setProducto(producto);
    }


    return (
        <KioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleProductoModal
            }}
        >{ children }</KioscoContext.Provider>
    );
};

//export nombrado
export {
    KioscoProvider
};

//exprot default
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