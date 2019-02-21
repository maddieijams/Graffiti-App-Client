import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Container, Row, Col } from 'reactstrap';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import APIURL from '../helpers/environment';

const mapStyles = {
  width: '200px',
  height: '200px',
  padding: '0.5em'

};

class EditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      graffiti: [],

    }
  }

  componentDidMount() {
    fetch(`${APIURL}/graffiti/getall`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.sessionToken
      })
    })
      .then((res) => res.json())
      .then((graffiti) => this.setState({ graffiti: graffiti },
        () => console.log(this.state)
      ))
  }


  getItem = () => {
    fetch(`${APIURL}/graffiti/get/${this.props.id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.sessionToken
      })
    })
      .then((res) => res.json())
      .then((item) => {
        return this.setState({ graffiti: item })
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
        'Content-Type': 'application/json',
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
    const closeBtn = <Button className="close" onClick={this.props.toggleEdit}>&times;</Button>;
    return (
      <React.Fragment>
        <div>
          {this.props.editShowing ? 
        <Modal isOpen={true}>
          <ModalHeader toggle={this.props.toggleEdit} close={closeBtn}>Edit Your Tags</ModalHeader>
          <ModalBody>
            {this.state.graffiti.map((el, index) => {
             return(
              <Container className="editModal" key={index}>
                <Row>
                  <Col className='text-center'>
                    <h2>{el.title}</h2>
                  </Col>
                </Row>
                <Row>
                  <Col className='text-center'>
                    {el.info}
                  </Col>
                </Row>
                <Row>
                  <Col sm="2">
                    <Map
                      google={window.google}
                      zoom={14}
                      style={mapStyles}

                      initialCenter={{
                        lat: el.lat,
                        lng: el.lng
                      }} />
                  </Col>
                  <Col sm="2">
                    <img src={el.image} alt="something" />
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <br />
                    <Button id={el.id}>Delete</Button>
                    <Button onClick={this.toggleUpdate} id={el.id}>Update</Button>
                    <br />
                  </Col>
                </Row>

              </Container>
              
            )})}

          </ModalBody>
      </Modal>
      : null }

      </div>
      {this.props.updateShowing ? 
            <Modal isOpen={true} toggle={this.toggleUpdate} onOpened={this.getItem} >
              <ModalHeader>Update </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.itemUpdate} >
                  <FormGroup>
                    <Label for="title">Title</Label>
                    <Input id="title" type="text" name="title" placeholder={this.state.graffiti.title} onChange={this.handleChange} ></Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="image">Image URL</Label>
                    <Input id="image" type="text" name="image" placeholder={this.state.graffiti.image} onChange={this.handleChange}></Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="info">Know Before You Go</Label>
                    <Input id="info" type="text" name="info" placeholder={this.state.graffiti.info} onChange={this.handleChange} ></Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="lat">Latitude</Label>
                    <Input id="lat" type="text" name="lat" placeholder={this.state.graffiti.lat} onChange={this.handleChange} ></Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="lng">Longitude</Label>
                    <Input id="lng" type="text" name="lng" placeholder={this.state.graffiti.lng} onChange={this.handleChange} ></Input>
                  </FormGroup>

                  <Button type="submit" onClick={this.props.toggleCreate} >Create</Button>
                  <Button >Close</Button>
                </Form>
              </ModalBody>
            </Modal>
            : null }
            

            </React.Fragment>
    )
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBKSa_jZJbPCRrzxCTMp9s-tyJXnttO5c8',

})(EditModal);