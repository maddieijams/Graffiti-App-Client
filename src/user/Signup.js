import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import APIURL from '../helpers/environment';

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
        fetch(`${APIURL}/user/signup`, {
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
            this.props.toggleSignup()
    }
    
    render() {
        const closeBtn = <Button className="close" onClick={this.props.toggleSignup}>&times;</Button>;
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader toggle={this.props.toggleSignup} close={closeBtn}><span className="modalTitle">Signup</span></ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input id="username" type="text" name="username" required placeholder="enter a username" onChange={this.handleChange}  ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input id="su_password" type="password" name="password" minLength='5' required placeholder="enter a password" onChange={this.handleChange} ></Input>
                            </FormGroup>
                            
                            <center><Button className="modalBtn" type="submit" color="success">Create User</Button></center>
                            
                            
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default Signup;