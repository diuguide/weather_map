import { Row, Col, Card, Container } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

const Results = () => {
  const store = useSelector((store) => store, shallowEqual);

  console.log("store inside Results: ", store);

  const dataSet = store.searchQuery.search_data.data;
  const imageIcon = `/icons/${dataSet.current.weather[0].icon}.png`;

  return (
    <>
      <Row className="d-block mx-auto results">
        <Col className="d-inline-flex">
          <div className="temp">
            {dataSet.current.temp}
            <span className="fSymbol">&deg;F</span>
          </div>
          <img className="imgIcon" alt="weathericon" src={imageIcon}></img>
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
              Wind
            </Card.Header>
            <div className="windSpdValue">
              {dataSet.current.wind_speed}
              <span className="mphSymbol">mph</span>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Results;
