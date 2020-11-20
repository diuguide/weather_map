import { Row, Col } from 'react-bootstrap';
import Results from '../components/Results';
import { useSelector, shallowEqual } from "react-redux";

const Main = () => {
    const store = useSelector((store) => store, shallowEqual);
    return (
        <>
        {store.searchQuery.data_loaded && (
        <Row>
            <Col> 
                <Results />
            </Col>
        </Row>
        )}
        </>
    )
}

export default Main;