import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';

function ImageUploaderWrapper (params){
  return (
    <Container fluid>
      <ImageUploader
              withIcon={true}
              buttonText='Прикрепите изображение'
              onChange={params.onDrop}
              imgExtension={['.jpg', '.png', '.jpeg', '.bmp']}
              maxFileSize={5242880}
              singleImage={true}
          />
    </Container>
  )
}

export default ImageUploaderWrapper;
