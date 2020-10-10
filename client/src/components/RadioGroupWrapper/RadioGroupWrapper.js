import React from 'react';
import {Container} from 'react-bootstrap';
import RadioGroup from 'react-toolbox/lib/radio/RadioGroup';
import RadioButton from 'react-toolbox/lib/radio/RadioButton';

import './RadioGroupWrapper.css';


function RadioGroupWrapper (params){
  return (
    <Container fluid>
      <RadioGroup name="sharpness_uppers" value={params.selectedOperator} onChange={params.onChange}>
        {
          params.operators.map((operator, index)=>(
            <RadioButton className="rButton" label={operator.text} value={operator.key}/>
          ))
        }
        <br/>
      </RadioGroup>
    </Container>
  )
}

export default RadioGroupWrapper;
