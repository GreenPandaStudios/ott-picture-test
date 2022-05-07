import React, { useState } from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
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
                min={0}
                onChange={(e) => setLocalDist(Number(e.target.value))}
              />
              <Form.Text className="text-muted">
                Please be mindful of the screen size of this device
              </Form.Text>
            </Col>
            <Col></Col>
          </Row>
        </Form.Group>
        <Button type="submit">Start Test</Button>
      </Form>

      <Button onClick={() => dispatch(setPage(Pages.Calibrate))}>
        Calibrate
      </Button>
    </Container>
  );
};
