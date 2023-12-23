/* Custom */
import styles from './Cart.css'

/* Components */ 
import ItemContainer from "../../components/ItemContainer/ItemContainer"
import ItemProduct from "../../components/ItemProduct/ItemProduct"
import { Button } from 'react-bootstrap'

/* Contexts */ 
import { CartContext } from "../../contexts/CartContext"
import { useContext } from "react"



function Cart() {

    const { itemsArr, setItemsArr, arrayL, sumarCart, clear, removeItem } = useContext(CartContext)

    const costoEnvio = 3200

    if(!arrayL) {
        return ( 
            <div className='d-flex justify-content-center fs-1 mt-5'>El carrito esta vacio</div>
        )
    }


    return (
        <>
            <section className="info-cart container rounded">
                <p className='fs-4'>Valor total del carrito: {'$' + sumarCart()}</p>
                <p className='fs-4'>Costo de envio: {'$' + ( sumarCart() + costoEnvio )}</p>
                <p className='fs-4'>Total de roductos: {arrayL}</p>
                <div className='mt-4'>
                    <Button variant="dark me-4" onClick={clear}> 
                        Vaciar Carrito
                    </Button>
                    <Button variant="danger">
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