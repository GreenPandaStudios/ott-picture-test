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
    <>
      <Row>
        <Alert>
          Place a real quarter on the screen and resize the image until it is
          the correct size.
        </Alert>
      </Row>

      <Row className="mb-2">
        <Col>
          <Button
            className="w-50"
            variant="secondary"
            onClick={() => dispatch(setScale(Scale - 0.0015))}
          >
            Make Smaller
          </Button>
        </Col>
        <Col>
          <Container>
            <img
              src={curimg.imagePath}
              width={curimg.pixel_width * Scale}
              height={curimg.pixel_height * Scale}
            ></img>
          </Container>
        </Col>
        <Col>
          <Button
            className="w-50"
            variant="secondary"
            onClick={() => dispatch(setScale(Scale + 0.0015))}
          >
            Make Bigger
          </Button>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="mb-2">
          <Button
            className="w-25"
            onClick={() => dispatch(setPage(Pages.Home))}
            variant="success"
          >
            Looks Good!
          </Button>
        </Col>
      </Row>
    </>
  );
};
