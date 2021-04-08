import React, { useEffect, useState } from "react";
import {
  Image,
  Card,
  Form,
  Tabs,
  Tab,
  Modal,
  Button,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import Navigation from "./Navigation";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";
import ErrorPage from "./ErrorPage";

function UserProfile(props) {
  const [logged, setLogged] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [vaccine, setVaccine] = useState([]);
  const [key, setKey] = useState("about");
  const [zip, setZip] = useState("null");
  const [radius, setRadius] = useState("10");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState("Delete this account");
  const [delVariant, setDelVariant] = useState("danger");

  const [picUploadModal, setPicUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [fileLabel, setFileLabel] = useState("Select a file");

  const [editInfoModal, setEditInfoModal] = useState(false);

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
          setProfilePhoto(res.data[0].profilePic);
          axios
            .post("http://localhost:3001/vaccines", {
              zip: res.data[0].zip,
              radius: radius,
            })
            .then((vacc) => {
              setVaccine(vacc.data.providers);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangePhoto = (e) => {
    setUploadFile(e.target.files[0]);
    setFileLabel(e.target.files[0].name);
  };

  const onEditInfo = () => {
    setEditInfoModal(true);
  };

  const onChangeInfo = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeZip = (e) => {
    setZip(e.target.value);
  };

  const onChangeRadius = (e) => {
    setRadius(e.target.value);
  };

  const vaccines = vaccine.map((locations) => {
    return (
      <div id="vaccineItem" key={locations.guid}>
        <Card>
          <Card.Body>
            <Row>
              <Col size="lg">
                <Card.Title>
                  <h4>{locations.name}</h4>
                </Card.Title>
                <p>
                  {locations.address1}, {locations.city}, {locations.zip}
                </p>
                <p>
                  <Icon.TelephoneFill /> {locations.phone}
                </p>
              </Col>
              <Col size="sm">
                <h4>Distance: {locations.distance} Miles</h4>
                <h4 style={{ marginTop: "20px" }}>
                  Availablity:{" "}
                  {locations.in_stock === true ? (
                    <Icon.ToggleOn
                      style={{ width: "40px", height: "40px", fill: "green" }}
                    />
                  ) : (
                    <Icon.ToggleOff
                      style={{ width: "40px", height: "40px", fill: "grey" }}
                    />
                  )}
                </h4>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  });

  const onSubmitPhoto = async () => {
    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("username", userInfo.username);

    axios
      .post("http://localhost:3001/uploadProfilePic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(formData);
      })
      .catch((err) => {
        console.log(err);
      });

    setPicUploadModal(false);
  };

  const onSubmitInfo = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/updateUser", userInfo).catch((err) => {
      console.log(err);
    });

    setEditInfoModal(false);
  };

  const vaccineSearch = (e) => {
    axios
      .post("http://localhost:3001/vaccines", { zip: zip, radius: radius })
      .then((vacc) => {
        setVaccine(vacc.data.providers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = () => {
    setDeleteMsg("Account is being deactivated...");
    setDelVariant("secondary");
    axios
      .post("http://localhost:3001/deleteUser", { username: userInfo.username })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      window.open("/login", "_self");
    }, 2000);
  };

  if (logged) {
    return (
      <div>
        <Modal
          id="profilePic"
          show={picUploadModal}
          onHide={() => setPicUploadModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>Upload a profile photo</Modal.Header>
          <Modal.Body>
            <Form>
              <Form.File
                id="custom-file"
                label={fileLabel}
                accept="image/*"
                onChange={onChangePhoto}
                custom
              />
            </Form>
            <br />
            <Button className="btn btn-success" block onClick={onSubmitPhoto}>
              Upload
            </Button>
          </Modal.Body>
        </Modal>

        <Modal
          show={editInfoModal}
          aria-labelledby="contained-modal-title-vcenter"
          onHide={() => setEditInfoModal(false)}
          centered
        >
          <Modal.Header
            style={{ backgroundColor: "#5e95d4", color: "white" }}
            backdrop="static"
          >
            <h2>Edit Info</h2>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Row>
                  <Col>
                    <h4 style={{ paddingTop: "10px" }}>
                      <Icon.CalendarFill /> Your Birthday{" "}
                    </h4>
                  </Col>
                  <Col>
                    <Form.Control
                      type="date"
                      size="lg"
                      value={userInfo.birthday}
                      disabled
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <h4 style={{ paddingTop: "3px" }}>
                      <Icon.Envelope /> Email:
                    </h4>
                  </Col>
                  <Col>
                    <h4>{userInfo.email}</h4>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <h4 style={{ paddingTop: "3px" }}>
                      <Icon.Mailbox2 /> Address:
                    </h4>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      size="lg"
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                      name="address"
                      onChange={onChangeInfo}
                      placeholder="Enter address"
                      value={userInfo.address || ""}
                    />
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <h4 style={{ paddingTop: "3px" }}>
                      <Icon.MapFill /> State:
                    </h4>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      size="lg"
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                      name="state"
                      onChange={onChangeInfo}
                      placeholder="Enter state"
                      value={userInfo.state || ""}
                    />
                  </Col>
                </Row>
                <br />

                <Row>
                  <Col>
                    <h4 style={{ paddingTop: "3px" }}>
                      <Icon.Geo /> Zip:
                    </h4>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      size="lg"
                      contentEditable="true"
                      suppressContentEditableWarning={true}
                      name="zip"
                      onChange={onChangeInfo}
                      placeholder="Enter zip"
                      value={userInfo.zip || ""}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Button
                variant="success"
                type="submit"
                block
                onClick={(e) => onSubmitInfo(e)}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <Navigation usrInfo={userInfo} />
        <div className="container-fluid">
          <div id="profile">
            <div className="d-flex justify-content-center">
              <Image
                src={profilePhoto}
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                roundedCircle
              />
              <div id="imageEdit">
                <Icon.CameraFill onClick={() => setPicUploadModal(true)} />
              </div>
            </div>
            <div id="profileTabs">
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                <Tab eventKey="about" title="About">
                  <div id="aboutProfile">
                    <div id="infoCard">
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <h2>
                              Personal Info{" "}
                              <Icon.PencilSquare onClick={onEditInfo} />
                            </h2>
                          </Card.Title>
                          <h4 style={{ paddingTop: "10px" }}>
                            <Icon.CalendarFill /> Your Birthday{" "}
                            {userInfo.birthday}
                          </h4>
                          <h4 style={{ paddingTop: "10px" }}>
                            <Icon.Envelope /> Email: {userInfo.email}
                          </h4>
                          <h4 style={{ paddingTop: "10px" }}>
                            <Icon.Mailbox2 /> Lives in{" "}
                            {userInfo.address === null
                              ? " Earth"
                              : userInfo.address}
                          </h4>
                          <h4 style={{ paddingTop: "10px" }}>
                            <Icon.GeoAltFill />{" "}
                            {userInfo.state === null
                              ? " State"
                              : userInfo.state}
                            , {userInfo.zip === null ? " Zip" : userInfo.zip}
                          </h4>
                        </Card.Body>
                      </Card>
                    </div>
                    <div id="vaccineCard">
                      <Card>
                        <Card.Body>
                          <Card.Title>
                            <h2>
                              Vaccines Near You <Icon.Search />
                            </h2>
                          </Card.Title>
                          <InputGroup className="mb-3" size="lg">
                            <Form.Control
                              placeholder="Search by Zip Code"
                              aria-describedby="basic-addon2"
                              onChange={(e) => onChangeZip(e)}
                            />
                            <Form.Control
                              as="select"
                              aria-describedby="basic-addon2"
                              onChange={(e) => onChangeRadius(e)}
                            >
                              <option hidden>Choose radius (miles)</option>
                              <option>1</option>
                              <option>5</option>
                              <option>10</option>
                              <option>25</option>
                              <option>50</option>
                              <option>100</option>
                            </Form.Control>
                            <InputGroup.Append>
                              <Button
                                id="basic-addon2"
                                variant="secondary"
                                onClick={(e) => vaccineSearch(e)}
                              >
                                Search
                              </Button>
                            </InputGroup.Append>
                          </InputGroup>
                        </Card.Body>
                        <div className="container-fluid">
                          <p
                            style={{
                              float: "right",
                              // marginBottom: "-20px",
                              color: "#5e95d4",
                            }}
                          >
                            -Distance is based on provided zip code
                          </p>
                        </div>
                        <div className="container-fluid">{vaccines}</div>
                      </Card>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="account" title="Account Settings">
                  <div className="container-fluid" id="accountSetting">
                    <Alert variant={delVariant}>
                      <div>
                        <h4>{deleteMsg}</h4>
                        <Button
                          variant={delVariant}
                          style={{ float: "right", marginTop: "-40px" }}
                          onClick={() => deleteUser()}
                        >
                          Delete
                        </Button>
                      </div>
                    </Alert>
                  </div>
                </Tab>
              </Tabs>
            </div>
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
export default UserProfile;
