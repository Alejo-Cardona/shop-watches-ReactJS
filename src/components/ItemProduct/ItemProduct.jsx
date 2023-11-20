import styles from './ItemProduct.css'

const ItemProduct = (props) => {
    return (
        <div className="item__body">
            <img className="item__img" src={props.imagenes} />
            <section className="item__info">
                <h3 className="item__name">{props.nombre}</h3>
                <p className="item__precio">{"$"+props.precio}</p>
                <p className="item__type">{props.movimiento}</p>
                <button className='btn_info'>info</button>
            </section>
        </div>
    )
}

export default ItemProduct