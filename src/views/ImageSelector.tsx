import React, { useState } from "react";
import { Button, Col, Row, Container, Form, Alert } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../store";
import {
  selectEnabledImages,
  enableImage,
  disableImage,
} from "../reducers/testReducer";
import { setPage } from "../reducers/redirectorReducer";
import { ImageData, Images } from "../Images";
import Pages from "../Pages";
export const ImageSelector = () => {
  const dispatch = useAppDispatch();
  const enabledImages = useAppSelector(selectEnabledImages);

  function imageIsEnabled(image: ImageData): boolean {
    {
      for (let i = 0; i < enabledImages.length; i++) {
        if (enabledImages[i].name === image.name) {
          return enabledImages[i].enabled;
        }
      }
      return false;
    }
  }
  return (
    <Container>
      <Row className="mb-2">
        <Alert className=" w-100" variant="primary">
          <Alert.Heading>Ott Picture Test</Alert.Heading>
          <p>Select the images you would like to be used during a test.</p>
        </Alert>
      </Row>
      <Row className="mb-2">
        <Col className="mb-2">
          <Button
            className="w-25"
            onClick={() => dispatch(setPage(Pages.Home))}
            variant="secondary"
          >
            Home
          </Button>
        </Col>
      </Row>
      <Form>
        {Images.map((image: ImageData) => (
          <Row key={image.path}>
            <Col>
              <Container>
                <img src={image.path}></img>
              </Container>
            </Col>
            <Col>
              <Form.Check
                type="switch"
                checked={imageIsEnabled(image)}
                onChange={(e) => {
                  dispatch(
                    e.target.checked ? enableImage(image) : disableImage(image)
                  );
                }}
              />
            </Col>
          </Row>
        ))}
      </Form>
    </Container>
  );
};
