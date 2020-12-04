import SearchBar from './components/SearchBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux'
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { DATA_LOADED, SEARCH_DATA } from './actions/types';

function App() {
  const dispatch = useDispatch();
  const APIkey = process.env.REACT_APP_API_KEY;
  let lat;
  let lon;
  const weatherCall = (searchQuery) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&id=524901&appid=${APIkey}&units=imperial`)
      .then(response => {
        lat = response.data.coord.lat;
        lon = response.data.coord.lon;
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`).then(data => {  
        console.log(data);
        dispatch({ type: SEARCH_DATA, search_data: data });
        dispatch({ type: DATA_LOADED });
      })
      })
      .catch(err => console.log(err));

  }
  return (
    <Router>
        <SearchBar weatherCall={weatherCall} />
      <Switch>
        <Route path="/Main">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
