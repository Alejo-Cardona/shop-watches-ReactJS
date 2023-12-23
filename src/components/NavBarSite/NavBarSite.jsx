import React, { useEffect, useState } from 'react';
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
                    <Link className='m-2' to={'/'}>
                        <Button variant="light">Home</Button>
                    </Link>
                    <Link className='m-2' to={'/CompleteCollection'}>
                        <Button variant="light">Toda la coleccion</Button>
                    </Link>
                    <DropdownButton variant="light" id="dropdown-basic-button" title="Busca por categoria" className='m-2'>
                        <Dropdown.Item><Link to={'/movimiento/Automatico'} className='text-light text-decoration-none d-grid col-12 p-2'>Movimiento Automatico</Link></Dropdown.Item>
                        <Dropdown.Item><Link to={'/movimiento/Quartz'} className='text-light text-decoration-none d-grid col-12 p-2'>Movimiento Quartz</Link></Dropdown.Item>
                        <Dropdown.Item><Link to={'/movimiento/Manual'} className='text-light text-decoration-none d-grid col-12 p-2'>Movimiento Manual</Link></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item><Link to={'/categoria/Elegante'} className='text-light text-decoration-none d-grid col-12 p-2'>Elegante</Link></Dropdown.Item>
                        <Dropdown.Item><Link to={'/categoria/Casual'} className='text-light text-decoration-none d-grid col-12 p-2'>Casual</Link></Dropdown.Item>
                        <Dropdown.Item><Link to={'/categoria/Deportivo'} className='text-light text-decoration-none d-grid col-12 p-2'>Deportivo</Link></Dropdown.Item>
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