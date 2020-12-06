import { Row, Col, Table, Container } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";
import * as moment from "moment";

const Hourly = () => {
  const store = useSelector((store) => store, shallowEqual);
  const dataSet = store.searchQuery.search_data.data.hourly;
  const dataSetMap = dataSet.filter((data, i) => i < 8);

  return (
    <Row className="bg-light hourlyCont">
      <Col>
        <Row className="mx-auto">
          <Col>
          <h1>8 Hour Forecast</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table
              className="bg-light hourlyTable"
              striped
              bordered
              hover
              size="sm"
            >
              <thead>
                <tr className="tHourly">
                  <td>
                    {moment
                      .unix(store.searchQuery.search_data.data.current.dt)
                      .format("hh:mm A")}
                  </td>
                  <td>Temp</td>
                  <td>Humdity</td>
                  <td>Wind Speed</td>
                </tr>
              </thead>
              <tbody className="dataBody">
                {dataSetMap.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td className="dataTable">
                        {moment.unix(data.dt).format("hh:mm A")}
                      </td>
                      <td className="dataTable">{data.temp} &deg;F</td>
                      <td className="dataTable">{data.humidity} %</td>
                      <td className="dataTable">{data.wind_speed} mph</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Hourly;
