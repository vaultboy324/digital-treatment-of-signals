import React from 'react';
import {Container} from 'react-bootstrap';
import Loader from 'react-loader-spinner'

function LoaderWrapper (params){
  return (
    <Container fluid>
      <Loader
           type="TailSpin"
           color="#000000"
           height={200}
           width={200}
           timeout={1000000000} //3 secs

        />
    </Container>
  )
}

export default LoaderWrapper;
