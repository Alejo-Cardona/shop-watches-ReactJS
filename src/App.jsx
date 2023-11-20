import './App.module.css';
import ItemContainer from './components/ItemContainer/ItemContainer';
import NavBar from './components/NavBar/NavBar';
import ItemProduct from './components/ItemProduct/ItemProduct';
import productos from './data.json';

function App() {
  return (
    <>
      <NavBar />
      <img src='/media/imgMarca/Grandeur_Watches_portada_pequena.png'></img>
      <ItemContainer>
        {productos.map( product => <ItemProduct
          key={product.id}
          imagenes={product.imagenes[0]}
          nombre={product.nombre}
          precio={product.precio}
          movimiento={product.movimiento}
        /> 
        )}
      </ItemContainer>
    </>
  )
}

export default App
