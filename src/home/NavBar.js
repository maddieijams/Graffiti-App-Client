import React, {Component} from 'react';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button} from 'reactstrap';

    const sticky = {
        position: 'fixed'
    }

class Sitebar extends Component {
    constructor(props) {
        super(props);
        this.state={
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <Navbar className="nav" style={sticky} light expand="sm">
                    <NavbarBrand href="/">Tagged</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar> 
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Button onClick={() => this.props.toggleSignup()}>Signup</Button>
                        </NavItem>
                        <NavItem>
                            <Button onClick={() => this.props.toggleLogin()}>Login</Button>
                        </NavItem>
                        {this.props.sessionToken === '' ? null :
                            <NavItem>
                          <Button onClick={this.props.logout}>Logout</Button>
                            </NavItem>
                        }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Sitebar;