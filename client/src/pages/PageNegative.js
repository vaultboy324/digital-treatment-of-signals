import React, {Component} from 'react';
import {Container} from 'react-bootstrap';

import MainNavbar from '../components/MainNavbar/MainNavbar';
import ImageUploaderWrapper from '../components/ImageUploaderWrapper/ImageUploaderWrapper';
import ImageWrapper from '../components/ImageWrapper/ImageWrapper';
import LoaderWrapper from '../components/LoaderWrapper/LoaderWrapper';

class PageNegative extends Component{
  state = {
    picture: null,
    showLoader: false,
  }

  onDrop = (picture) => {
    this.setState({
      picture: picture[0],
    })
  }

  onNegative = async () => {
    const blobFile = this.state.picture;
    let formData = new FormData();
    formData.append('fileToUpload', blobFile);

    this.setState({
      showLoader: true,
    });

    const saveImageResponse = await fetch('http://localhost:5000/save_image',{
      method: 'POST',
      body: formData,
    });

    let imageData = await saveImageResponse.json();
    const jsonString = JSON.stringify(imageData)

    const makeNegativeImageResponse = await fetch('http://localhost:5000/negative', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: jsonString
    });

    const negativeImage = await makeNegativeImageResponse.blob();
    this.setState({
      picture: negativeImage,
      showLoader: false,
    });

    await fetch(`http://localhost:5000/remove_image/${imageData.filename}`, {
      method: 'DELETE'
    });

  }

  render(){
    let loader = null;
    if(this.state.showLoader){
      loader = <LoaderWrapper/>
    }

    let imageWrapper = null;
    if(this.state.picture && !loader) {
      let imageForDisplay = URL.createObjectURL(this.state.picture)
      imageWrapper = <ImageWrapper imageForDisplay={imageForDisplay} action={this.onNegative} buttonText={'Сделать негатив'}/>
    }

    return (
      <Container fluid>
        <MainNavbar/>
        {loader}
        {imageWrapper}
        <ImageUploaderWrapper onDrop={this.onDrop}/>
      </Container>
    )
  }
}

export default PageNegative;
