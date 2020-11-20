import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'


const Results = () => {
    const store = useSelector(store => store, shallowEqual)
  const dispatch = useDispatch();
  console.log('store inside Results: ', store)
  const dataSet = store.searchQuery.search_data.data;
    return (
        <>
        {(store.searchQuery.data_loaded) &&
        <Row>
            <Col>
                <h1>{dataSet.name}</h1>
            </Col>
        </Row>
        }
        </>
    )
}

export default Results;