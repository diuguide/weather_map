import { Row, Col, Card, Container } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

const Results = () => {
  const store = useSelector((store) => store, shallowEqual);
  
  console.log("store inside Results: ", store);

  const dataSet = store.searchQuery.search_data.data;
  const imageIcon = `/icons/${dataSet.current.weather[0].icon}.png`;

  return (
    <Container>
      <Row className="d-inline-flex mx-auto results">
        <Col>
          <div className="temp">
            {dataSet.current.temp}
            <span className="fSymbol">&deg;F</span>
          </div>
        </Col>
        <Col>
          <div className="imgIcon">
            <img alt="weathericon" src={imageIcon}></img>
          </div>
          <div className="currentCond">{dataSet.current.weather[0].main}</div>
        </Col>
      </Row>
      <Row className="d-inline-flex results">
        <Col>
          <Card className="shadow tempCard">
            <Card.Header className="text-center" as="h5">
              Humidity
            </Card.Header>
            <div className="humidityValue">
              {dataSet.current.humidity}
              <span className="degreeSymbol">%</span>
            </div>
          </Card>
        </Col>
        <Col>
          <Card className="shadow tempCard">
            <Card.Header className="text-center" as="h5">
              Wind Speed
            </Card.Header>
            <div className="windSpdValue">
              {dataSet.current.wind_speed}
              <span className="mphSymbol">mph</span>
            </div>
          </Card>
        </Col>
        <Col>
          <Card className="shadow tempCard">
            <Card.Header className="text-center" as="h5">
              Pressure
            </Card.Header>
            <div className="pressureValue">
              {dataSet.current.pressure}
              <span className="mbarSymbol">mbar</span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Results;
