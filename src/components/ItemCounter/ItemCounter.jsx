import { useState, useContext, useEffect } from 'react'
import styles from './ItemCounter.css'

/* Components */
import Checkout from "../../components/Checkout/Checkout";
import { Button } from 'react-bootstrap'

/* Contexts */
import { CartContext }  from '../../contexts/CartContext';

/* Toastify */
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css";

const ItemCounter = ({item}) => {
    const [count, setCount] = useState(1)
    const [Check, setCheck] = useState(false);

    // Cart contexts
    const { addItem } = useContext(CartContext)

    useEffect(() => {
        window.scrollTo(0, 700)
    }, [ Check ])

    
    const handleClickCart = () => {
        addItem(item, count);
    
        // Configuración de Toastify
        Toastify({
            text: "Agregaste este producto al carrito",
            duration: 3000,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            style: {
            background: "#b70f0a",
            },
            onClick: function () {
                // Callback después de hacer clic en el toast
                
            },
            }).showToast();
        };

    const handleClickBuy = () => {
        setCheck(true)
    }

    return (
        <>
            <section className='d-flex justify-content-center mb-4'>
                <div className="col-12 col-md-6 text-center">
                    <Button variant="danger fs-4 col-2" onClick={() => setCount(count => count + 1)}>+</Button>
                    <label className="fs-1 m-4" >{count}</label>
                        {
                            count > 0 && (
                                <Button variant="danger fs-4 col-2" onClick={() => setCount(count => count - 1)}>-</Button>
                            )
                        }
                </div>
            </section>
            <section className='d-flex justify-content-center mb-5'>
                <button className='btn__comprar me-2' onClick={handleClickBuy}> 
                    <span>Comprar</span>
                </button>
                <button className='btn__comprar' onClick={handleClickCart}> 
                    <span>Agregar al Carrito</span>
                </button>
            </section>
            {
                Check && (
                    <Checkout item={item} unidades={count}/>
            )}
        </>
    )
}

export default ItemCounter