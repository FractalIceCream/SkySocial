import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Auth from "../../utils/auth";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import { Modal, Tab, Nav } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { useTheme } from "../../utils/ThemeContext";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [themeState, themeDispatch] = useTheme();

  const handleThemeToggle = () => {
    themeDispatch({ type: 'TOGGLE_THEME', payload: themeState.darkTheme });
  };

  return (
    <>
      <div className="w-full p-2 flex justify-evenly items-center bg-transparent">
      <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/" className="text-2xl">
              skySocial  <i className="fa-solid fa-cloud"></i>
            </Link>
        <div className="p-2">
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setSearchResults={setSearchResults}
          />
        </div>

        <div className="w-md mx-4 p-2 flex justify-evenly">
          <div className="p-4 ">
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
              Home
            </Link>
          </div>
          {Auth.loggedIn() ? (
            <>
              <Nav.Link className="p-4" as={Link} onClick={()=>window.location.href = '/me'}>
                {" "}
                Profile{" "}
              </Nav.Link>
              <Nav.Link className="p-4" onClick={Auth.logout}>
                Logout
              </Nav.Link>{" "}
            </>
          ) : (
            <div className="w-72 flex justify-center  items-center">
              <Nav.Link
                className=""
                onClick={() => setShowModal(true)}
              >
                Login/Sign Up
              </Nav.Link>
            </div>
          )}
          <button onClick={handleThemeToggle}>
          <i className="fa-solid fa-rocket"></i>
          </button>
        </div>
      </div>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default Navbar;
