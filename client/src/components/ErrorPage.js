import React from "react";
import { Card, Button } from "react-bootstrap";

function ErrorPage() {
  return (
    <div id="errorPage" className="container-fluid">
      <Card>
        <Card.Body>
          <Card.Title>Error with page !!</Card.Title>
          You are not allowed to access this page.
          <br />
          Please go back and login again.<br/><br/>
          <Button variant="success" onClick={()=> window.open("/login", "_self")}>Login</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ErrorPage;
