import { Form, Row, Col } from "react-bootstrap";

const CompanyInput = (props) => {
  return (
    <>
      <Row className="mb-4">
        <Form.Label>Company Name </Form.Label>
        <Col sm="4">
          <Form.Control
            type="text"
            value={props.value}
            placeholder={props.placeholder}
            onChange={props.change}
            required
          />
          {props.suggestcompany.length > 0 && (
            <ul>
              {props.suggestcompany.map((company, index) => (
                <li key={index} onClick={() => props.selectcompany(company)}>
                  {company.name}
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CompanyInput;
