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
import { SEARCH_DATA } from './actions/types';

function App() {
  const store = useSelector(store => store, shallowEqual)
  const dispatch = useDispatch();
  console.log('store in APP.js: ', store);

  const weatherCall = (searchQuery) => {
    console.log('weather call');
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&id=524901&appid=08bea1b85d0458c294c28493bcc4e4fe&units=imperial`)
      .then(response => {
        dispatch({ type: SEARCH_DATA, search_data: response })
      })
      .catch(err => console.log(err));
  }

  return (
    <Router>
      <div className="container-fluid">
        <SearchBar weatherCall={weatherCall} />
      </div>
      <Switch>
        <Route path="/Main">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
