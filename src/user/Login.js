import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import APIURL from '../helpers/environment';

class Login extends Component {
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
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ user: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(userInfo => {
            if (userInfo.status === 502){
                alert('Right username, wrong password. Try again!')
            } else if (userInfo.status === 500) {
                alert('We do not recognize you. Try again.')
            } else {
                return userInfo.json()
            .then((json) => this.props.setToken(json.sessionToken))}
        })
        .then((res) => this.props.toggleLogin())
    }

        
    render() {
        const closeBtn = <Button className="close" onClick={this.props.toggleLogin}>&times;</Button>;
        return (
            <div>
                
                <Modal isOpen={true}>
                    <ModalHeader toggle={this.props.toggleLogin} close={closeBtn}><span className="modalTitle">Login</span></ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input id="username" type="text" name="username" placeholder="enter a username" required onChange={this.handleChange} ></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input id="password" type="password" name="password" placeholder="enter a password" required onChange={this.handleChange}></Input>
                            </FormGroup>
                            
                            <center><Button className="modalBtn" type="submit"  color="success">Login</Button></center>
                            
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    };
};

export default Login;