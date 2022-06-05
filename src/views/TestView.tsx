import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  selectCurLogMAR,
  selectDistance,
  setLogMAR,
  setFinalScore,
  selectEnabledImages,
} from "../reducers/testReducer";
import { setPage } from "../reducers/redirectorReducer";
import Pages from "../Pages";
import { selectDPM } from "../reducers/calibrationReducer";
import { Images } from "../Images";
import type { ImageData } from "../Images";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useEffect } from "react";

export const TestView = () => {
  const dispatch = useAppDispatch();
  const curLogMAR = Number(useAppSelector(selectCurLogMAR).toFixed(2));
  const distance = useAppSelector(selectDistance);
  const DPM = useAppSelector(selectDPM);

  const [total, setTotal] = useState(0);
  const [correct, setCorrect] = useState(0);

  const enabledStatus = useAppSelector(selectEnabledImages);
  const enabledImages: ImageData[] = useMemo(() => {
    let _enabled: ImageData[] = [];
    for (let i = 0; i < Images.length; i++) {
      var t = enabledStatus.find(
        (_im) => _im.name === Images[i].name && _im.enabled
      );
      if (t != undefined) _enabled = [..._enabled, Images[i]];
    }
    return _enabled;
  }, [enabledStatus]);
  const [curImage, setCurrentImage] = useState(
    enabledImages[Math.floor(Math.random() * enabledImages.length)]
  );
  const height =
    (curImage.strokeWidthHeightRatio *
      distance *
      DPM *
      Math.pow(10, curLogMAR)) /
    3438;

  let lastImInd = 0;
  let lastLastImInd = 0;
  function getNewRandomImage() {
    var curImInd = Math.floor(Math.random() * enabledImages.length);
    //check if we selected the same image twice
    let i = 0;
    while (curImInd === lastImInd || curImInd === lastLastImInd) {
      //increment the
      curImInd = (curImInd + 1) % enabledImages.length;
      if (i > enabledImages.length) break;
    }
    setCurrentImage(enabledImages[curImInd]);
    //update lastindex
    lastLastImInd = lastImInd;
    lastImInd = curImInd;
  }

  //get random image to start
  useEffect(() => {
    getNewRandomImage();
  }, [total, curLogMAR, correct]);

  useEffect(() => {
    console.log("Total: " + total + "\nCorrect: " + correct);
    //check if the total guess is at least 5
    if (total < 5) return;
    //check if we got 3 or more correct
    if (correct >= 3 && curLogMAR > -0.1) {
      setCorrect(0);
      setTotal(0);
      dispatch(setLogMAR(curLogMAR - 0.1));
      return;
    }

    //the score is equal to our current log mar
    var lm = Number(curLogMAR + 0.1 - 0.02 * correct);
    if (lm > 1) lm = 1;
    dispatch(setFinalScore(lm));
    dispatch(setPage(Pages.Results));
  }, [total]);

  return (
    <Container>
      <Row>
        <p>LogMar: {curLogMAR.toFixed(2)}</p>
      </Row>
      <Row className="mb-2">
        <Container>
          <img src={curImage.path} height={height}></img>
        </Container>
      </Row>
      <Row>
        <Alert className="fixed-bottom">
          <Alert.Heading>Was the image recognized?</Alert.Heading>
          <Row>
            <p>Please hold the device {distance} meters from the patient.</p>
          </Row>

          <Row>
            <Col>
              <Button
                className="w-50"
                variant="outline-danger"
                size="lg"
                onClick={() => {
                  setTotal(total + 1);
                  getNewRandomImage();
                }}
              >
                No
              </Button>
            </Col>

            <Col />
            <Col>
              <Button
                className="w-50"
                variant="outline-success"
                size="lg"
                onClick={() => {
                  if (total !== 0) {
                    //increment total and correct
                    setCorrect(correct + 1);
                    setTotal(total + 1);
                  } else {
                    if (curLogMAR === -0.1) {
                      dispatch(setFinalScore(-0.1));
                      dispatch(setPage(Pages.Results));
                    } else dispatch(setLogMAR(curLogMAR - 0.1));
                  }
                }}
              >
                Yes
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="outline-dark"
                className="w-25 mt-2"
                onClick={() => dispatch(setPage(Pages.Home))}
              >
                Cancel Test
              </Button>
            </Col>
          </Row>
        </Alert>
      </Row>
    </Container>
  );
};
