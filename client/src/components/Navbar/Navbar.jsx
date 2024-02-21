import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { Modal, Tab, Nav } from 'react-bootstrap';



const Navbar = () => {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="">
        <Link to="Home" className="">  Home    </Link>
        {Auth.loggedIn() ? (
          <>
            <Nav.Link as={Link} to="/Profile">  Profile </Nav.Link>
            <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>{" "}   {/* Conditionally Renders this Logout Button if the user is already logged in */}
          </>
        ) : (
          <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
        )}
      </nav>

      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>










      
     
</>
  )};

export default Navbar;
