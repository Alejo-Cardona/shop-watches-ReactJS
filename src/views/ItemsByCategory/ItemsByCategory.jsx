
/* Hooks */
import {  useState, useEffect } from "react"
import { useParams } from 'react-router-dom';

/* Components */
import ItemContainer from "../../components/ItemContainer/ItemContainer";
import ItemProduct from "../../components/ItemProduct/ItemProduct";

/* Firestore */
import { getFirestore, getDocs, doc, collection, query, where } from 'firebase/firestore';

const ItemByCategory = () => {
    const [products, setProducts] = useState([]);
    const { movimiento, categoria } = useParams()

    useEffect(() => {
        const obtenerProductosCategorias = async () => {
            const db = getFirestore();

            let q;

            if (movimiento) {
                q = query(
                    collection(db, "items"),
                    where("movimiento", "==", movimiento)
                );
            } else if (categoria) {
                q = query(
                    collection(db, "items"),
                    where("categoria", "==", categoria)
                );
            }

            try {
                if (q) {
                    const snapshot = await getDocs(q);

                    if (snapshot.size === 0) {
                        console.log(`No se encontraron productos con ${movimiento ? 'el movimiento' : 'la categoría'} ${movimiento || categoria}`);
                    } else {
                        const productos = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setProducts(productos);
                    }
                }
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        obtenerProductosCategorias();
    }, [movimiento, categoria]);

    return (
        <>
            <h2 className='mb-5 mt-5'>Nuestros Relojes <span className="text-danger f-2 ms-4">{movimiento}</span></h2>
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

export default ItemByCategory