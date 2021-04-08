import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import {
  Card,
  Row,
  Col,
  Alert,
  Form,
  InputGroup,
  Button,
  Image,
  Accordion,
} from "react-bootstrap";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import ErrorPage from "./ErrorPage";
import Covid from "../images/covid.png";
import Symptoms from "../images/COVID-symptoms.png";
import CovidVaccine from "../images/covidVaccine.png";

function UserHome(props) {
  const [logged, setLogged] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [globalCases, setGlobalCases] = useState([]);
  const [countryCases, setCountryCases] = useState([]);

  useEffect(() => {
    const userObj = {
      username: props.match.params.id,
      token: localStorage.getItem("token"),
    };

    axios
      .post("http://localhost:3001/getuser", userObj)
      .then((res) => {
        if (res.data.status !== "err") {
          setLogged(true);
          setUserInfo(res.data[0]);
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("https://coronavirus-19-api.herokuapp.com/all")
      .then((res) => {
        setGlobalCases(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeCountry = (e) => {
    setCountryCases(e.target.value);
  };

  const covCases = (e) => {
    axios
      .get(
        `https://coronavirus-19-api.herokuapp.com/countries/${e.target.value}`
      )
      .then((res) => {
        setCountryCases(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (logged) {
    return (
      <div>
        <Navigation usrInfo={userInfo} />
        <div className="container-fluid" id="home">
          <div>
            <Row>
              <Col>
                <Card
                  bg="dark"
                  style={{
                    color: "white",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                >
                  <Card.Header>
                    <h2>
                      <Icon.EmojiFrownFill /> Global Cases
                    </h2>
                  </Card.Header>
                  <Card.Body>
                    <h3>
                      <Icon.GraphUp /> {globalCases.cases}
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  bg="danger"
                  style={{
                    color: "white",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                >
                  <Card.Header>
                    <h2>
                      <Icon.EmojiDizzyFill /> Total Deaths
                    </h2>
                  </Card.Header>
                  <Card.Body>
                    <h3>
                      <Icon.GraphUp /> {globalCases.deaths}
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card
                  bg="success"
                  style={{
                    color: "white",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                >
                  <Card.Header>
                    <h2>
                      <Icon.EmojiLaughingFill /> Total Recovered
                    </h2>
                  </Card.Header>
                  <Card.Body>
                    <h3>
                      <Icon.GraphUp /> {globalCases.recovered}
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
          <div style={{ marginTop: "30px" }}>
            <Alert variant="primary">
              <h5>
                <Row>
                  <InputGroup className="mb-3" size="lg">
                    <Form.Control
                      placeholder="Enter Country"
                      aria-describedby="basic-addon2"
                      onChange={(e) => onChangeCountry(e)}
                    />
                    <InputGroup.Append>
                      <Button
                        id="basic-addon2"
                        variant="secondary"
                        value={countryCases}
                        onClick={(e) => covCases(e)}
                      >
                        Search
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <Col>
                    Country:&ensp;
                    {countryCases.country}
                    <Icon.ArrowBarRight />
                  </Col>
                  <Col>
                    Total Cases:&ensp;
                    {countryCases.cases}
                  </Col>
                  <Col>
                    Total Deaths:&ensp;
                    {countryCases.deaths}
                  </Col>
                  <Col>
                    Cases Today:&ensp;
                    {countryCases.todayCases}
                  </Col>
                  <Col>
                    Deaths Today:&ensp;
                    {countryCases.todayDeaths}
                  </Col>
                </Row>
              </h5>
            </Alert>
          </div>
          <div style={{ marginTop: "30px" }}>
            <Alert variant="primary">
              <h4>About COVID-19</h4>
            </Alert>
          </div>
          <div id="aboutCovid">
            <Row>
              <Col>
                <Image src={Covid} style={{ width: "450px" }} />
              </Col>
              <Col style={{ paddingTop: "20px" }}>
                <h4>
                  <b>What is COVID-19?</b>
                  <br />
                  <br />
                  Coronavirus disease 2019 (COVID-19) is caused by a new
                  coronavirus first identified in Wuhan, China, in December
                  2019. Because it is a new virus, scientists are learning more
                  each day. Although most people who have COVID-19 have mild
                  symptoms, COVID-19 can also cause severe illness and even
                  death. Some groups, including older adlits and people who have
                  certain underlying medical conditions, are at increased risk
                  of severe illness.
                </h4>
              </Col>
            </Row>
            <Row style={{ paddingTop: "80px" }}>
              <Col style={{ paddingTop: "30px" }}>
                <h4>
                  <b>What are COVID-19 symptoms?</b>
                  <br />
                  <br />
                  People with COVID-19 have had a wide range of symptoms
                  reported – ranging from mild symptoms to severe illness.
                  Symptoms may appear 2-14 days after exposure to the virus.
                  People with these symptoms may have COVID-19:
                </h4>
                <Accordion>
                  <Card>
                    <Card.Header style={{ background: "#5e95d4" }}>
                      <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <h4 style={{ color: "white" }}>Symptoms</h4>
                      </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <h5>
                          <ul>
                            <li>Fever or chills</li>
                            <li>Cough</li>
                            <li>Shortness of breath or difficlity breathing</li>
                            <li>Fatigue</li>
                            <li>Muscle or body aches</li>
                            <li>Headache</li>
                            <li>New loss of taste or smell</li>
                            <li>Sore throat</li>
                            <li>Congestion or runny nose</li>
                            <li>Nausea or vomiting</li>
                            <li>Diarrhea</li>
                          </ul>
                        </h5>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </Col>
              <Col>
                <Image
                  src={Symptoms}
                  style={{ width: "350px", paddingLeft: "50px" }}
                />
              </Col>
            </Row>
            <Row style={{ paddingTop: "80px" }}>
              <Col>
                <Image
                  src={CovidVaccine}
                  style={{ width: "350px", paddingTop: "40px" }}
                />
              </Col>
              <Col style={{ paddingTop: "20px" }}>
                <h4>
                  <b>What are some COVID vaccines?</b>
                  <br />
                  <br />
                  As COVID-19 vaccines are authorized and then recommended for
                  use in the United States, it will be important to understand
                  what is known about each vaccine.CDC will provide information
                  on who is and is not recommended to receive each vaccine and
                  what to expect after vaccination, as well as ingredients,
                  safety, and effectiveness. Currently, three vaccines are
                  authorized and recommended to prevent COVID-19: <br />
                  <br />
                  <a href="https://www.pfizer.com/">Pfizer - BioNTech</a>
                  <br /> <a href="https://www.modernatx.com/">Moderna</a>
                  <br />
                  <a href="https://www.jnj.com/">Johnson & Johnson/Janssen</a>
                </h4>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }
}

export default UserHome;
