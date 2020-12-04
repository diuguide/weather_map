import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Row, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as moment from 'moment';

function SearchBar({ weatherCall }) {
  const store = useSelector((store) => store, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {
    localStorage.setItem("recent_search", JSON.stringify(recentSearch));
  });

  const handleChange = (e) => {
    const search = e.target.value;
    setSearchQuery(search);
  };

  const handleSubmit = () => {
    setRecentSearch((oldArray) => [...oldArray, searchQuery]);
    weatherCall(searchQuery);
    dispatch({ type: "RECENT_SEARCH", recent_search: searchQuery });
    setSearchQuery("");
    history.push("/Main");
  };
  return (
    <Container>
      <Row className="searchCont d-inline-flex">
        <Col>
          <Form.Group
            className="d-inline-flex mt-2 searchBar"
            controlId="formBasicSearch"
          >
            <Form.Control
              onChange={handleChange}
              value={searchQuery}
              type="search"
              placeholder="Enter City"
            />
            <Button onClick={handleSubmit} variant="dark" type="submit">
              GO
            </Button>
          </Form.Group>
        </Col>
        {store.searchQuery.data_loaded && (
          <Col className="d-inline-flex">
            <div className="queryName">
              <h1>{store.searchQuery.recent_search}</h1>
            </div>
            <div className="timeStamp"><h1> @ {moment().format('hh:mma')}</h1></div>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default SearchBar;
