import axios from 'axios';
import React, { useState } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageURL, setImageURL] = useState(null);

    const onSubmit = data => {
        const productData = {
            name: data.name,
            wight: data.wight,
            price: data.price,
            imageUrl: imageURL
        }
        const url = `http://localhost:5000/addProduct`;
        console.log(productData)
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
    }

    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'aa1033b1f8dc63cf45124a243c561874')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    return (
        <div className="container">
            <Navbar className="mb-5" bg="primary" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Add Product</Navbar.Brand>
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

            <h4 className="mb-3">Add Product</h4>

            <form style={{ backgroundColor: "skyblue" }} className="container p-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <h5>Product Name</h5>
                        <input className="form-control" name="name" placeholder="product Name" ref={register} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <h5>Wight</h5>
                        <input className="form-control" name="wight" placeholder="wight" ref={register} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <h5>Add Price</h5>
                        <input className="form-control" name="price" placeholder="price" ref={register} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <h5>Add Photo</h5>
                        <input className="" name="exampleRequired" type="file" onChange={handleImageUpload} />
                    </div>
                </div>

                <input className="btn btn-primary" type="submit" value="Save" />
            </form>
        </div>
    );
};

export default AddProduct;