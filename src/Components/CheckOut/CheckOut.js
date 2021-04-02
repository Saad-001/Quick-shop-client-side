import { Button } from 'bootstrap';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Nav, Navbar, Table } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { userContext } from '../../App';

const CheckOut = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    console.log(loggedInUser)

    const [productData, setProductData] = useState({});
    const {id} = useParams();
    useEffect(() => {
        fetch('https://arcane-basin-59090.herokuapp.com/product/' + id)
        .then(res => res.json())
        .then(data => setProductData(data))
    },[id])

    const history = useHistory();
    const handleClick = () =>{
        history.push('/orders')
        const orders = {...loggedInUser, ...productData, orderTime: new Date()}
        fetch('https://arcane-basin-59090.herokuapp.com/addOrders', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(orders)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert('Your order placed successfully')
            }
        })
    }


    return (
        <div className="container">
            <Navbar className="mb-5" bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Checkout</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/orders">Orders</Nav.Link>
                        <Nav.Link href="/addProduct">Admin</Nav.Link>
                        <Nav.Link href="/">Deals</Nav.Link>
                    </Nav>
                    <Form inline>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            <div>
                <h4 className="mb-3">Checkout</h4>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Wight</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{productData.name}</td>
                            <td>{productData.wight}</td>
                            <td>{productData.price}</td>
                        </tr>
                    </tbody>
                </Table>
                <button onClick={handleClick} className="btn btn-primary">Checkout</button>
            </div>
        </div>
    );
};

export default CheckOut;