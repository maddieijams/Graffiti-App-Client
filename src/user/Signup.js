import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            body: JSON.stringify({ user: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        })
            .then((res) => res.json())
            .then((userInfo) => {
                this.props.setToken(userInfo.sessionToken)
            })
    }
    
    render() {
        const closeBtn = <Button className="close" onClick={this.props.toggleSignup}>&times;</Button>;
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader toggle={this.props.toggleSignup} close={closeBtn}>Signup</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input id="username" type="text" name="username" value={this.state.username} placeholder="enter a username" onChange={this.handleChange}  ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input id="su_password" type="password" name="password" value={this.state.password} placeholder="enter a password" onChange={this.handleChange} ></Input>
                            </FormGroup>
                            <ModalFooter>
                            <Button type="submit" onClick={this.props.toggleSignup}color="success">Create User</Button>
                            
                            </ModalFooter>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default Signup;