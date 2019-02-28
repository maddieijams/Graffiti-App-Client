import React, { Component } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button} from 'reactstrap';
import Spray from '../assets/spray4.png'

const sticky = {
    position: 'fixed'
}

class Sitebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    <NavbarBrand className="title"><img src={Spray} className="spray" alt="spray"/>Tagged!</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        
                        {this.props.sessionToken === '' ? null :
                            <NavItem >
                                <Button className="navBtn" onClick={this.props.toggleCreate}><h1>Create</h1></Button>
                            </NavItem> 
                        }
                        {this.props.sessionToken === '' ? null :
                            <NavItem>
                                <Button className="navBtn" onClick={() => this.props.editClick()}><h1>Edit</h1></Button>
                            </NavItem>
                        }
                        
                        
                                {this.props.sessionToken === '' ?
                            <NavItem>
                                    <Button className="navBtn" onClick={() => this.props.toggleSignup()}><h1>Signup</h1></Button>
                            </NavItem>
                                    : null}
                                {this.props.sessionToken === '' ?
                            <NavItem>
                                    <Button className="navBtn" onClick={() => this.props.toggleLogin()}><h1>Login</h1></Button>
                            </NavItem>
                                    : null}
                            {this.props.sessionToken === '' ? null :
                                <NavItem>
                                    <Button className="navBtn" onClick={this.props.logout}><h1>Logout</h1></Button>
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