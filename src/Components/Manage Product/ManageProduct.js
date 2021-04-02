import React, { useEffect, useState } from 'react';
import { Nav, Navbar, NavDropdown, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ManageProduct = () => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
            console.log(data)
        })
    }, [])

    const handleClick = (id) => {
        fetch('http://localhost:5000/deleteOne/' + id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }
    return (
        <div className="container">
              <Navbar className="mb-5" bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="/manageProduct">Manage Product</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/orders">Orders</Nav.Link>
                        <NavDropdown title="More settings" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/manageProduct">Manage Product</NavDropdown.Item>
                            <NavDropdown.Item href="/addProduct">Add Product</NavDropdown.Item>
                            <NavDropdown.Divider />
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


            <h4 className="mb-3">Manage Products</h4>
            <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Wight</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        products.map(product =>  <tbody>
                            <tr>
                                <td>{product.name}</td>
                                <td>{product.wight}</td>
                                <td>{product.price}</td>
                                <td>{<FontAwesomeIcon onClick={() =>handleClick(product._id)} icon={faTrashAlt} />}</td>
                            </tr>
                        </tbody>)
                    } 
                </Table>
        </div>
    );
};

export default ManageProduct;