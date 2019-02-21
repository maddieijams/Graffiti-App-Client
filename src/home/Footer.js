import React from "react";
import { Row, Button } from "reactstrap";

const Footer = (props) => {

        return (
            <footer>
                <Row>
                    <Button onClick={() => props.toggleCreate()}>Create</Button>
                    <Button onClick={() => props.toggleEdit()}>Edit</Button>
                   
                </Row>
            </footer>
        );
    }


export default Footer;
