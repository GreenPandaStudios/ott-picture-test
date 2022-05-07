import React, { useState } from "react";
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store";
import { setPage } from "../reducers/redirectorReducer";
import { selectFinalScore } from "../reducers/testReducer";
import Pages from "../Pages";
export const ResultsView = () => {
  const dispatch = useAppDispatch();
  const finalScore = useAppSelector(selectFinalScore);
  return (
    <Container>
      <Row>
        <Col>
          <Alert>Final Score: {finalScore.toFixed(2)} LogMAR</Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
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
