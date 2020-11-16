import SearchBar from './components/SearchBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import axios from 'axios';
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  const weatherCall = (searchQuery) => {
    console.log('weather call');
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&id=524901&appid=08bea1b85d0458c294c28493bcc4e4fe&units=imperial`)
            .then(response => console.log('API CALL', response))
            .catch(err => console.log(err));
  }
  
  return (
    <Router>
      <div className="container-fluid">
        <SearchBar weatherCall={weatherCall} />
      </div>
      <Switch>
        <Route path="/Main">
          <Main  />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
