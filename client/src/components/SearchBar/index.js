import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Row, Container } from "react-bootstrap";
import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { LOGOUT_SUCCESS, RECENT_SEARCH } from "../../actions/types";
import axios from "axios";

function SearchBar({ weatherCall }) {
  const store = useSelector((store) => store, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);

  useEffect(() => {});

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
          console.log("api response PUT updateSearch", response);
        })
        .catch((err) => console.log(err));
    }

    weatherCall(searchQuery);
    dispatch({ type: RECENT_SEARCH, recent_search: searchQuery });
    setSearchQuery("");
    history.push("/Main");
  };

  const handleLogout = () => {
    dispatch({ type: LOGOUT_SUCCESS });
    alert("Logged out!");
  };

  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

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
          <Row className="mx-auto">
            <Col>
              <Button
                id="searchBtn"
                as="input"
                type="button"
                value="Search"
                onClick={handleSubmit}
              />
            </Col>
            <Col>
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
      <RegisterModal
        showRegister={showRegister}
        handleCloseRegister={handleCloseRegister}
      />
      <LoginModal showLogin={showLogin} handleCloseLogin={handleCloseLogin} />
      {store.auth.isAuthenticated && (
        <Row className="bg-light mt-2 pb-2 loggedConsole">
          <Col>
            <Row className="pl-4 mt-2 mx-auto">
              <Col>
                <h6>Hello, {store.auth.user.username}</h6>
              </Col>
            </Row>
            <Row className="pl-4 mx-auto">
              <Col>
                <Button as="input" type="button" value="Options" />
              </Col>
              <Col>
                  <Button
                    as="input"
                    type="button"
                    value="Logout"
                    onClick={handleLogout}
                  />
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default SearchBar;
