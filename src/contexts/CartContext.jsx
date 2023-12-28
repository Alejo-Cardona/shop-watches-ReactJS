import { createContext, useState, useEffect } from "react";

/* Toastify */
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css";

// Creo el context, que me genera 2 componentes el Provider y el Consumer
export const CartContext = createContext()

// Creo  un componente para administrar toda la lógica

const CartState = ({ children }) => {
    // Productos repetidos
    const [itemsArr, setItemsArr] = useState([])

    // Longitud del Array repetidos
    const arrayL = itemsArr.length

    // Productos sin repetir
    const [ itemsCart, setItemsCart ] = useState([])

    // Longitud del Array sin repetir
    const arraySN = itemsCart.length

    // Funcion para contar los productos que se repiten
    const contarProductosRepetidos = (items) => {
        const conteo = {};
    
        items.forEach((item) => {
            // Si el objeto ya existe en el conteo, incrementa su valor, si no, inicialízalo a 1
            if (conteo[item.id]) {
                conteo[item.id] += 1;
            } else {
                conteo[item.id] = 1;
            }
        });
    
        return conteo;
    };

    useEffect(() => {
        const uniqueProductIds = new Set();
    
        const uniqueItems = itemsArr.filter(item => {
            if (uniqueProductIds.has(item.id)) {
                // Si ya se ha añadido un producto con este id, no añadirlo de nuevo
                return false;
            } else {
                // Añadir el id a la lista de ids únicos y permitir la inclusión del producto
                uniqueProductIds.add(item.id);
                return true;
            }
        });
    
        setItemsCart(uniqueItems);
    }, [itemsArr, setItemsArr]);

    // Funcion para vaciar el cart
    const clear = () => setItemsArr([])

    // Agregar al cart
    const addItem = (item, cantidad) => {
        setItemsArr((prevItems) => {
            // Crear un arreglo con "cantidad" número de instancias del item
            const nuevosItems = Array(cantidad).fill().map(() => ({ ...item }));
    
            // Concatenar los nuevos items al arreglo existente
            return [...prevItems, ...nuevosItems];
        });
    };


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

    
    // Total del cart
    const sumarCart = () => {
        return itemsArr.reduce((total, element) => total + element.precio, 0);
    };

    

    return ( <CartContext.Provider value={{ addItem, clear, itemsArr, arrayL, sumarCart, removeItem, arraySN, itemsCart, contarProductosRepetidos }}>
        {children}
    </CartContext.Provider>
    ) 
}

export default CartState

// para utilizar el value deberia
// importar el useContext y el CartContext
// utilizandolo de esta manera:
// const vari = useContext(CartContext)