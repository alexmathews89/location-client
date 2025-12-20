import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const LocationView = ({ locations }) => {
  const { locationID } = useParams();

  const location = locations.find((l) => l.id === locationID);

  return (
    /** 
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
    */

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
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

/** 
LocationView.propTypes = {
  location: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    locatedAt: PropTypes.object.isRequired,
    dateNamed: PropTypes.string.isRequired,
  }).isRequired,
};
*/
