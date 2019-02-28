import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Container, Row, Col} from 'reactstrap';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import APIURL from '../helpers/environment';

const mapStyles = {
  width: '95%',
  height: '95%',
  borderRadius: '1em'
};

const imgStyle = {
  height: '95%',
  width: '95%',
  borderRadius: '1em'
}

class EditModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userGraffiti: [this.props.userGraffiti],
      graffitiItem: ''

    }
  }

  getItem = (event) => {
    console.log(event.target.id)
    fetch(`${APIURL}/graffiti/get/${event.target.id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.sessionToken
      })
    })
      .then((res) => res.json())
      .then((item) => {
        console.log(item)
        this.setState({ graffitiItem: item }, () => console.log(this.state.graffitiItem[1]))
      })
      .then(() => this.props.handleUpdate())
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
    

  itemUpdate = (e) => {
    e.preventDefault()
    console.log(this.state.userGraffiti.title)
    fetch(`${APIURL}/graffiti/update/${e.target.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: this.state.title,
        image: this.state.image,
        info: this.state.info,
        lat: this.state.lat,
        lng: this.state.lng
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.sessionToken
      })
    })
      .then((res) => {
        this.props.toggleUpdate()
        this.props.editClick()
        this.props.fetchGraffiti()
      })

  };

  deleteItem = (e) => {
    fetch(`${APIURL}/graffiti/delete/${e.target.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ userGraffiti: { id: e.target.id } }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.props.sessionToken
      })
    })
    .then((res) => this.props.getAfterDelete())
  }

  render() {
    const closeBtn = <Button className="close" onClick={this.props.toggleEdit}>&times;</Button>;
    const closeUpdate = <Button className="close" onClick={this.props.handleUpdate}>&times;</Button>;
    return (
      <React.Fragment>
        {this.props.editShowing ?
          <div >
            <Modal className="editDisplay" isOpen={true}>
              <ModalHeader  toggle={this.props.toggleEdit} close={closeBtn}><span className="modalTitle">Edit Your Tags</span></ModalHeader>
              {this.props.userGraffiti.length > 0 ?
              <ModalBody>
                {this.props.userGraffiti.map((el, index) => {

                  return (
                    <Container className="editModal" key={index}>
                      <Row>
                        <Col className='text-center'>
                          <h2 className="itemTitle">{el.title}</h2>
                        </Col>
                      </Row>
                      <Row>
                        <Col className='text-center'>
                          <p>{el.info}</p>
                        </Col>
                      </Row>
                      <Row className='text-center'>
                        <Col className='text-center' >
                          <Map
                            google={window.google}
                            zoom={14}
                            style={mapStyles}

                            initialCenter={{
                              lat: el.lat,
                              lng: el.lng
                            }} />
                        </Col>
                        <Col className='text-center' >
                          <img src={el.image} style={imgStyle} alt="something" />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                         
                            <Button className="editBtn" onClick={this.deleteItem} id={this.props.userGraffiti[index].id}>Delete</Button>
                            <Button className="editBtn" onClick={this.getItem} id={this.props.userGraffiti[index].id} >Update</Button>
                            
                        </Col>
                      </Row>

                    </Container>
                  )
                })}

              </ModalBody>
              : <div><ModalBody><p><br/>You don't have any tags yet.</p> </ModalBody> <Button className="modalBtn" onClick={this.props.editCreateToggle}><h1>Create?</h1></Button></div>}
            </Modal>
          </div>
          : null}
        <div>
          {this.props.updateShowing ?
            <Modal isOpen={true} >
              <ModalHeader toggle={this.props.handleUpdate} close={closeUpdate}><span className="modalTitle">Update Your Tag</span></ModalHeader>
             
              <ModalBody>
                
                    <Form  onSubmit={this.itemUpdate} >
                      <FormGroup>
                        <Label for="title">Title</Label>
                        <Input id="title" type="text" name="title" defaultValue={this.state.graffitiItem.title} onChange={this.handleChange} ></Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="image">Image URL</Label>
                        <Input id="image" type="text" name="image" defaultValue={this.state.graffitiItem.image} onChange={this.handleChange}></Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="info">Know Before You Go</Label>
                        <Input id="info" type="text" name="info" defaultValue={this.state.graffitiItem.info} onChange={this.handleChange} ></Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="lat">Latitude</Label>
                        <Input id="lat" type="text" name="lat" defaultValue={this.state.graffitiItem.lat} onChange={this.handleChange} ></Input>
                      </FormGroup>

                      <FormGroup>
                        <Label for="lng">Longitude</Label>
                        <Input id="lng" type="text" name="lng" defaultValue={this.state.graffitiItem.lng} onChange={this.handleChange} ></Input>
                      </FormGroup>

                      <Button className="modalBtn" type="submit" onClick={this.itemUpdate} id={this.state.graffitiItem.id} >Update</Button>

                    </Form>
          
              </ModalBody>
            </Modal>
            : null}
        </div>

      </React.Fragment>
    )
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBKSa_jZJbPCRrzxCTMp9s-tyJXnttO5c8',

})(EditModal);