import SearchBar from './components/SearchBar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { DATA_LOADED, SEARCH_DATA } from './actions/types';

function App() {
  const store = useSelector(store => store, shallowEqual)
  const dispatch = useDispatch();
  const APIkey = '08bea1b85d0458c294c28493bcc4e4fe';
  const weatherCall = (searchQuery) => {
    console.log('weather call');
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&id=524901&appid=${APIkey}&units=imperial`)
      .then(response => {
        console.log('response to first: ', response)
        dispatch({ type: SEARCH_DATA, search_data: response });
        dispatch({ type: DATA_LOADED });
      })
      .then(axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${store.searchQuery.search_data.data.coord.lat}&lon=${store.searchQuery.search_data.data.coord.lon}&appid=${APIkey}&units=imperial`).then(responseTwo => {
        console.log('second api call response: ', responseTwo)
      }))
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
