import styles from './ItemContainer.css'
import ItemProduct from '../ItemProduct/ItemProduct' 

// Componente encargado de mostrar una lista de productos
const ItemContainer = (props) => {
    return (
        <section className='products__section'>
            <h2>Nuestros Relojes</h2>
            <div className='products__container'>
                {/* ----> Cards Products */
                    props.children
                }
            </div>
        </section>
    )
}

export default ItemContainer