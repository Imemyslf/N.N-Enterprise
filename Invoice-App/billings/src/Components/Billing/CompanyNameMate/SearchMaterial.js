// MaterialInput.js
import { Row, Col, Form, Button } from "react-bootstrap"; // Ensure you have this CSS file for custom styles.

const MaterialInput = (props) => {
  return (
    <Row className="mb-4" key={props.index}>
      <Form.Group as={Col} sm="5">
        <Form.Label>Material {props.index + 1}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Material Name"
          value={props.material.name}
          onFocus={() => props.setActiveMaterialIndex(props.index)} // Set the active index when focused
          onChange={(e) => props.handleMaterialChange(props.index, "name", e)} // Track the index
          required
        />
        {props.activeMaterialIndex === props.index &&
          props.suggesttedMaterialName.length > 0 && (
            <div className="suggestion-container">
              <ul className="suggestion-list">
                {props.suggesttedMaterialName
                  .slice(0, 5)
                  .map((materialSuggestion, suggestionIndex) => (
                    <li
                      key={suggestionIndex}
                      onClick={() =>
                        props.selectMaterial(materialSuggestion, props.index)
                      }
                    >
                      {materialSuggestion.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}
      </Form.Group>

      <Form.Group as={Col} sm="5">
        <Form.Label>KG</Form.Label>
        <Form.Control
          type="number"
          placeholder="KG"
          value={props.material.kg}
          onChange={(e) => props.handleMaterialChange(props.index, "kg", e)}
          required
        />
      </Form.Group>

      <Form.Group as={Col} sm="2" className="d-flex align-items-center">
        <Button
          variant="danger"
          onClick={() => props.deleteMaterialInput(props.index)}
          style={{ marginTop: "30px" }}
        >
          DELETE
        </Button>
      </Form.Group>
    </Row>
  );
};

export default MaterialInput;
