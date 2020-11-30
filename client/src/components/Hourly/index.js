import { Row, Col, Table, Container } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";
import * as moment from 'moment';
import momentTz from 'moment-timezone';

const Hourly = () => {
  const store = useSelector((store) => store, shallowEqual);
  const dataSet = store.searchQuery.search_data.data.hourly;
  const dataSetMap = dataSet.filter((data, i) => i < 12);
  const time = moment().format('hh:mm:ss');
  
  console.log('time: ', time);
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
                  <td>{momentTz.tz(`11:15:00`, 'America/Toronto')}</td>
                  <td>{data.feels_like} &deg;F</td>
                  <td>{data.humidity} %</td>
                  <td>{data.wind_speed} mph</td>
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
