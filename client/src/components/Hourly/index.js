import { Row, Col, Table, Container } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

const Hourly = () => {
  const store = useSelector((store) => store, shallowEqual);
  const dataSet = store.searchQuery.search_data.data.hourly;
  const dataSetMap = dataSet.filter((data, i) => i < 12);
  
  return (
    <Container>
      <Row>
        <Col>
          <Table className="shadow hourlyTable" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Time</th>
                <th>Temp</th>
                <th>Humidity</th>
                <th>Wind Speed</th>
              </tr>
            </thead>
            <tbody>
              {dataSetMap.map((data, i) => {
                return (
                  <tr key={i}>
                  <td>{data.dt}</td>
                  <td>{data.feels_like}</td>
                  <td>{data.humidity}</td>
                  <td>{data.wind_speed}</td>
                </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Hourly;
