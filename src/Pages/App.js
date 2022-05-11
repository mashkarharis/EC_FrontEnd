import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import TokenService from "../APIServices/TokenService";
import SideBarComponent from "../Components/SideBarComponent";
import CareTakersPage from "./CareTakersPage";
import DashboardPage from "./DashboardPage";
import EldersPage from "./EldersPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

function App() {
  const [view, setView] = useState(null);
  const updateView = (newview) => {
    TokenService.introspect().then((response) => {
      console.log(response);
      if (response.status == 200 && response.data == true) {
        setView(newview);
      } else {
        setView(<LoginPage updateView={updateView} />);
      }
    });
  };

  useEffect(() => {
    updateView(<DashboardPage  updateView={updateView} />);
  }, []);

  return (
    <Container
      fluid
      className={"no-gutters mx-0 px-0"}
      style={{ width: "98vw" }}
    >
      <Row noGutters={true}>
        <Col className="col-2" style={{}}>
          <Router>
            <SideBarComponent updateView={updateView} />
          </Router>
        </Col>
        <Col
          className="col-10"
          style={{
            paddingTop: "70px",
            paddingBottom: "70px",
            height: "100vh",
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          <div>{view}</div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
