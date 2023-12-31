import { useEffect, useState } from 'react';
import ItemContainer from '../../components/ItemContainer/ItemContainer';
import ItemProduct from '../../components/ItemProduct/ItemProduct';
//import productos from '../../data.json';
import { Link } from 'react-router-dom';

/* Firebase */
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const obtenerProductosDestacados = async () => {
        const db = getFirestore();
        const q = query(
            collection(db, "items"),
            where("destacado", "==", 1)
        );

        try {
            const snapshot = await getDocs(q);

        if (snapshot.size === 0) {
            console.log("No se encontraron productos destacados");
        } else {
            const productos = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            }));
            setProducts(productos);
        }
        } catch (error) {
        console.error("Error al obtener productos:", error);
        }
    };

    obtenerProductosDestacados();
    }, []);

    return(
    <>  
        <img src='/media/imgMarca/Grandeur_Watches_portada_pequena.png' className='mb-5'></img>
        <h2 className='mb-3 mt-3'>Nuestros Relojes</h2>
        <ItemContainer>
        {products.length === 0 ? (
        <section className='container d-flex justify-content-center'>
            <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </section>
        ) : (
            products.map((product) => (
            <ItemProduct
                key={product.id}
                imagenes={product.imagenes}
                nombre={product.nombre}
                precio={product.precio}
                movimiento={product.movimiento}
                id={product.id}
            />
            ))
        )}
        </ItemContainer>
        <section className='container d-flex justify-content-center'>
            <div className='col-6 position-relative'>
                <Link to={'/categoria/Elegante'}>
                    <img className=' img-fluid h-70' src="../media/imgMarca/Empresario_mirando_reloj.jpg" alt="" />
                </Link>
                <h3 className='text-center text-light fs-1 p-2 bg-dark'>ELEGANTE</h3>
            </div>
            <div className='col-6'>
                <Link to={'/categoria/Casual'}>
                    <img className='img-fluid h-70' src="../media/imgMarca/Empresario-manejando-auto-reloj.jpg" alt="" />
                </Link>
                <h3 className='text-center text-light fs-1 p-2 bg-dark'>CASUAL</h3>
            </div>
        </section>
    </>
    )
}

export default Home;