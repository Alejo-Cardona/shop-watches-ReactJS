import styles from './ItemContainer.css'

// Componente encargado de mostrar una lista de productos
const ItemContainer = (props) => {
    
    return (
        <section className='products__section container'>
            <div className='products__container'>
                {/* ----> Cards Products */
                    props.children
                }
            </div>
        </section>
    )
}

export default ItemContainer;