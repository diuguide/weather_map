import SearchBar from "../components/SearchBar";
import Results from '../components/Results';
import Hourly from '../components/Hourly';
import Daily from '../components/Daily';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import RegisterModal from "../components/auth/RegisterModal";
import LoginModal from "../components/auth/LoginModal";
import HomeModal from "../components/auth/HomeModal";
import { useState } from "react";
import { LOGOUT_SUCCESS, CLEAR_DATA } from "../actions/types";

const Main = ({ weatherCall, searchTitle }) => {
    const store = useSelector((store) => store, shallowEqual);
    const dispatch = useDispatch();
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);
  
    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
  
    const [showHome, setShowHome] = useState(false);
    const handleCloseHome = () => setShowHome(false);
    const handleShowHome = () => setShowHome(true);

    const handleLogout = () => {
        dispatch({ type: LOGOUT_SUCCESS });
        dispatch({ type: CLEAR_DATA });
        alert("You are now logged out!");
      };

    return (
        <>
        <SearchBar
        handleShowHome={handleShowHome}
        handleShowLogin={handleShowLogin}
        handleShowRegister={handleShowRegister} 
        handleLogout={handleLogout}
        searchTitle={searchTitle}
        weatherCall={weatherCall} />
        {store.searchQuery.data_loaded && (
        <Results weatherCall={weatherCall} />
        )}
        {store.searchQuery.data_loaded && (
        <Hourly />
        )}
        {store.searchQuery.data_loaded && (
        <Daily />
        )}
        <RegisterModal
        showRegister={showRegister}
        handleCloseRegister={handleCloseRegister}
        weatherCall={weatherCall}
      />
      <LoginModal showLogin={showLogin} handleCloseLogin={handleCloseLogin} weatherCall={weatherCall} />
      <HomeModal showHome={showHome} weatherCall={weatherCall} handleCloseHome={handleCloseHome}  />
        </>
    )
}

export default Main;