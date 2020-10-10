import React, {Component} from 'react';
import {Container} from 'react-bootstrap';

import MainNavbar from '../components/MainNavbar/MainNavbar';
import ImageUploaderWrapper from '../components/ImageUploaderWrapper/ImageUploaderWrapper';
import ImageWrapper from '../components/ImageWrapper/ImageWrapper';
import LoaderWrapper from '../components/LoaderWrapper/LoaderWrapper';
import RadioGroupWrapper from '../components/RadioGroupWrapper/RadioGroupWrapper'

import constantData from '../constants/sharpness_upper_operators.json';

class PageSharpnessUpper extends Component{
  state = {
    picture: null,
    showLoader: false,
    operators: constantData.operators,
    selectedOperator: constantData.operators[0].key
  }

  onSelectOperator = (newOperator) => {
    this.setState({
      selectedOperator: newOperator
    })
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
    imageData.operator_type = this.state.selectedOperator;

    const jsonString = JSON.stringify(imageData)

    const makeSharpnessUpperResponse = await fetch('http://localhost:5000/sharpness_upper', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: jsonString
    });

    const negativeImage = await makeSharpnessUpperResponse.blob();
    this.setState({
      picture: negativeImage,
      showLoader: false,
    });

    await fetch(`http://localhost:5000/remove_image/${imageData.filename}`, {
      method: 'DELETE'
    });

  }

  render(){
    console.log(this.state);
    let loader = null;
    if(this.state.showLoader){
      loader = <LoaderWrapper/>
    }

    let imageWrapper = null;
    let radioGroupWrapper = null;
    if(this.state.picture && !loader) {
      let imageForDisplay = URL.createObjectURL(this.state.picture)
      imageWrapper = <ImageWrapper imageForDisplay={imageForDisplay} action={this.onNegative} buttonText={'Градиент'}/>
      radioGroupWrapper = <RadioGroupWrapper
      selectedOperator={this.state.selectedOperator}
      onChange={this.onSelectOperator}
      operators={this.state.operators}/>
    }


    return (
      <Container fluid>
        <MainNavbar/>
        {loader}
        {radioGroupWrapper}
        {imageWrapper}
        <ImageUploaderWrapper onDrop={this.onDrop}/>
      </Container>
    )
  }
}

export default PageSharpnessUpper;
