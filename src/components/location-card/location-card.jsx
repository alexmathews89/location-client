import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const LocationCard = ({ location, onLocationClick }) => {
  return (
    <Card>
      <Card.Title>{location.title}</Card.Title>
      <Button onClick={() => onLocationClick(location)} variant="link">
        Open
      </Button>
    </Card>

    /** 
    <div
      onClick={() => {
        onLocationClick(location);
      }}
    >
      {location.title}
    </div>
    */
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  onLocationClick: PropTypes.func.isRequired,
};
