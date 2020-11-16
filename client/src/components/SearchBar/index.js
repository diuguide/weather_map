import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

function SearchBar({ weatherCall }) {

    const store = useSelector(store => store, shallowEqual)
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [recentSearch, setRecentSearch] = useState([]);
    
    useEffect(() => {
        localStorage.setItem('recent_search', JSON.stringify(recentSearch));
    });

    const handleChange = (e) => {
        const search = e.target.value;    
        setSearchQuery(search);
    };
    
    const handleSubmit = () => {
        setRecentSearch(oldArray => [...oldArray, searchQuery]);
        weatherCall(searchQuery);
        dispatch({ type: "RECENT_SEARCH", recent_search: searchQuery })
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