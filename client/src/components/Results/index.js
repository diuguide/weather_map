import { Row, Col, Card, Container } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

const Results = () => {
  const store = useSelector((store) => store, shallowEqual);
  console.log("store inside Results: ", store);
  const dataSet = store.searchQuery.search_data.data;
  return (
    <>
        <Row className="d-inline-flex results">
          <Col>
            <Card className="ml-1 shadow tempCard">
              <Card.Header className="text-center" as="h5">Current Temp</Card.Header>
              <div className="temp">{dataSet.main.temp}<span className="fSymbol">&deg;F</span></div>
            </Card>
          </Col>
          <Col>
            <Card className="ml-1 shadow tempCard">
              <Card.Header className="text-center" as="h5">Max</Card.Header>
              <div className="temp">{dataSet.main.temp_max}<span className="fSymbol">&deg;F</span></div>
            </Card>
          </Col>
          <Col>
            <Card className="ml-1 shadow tempCard">
              <Card.Header className="text-center" as="h5">Min</Card.Header>
              <div className="temp">{dataSet.main.temp_min}<span className="fSymbol">&deg;F</span></div>
            </Card>
          </Col>
        </Row>
        <Row className="d-inline-flex mt-3 results">
          <Col>
            <Card className="ml-1 shadow tempCard">
              <Card.Header className="text-center" as="h5">Pressure</Card.Header>
              <div className="temp">{dataSet.main.pressure}<span className="mbarSymbol">mbar</span></div>
            </Card>
          </Col>
          <Col>
            <Card className="ml-1 shadow tempCard">
              <Card.Header className="text-center" as="h5">Humidity</Card.Header>
              <div className="temp">{dataSet.main.humidity}<span className="degreeSymbol">%</span></div>
            </Card>
          </Col>
          <Col>
            <Card className="ml-1 shadow tempCard">
              <Card.Header className="text-center" as="h5">Wind Speed</Card.Header>
              <div className="temp">{dataSet.wind.speed}<span className="mphSymbol">mph</span></div>
            </Card>
          </Col>
        </Row>
    </>
  );
};

export default Results;
