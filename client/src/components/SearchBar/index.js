import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

function SearchBar() {

    const store = useSelector(store => store, shallowEqual)
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearch, setRecentSearch] = useState([]);

    useEffect(() => {
        
        console.log('recent search: ', recentSearch);
        console.log('store SearchBar: ', store)
    });

    const handleChange = (e) => {
        const search = e.target.value;    
        setSearchQuery(search);
    };
    
    const handleSubmit = () => {
        console.log('search Query inside click:', searchQuery);
        setRecentSearch(oldArray => [...oldArray, searchQuery]);
        // axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&id=524901&appid=08bea1b85d0458c294c28493bcc4e4fe&units=imperial`)
        //     .then(response => console.log(response))
        //     .catch(err => console.log(err));
        dispatch({ type: "RECENT_SEARCH", recent_search: recentSearch })
        setSearchQuery('');
        history.push('/Main');
    }
    return (
        <div className="searchBar">
            <Form.Group className="d-inline-flex" controlId="formBasicSearch">
                <Form.Control onChange={handleChange} value={searchQuery} type="search" placeholder="Enter City" />
                <Button onClick={handleSubmit} variant="dark" type="submit">GO</Button>
            </Form.Group>
        </div>
    )
}

export default SearchBar; 