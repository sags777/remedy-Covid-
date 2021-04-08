import React from "react";
import { Navbar, Nav, Image } from "react-bootstrap";
import NavImg from "../images/remedyHeader.png";

function Navigation(props) {
  const user = props.usrInfo;
  const token = localStorage.getItem("token");

  const setToken = () => localStorage.setItem(token);
  const tokenDel = () => localStorage.removeItem("token");

  return (
    <Navbar expand="lg" style={{ background: "#5e95d4" }}>
      <Navbar.Brand href={"/user/" + user.username + "/home"}>
        <Image src={NavImg} style={{ maxWidth: "170px" }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="mr-auto"></div>
        <p style={{ color: "white", paddingTop: "14px", marginRight: "20px" }}>
          Welcome, {user.fullname}
        </p>
        <Nav.Link id="navItems" href={"/user/" + user.username + "/home"}>
          Home
        </Nav.Link>
        <Nav.Link
          id="navItems"
          href={"/user/" + user.username + "/profile"}
          onClick={() => setToken()}
        >
          Profile
        </Nav.Link>
        <Nav.Link id="navItems" onClick={() => tokenDel()} href="/login">
          Log Out
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
