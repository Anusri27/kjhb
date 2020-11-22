import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { Link } from "react-router-dom";
import firebaseDb from "../firebase";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {
  Card,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
  Container
} from "reactstrap";
const Contacts = () => {
  var [currentId, setCurrentId] = useState("");
  var [contactObjects, setContactObjects] = useState({});

  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null) {
        setContactObjects({
          ...snapshot.val()
        });
      }
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "")
      firebaseDb.child("contacts").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    else
      firebaseDb.child(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
  };
  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      firebaseDb.child(`contacts/${id}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  const Background =
    "https://previews.123rf.com/images/guingnm/guingnm1903/guingnm190300050/119405574-gentle-blue-watercolor-background-in-pastel-colors-sky-blue-background-with-paper-texture-the-sky-wi.jpg";
  return (
    <>
      <Jumbotron
        fluid
        style={{ backgroundColor: "white", opacity: "100%", width: "100%" }}
      >
        <Container>
          <div className="row">
            <div className="col ">
              <ContactForm
                {...{ currentId, contactObjects, addOrEdit }}
              ></ContactForm>
            </div>
            <div className="col">
              <Card
                style={{
                  backgroundImage: "url(" + Background + ")",
                  paddingBottom: "0px",
                  paddingTop: "0px",
                  paddingRight: "50px"
                }}
              >
                <CardBody>
                  {Object.keys(contactObjects).map((key) => (
                    <ul
                      style={{
                        fontSize: "larger"
                      }}
                    >
                      <li style={{ listStyleType: "none" }}>
                        <span
                          style={{ marginRight: "20px", fontWeight: "bolder" }}
                        >
                          Name
                        </span>
                        {contactObjects[key].fullName}
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <span
                          style={{ marginRight: "20px", fontWeight: "bolder" }}
                        >
                          Mobile
                        </span>
                        {contactObjects[key].mobile}
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <span
                          style={{ marginRight: "20px", fontWeight: "bolder" }}
                        >
                          Email
                        </span>
                        {contactObjects[key].email}
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <span
                          style={{ marginRight: "20px", fontWeight: "bolder" }}
                        >
                          Address
                        </span>
                        {contactObjects[key].address}
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <span
                          style={{ marginRight: "20px", fontWeight: "bolder" }}
                        >
                          Pincode
                        </span>
                        {contactObjects[key].pincode}
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <span
                          style={{ marginRight: "20px", fontWeight: "bolder" }}
                        >
                          State
                        </span>
                        {contactObjects[key].state}
                      </li>
                      <li style={{ listStyleType: "none" }}>
                        <span
                          style={{
                            marginRight: "20px",
                            fontWeight: "bolder",
                            marginBottom: "50px ",
                            fontWeight: "bold"
                          }}
                        ></span>
                        {contactObjects[key].slottime}
                      </li>
                      <br />
                      <Row>
                        <Col>
                          <Button
                            style={{ width: "100%" }}
                            variant="danger"
                            onClick={() => {
                              onDelete(key);
                            }}
                          >
                            🗑️ Delete Record
                          </Button>
                        </Col>
                        <Col>
                          <Link to="/PaymentPortal">
                            <Button>Proceed to Payment</Button>
                          </Link>
                        </Col>
                        <Col>
                          <br />
                          <Link to="/">
                            <Button variant="warning">Go Home</Button>
                          </Link>
                        </Col>
                      </Row>
                    </ul>
                  ))}
                </CardBody>
              </Card>
            </div>
          </div>
        </Container>
      </Jumbotron>
    </>
  );
};

export default Contacts;
