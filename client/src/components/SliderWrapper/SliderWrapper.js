import React from 'react';
import ReactSlider from 'react-bootstrap-range-slider';
import {Container} from 'react-bootstrap';


function SliderWrapper (params){
  return (
    <Container>
      <label> {params.name} </label>
      <br/>
      <ReactSlider id={params.name}
                   size='sm'
                   min={params.min}
                   max={params.max}
                   step={params.step}
                   value={params.value}
                   onChange={(e)=>{params.onScroll(params.name, e.target.value)}}/>
    </Container>
  )
}

export default SliderWrapper;
