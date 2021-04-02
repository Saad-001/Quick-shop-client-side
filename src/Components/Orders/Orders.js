import React, { useContext, useEffect, useState } from 'react';
import { Form, Nav, Navbar, Table } from 'react-bootstrap';
import { userContext } from '../../App';

const Orders = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://arcane-basin-59090.herokuapp.com/orders?email='+ loggedInUser?.email)
        .then(res => res.json())
        .then(data => setOrders(data))
    },[])

    return (
        <div className="container">
            <Navbar className="mb-5" bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Orders</Navbar.Brand>
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
            <h4 className="mb-3">Your Orders</h4>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Your Email</th>
                            <th>Order Time</th>
                            <th>Name</th>
                            <th>Wight</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    {
                        orders.map(order =>  <tbody>
                            <tr>
                                <td>{order.email}</td>
                                <td>{order.orderTime}</td>
                                <td>{order.name}</td>
                                <td>{order.wight}</td>
                                <td>{order.price}tk</td>
                            </tr>
                        </tbody>)
                    } 
                </Table>
            </div>
        </div>
    );
};

export default Orders;