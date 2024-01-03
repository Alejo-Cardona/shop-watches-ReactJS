import { useState, useContext } from "react"
import styles from "./Checkout.css"
import { Button } from "react-bootstrap"
import ItemCounter from "../ItemCounter/ItemCounter"

/* FireBase */
import { getFirestore, doc, updateDoc, collection, addDoc } from "firebase/firestore"

/* CartContext */
import { CartContext } from "../../contexts/CartContext"

const Checkout = ({ item, unidades, check } ) => {
    const { itemsCart, arraySN, sumarCart } = useContext(CartContext)
    
    /* Counter */
    const [count, setCount] = useState(unidades)
    const precioEnvio = count < 3 ? 3200 : 0;   
    const total = sumarCart()

    /* Capturar la info del usuario */
    const clearBuyer = {nombre: '', email: ''}
    const [buyer, setBuyer] = useState(clearBuyer);

    // Crear orden y enviarla al servidor (Compra del carrito) 
    const handleSendOrderCart = () => {
        console.log(`nombre ${buyer.nombre} email ${buyer.email}`)
        const order = {
            buyer: {
                nombre: buyer.nombre,
                email: buyer.email
            },
            itemsCart,
            cantidadUnidades: unidades,
            total
        }

        const db = getFirestore();
        const orderCollection = collection(db, "orders")

        addDoc(orderCollection, order).then(({ id }) => {
            if(id) {
                alert(`su orden de compra: ${id} a sido completada`)
            }
        })
    };

    // Crear orden y enviarla al servidor (Compra del Detail) 
    const handleSendOrder = () => {
        console.log(`nombre ${buyer.nombre} email ${buyer.email}`)
        const order = {
            buyer: {
                nombre: buyer.nombre,
                email: buyer.email
            },
            item,
            cantidadUnidades: count,
            total: (count * item.precio) + precioEnvio
        }

        const db = getFirestore();
        const orderCollection = collection(db, "orders")

        addDoc(orderCollection, order).then(({ id }) => {
            if(id) {
                alert(`su orden de compra: ${id} a sido completada`)
            }
        })
    };

    const handleChange = (event) => {
        const { name, value } = event.target
        setBuyer((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    };

    return(
        <>  
            { check 
            ? itemsCart.map((item) => (
                <section className="d-grid master_container container border border-black border-opacity-25 rounded col-10  col-md-6 mb-4" id="check-id">
                    <h3 className="mt-4 text-center">{item.nombre}</h3>
                    <div className="row mx-auto mt-4">
                        <img className="img__check col-8 ms-4 col-md-4 rounded ms-md-5" src={item.imagenes[0]}/>
                        <p className="fs-2 fw-bold text-center">{`x ${unidades[item.id]}`}</p>
                        <h3 className="col-12 text-center mb-5 mb-ms-0">Subtotal: <span className="fw-normal fs-3 ms-2">{`$${unidades[item.id]  * item.precio}`}</span></h3>
                    </div>
                </section>
            ))
                : (
                    <section className="d-grid master_container container border border-black border-opacity-25 rounded col-10  col-md-6 mb-4" id="check-id">
                    <h3 className="mt-4 text-center">{item.nombre}</h3>
                    <div className="row mx-auto mt-4">
                        <img className="img__check col-8 ms-4 col-md-4 rounded ms-md-5" src={item.imagenes[0]}/>
                        <div className="counter col-12 col-md-6 ms-md-5 mt-md-4 text-center">
                            <Button variant="danger fs-4 col-2" onClick={() => setCount(count => count + 1)}>+</Button>
                            <label className="fs-1 m-4">{count}</label>
                            {
                                count > 0 && (
                                    <Button variant="danger fs-4 col-2" onClick={() => setCount(count => count - 1)}>-</Button>
                                )
                            }
                        </div>
                        <h3 className="col-12 text-center mb-5 mb-ms-0">Subtotal: <span className="fw-normal fs-3 ms-2">{`$${count  * item.precio}`}</span></h3>
                    </div>
                </section>
                )
            }
            <section className="d-grid master_container container border border-black border-opacity-25 rounded col-10 col-md-6 mt-3">
                <div class="d-grid mt-5 m-5 text-center ">
                    <label class="fs-5 mb-5 fw-bold">Completa los campos</label>
                    <form class="form row gap-4">
                        <input type="text" placeholder="Nombre" name="nombre" className="col-12 rounded col-md-10 input__info mx-auto" value={buyer.nombre} onChange={handleChange}/>
                        <input type="email" placeholder="Email" name="email" className="col-12 rounded mx-auto col-md-10 input__info" value={buyer.email} onChange={handleChange}/>
                    </form>
                </div>
            </section>
            <section className="d-grid master_container container border border-black border-opacity-25 rounded col-10 col-md-6 mt-3 mb-5">
                <h4 className="col-12 text-center mt-5">Subtotal: <span className="fw-normal fs-4 ms-2">{check ? `$${total}` : `$${count * item.precio}`}</span></h4>
                <h4 className="col-12 text-center mt-3">Costo de envio: 
                { precioEnvio === 0 ? (
                    <span className="fw-normal fs-4 ms-2 text-success fw-bold">Envio Gratis!</span>
                    ) : (
                        <span className="fw-normal fs-4 ms-2">{`$${count * precioEnvio}`}</span>
                    )
                } 
                </h4>
                <div className="total__info rounded-top row mt-4">
                    <div className="col-6 text-center ">
                        <h4 className="mt-3 fs-3">Total: <span className="fw-normal fs-3 ms-2">{check ? `$${total}` : `$${(count * item.precio) + precioEnvio}`}</span></h4>
                    </div>
                        <div className="col-6 d-flex justify-content-center align-items-center">
                            <Button variant="success" size="lg" onClick={check ? handleSendOrderCart : handleSendOrder}>Realizar Compra</Button> 
                        </div> 
                </div>
            </section>
        </>
    )
}

export default Checkout