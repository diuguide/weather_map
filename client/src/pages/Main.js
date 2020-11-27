import { Row, Col, Container } from 'react-bootstrap';
import Results from '../components/Results';
import { useSelector, shallowEqual } from "react-redux";

const Main = ({ APIkey }) => {
    const store = useSelector((store) => store, shallowEqual);
    return (
        <>
        {store.searchQuery.data_loaded && (
        <Results APIkey={APIkey} />
        )}
        </>
    )
}

export default Main;