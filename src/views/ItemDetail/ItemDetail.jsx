import { useParams } from 'react-router-dom';
import styles from './ItemDetail.css'
import data from '../../data.json'
import Carousel from 'react-bootstrap/Carousel';
import ItemContainer from '../../components/ItemContainer/ItemContainer';
import ItemProduct from '../../components/ItemProduct/ItemProduct';
import productos from '../../data.json';
import { useContext, useEffect, useState } from 'react';

/* Contexts */
import { CartContext } from '../../contexts/CartContext';

const ItemDatail = ({ Items }) => {
    const { addItem } = useContext(CartContext)
    const { id } = useParams()
    const item = data.find(product => product.id === parseInt(id))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [ id ])

    if (!item) {
        return <div>Producto no encontrado</div>;
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
                    <button className='btn__comprar me-2'> 
                        <span>Comprar</span>
                    </button>
                    <button className='btn__comprar' onClick={() => addItem(item)}> 
                        <span>Agregar al Carritor</span>
                    </button>
                </section>
            </section>           
        </section>
        <ItemContainer>
        {productos.map( product => { if (product.destacado === 1) {
            return(
            <ItemProduct
                key={product.id}
                imagenes={product.imagenes[0]}
                nombre={product.nombre}
                precio={product.precio}
                movimiento={product.movimiento}
                id={product.id}
            />)}
            }
            )}
        </ItemContainer>
        
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