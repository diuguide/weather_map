import { Row, Col, Card } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

const Results = () => {
  const store = useSelector((store) => store, shallowEqual);
  const dataSet = store.searchQuery.search_data.data;
  const imageIcon = `/icons/${dataSet.current.weather[0].icon}.png`;
  console.log('store: ', store)

  return (
    <Row className="bg-light mt-2 pb-3 results">
      <Col>
        <Row className="d-inline-flex">
          <Col>
            <div className="temp">
              {dataSet.current.temp}
              <span className="fSymbol">&deg;F</span>
            </div>
          </Col>
          <Col>
            <img className="imgIcon" alt="weathericon" src={imageIcon}></img>
          </Col>
        </Row>
        <Row className="d-inline-flex">
          <Col>
            <Card className="tempCard">
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
            <Card className="tempCard">
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
      </Col>
    </Row>
  );
};

export default Results;
