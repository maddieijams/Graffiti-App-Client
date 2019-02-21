import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Container, Row, Col } from 'reactstrap';
import APIURL from '../helpers/environment';

class UpdateModal extends Component {
    constructor(props){
        super(props);
        this.state= {
            graffiti: []
        }
    }

    componentWillMount() {
        this.getItem()
    }

    getItem = () => {
        fetch(`${APIURL}/graffiti/get/${this.props.id}`, {
            method:'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.sessionToken
            })
        })
        .then((res) => res.json())
        .then((item) => {
            return this.setState({graffiti: item})
        })
        }
    

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    itemUpdate = (e, graffiti) => {
        e.preventDefault()
        fetch(`${APIURL}/graffiti/update/${this.props.id}`, {
            method: 'PUT',
            body: JSON.stringify(graffiti),
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization': this.props.sessionToken
            })
        })
        .then((res) => {
            this.setState({
                graffiti: []
            })
        })
    };

    render() {
    return(
    <div>
                     <Modal isOpen={true}>
                    <ModalHeader>Update </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.itemUpdate} >
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" type="text" name="title"  placeholder={this.state.graffiti.title} onChange={this.handleChange} ></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="image">Image URL</Label>
                                <Input id="image" type="text" name="image"  placeholder={this.state.graffiti.image} onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                            <Label for="info">Know Before You Go</Label>
                                <Input id="info" type="text" name="info"  placeholder={this.state.graffiti.info} onChange={this.handleChange} ></Input>
                            </FormGroup>

                            <FormGroup>
                            <Label for="lat">Latitude</Label>
                                <Input id="lat" type="text" name="lat" placeholder={this.state.graffiti.lat} onChange={this.handleChange} ></Input>
                            </FormGroup>

                            <FormGroup>
                            <Label for="lng">Longitude</Label>
                                <Input id="lng" type="text" name="lng"  placeholder={this.state.graffiti.lng} onChange={this.handleChange} ></Input>
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

export default UpdateModal;