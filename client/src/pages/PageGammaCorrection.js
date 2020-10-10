import React, {Component} from 'react';
import {Container} from 'react-bootstrap';

import MainNavbar from '../components/MainNavbar/MainNavbar';
import ImageUploaderWrapper from '../components/ImageUploaderWrapper/ImageUploaderWrapper';
import ImageWrapper from '../components/ImageWrapper/ImageWrapper';
import LoaderWrapper from '../components/LoaderWrapper/LoaderWrapper';
import SliderWrapper from '../components/SliderWrapper/SliderWrapper';

class PageGammaCorrection extends Component{
  state = {
    picture: null,
    showLoader: false,
    gamma: 0.5,
    c: 1,
  }

onDrop = (picture) => {
  this.setState({
    picture: picture[0],
  })
}

onScroll = (sliderName, newValue) => {
  if(sliderName === 'gamma') {
    this.setState({
      gamma: newValue
    });
  } else {
    this.setState({
      c: newValue
    })
  }
}

onGammaCorrection = async ()=> {
  const blobFile = this.state.picture;
  let formData = new FormData();
  formData.append('fileToUpload', blobFile);

  this.setState({
    showLoader: true,
  });

  const saveImageResponse = await fetch('http://localhost:5000/save_image', {
    method: 'POST',
    body: formData,
  });

  let imageData = await saveImageResponse.json();
  imageData.gamma = this.state.gamma;
  imageData.c = this.state.c;
  const jsonString = JSON.stringify(imageData)

  const makeGammaCorrectionResponse = await fetch('http://localhost:5000/gamma_correction', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: jsonString
  });

  const correctedImage = await makeGammaCorrectionResponse.blob();
  this.setState({
    picture: correctedImage,
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
  let gammaSliderWrapper = null;
  let cSliderWrapper = null;
  if(this.state.picture && !loader) {
    let imageForDisplay = URL.createObjectURL(this.state.picture)
    imageWrapper = <ImageWrapper imageForDisplay={imageForDisplay} action={this.onGammaCorrection} buttonText={'Выполнить гамма-преобразование'}/>
    gammaSliderWrapper = <SliderWrapper name={'gamma'}
                                        min={0.1}
                                        max={1.9}
                                        step={0.1}
                                        value={this.state.gamma}
                                        onScroll={this.onScroll}/>
    cSliderWrapper = <SliderWrapper name={'c'}
                                        min={0.1}
                                        max={1.9}
                                        step={0.1}
                                        value={this.state.c}
                                        onScroll={this.onScroll}/>
}

  return (
    <Container fluid>
      <MainNavbar/>
      {loader}
      {gammaSliderWrapper}
      {cSliderWrapper}
      {imageWrapper}
      <ImageUploaderWrapper onDrop={this.onDrop}/>
    </Container>
  )
}
}

export default PageGammaCorrection;
