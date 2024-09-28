// MaterialInput.js
import { Row, Col, Form, Button } from "react-bootstrap";

const MaterialInput = ({
  material,
  index,
  handleMaterialChange,
  deleteMaterialInput,
  suggesttedMaterialName,
  activeMaterialIndex,
  setActiveMaterialIndex,
  selectMaterial,
}) => {
  return (
    <Row className="mb-4" key={index}>
      <Form.Group as={Col} sm="5">
        <Form.Label>Material {index + 1}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Material Name"
          value={material.name}
          onFocus={() => setActiveMaterialIndex(index)} // Set the active index when focused
          onChange={(e) => handleMaterialChange(index, "name", e)} // Track the index
          required
        />
      </Form.Group>

      <Form.Group as={Col} sm="5">
        <Form.Label>KG</Form.Label>
        <Form.Control
          type="number"
          placeholder="KG"
          value={material.kg}
          onChange={(e) => handleMaterialChange(index, "kg", e)}
          required
        />
      </Form.Group>

      <Form.Group as={Col} sm="2" className="d-flex align-items-center">
        <Button
          variant="danger"
          onClick={() => deleteMaterialInput(index)}
          style={{ marginTop: "30px" }}
        >
          DELETE
        </Button>
      </Form.Group>

      {/* Show suggestions only for the active material index */}
      {activeMaterialIndex === index && suggesttedMaterialName.length > 0 && (
        <ul>
          {suggesttedMaterialName.map((materialSuggestion, suggestionIndex) => (
            <li
              key={suggestionIndex}
              onClick={() => selectMaterial(materialSuggestion, index)} // Pass the index to update the correct entry
            >
              {materialSuggestion.name}
            </li>
          ))}
        </ul>
      )}
    </Row>
  );
};

export default MaterialInput;
