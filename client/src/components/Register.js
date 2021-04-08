import React, { useState } from "react";
import LoginImage from "../images/register.png";
import remedyHeader from "../images/remedyHeader.png";
import { Link } from "react-router-dom";
import { Card, Row, Col, Image, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [uName, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [bDay, setBday] = useState("");
  const [mail, setMail] = useState("");
  const [regErrMsg, setRegErrMsg] = useState("");
  const [showAlert, setAlert] = useState(false);

  const addUser = () => {
    const userObj = {
      fullname: name,
      username: uName,
      password: pass,
      birthday: bDay,
      email: mail,
    };

    axios
      .post("http://localhost:3001/adduser", userObj)
      .then((res) => {
        if (res.data === "unameerror") {
          return setRegErrMsg("*username or email already exists");
        } else if (res.data === "success") {
          var alert = setAlert(true);
          var regMessage = setRegErrMsg("");
          var login = setTimeout(() => {
            window.open("/login", "_self");
          }, 2000);

          return alert && regMessage && login;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Row>
        <Col>
          <Card id="loginCard1">
            <Card.Body style={{ marginLeft: "40px" }}>
              <Card.Title>
                <br />
                <br />
                <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>
                  Vaccines near me
                </h1>
                <br />
                <br />
              </Card.Title>
              <h3 style={{ fontWeight: "bold" }}>
                Make sure not to miss your
                <br />
                vaccines, we alert you <br />
                whenever there is vaccine
                <br />
                available in your neighbourhood!
              </h3>
              <br />
              <br />
              <Image src={LoginImage} style={{ maxWidth: "430px" }} />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <div>
            <Image
              src={remedyHeader}
              style={{
                maxWidth: "300px",
                marginTop: "50px",
                marginLeft: "130px",
              }}
            />
            <Card id="loginCard2">
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "50px",
                    color: "#5E95D4",
                    marginBottom: "25px",
                  }}
                >
                  <b>Register</b>
                  <p
                    style={{
                      color: "red",
                      fontSize: "18px",
                      marginTop: "15px",
                    }}
                  >
                    {regErrMsg}
                  </p>
                </Card.Title>
                <Alert
                  variant="success"
                  show={showAlert}
                  onClose={() => setAlert(false)}
                  dismissible
                >
                  <Alert.Heading
                    style={{ fontSize: "20px", lineHeight: "1.5" }}
                  >
                    Registration Successfull!
                    <br />
                    Redirecting to Login page...
                  </Alert.Heading>
                </Alert>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          <h4>Name</h4>
                        </Form.Label>
                        <Form.Control
                          size="lg"
                          placeholder="Enter fullname"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Text className="text-muted"></Form.Text>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          <h4>Username</h4>
                        </Form.Label>
                        <Form.Control
                          size="lg"
                          placeholder="Enter username"
                          value={uName}
                          onChange={(e) => setUname(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          <h4>Password</h4>
                        </Form.Label>
                        <Form.Control
                          size="lg"
                          type="password"
                          placeholder="Enter password"
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                        />
                        <Form.Text className="text-muted"></Form.Text>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>
                          <h4>Birth Date</h4>
                        </Form.Label>
                        <Form.Control
                          size="lg"
                          type="date"
                          value={bDay}
                          onChange={(e) => setBday(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group>
                    <Form.Label>
                      <h4>Email</h4>
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="email"
                      placeholder="Enter email"
                      value={mail}
                      onChange={(e) => setMail(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    style={{ background: "#5E95D4" }}
                    block
                    onClick={() => addUser()}
                  >
                    Sign Up
                  </Button>
                  <br />
                  <div style={{ textAlign: "center" }}>
                    Already have an account.
                    <br />
                    <Link to="/login">Login</Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
