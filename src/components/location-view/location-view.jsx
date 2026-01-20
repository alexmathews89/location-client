import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./location-view.scss";

export const LocationView = ({ locations }) => {
  const { locationID } = useParams();

  const location = locations.find((l) => l.id === locationID);

  return (
    <div>
      <div className="location-title" style={{ textAlign: "center" }}>
        {location.title}
      </div>
      <img
        className="location-image"
        src={location.image}
        alt={location.title}
        style={{ width: "600px", height: "475px", objectFit: "cover" }}
      />
      <div className="location-description">{location.description}</div>
      <div className="location-subdivision">
        {location.locatedAt.citySubdivision}
      </div>
      <div className="location-direction">
        {" "}
        Direction from Downtown: {location.locatedAt.fromStadiums}
      </div>
      <div className="location-date"> Established in: {location.dateNamed}</div>
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
    </div>
  );
};
