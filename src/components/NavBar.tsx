import { Nav, Container, Row, Col } from "react-bootstrap";
import React from "react";
import Pages from "../Pages";
import { selectPage, setPage } from "../reducers/redirectorReducer";
import { useAppSelector, useAppDispatch } from "../store";

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const curPage = useAppSelector(selectPage);
  interface pagePair {
    name: string;
    path: string;
  }
  const navPages = [
    { name: "Home", path: Pages.Home } as pagePair,
    { name: "Select Images", path: Pages.ImageSelect } as pagePair,
    { name: "Calibrate", path: Pages.Calibrate } as pagePair,
  ];
  return curPage === Pages.Test ? null : (
    <Container>
      <Row>
        <Col className="display-2">Ott Picture Test</Col>
      </Row>
      <Row>
        <Col>
          <Nav justify variant="tabs" defaultActiveKey="/home">
            {navPages.map((page: pagePair) => {
              return (
                <Nav.Item key={page.path}>
                  <Nav.Link
                    active={page.path === curPage}
                    onClick={() => dispatch(setPage(page.path))}
                  >
                    {page.name}
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};
