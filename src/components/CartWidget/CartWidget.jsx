import React from 'react';
import styles from './CartWidget.css'
import 'boxicons'

/* Context */
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';

const CartWidget = () => {
    const { arrayL } = useContext(CartContext)

    return (
        <div className='cart-shop d-inline-flex ms-4 border border-light rounded justify-content-center'>
            <box-icon type='solid' name='cart' className='text-light' size='md' animation='tada-hover' color='#ffffff'></box-icon>
            <p className='text-light mt-2 ms-2'>{arrayL}</p>
        </div>
    )
}

export default CartWidget