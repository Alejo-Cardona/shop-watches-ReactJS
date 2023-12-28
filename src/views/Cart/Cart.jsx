/* Custom */
import styles from './Cart.css'

/* Components */ 
import ItemContainer from "../../components/ItemContainer/ItemContainer"
import ItemProduct from "../../components/ItemProduct/ItemProduct"
import Checkout from '../../components/Checkout/Checkout'
import { Button } from 'react-bootstrap'

/* Contexts */ 
import { CartContext } from "../../contexts/CartContext"
import { useContext, useState, useEffect } from "react"



function Cart() {

    const { itemsArr, setItemsArr, arrayL, sumarCart, clear, removeItem, contarProductosRepetidos } = useContext(CartContext)

    const [checkCart, setCheckCart] = useState(false);

    const unidades = contarProductosRepetidos(itemsArr)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [ checkCart ])


    if(!arrayL) {
        return ( 
            <div className='d-flex justify-content-center fs-1 mt-5'>El carrito esta vacio</div>
        )
    }

    return (
        <>
            {
                checkCart && (
                    <Checkout item={itemsArr} unidades={unidades} check={checkCart}/>
            )}
            <section className="info-cart container rounded">
                <p className='fs-4'>Valor total del carrito: {'$' + sumarCart()}</p>
                <p className='fs-4'>Costo de envio: <span className="fw-normal fs-4 ms-2 text-success fw-bold">Envio Gratis!</span></p>
                <p className='fs-4'>Total de roductos: {arrayL}</p>
                <div className='mt-4'>
                    <Button variant="dark me-4" onClick={clear}> 
                        Vaciar Carrito
                    </Button>
                    <Button variant="danger" onClick={() => setCheckCart(true)}>
                        Realizar Compra
                    </Button>
                </div>
            </section>
            <ItemContainer>
                {itemsArr.map((element) => (
                    <>  
                        <div className='d-grid text-center row align-items-center'>
                            <ItemProduct
                                key={element.id}
                                imagenes={element.imagenes[0]}
                                nombre={element.nombre}
                                precio={element.precio}
                                movimiento={element.movimiento}
                                id={element.id}
                            /> 
                            <div>
                                <Button variant="dark" onClick={() => removeItem(element.id)} className='col-8'>
                                        Eliminar del carrito
                                </Button>
                            </div>
                        </div>
                    </>
                ))}
            </ItemContainer>
        </>
        );
    }

export default Cart