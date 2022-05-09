import React, { useState } from "react";
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store";
import { setPage } from "../reducers/redirectorReducer";
import {
  setDistance,
  selectDistance,
  resetTest,
} from "../reducers/testReducer";
import Pages from "../Pages";
export const HomeView = () => {
  const dispatch = useAppDispatch();
  const distance = useAppSelector(selectDistance);
  const [localDist, setLocalDist] = useState(distance);
  function HandleSubmit() {
    dispatch(setDistance(localDist));
    dispatch(resetTest());
    dispatch(setPage(Pages.Test));
  }

  return (
    <Container>
      <Row className="mb-2">
        <Alert className=" w-100" variant="primary">
          <Alert.Heading>Ott Picture Test</Alert.Heading>
          <p>
            Select a testing distance, choose the images you would like to use,
            and/or calibrate the image size using the options below.
          </p>
          <hr />
          <p className="mb-0">
            When you are ready to begin a test, press the "Start Test" button.
          </p>
        </Alert>
      </Row>
      <Row>
        <Form onSubmit={HandleSubmit}>
          <Form.Group>
            <Row>
              <Col></Col>
              <Col>
                <Form.Label>Distance (m)</Form.Label>
                <Form.Control
                  name="distanceForm"
                  type="number"
                  placeholder="Enter Test Distance"
                  required
                  defaultValue={distance}
                  min={1}
                  onChange={(e) => setLocalDist(Number(e.target.value))}
                />
                <Form.Text className="text-muted">
                  Please be mindful of the screen size of this device
                </Form.Text>
              </Col>
              <Col></Col>
            </Row>
          </Form.Group>
          <Row className="m-2 align-middle">
            <Col>
              <Button className="w-25" type="submit" variant="success">
                Start Test
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row className="m-2">
        <Col>
          <Button className="w-25" variant="secondary">
            Select Images
          </Button>
        </Col>
      </Row>
      <Row className="m-2">
        <Col>
          <Button
            className="w-25"
            onClick={() => dispatch(setPage(Pages.Calibrate))}
          >
            Calibrate
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
