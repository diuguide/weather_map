import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SearchBar() {
    return (
        <div className="searchBar">
            <Form.Group className="d-inline-flex" controlId="formBasicSearch">
                <Form.Control type="search" placeholder="Enter City" />
                <Button variant="dark" type="submit">GO</Button>
            </Form.Group>
        </div>
    )
}

export default SearchBar; 