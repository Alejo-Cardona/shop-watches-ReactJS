import { useEffect } from 'react';
import ItemContainer from '../../components/ItemContainer/ItemContainer';
import ItemProduct from '../../components/ItemProduct/ItemProduct';
import productos from '../../data.json';
import { Link } from 'react-router-dom';

function Home() {
    return(
    <>  
        <img src='/media/imgMarca/Grandeur_Watches_portada_pequena.png' className='mb-5'></img>
        <h2 className='mb-5'>Nuestros Relojes</h2>
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
        <section className='container d-flex justify-content-center'>
            <div className='col-6 position-relative'>
                <Link to={'*'}>
                    <img className=' img-fluid h-70' src="../media/imgMarca/Empresario_mirando_reloj.jpg" alt="" />
                </Link>
                <h3 className='text-center text-light fs-1 p-2 bg-dark'>ELEGANTE</h3>
            </div>
            <div className='col-6'>
                <Link to={'*'}>
                    <img className='img-fluid h-70' src="../media/imgMarca/Empresario-manejando-auto-reloj.jpg" alt="" />
                </Link>
                <h3 className='text-center text-light fs-1 p-2 bg-dark'>CASUAL</h3>
            </div>
        </section>
    </>
    )
}

export default Home;