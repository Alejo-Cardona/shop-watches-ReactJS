import styles from './ItemProduct.css'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ItemProduct = (props) => {

    return (
        <div className="item__body">
            <img className="item__img" src={props.imagenes} />
            <section className="item__info">
                <h3 className="item__name fs-4">{props.nombre}</h3>
                <p className="item__precio">{"$"+props.precio}</p>
                <p className="item__type">{props.movimiento}</p>
                <Link to={`/products/${props.id}`} className="d-grid col-10 container text-decoration-none">
                    <Button variant="danger" >info</Button>
                </Link>
            </section>
        </div>
    )
}

export default ItemProduct;