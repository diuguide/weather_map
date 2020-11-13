import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = (e) => setSearchQuery(e.target.value);

    const handleSubmit = () => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&id=524901&appid=08bea1b85d0458c294c28493bcc4e4fe&units=imperial`)
            .then(response => {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
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