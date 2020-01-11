import React from 'react'
import {Card,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className='home-back'>
            <Card className="text-center home-card" style={{ width: '40rem' }}>
                <Card.Body>
                    <Card.Title className='text-center'><h1>Image Text Viewer</h1></Card.Title>
                    <Link to='/login'><Button className='home-btn' variant="primary">Login</Button></Link>
                    <Link to='/createAccount'><Button className='home-btn' variant="primary">SingUp</Button></Link>
                </Card.Body>
        </Card>
        </div>
        
    )
}

export default Home;
