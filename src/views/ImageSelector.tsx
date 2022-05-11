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
      <Row>
        <Alert className=" w-100" variant="primary">
          <p className="mb-0">
            Select the images you would like to be used during a test.
          </p>
        </Alert>
      </Row>

      <Form>
        {Images.map((image: ImageData) => (
          <Row key={image.path}>
            <Col>
              <Container>
                <img src={image.path} height="128px" width="128px"></img>
              </Container>
              <Row className="mb-2">
                <Col>
                  <Form.Check
                    className="display-6"
                    type="switch"
                    checked={imageIsEnabled(image)}
                    onChange={(e) => {
                      dispatch(
                        e.target.checked
                          ? enableImage(image)
                          : disableImage(image)
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <Alert
                    className="display-6"
                    variant={imageIsEnabled(image) ? "success" : "danger"}
                  >
                    {(imageIsEnabled(image) ? "Use " : "Do not use ") +
                      "the " +
                      image.name +
                      " image."}
                  </Alert>
                </Col>
              </Row>
              <hr></hr>
            </Col>
          </Row>
        ))}
      </Form>
    </Container>
  );
};
