import React, {Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor (props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isLoginModalOpen: false,
            isRegisterModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
    }

    handleLogin(event) {
        this.toggleLoginModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

    }

    handleRegistration(event) {
        event.preventDefault();
        fetch('http://localhost:8000/core/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': this.username.value, 'password': this.password.value})
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                this.setState({
                    loggedIn: true,
                    displayedForm: '',
                    username: json.username
                });
                this.toggleRegisterModal();
            });
    };

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleLoginModal() {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen
        });
    }

    toggleRegisterModal() {
        this.setState({
            isRegisterModalOpen: !this.state.isRegisterModalOpen
        });
    }

    render () {
        return (
            <React.Fragment>

                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                       innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                       innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember"
                                           innerRef={(input) => this.remember = input}  />
                                    Remember me
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isRegisterModalOpen} toggle={this.toggleRegisterModal}>
                    <ModalHeader toggle={this.toggleRegisterModal}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleRegistration}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                       innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                       innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Register</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Navbar dark expand="md">
                    <div className="container">

                        <NavbarToggler onClick={this.toggleNav} />

                        <NavbarBrand className="mr-auto" href="/">
                            <img src="assets/images/pay-logo.jpg" height="75" width="75" alt="Pay Logo" />
                        </NavbarBrand>

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavLink className="nav-link" to="/home">
                                    <span className="fa fa-home fa-lg"> Home</span>
                                </NavLink>
                                <NavLink className="nav-link" to="/aboutus">
                                    <span className="fa fa-info fa-lg"> About Us</span>
                                </NavLink>
                                <NavLink className="nav-link" to="/menu">
                                    <span className="fa fa-list fa-lg"> Menu</span>
                                </NavLink>
                                <NavLink className="nav-link" to="/contactus">
                                    <span className="fa fa-address-card fa-lg"> Contact Us</span>
                                </NavLink>
                            </Nav>
                        </Collapse>

                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Button outline onClick={this.toggleLoginModal}><span className="fa fa-sign-in"></span> Login</Button>{' '}
                                <Button outline onClick={this.toggleRegisterModal}><span className="fa fa-user-plus"></span> Register</Button>
                            </NavItem>
                        </Nav>

                    </div>
                </Navbar>

                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Fast Payments Prototype</h1>
                                <p>Faster Payments Service is an initiative to reduce payment times between customer accounts from three working days that transfers take using the long-established system, to typically a few seconds.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>

            </React.Fragment>
        )
    }
}

export default Header;