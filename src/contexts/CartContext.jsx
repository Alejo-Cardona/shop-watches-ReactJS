import { createContext, useState } from "react";

/* Toastify */
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css";

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

    // Eliminar del cart
    const removeItem = (itemId) => {
        const indexToRemove = itemsArr.findIndex((item) => item.id === itemId);
    
        if (indexToRemove !== -1) {
            const updatedItems = [...itemsArr.slice(0, indexToRemove), ...itemsArr.slice(indexToRemove + 1)];
            setItemsArr(updatedItems);
        
            // Mostrar Toastify al eliminar el producto del carrito
            Toastify({
                text: "Eliminaste el producto del carrito",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: {
                    background: "#b70f0a",
                },
            onClick: function () {
              // Callback después de hacer clic en el toast
            },
            }).showToast();
        }
    };


    // Longitud del Array
    const arrayL = itemsArr.length
    
    // Total del cart
    const sumarCart = () => {
        return itemsArr.reduce((total, element) => total + element.precio, 0);
    };

    

    return ( <CartContext.Provider value={{ addItem, clear, itemsArr, arrayL, sumarCart, removeItem }}>
        {children}
    </CartContext.Provider>
    ) 
}

export default CartState

// para utilizar el value deberia
// importar el useContext y el CartContext
// utilizandolo de esta manera:
// const vari = useContext(CartContext)