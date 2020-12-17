import SearchBar from "./components/SearchBar";
import Banner from "./components/Banner";
import axios from "axios";
import { useDispatch } from "react-redux";
import Main from "./pages/Main";
import { Container } from "react-bootstrap";
import { DATA_LOADED, SEARCH_DATA } from "./actions/types";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const weatherCall = (searchQuery) => {
    const APIkey =
      process.env.REACT_APP_API_KEY || "08bea1b85d0458c294c28493bcc4e4fe";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&id=524901&appid=${APIkey}&units=imperial`
      )
      .then((response) => {
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
    <Container className="justify-content-center">
      <Banner />
      <SearchBar weatherCall={weatherCall} />
      <Main />
    </Container>
  );
}

export default App;
