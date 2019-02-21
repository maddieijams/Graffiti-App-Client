import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class CreateModal extends Component {
    constructor(props) {
        super(props)
        this.state= {
            title: '',
            image: '',
            info: '',
            lat: '',
            lng: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCreate = (e) => {
        e.preventDefault()
        fetch('http://localhost:3000/graffiti/create', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
        .then((res) => res.json())
        .then((data) => {
            this.props.fetchGraffiti();
            this.setState({
              title: '',
              image:'',
              info: '',
              lat: '',
              lng: ''  
            })
        })
        console.log(this.state)
    }

    render() {
        return(
            <div>
                <Modal isOpen={true}>
                    <ModalHeader>Create a New Tag!</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleCreate}>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" type="text" name="title" value={this.state.title} onChange={this.handleChange} ></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="image">Image URL</Label>
                                <Input id="image" type="text" name="image" value={this.state.image} onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                            <Label for="info">Know Before You Go</Label>
                                <Input id="info" type="text" name="info" value={this.state.info} onChange={this.handleChange} ></Input>
                            </FormGroup>

                            <FormGroup>
                            <Label for="lat">Latitude</Label>
                                <Input id="lat" type="text" name="lat" value={this.state.lat} onChange={this.handleChange} ></Input>
                            </FormGroup>

                            <FormGroup>
                            <Label for="lng">Longitude</Label>
                                <Input id="lng" type="text" name="lng" value={this.state.lng} onChange={this.handleChange} ></Input>
                            </FormGroup>

                            <Button type="submit">Create</Button>
                            <Button onClick={this.props.toggleCreate}>Close</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

export default CreateModal;