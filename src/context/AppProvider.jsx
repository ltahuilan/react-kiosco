/**
 * Estructura del archivo que contiene el context
 */

import { createContext } from "react"

const AppContext = createContext()

const AppProvider = ( {children} ) => {

    const saludo = 'Hola Mundo con React';

    return (
        <AppContext.Provider
            value={{
                saludo
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export {
    AppProvider
}

export default AppContext

