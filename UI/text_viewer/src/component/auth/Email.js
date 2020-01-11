import React,{useEffect} from 'react';
import {Card,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {sendVerifiedID} from '../../action/authAction';


const Email = ({match,sendVerifiedID}) => {
    const uuid = match.params.id;

    useEffect(() => {
        sendVerifiedID({uuid});
    }, []);
    
    return (
        <div className='container'>
            <Card className='show-text' style={{ width: '40rem' }}>
                <Card.Body>
                    <Card.Title className='text-center'><h1>Now You can upload Image and Click the Button</h1></Card.Title>
                </Card.Body>
            </Card> 


            <Link to='/imageuploader'> <Button variant="primary" size="lg" block>Click me!!</Button></Link>
        </div>
    )
}

export default connect(null,{sendVerifiedID})(Email);
