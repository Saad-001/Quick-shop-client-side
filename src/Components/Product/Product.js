import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { userContext } from '../../App';

const Product = ({data}) => {
    console.log(data)

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const history = useHistory();
    const handleClick = (id) => {
            history.push(`/checkOut/${id}`)               
    }
    return (
            <Card className="mb-3" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={data.imageUrl} />
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Footer className="d-flex justify-content-between">
                        <span style={{fontSize: "30px", color: "slateblue"}}>${data.price}</span>
                        <Button onClick={() => handleClick(data._id)} variant="primary">Buy Now</Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
    );
};

export default Product;