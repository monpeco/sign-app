import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import Spinner from './Spinner'

class ModalPage extends Component {
state = {
  modal14: false
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

render() {
    const { open, title, handleClose, action, loading, confirmation } = this.props
  return (
      <MDBContainer>
        <MDBModal isOpen={open} toggle={handleClose} centered>
          <MDBModalHeader toggle={handleClose}>{title ? title : (confirmation ? "Confirmación" : "Notificación")}</MDBModalHeader>
          <MDBModalBody>
            {loading ? <Spinner /> : this.props.children}
          </MDBModalBody>
          <MDBModalFooter>
            <div>
                <MDBBtn size="sm" color="elegant" onClick={handleClose}>CERRAR</MDBBtn>
                {confirmation &&
                <MDBBtn onClick={action} disabled={loading && true} size="sm" color="unique">SI</MDBBtn>}
            </div>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalPage;