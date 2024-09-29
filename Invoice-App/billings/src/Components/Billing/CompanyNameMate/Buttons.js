import { Row, Col, Form, Button } from "react-bootstrap";

const Buttons = (props) => {
  return (
    <>
      <Row className="mb-4" style={{ marginTop: "50px" }}>
        <Col style={{ marginLeft: "170px" }}>
          <Button
            variant="primary"
            onClick={props.addMaterialInput}
            className="mr-2"
          >
            MORE MATERIALS
          </Button>
        </Col>
        <Col>
          <Button
            variant="primary"
            onClick={props.handleSubmit}
            className="ml-2"
          >
            SUBMIT
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Buttons;
