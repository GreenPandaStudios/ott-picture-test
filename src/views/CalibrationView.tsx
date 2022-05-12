import React from "react";
import { Button, Col, Row, Container, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store";
import { setPage } from "../reducers/redirectorReducer";
import {
  selectCurImage,
  selectDPM,
  selectScale,
  setScale,
} from "../reducers/calibrationReducer";
import Pages from "../Pages";
export const CalibrationView = () => {
  const dispatch = useAppDispatch();
  const curimg = useAppSelector(selectCurImage);
  const DPM = useAppSelector(selectDPM);
  const Scale = useAppSelector(selectScale);
  return (
    <Container>
      <Row>
        <Alert>
          Place a real quarter on the screen and resize the image until it is
          the correct size.
        </Alert>
      </Row>

      <Row className="mb-2 w-100">
        <Col className="d-grid gap-2">
          <Button
            size="lg"
            variant="outline-dark"
            onClick={() => dispatch(setScale(Scale - 0.015))}
          >
            Make Much Smaller
          </Button>
        </Col>
        <Col className="d-grid gap-4">
          <Button
            size="sm"
            variant="outline-dark"
            onClick={() => dispatch(setScale(Scale - 0.0015))}
          >
            Make Smaller
          </Button>
        </Col>
        <Col className="mb-2">
          <Container>
            <img
              src={curimg.imagePath}
              width={curimg.pixel_width * Scale}
              height={curimg.pixel_height * Scale}
            ></img>
          </Container>
        </Col>
        <Col className="d-grid gap-4">
          <Button
            size="sm"
            variant="outline-dark"
            onClick={() => dispatch(setScale(Scale + 0.0015))}
          >
            Make Bigger
          </Button>
        </Col>
        <Col className="d-grid gap-2">
          <Button
            size="lg"
            variant="outline-dark"
            onClick={() => dispatch(setScale(Scale + 0.015))}
          >
            Make Much Bigger
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
