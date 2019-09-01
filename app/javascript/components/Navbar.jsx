import React, { Component } from "react";
import logo from '../img/logoFabrica.png'
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBBtn } from "mdbreact";


const styles = {
    img:{
        width: '40px'
    }
}

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  const { user, handleSignOut } = this.props
  return (
      <MDBNavbar color="elegant-color" dark expand="md">
        <MDBNavbarBrand>
          <img src={logo} style={styles.img}/>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/">Inicio</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Quienes Somos</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Contacto</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Administración</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          {user.data.user ? 
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink to="/">Bienvenid@ {user.data.user.email}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBBtn onClick={handleSignOut} size="sm" color="unique">Cerrar Sesión</MDBBtn>
            </MDBNavItem>
          </MDBNavbarNav>
          : 
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/signup">
                <MDBBtn size="sm" color="unique">Registrarse</MDBBtn>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="/login">
                <MDBBtn size="sm" color="unique">Iniciar Sesión</MDBBtn>
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>}
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavbarPage;