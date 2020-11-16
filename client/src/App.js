import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useSelector, shallowEqual } from 'react-redux';
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const store = useSelector(store => store, shallowEqual)
  
  useEffect(() => {
    console.log('store App.js: ', store)
  });

  return (
    <Router>
      <div className="container-fluid">
        <SearchBar />
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
