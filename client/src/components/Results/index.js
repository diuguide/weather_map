import { Row, Col } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

const Results = () => {
  const store = useSelector((store) => store, shallowEqual);
  console.log("store inside Results: ", store);
  const dataSet = store.searchQuery.search_data.data;
  return (
    <>
      {store.searchQuery.data_loaded && (
        <Row>
          <Col className="col-6 border border-rounded d-inline-flex resultsCurrent">
            <div className="name">{dataSet.name}</div>
            
          </Col>
          <Col className="col-3">
              <div className="temp">{dataSet.main.temp}</div>
          </Col>
          {/* <Col className="col d-block">
                    <div className="sunrise">Sunrise: {dataSet.sys.sunrise}</div>
                    <div className="sunset">Sunset: {dataSet.sys.sunset}</div>
                </Col> */}
        </Row> 
      )}
    </>
  );
};

export default Results;
