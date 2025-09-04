import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

export const LocationView = ({ location, onBackClick }) => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>{location.title}</div>
      <img
        src={location.image}
        alt={location.title}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <div>{location.description}</div>
      <div>{location.locatedAt.citySubdivision}</div>
      <div> Direction from Downtown: {location.locatedAt.fromStadiums}</div>
      <div> Established in: {location.dateNamed}</div>
      <Button variant="primary" onClick={onBackClick}>
        Back
      </Button>
    </div>
  );
};

LocationView.propTypes = {
  location: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    locatedAt: PropTypes.object.isRequired,
    dateNamed: PropTypes.string.isRequired,
  }).isRequired,
};
