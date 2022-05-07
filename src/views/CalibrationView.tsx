import React from "react";
import { Button, Col, Row, Container, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store";
import { setPage } from "../reducers/redirectorReducer";
import {
  selectCurImage,
  selectDPM,
  setDPM,
} from "../reducers/calibrationReducer";
import Pages from "../Pages";
export const CalibrationView = () => {
  const dispatch = useAppDispatch();
  const curimg = useAppSelector(selectCurImage);
  const DPM = useAppSelector(selectDPM);
  return (
    <>
      <Row>
        <Alert>
          Place a real quarter on the screen and resize the image until it is
          the correct size.
        </Alert>
      </Row>

      <Row>
        <Button onClick={() => dispatch(setPage(Pages.Home))}>Back</Button>
        <Button onClick={() => dispatch(setDPM(DPM + 15))}>Bigger</Button>
        <Button onClick={() => dispatch(setDPM(DPM - 15))}>Smaller</Button>
        {DPM}
        <Container>
          <img
            src={curimg.imagePath}
            width={
              curimg.pixel_width *
              (DPM / (curimg.pixel_width / curimg.meters_width))
            }
            height={
              curimg.pixel_height *
              (DPM / (curimg.pixel_height / curimg.meters_height))
            }
          ></img>
        </Container>
      </Row>
    </>
  );
};
