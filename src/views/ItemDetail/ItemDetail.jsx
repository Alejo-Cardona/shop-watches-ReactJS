import { useParams } from 'react-router-dom';
import styles from './ItemDetail.css'
import Carousel from 'react-bootstrap/Carousel';
import ItemContainer from '../../components/ItemContainer/ItemContainer';
import ItemProduct from '../../components/ItemProduct/ItemProduct';
import { useContext, useEffect, useState, useRef } from 'react';
import Checkout from "../../components/Checkout/Checkout";

/* Contexts */
import { CartContext } from '../../contexts/CartContext';

/* Firestore */
import { getFirestore, getDoc, doc, collection } from 'firebase/firestore';

/* Toastify */
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css";

const ItemDatail = ({ Items }) => {
    const [item, setItem] = useState(null);
    const [Check, setCheck] = useState(false);
    const { addItem } = useContext(CartContext)
    const { id } = useParams()

    useEffect(() => {
        const db = getFirestore();
        const refDoc = doc(db, "items", id);

        getDoc(refDoc).then((snapshot) => {
            setItem({ id: snapshot.id, ...snapshot.data() })
        })
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [ id ])

    useEffect(() => {
        window.scrollTo(0, 700)
    }, [ Check ])

    if (!item) {
        return <div>Producto no encontrado</div>;
    }

    const handleClickCart = () => {
        addItem(item);
    
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
        <section className='container p-5 row-cols-2 d-block d-lg-flex justify-content-center'>
            <Carousel className='d-grid me-5 mb-5 col-md-4 col-12 '>
                <Carousel.Item>
                    <img src={item.imagenes[0]} alt="" className='img-fluid rounded-3'/>
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={item.imagenes[1]} alt="" className='img-fluid rounded-3'/>
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={item.imagenes[2]} alt="" className='img-fluid rounded-3'/>
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> 
            <section className='info__itemDetail d-grid col-12 col-md-4'>
                <h1 className='text-center'>{item.nombre}</h1>
                <p className='fs-3 text-center'>${item.precio}</p>
                <p className='fs-5 text-center'>{item.movimiento}</p>
                <p>Color: {item.color}</p>
                <p>{item.description}</p>
                <section className='container d-flex justify-content-center'>
                    <button className='btn__comprar me-2' onClick={handleClickBuy}> 
                        <span>Comprar</span>
                    </button>
                    <button className='btn__comprar' onClick={handleClickCart}> 
                        <span>Agregar al Carrito</span>
                    </button>
                </section>
            </section>           
        </section>
        {
            Check && (
                <Checkout item={item} />
            )}
        
        </>
    )
}

export default ItemDatail

/*
                <Carousel.Item>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
 */