// CompanyInput.js
import { Form, Row, Col } from "react-bootstrap";
// import "../../styles/Company/Company.css"; // Ensure you have this CSS file for custom styles.

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
            <div className="suggestion-container">
              <ul className="suggestion-list">
                {props.suggestcompany.slice(0, 5).map((company, index) => (
                  <li key={index} onClick={() => props.selectcompany(company)}>
                    {company.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default CompanyInput;
