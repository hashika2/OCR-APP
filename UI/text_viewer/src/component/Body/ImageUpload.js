import React,{useState} from 'react';
import {Card,Form,Button} from 'react-bootstrap';

const ImageUpload = () => {
    const [image,setImage] = useState({file:null});

    const onChange = (e) =>{
        setImage({...image,file:e.target.files[0]})
    }

    const onSubmit = (e) =>{
        e.preventDefault();

    }

    return (
        <div className='upload-image'>
            <Card style={{ width: '60rem' }}>
                <Card.Body>
                    <Card.Title className='text-center'><h1>You can select your Image</h1></Card.Title>
                        <Card style={{ width: '50rem' }} className='ml-5'>
                            <Card.Body>
                                <Card.Title className='text-center'>File Upload</Card.Title>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Choose file</Form.Label>
                                        <Form.Control type="file" onChange={onChange} />
                                    </Form.Group>
                                    <Button variant="secondary" size="lg" block onClick={onSubmit}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ImageUpload;
