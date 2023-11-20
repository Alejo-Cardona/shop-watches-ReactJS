import styles from './NavBar.module.css'

const NavBar = () => {
    return (
        <nav>
            <button className={styles.nav__item}>home</button>
            <button className={styles.nav__item}>busca tu reloj</button>
            <button className={styles.nav__item}>toda la colección</button>
            <button className={styles.nav__item}>sobre nosotros</button>
        </nav>
    )
}

export default NavBar