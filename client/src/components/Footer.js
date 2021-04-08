import React from "react";
import { Image } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import NavImg from "../images/remedyNav.png";
import Email from "../images/Email logo.png";
import Facebook from "../images/facebook logo.png";
import Instagram from "../images/instagram logo.png";
import LinkedIn from "../images/LinkedIn logo.png";

function Footer() {
  return (
    <div id="footer">
      <div className="container-fluid">
        <h3 style={{ paddingTop: "60px", color: "white", paddingLeft: "80px" }}>
          ©Copyright <Image src={NavImg} style={{ maxWidth: "170px" }} />
        </h3>
        <h3>
          <Image src={Email} style={{ maxWidth: "40px" }} />{" "}
          <Image src={Facebook} style={{ maxWidth: "40px" }} />{" "}
          <Image src={Instagram} style={{ maxWidth: "40px" }} />{" "}
          <Image src={LinkedIn} style={{ maxWidth: "40px" }} />
        </h3>
      </div>
    </div>
  );
}

export default Footer;
