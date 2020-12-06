import { Row, Col, Table, Container } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";
import * as moment from "moment";
const Daily = () => {
  const store = useSelector((store) => store, shallowEqual);
  const dataSet = store.searchQuery.search_data.data.daily;
  return (
    <Row className="bg-light mt-2 dailyCont">
      <Col>
        <Row className="mx-auto">
          <Col>
          <h1>8 Day Forecast</h1>
          </Col>
          
        </Row>
        <Row>
          <Col>
            <Table
              className="dailyTable"
              striped
              bordered
              hover
              size="sm"
            >
              <thead>
                <tr className="tDaily">
                  <td></td>
                  <td>Temp</td>
                  <td>Humdity</td>
                  <td>Wind Speed</td>
                </tr>
              </thead>
              <tbody className="dataBody">
                {dataSet.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td className="dataTable">
                        {moment.unix(data.dt).format("M/D")}
                      </td>
                      <td className="dataTable">
                        Max: {data.temp.max} &deg;F<br></br>Min: {data.temp.min}{" "}
                        &deg;F
                      </td>
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

export default Daily;
