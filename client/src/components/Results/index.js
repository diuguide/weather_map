import { Row, Col, Card, Container } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

const Results = () => {
  const store = useSelector((store) => store, shallowEqual);
  console.log("store inside Results: ", store);
  const dataSet = store.searchQuery.search_data.data;
  const imageIcon = `/icons/${dataSet.weather[0].icon}.png`;
  return (
    <Container>
      <Row className="results">
        <Col>
          <div className="temp">
            {dataSet.main.temp}
            <span className="fSymbol">&deg;F</span>
          </div>
        </Col>
        <Col>
          <div className="imgIcon">
            <img src={imageIcon}></img>
          </div>
          <div className="currentCond">{dataSet.weather[0].main}</div>
        </Col>
      </Row>
      <Row className="results">
        <Col>
          <Card className="shadow tempCard">
            <Card.Header className="text-center" as="h5">
              Humidity
            </Card.Header>
            <div className="humidityValue">
              {dataSet.main.humidity}
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
              {dataSet.wind.speed}
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
              {dataSet.main.pressure}
              <span className="mbarSymbol">mbar</span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Results;
