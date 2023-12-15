import React from 'react';
import styles from './NavBarSite.css'
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Home from '../../views/Home/Home';


function NavBarSite() {

    return (
    <>
        <Navbar bg="dark" data-bs-theme="dark" id='Navbar_up'>
            <Container>
                <Nav className="me-auto">
                    <Link href="#home" className='m-2' to={'/'}>
                        <Button variant="light">Home</Button>
                    </Link>
                    <Link href="#features" className='m-2' to={'*'}>
                        <Button variant="light">Busca tu reloj</Button>
                    </Link>
                    <Link href="#pricing" className='m-2' to={'*'}>
                        <Button variant="light">Toda la coleccion</Button>
                    </Link>
                    <Link href="#pricing" className='m-2' to={'*'}>
                        <Button variant="light">¿Quienes somos?</Button>
                    </Link>
                    <DropdownButton variant="light" id="dropdown-basic-button" title="Busca por categoria" className='m-2'>
                        <Dropdown.Item href="#/action-1">Movimiento Automatico</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Movimiento Quartz</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#/action-3">Elegante</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Casual</Dropdown.Item>
                    </DropdownButton>
                    <Link href="#features" className='m-2' to={'/Cart'}>
                        <CartWidget/>
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    </>
    );
}

export default NavBarSite;