import React, { useState } from "react";
import LoginImage from "../images/register.png";
import remedyHeader from "../images/remedyHeader.png";
import { Link } from "react-router-dom";
import { Card, Row, Col, Image, Form, Button } from "react-bootstrap";
import axios from "axios";

function Login() {
  const [uname, setUname] = useState("");
  const [pass, setPass] = useState("");
  const [logErrMsg, setLogErrMsg] = useState("");

  const userLogin = () => {
    const userObj = {
      username: uname,
      password: pass,
    };

    axios
      .post("http://localhost:3001/loginAuth", userObj)
      .then((response) => {
        const userRes = response.data;
        if (userRes.status === "ok") {
          setLogErrMsg("");
          localStorage.setItem("token", userRes.token);
          setTimeout(() => {
            window.open("/user/"+userObj.username+"/home", "_self");
          }, 2000);
        } else {
          setLogErrMsg(userRes.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div >
      <Row>
        <Col>
          <Card id="loginCard1">
            <Card.Body style={{ marginLeft: "40px" }}>
              <Card.Title>
                <br />
                <br />
                <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>
                  Nice to see you again!
                </h1>
                <br />
                <br />
              </Card.Title>
              <h3 style={{ fontWeight: "bold" }}>
                Even after taking your vaccine doses,
                <br />
                please remember to wear a mask <br />
                and social distance in public.
                <br />
                If any symptoms get severe,
                <br />
                please see a doctor.
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
                <Card.Title style={{ fontSize: "50px", color: "#5E95D4" }}>
                  <b>Log In</b>
                  <br />
                </Card.Title>
                <p style={{ color: "red" }}>{logErrMsg}</p>
                <br />
                <Form>
                  <Form.Group>
                    <Form.Label>
                      <h4>Username</h4>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      size="lg"
                      placeholder="Enter username"
                      value={uname}
                      onChange={(e) => setUname(e.target.value)}
                    />
                    <Form.Text className="text-muted"></Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                      <h4>Password</h4>
                    </Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      placeholder="Password"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    style={{ background: "#5E95D4" }}
                    block
                    onClick={() => userLogin()}
                  >
                    Login
                  </Button>
                  <br />
                  <div style={{ textAlign: "center" }}>
                    Do not have a account yet?
                    <br />
                    <Link to="/register">Register</Link>
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

export default Login;
