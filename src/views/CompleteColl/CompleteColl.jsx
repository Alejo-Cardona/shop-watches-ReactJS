/* Custom */
import styles from './CompleteColl.css'

import ItemContainer from '../../components/ItemContainer/ItemContainer';
import ItemProduct from '../../components/ItemProduct/ItemProduct';
import { useEffect, useState } from 'react';
import { getFirestore, getDocs, collection, query, where } from 'firebase/firestore';

function CompleteColl() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const obtenerProductosDestacados = async () => {
        const db = getFirestore();
        const q = query(
            collection(db, "items"),
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
  }, []);  // Si no necesitas dependencias, puedes dejar el array de dependencias vacío

    return (
    <>
        <h2 className='mb-5 mt-5'>Nuestros Relojes</h2>
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
    </>
);
}

export default CompleteColl