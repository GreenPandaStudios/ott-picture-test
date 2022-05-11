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
          <p className="mb-0">
            Select the distance at which to conduct the test. When you are ready
            to begin, press the "Start Test" button.
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
                  Please be mindful of the screen size of this device when
                  choosing a distance.
                </Form.Text>
              </Col>
              <Col></Col>
            </Row>
          </Form.Group>
          <Row className="m-2 align-middle">
            <Col>
              <Button className="w-25" type="submit" variant="outline-success">
                Start Test
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};
