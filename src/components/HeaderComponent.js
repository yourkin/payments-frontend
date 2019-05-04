import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { clearAuthData, purgeAccounts, purgeUserData, manageLogin, manageRegistration,
    purgeTransactions, toggleLoginModal, toggleRegisterModal } from '../redux/ActionCreators';
import { connect } from 'react-redux';

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
    manageLogin: (username, password) => { dispatch(manageLogin(username, password)) },
    manageRegistration: (username, password) => { dispatch(manageRegistration(username, password)) },
    clearAuthData: () => { dispatch(clearAuthData()) },
    purgeUserData: () => { dispatch(purgeUserData()) },
    purgeAccounts: () => { dispatch(purgeAccounts()) },
    purgeTransactions: () => { dispatch(purgeTransactions()) }
});

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleRegistration(event) {
        event.preventDefault();
        this.props.manageRegistration(this.username.value, this.password.value)
    };

    handleLogin(event) {
        event.preventDefault();
        this.props.manageLogin(this.username.value, this.password.value)
    };

    handleLogout() {
        this.props.clearAuthData();
        this.props.purgeUserData();
        this.props.purgeTransactions();
        this.props.purgeAccounts();
    };

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
                        <Button outline onClick={this.handleLogout}><span className="fa fa-sign-in"></span> Logout {username}</Button>
                    </NavItem>
                )
        };

        return (
            <React.Fragment>

                <Modal isOpen={this.props.modals.isLoginOpen} toggle={this.props.toggleLoginModal}>
                    <ModalHeader toggle={this.props.toggleLoginModal}>Login</ModalHeader>
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
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.props.modals.isRegisterOpen} toggle={this.props.toggleRegisterModal}>
                    <ModalHeader toggle={this.props.toggleRegisterModal}>Register</ModalHeader>
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

            </React.Fragment>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));