import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { handleLogin, handleRegistration, handleLogout,
    toggleLoginModal, toggleRegisterModal } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { Errors, Control, Form } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        auth: state.auth,
        modals: state.modals,
        login: state.login,
        register: state.register
    }
};

const mapDispatchToProps = dispatch => ({
    toggleLoginModal: () => { dispatch(toggleLoginModal()) },
    toggleRegisterModal: () => { dispatch(toggleRegisterModal()) },
    handleLogin: (username, password) => { dispatch(handleLogin(username, password)) },
    handleRegistration: (username, password) => { dispatch(handleRegistration(username, password)) },
    handleLogout: () => { dispatch(handleLogout()) }
});

const required = (val) => val && val.length;
const minLength = (len) => (val) => val && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <=len);

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {

        const RenderNavButtons = ({isLoggedIn, username}) => {

            if (!isLoggedIn) {
                return (
                    <NavItem>
                        <Button outline onClick={this.props.toggleLoginModal}><span className="fa fa-sign-in"></span> Login</Button>{' '}
                        <Button outline onClick={this.props.toggleRegisterModal}><span className="fa fa-user-plus"></span> Register</Button>
                    </NavItem>
                )
            }
            else
                return (
                    <NavItem>
                        <Button outline onClick={this.props.handleLogout}><span className="fa fa-sign-in"></span> Logout {username}</Button>
                    </NavItem>
                )
        };

        const ErrMess = ({errMess}) => {
            if (errMess)
                return (
                  <div className="mb-2 text-danger">{errMess}</div>
                );
            else
                return null;
        };

        const CommonForm = () => {
          return (
              <>
                  <Row className="form-group">
                      <Label htmlFor="username" md={2}>Username: </Label>
                      <Col md={8}>
                          <Control.text model=".username" id="username"
                                        name="username" type="text"
                                        className="form-control"  validators={{
                              required, minLength: minLength(3), maxLength: maxLength(15)
                          }}/>
                          <Errors className="text-danger" model=".username"
                                  show="touched" messages={{
                              required: 'Required ',
                              minLength: 'Must be greater than 2 characters ',
                              maxLength: 'Must be 15 characters or less '
                          }}/>
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="password" md={2}>Password: </Label>
                      <Col md={8}>
                          <Control.text model=".password" id="password"
                                        name="password" type="password"
                                        className="form-control"  validators={{required, minLength: minLength(6)}}/>
                          <Errors className="text-danger" model=".password"
                                  show="touched" messages={{
                              required: 'Required',
                              minLength: 'Must be greater than 5 characters'
                          }}/>
                      </Col>
                  </Row>
              </>
          );
        };

        return (
            <>
                <Modal isOpen={this.props.modals.isLoginOpen} toggle={this.props.toggleLoginModal}>
                    <ModalHeader toggle={this.props.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(values) => this.props.handleLogin(values.username, values.password)} model="loginForm">
                            <CommonForm />
                            <ErrMess errMess={this.props.login.errMess}/>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.props.modals.isRegisterOpen} toggle={this.props.toggleRegisterModal}>
                    <ModalHeader toggle={this.props.toggleRegisterModal}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(values) => this.props.handleRegistration(values.username, values.password)} model="registerForm">
                            <CommonForm />
                            <ErrMess errMess={this.props.register.errMess}/>
                            <Button type="submit" value="submit" color="primary">Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Navbar dark expand="md">
                    <div className="container">

                        <NavbarToggler onClick={this.toggleNav} />

                        <NavbarBrand className="mr-5">
                            <img src="/assets/images/pay-logo.jpg" height="75" width="75" alt="Pay Logo" />
                        </NavbarBrand>

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavLink className="nav-link" to="/accounts/">
                                    <span className="fa fa-info fa-lg"> Accounts</span>
                                </NavLink>
                                <NavLink className="nav-link" to="/transfer/">
                                    <span className="fa fa-credit-card fa-lg"> Transfer</span>
                                </NavLink>
                                <NavLink className="nav-link" to="/history/">
                                    <span className="fa fa-list fa-lg"> History</span>
                                </NavLink>
                            </Nav>
                        </Collapse>

                        <Nav className="ml-auto" navbar>
                            <RenderNavButtons isLoggedIn={this.props.auth.isLoggedIn} username={this.props.auth.username}/>
                        </Nav>

                    </div>
                </Navbar>

                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h3>Fast Payments Prototype</h3>
                                <p>Faster Payments Service is an initiative to reduce payment times</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));