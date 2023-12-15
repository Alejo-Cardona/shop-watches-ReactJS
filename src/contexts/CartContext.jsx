import { createContext, useState } from "react";

// Creo el context, que me genera 2 componentes el Provider y el Consumer
export const CartContext = createContext()

// Creo  un componente para administrar toda la lógica

const CartState = ({ children }) => {
    const [itemsArr, setItemsArr] = useState([])

    // Funcion para vaciar el cart
    const clear = () => setItemsArr([])

    // Agregar al cart
    const addItem = (item) => setItemsArr((prev) => {
        return [...prev, item]; 
        //si usaramos un push no existiria una renderización de estado (solo mutaria) en realidad necesitamos crear metodos declarativos que creen una nueva referencia al objeto
    })

    // Longitud del Array
    const arrayL = itemsArr.length
    
    // Total del cart
    const sumarCart = () => {
        return itemsArr.reduce((total, element) => total + element.precio, 0);
    };

    console.log(itemsArr)

    return ( <CartContext.Provider value={{ addItem, clear, itemsArr, arrayL, sumarCart }}>
        {children}
    </CartContext.Provider>
    ) 
}

export default CartState

// para utilizar el value deberia
// importar el useContext y el CartContext
// utilizandolo de esta manera:
// const vari = useContext(CartContext)