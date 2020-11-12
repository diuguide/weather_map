import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SearchBar() {
    return (
        <div className="searchBar">
            <Form.Group controlId="formBasicSearch">
                <Form.Control type="search" placeholder="Enter City" />
            </Form.Group>
        </div>
    )
}

export default SearchBar; 