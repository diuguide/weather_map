import { useState } from "react";
import {
  Button,
  Col,
  Row,
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RECENT_SEARCH } from "../../actions/types";
import axios from "axios";

function SearchBar({
  weatherCall,
  handleShowHome,
  handleShowRegister,
  handleShowLogin,
  handleLogout,
  searchTitle
}) {
  const store = useSelector((store) => store, shallowEqual);
  const dispatch = useDispatch();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);
  

  const handleChange = (e) => {
    const search = e.target.value;
    setSearchQuery(search);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("recent_search", JSON.stringify(recentSearch));
    let config = {
      headers: {
        "x-auth-token": `${store.auth.token}`,
      },
    };
    setRecentSearch((oldArray) => [...oldArray, searchQuery]);
    if (store.auth.isAuthenticated) {
      axios
        .put(
          "/api/updateRecentSearch",
          {
            username: store.auth.user.username,
            recent_search: searchQuery,
          },
          config
        )
        .then((response) => {
          dispatch({
            type: RECENT_SEARCH,
            payload: response.data.recent_search,
          });
        })
        .catch((err) => console.log(err));
    }
    weatherCall(searchQuery);
    setSearchQuery("");
  };

  const homeBtn = () => {
    weatherCall(store.auth.user.home || store.searchQuery.home)
  }

  return (
    <>
      <Row className="bg-light pt-2 pb-3 searchBar">
        <Col>
          <Row className="mt-2">
            <Col>
              <Form.Group>
                <Form.Control
                  onChange={handleChange}
                  value={searchQuery}
                  type="search"
                  placeholder="Enter City"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="">
              <Button
                id="searchBtn"
                as="input"
                type="submit"
                value="Search"
                onClick={handleSubmit}
              />
            </Col>
            <Col className="">
              {!store.auth.isAuthenticated && (
                <Button
                  id="signupBtn"
                  as="input"
                  type="button"
                  value="Sign Up"
                  onClick={handleShowRegister}
                />
              )}
            </Col>
            <Col>
              {!store.auth.isAuthenticated && (
                <Button
                  id="loginBtn"
                  as="input"
                  type="button"
                  value="Login"
                  onClick={handleShowLogin}
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {store.auth.isAuthenticated && (
        <Row className="bg-light mt-2 pb-2 loggedConsole">
          <Col>
            <Row className="mt-2">
              <Col>
                <h5>Hello, {store.auth.user.username}</h5>
                <h6>Hometown: {store.searchQuery.home || store.auth.user.home}</h6>
              </Col>
            </Row>
            <Row>
              <Col>
                {[DropdownButton].map((DropdownType, idx) => (
                  <DropdownType
                    as={ButtonGroup}
                    key={idx}
                    id={`dropdown-button-drop-${idx}`}
                    size="sm"
                    variant="secondary"
                    title="Options"
                  >
                    <Dropdown.Item onClick={homeBtn} eventKey="3">
                      Go to Hometown
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleShowHome} eventKey="1">
                      Set Home City
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} eventKey="2">
                      Logout
                    </Dropdown.Item>
                  </DropdownType>
                ))}
              </Col>
              <Col></Col>
            </Row>
          </Col>
        </Row>
      )}
      {store.searchQuery.data_loaded && (
        <Row className="mt-2 bg-light cityName">
          <Col>
            <h1>{searchTitle}</h1>
            <h6>Latitude: {store.searchQuery.search_data.data.lat}</h6>
            <h6>Longitude: {store.searchQuery.search_data.data.lon}</h6>
          </Col>
        </Row>
      )}
    </>
  );
}

export default SearchBar;
