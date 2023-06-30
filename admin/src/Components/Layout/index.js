import React from "react";
import Header from "../Header";
import { Container,Row,Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import './style.css'
const Layout = (props) => {
  return (
    <>
      <Header />
      {
        props.sidebar ? 
        <Container fluid>
        <Row>
          <Col md={2} className="sidebar">
            <ul>
              <li><NavLink to={'/'}>Home</NavLink></li>
              <li><NavLink to={'/addcar'}>Add Car</NavLink></li>
              <li><NavLink to={'/cars'}>View Cars</NavLink></li>
              <li><NavLink to={'/metamask'}>Create Tokens</NavLink></li>
            </ul>
          </Col>
          <Col md={10} style={{marginLeft: 'auto', paddingTop:'60px'}} >{props.children}</Col>
        </Row>
      </Container>:
        props.children
      }
    </>
  );
};

export default Layout;
