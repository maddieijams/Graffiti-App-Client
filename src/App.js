import React, { Component } from 'react';
import Sitebar from './home/NavBar';
import './App.css';
import Login from './user/Login';
import Signup from './user/Signup';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Container, Row, Col, Button} from 'reactstrap';
import CreateModal from './home/CreateModal';
import EditModal from './home/EditModal';
import APIURL from '../src/helpers/environment';

const imgStyle = {
  width: '550px',
  height: '500px',
  padding: '2em',
  marginLeft: '2em'
}

const mapStyles = {
  width: '90%',
  height: '90%',
  marginLeft: '2em',
  marginTop: '2em',
  padding: '2em'

};



class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionToken: '',
      loginShowing: false,
      signupShowing: false,
      createShowing: false,
      toggleEdit: false,
      toggleUpdate: false,
      graffiti: []
    }
  }

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token })
    }
    this.fetchGraffiti()
  }

  fetchGraffiti = () => {
    fetch(`${APIURL}/home`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((graffiti) => this.setState({ graffiti: graffiti },
        () => console.log(this.state.graffiti)
      )
      )
  }

  setSessionState = (token) => {
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token })
  }

  logoutFunc = (e) => {
    this.setState({
      sessionToken: '',
    });
    localStorage.clear();
  }

  toggleSignup = (e) => {
    this.setState({
      signupShowing: !this.state.signupShowing
    })
  }

  toggleLogin = (e) => {
    this.setState({
      loginShowing: !this.state.loginShowing
    })
  }

  toggleCreate = (e) => {
    this.setState({
      createShowing: !this.state.createShowing
    })
  }

  
  toggleEdit = (e) => {
    this.setState({
      editShowing: !this.state.editShowing
    })
  }

  toggleUpdate = (e) => {
    this.setState({
      updateShowing: !this.state.updateShowing
    })
  }


  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <div>
            <Sitebar logout={this.logoutFunc} toggleLogin={this.toggleLogin} toggleSignup={this.toggleSignup} sessionToken={this.state.sessionToken} />
            {this.state.loginShowing ? <Login setToken={this.setSessionState} toggleLogin={this.toggleLogin} /> : null}
            {this.state.signupShowing ? <Signup setToken={this.setSessionState} toggleSignup={this.toggleSignup} /> : null}
          </div>

          {this.state.graffiti.map((el, index) => (
            <Container key = {index}>
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
                <Col md="6" sm="12">
                  <Map
                    google={window.google}
                    zoom={14}
                    style={mapStyles}

                    initialCenter={{
                      lat: el.lat,
                      lng: el.lng
                    }} />
                </Col>
                <Col md="6" sm="12">
                  <img src={el.image} style={imgStyle} alt="something" />
                </Col>
              </Row>


            </Container>
          ))}

          {this.state.createShowing ? <CreateModal toggleCreate={this.toggleCreate} fetchGraffiti={this.fetchGraffiti} sessionToken={this.state.sessionToken} /> : null}

            <EditModal toggleEdit={this.toggleEdit} toggleUpdate={this.toggleUpdate} sessionToken={this.state.sessionToken} editShowing={this.state.editShowing} updateShowing={this.state.updateShowing} /> 
          
        </div>

        <footer>
                <Row>
                    <Button onClick={this.toggleCreate}>Create</Button>
                    <Button onClick={this.toggleEdit}>Edit</Button>
                   
                </Row>
            </footer>
      </React.Fragment>

    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBKSa_jZJbPCRrzxCTMp9s-tyJXnttO5c8',

})(App);
