import React,{useState, Fragment} from 'react';
import {Card,Form,Button} from 'react-bootstrap';
import {sendImage} from '../../action/imageAction';
import {connect} from 'react-redux';

const ImageUpload = ({sendImage,content:{text,loadingText}}) => {
    const [image,setImage] = useState({file:null});

    const onChange = (e) =>{
        setImage({...image,file:e.target.files[0]})
    }

    const {file} = image;

    const onSubmit = (e) =>{
        e.preventDefault();
        sendImage({file});

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
            <div >
                <Fragment>{loadingText &&  
                    <Card className='show-text' style={{ width: '40rem' }}>
                        <Card.Body>
                            <Card.Title className='text-center'><h1>Image Content</h1></Card.Title>
                            <Card.Text>{text}</Card.Text>
                        </Card.Body>
                    </Card>}
                </Fragment>
                
            </div>
        </div>
    )
}

const mapStateToPorp = (state) =>({
    content: state.image
});

export default connect(mapStateToPorp,{sendImage})(ImageUpload);
