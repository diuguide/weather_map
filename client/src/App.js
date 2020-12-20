import Banner from "./components/Banner";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Main from "./pages/Main";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DATA_LOADED, SEARCH_DATA } from "./actions/types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  const [searchTitle, setSearchTitle] = useState("");

  const weatherCall = (searchQuery) => {
    const APIkey =
      process.env.REACT_APP_API_KEY || "08bea1b85d0458c294c28493bcc4e4fe";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&id=524901&appid=${APIkey}&units=imperial`
      )
      .then((response) => {
        console.log("response first api call: ", response);
        setSearchTitle(response.data.name);
        const lat = response.data.coord.lat;
        const lon = response.data.coord.lon;
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`
          )
          .then((data) => {
            dispatch({ type: SEARCH_DATA, search_data: data });
            dispatch({ type: DATA_LOADED });
          });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Router>
      <Container fluid>
        <Row >
          <Col md={4} className="containerMain">
            <Banner />
            <Switch>
              <Route path="/">
                <Main searchTitle={searchTitle} weatherCall={weatherCall} />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
