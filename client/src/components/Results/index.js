import { Row, Col, Card, Button } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

const Results = () => {
  const store = useSelector((store) => store, shallowEqual);
  console.log("store inside Results: ", store);
  const dataSet = store.searchQuery.search_data.data;
  return (
    <>
      <Row className="d-inline-flex mx-auto">
        <Col>
          <Card className="ml-1 tempCard">
            <Card.Header as="h5">Current Temp</Card.Header>
            <div className="temp">{dataSet.main.temp} &deg;F</div>
          </Card>
        </Col>
        <Col>
          <Card className="ml-1 tempCard">
            <Card.Header as="h5">Max</Card.Header>
            <div className="temp">{dataSet.main.temp_max} &deg;F</div>
          </Card>
        </Col>
        <Col>
          <Card className="ml-1 tempCard">
            <Card.Header as="h5">Min</Card.Header>
            <div className="temp">{dataSet.main.temp_min} &deg;F</div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Results;
