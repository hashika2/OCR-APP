import React,{useState} from 'react'
import {Form,Button,Card} from 'react-bootstrap';

const CreateAccount = () => {
    const [formData,setFormData] = useState({name:'',email:'',password:'',password2:''});


    const onChange = (e) =>{
        setFormData({...formData,[e.target.name] : e.target.value})

    };
    

    const onSubmit = (e) =>{
        e.preventDefault();

    }
    
    return (
        <div className='card-form'>
            <Card style={{ width: '40rem' }}>
                <Card.Body>
                    <Card.Title className='text-center'>Create Account</Card.Title>
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" onChange={onChange} name='name'/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={onChange} name='email'/>

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={onChange} name='password' />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>ConformPassword</Form.Label>
                            <Form.Control type="password" placeholder="conformPassword" onChange={onChange} name='password2'/>
                        </Form.Group>
                        <Button variant="secondary" size="lg" block onClick={onSubmit}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            
            
        </div>
    )
}



export default CreateAccount;