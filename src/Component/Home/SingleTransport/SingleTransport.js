import React from 'react';
import './SingleTransport.css'
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const SingleTransport = (props) => {
    const { name, id, image } = props.transport;
   console.log(props.transport)
    const history = useHistory();
    const handleBook = () => {
        history.push(`/Destination/${id}`); 
    }
    return (
        <section className="text-center mt-4 col-md-6 col-lg-3">
            <Card className="transport-card"onClick={() => handleBook()}>
                <Card.Img variant="top" className="transport-img" src={image} />
                <Card.Body>
                    <Card.Title><h3 className="name">{name}</h3></Card.Title>
                </Card.Body>
            </Card>
        </section>
    );
};

export default SingleTransport;