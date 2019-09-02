import React from 'react';
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBContainer } from "mdbreact";

const PanelPage = props => {
return (
  <MDBContainer>
    <MDBRow className="justify-content-center align-items-center">
      <MDBCol md="6">
        <MDBCard>
          <MDBCardBody>
            {props.children}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
</MDBContainer>
);
};

export default PanelPage;