import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  selectCurLogMAR,
  selectDistance,
  setLogMAR,
} from "../reducers/testReducer";
import { selectDPM } from "../reducers/calibrationReducer";
import { Images } from "../Images";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";

export const TestView = () => {
  const dispatch = useAppDispatch();
  const curLogMAR = useAppSelector(selectCurLogMAR);
  const distance = useAppSelector(selectDistance);
  const DPM = useAppSelector(selectDPM);
  //TODO: Make this correct
  const height = (distance * 30 * DPM * Math.pow(10, curLogMAR)) / 3438;

  const [curImage, setCurrentImage] = useState(
    Images[Math.floor(Math.random() * Images.length)]
  );

  function getNewRandomImage() {
    setCurrentImage(Images[Math.floor(Math.random() * Images.length)]);
  }
  return (
    <Container>
      <Row>LogMar: {curLogMAR.toFixed(2)}</Row>
      <Row className="mb-2">
        <Container>
          <img src={curImage.path} height={height}></img>
        </Container>
      </Row>
      <Row>
        <Alert className="fixed-bottom">
          <Alert.Heading>Was the image recognized?</Alert.Heading>
          <Row>
            <Col>
              <Button
                className="w-75"
                variant="success"
                size="lg"
                onClick={() => {
                  getNewRandomImage();
                  dispatch(setLogMAR(curLogMAR - 0.1));
                }}
              >
                Yes
              </Button>
            </Col>
            <Col />

            <Col>
              <Button
                className="w-75"
                variant="danger"
                size="lg"
                onClick={() => {
                  getNewRandomImage();
                }}
              >
                No
              </Button>
            </Col>
          </Row>
        </Alert>
      </Row>
    </Container>
  );
};
