import { useContext } from 'react'
import KioscoContext from '../context/KioscoProvider'

/**
 * Con el hook useKiosco es posible acceder a los props dsiponibles en
 * KioscoContext desde cualquier lugar de la app
 */

const useKiosco = () => {
    return useContext(KioscoContext);
}

export default useKiosco;