import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Row, Container } from "react-bootstrap";
import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { LOGOUT_SUCCESS } from "../../actions/types";

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

  const handleLogout = () => {
    dispatch({ type: LOGOUT_SUCCESS })
    alert('Logged out!')
    window.location.reload();
  }

  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  return (
    <Container>
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
        <Col>
          <Button
            as="input"
            type="button"
            value="Search"
            onClick={handleSubmit}
          />

          {!store.auth.isAuthenticated &&
          <Button as="input" type="button" value="Sign Up" onClick={handleShowRegister} />
          }
          
          {!store.auth.isAuthenticated &&
          <Button as="input" type="button" value="Login" onClick={handleShowLogin} />
          }

          {store.auth.isAuthenticated &&
          <Button as="input" type="button" value="Logout" onClick={handleLogout} />
          }
          
        </Col>
        <RegisterModal
          showRegister={showRegister}
          handleCloseRegister={handleCloseRegister}
        />
        <LoginModal 
          showLogin={showLogin}
          handleCloseLogin={handleCloseLogin}
        />
      </Row>
      <Row>
        <Col>
        {store.auth.isAuthenticated &&
        <h6>Hello, {store.auth.user.username}</h6>
        }
        </Col>
        <Col>
        {store.auth.isAuthenticated &&
        <Button as="input" type="button" value="User Settings" />
        }
        </Col>
      </Row>
    </Container>
  );
}

export default SearchBar;
