import React from "react";
import { Button, Col, Row, Container, Form } from "react-bootstrap";
import { useAppDispatch } from "../store";
import { setPage } from "../reducers/redirectorReducer";
import Pages from "../Pages";
export const HomeView = () => {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <Form>
        <Form.Group>
          <Row>
            <Col></Col>
            <Col>
              <Form.Label>Distance (m)</Form.Label>
              <Form.Control type="number" placeholder="Enter Test Distance" />
              <Form.Text className="text-muted">
                Please be mindful of the screen size of this device
              </Form.Text>
            </Col>
            <Col></Col>
          </Row>
        </Form.Group>
      </Form>
      <Button onClick={() => dispatch(setPage(Pages.Results))}>
        To Results
      </Button>
      <Button onClick={() => dispatch(setPage(Pages.Calibrate))}>
        Calibrate
      </Button>
    </Container>
  );
};
