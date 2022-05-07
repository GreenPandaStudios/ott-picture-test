import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  selectCurLogMAR,
  selectDistance,
  setLogMAR,
  setFinalScore,
} from "../reducers/testReducer";
import { setPage } from "../reducers/redirectorReducer";
import Pages from "../Pages";
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
  const [answeredNo, setAnsweredNo] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  function getNewRandomImage() {
    setCurrentImage(Images[Math.floor(Math.random() * Images.length)]);
  }
  function incrementTotal() {
    let _t: number = total;
    setTotal(_t + 1);
    if (_t + 1 >= 5) tryToCalculateScore(_t + 1, correct, curLogMAR);
  }

  function tryToCalculateScore(
    total: number,
    correct: number,
    logMar: number
  ): void {
    //check if the toal guess is at least 5
    if (total < 5) return;
    //the score is equal to our current log mar
    var lm = Number(logMar + 0.1 - 0.02 * correct);
    dispatch(setFinalScore(lm));
    dispatch(setPage(Pages.Results));
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
                variant="danger"
                size="lg"
                onClick={() => {
                  if (!answeredNo) {
                    setAnsweredNo(true);
                    incrementTotal();
                  } else {
                    //increment total and not correct
                    incrementTotal();
                  }
                  getNewRandomImage();
                }}
              >
                No
              </Button>
            </Col>

            <Col />
            <Col>
              <Button
                className="w-75"
                variant="success"
                size="lg"
                onClick={() => {
                  getNewRandomImage();
                  if (answeredNo) {
                    //increment total and correct
                    setCorrect(correct + 1);
                    incrementTotal();
                  } else {
                    dispatch(setLogMAR(curLogMAR - 0.1));
                  }
                }}
              >
                Yes
              </Button>
            </Col>
          </Row>
        </Alert>
      </Row>
    </Container>
  );
};
