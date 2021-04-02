import React, { useEffect, useState } from 'react';
import { Button, Navbar, Nav, Form, Spinner } from 'react-bootstrap';
import Product from '../Product/Product';

const Home = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    return (
        <div className="container">
            <Navbar className="mb-5" bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="/">Quick Shop</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/orders">Orders</Nav.Link>
                        <Nav.Link href="/addProduct">Admin</Nav.Link>
                        <Nav.Link href="/">Deals</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button href="/login" variant="outline-light">Log In</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <div className="row justify-content-around">
                {
                    products.length === 0 && <Spinner animation="border" variant="primary" />
                }                                
                {
                    products.map(product => <Product data={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Home;