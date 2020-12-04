import { Row, Col, Table, Container } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

const Hourly = () => {
  const store = useSelector((store) => store, shallowEqual);
  const dataSet = store.searchQuery.search_data.data.hourly;
  const dataSetMap = dataSet.filter((data, i) => i < 8);

  return (
    <Container>
      <Row className="ml-1 mt-4"><h1>8 Hour Forecast</h1></Row>
      <Row>
        <Col>
          <Table
            className="shadow hourlyTable"
            striped
            bordered
            hover
            size="sm"
          >
            <tbody className="tableBody">
              <div>
                <td className="hourTable">+1 hour</td>
                <td className="hourTable">+2 hours</td>
                <td className="hourTable">+3 hours</td>
                <td className="hourTable">+4 hours</td>
                <td className="hourTable">+5 hours</td>
                <td className="hourTable">+6 hours</td>
                <td className="hourTable">+7 hours</td>
                <td className="hourTable">+8 hours</td>
              </div>
              <div>
                {dataSetMap.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td className="dataTable">{data.temp} &deg;F</td>
                      <td className="dataTable">{data.humidity} %</td>
                      <td className="dataTable">{data.wind_speed} mph</td>
                    </tr>
                  );
                })}
              </div>
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default Hourly;
