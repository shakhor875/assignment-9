import React from 'react';
import { Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import transports from '../../FakeData/FakeData.json';
import './Home.css'
import SingleTransport from './SingleTransport/SingleTransport';

console.log(transports);
const Home = () => {

    return (
        <main className="home-section">
            <Container className="main">
                <Row>
                    {
                        transports.map (transport => <SingleTransport transport={transport} />)
                    }
                </Row>
            </Container>
        </main>
    );
};

export default Home;