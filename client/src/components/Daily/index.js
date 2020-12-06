import { Row, Col, Table, Container } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";
import * as moment from "moment";
const Daily = () => {
  const store = useSelector((store) => store, shallowEqual);
  const dataSet = store.searchQuery.search_data.data.daily;
  return (
    <>
      <Row className="ml-1 mt-4">
        <h1>8 Day Forecast</h1>
      </Row>
      <Row>
        <Col>
          <Table
            className="bg-light shadow dailyTable"
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
                      {moment.unix(data.dt).format("dddd M/D")}
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
      <Row></Row>
    </>
  );
};

export default Daily;
