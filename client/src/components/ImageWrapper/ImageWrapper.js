import React from 'react';
import {Container, Navbar, Nav, Button} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';

import './ImageWrapper.css';

function ImageWrapper (params){
  return (
    <Container fluid>
      <img src={params.imageForDisplay}/>
      <br/>
      <Button onClick={params.action} className="btn-light rounded-button">
        Сделать негатив
      </Button>
    </Container>
  )
}

export default ImageWrapper;
