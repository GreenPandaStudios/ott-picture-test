import React, { useState } from "react";
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store";
import { setPage } from "../reducers/redirectorReducer";
import { selectFinalScore } from "../reducers/testReducer";
import Pages from "../Pages";
export const ResultsView = () => {
  const dispatch = useAppDispatch();
  const finalScore = useAppSelector(selectFinalScore);

  const conversionChart = {};

  function toSnellen(logMAR: number): string {
    let roundedScr = Number((logMAR - 0.049).toFixed(1)).toFixed(2);

    let ret = "";
    switch (roundedScr) {
      case "-0.10":
        ret = "6/4.8 (20/16)";
        break;
      case "0.00":
        ret = "6/6 (20/20)";
        break;
      case "0.10":
        ret = "6/7.5 (20/25)";
        break;
      case "0.20":
        ret = "6/9.5 (20/32)";
        break;
      case "0.30":
        ret = "6/12 (20/40)";
        break;
      case "0.40":
        ret = "6/15 (20/50)";
        break;
      case "0.50":
        ret = "6/19 (20/64)";
        break;
      case "0.60":
        ret = "6/24 (20/80)";
        break;
      case "0.70":
        ret = "6/30 (20/100)";
        break;
      case "0.80":
        ret = "6/38 (20/125)";
        break;
      case "0.90":
        ret = "6/48 (20/160)";
        break;
      case "1.00":
        ret = "6/60 (20/200)";
        break;
    }

    return ret + (logMAR.toFixed(2) === roundedScr ? "" : " part");
  }

  return (
    <Container>
      <Row>
        <Col>
          <Alert>
            LogMAR Score: {finalScore.toFixed(2)} LogMAR
            <br></br>
            Snellen Score: {toSnellen(finalScore)}
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            className="w-75"
            variant="outline-dark"
            onClick={() => {
              dispatch(setPage(Pages.Home));
            }}
          >
            Finish
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
