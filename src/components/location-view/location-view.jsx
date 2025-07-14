import PropTypes from "prop-types";

export const LocationView = ({ location, onBackClick }) => {
  return (
    <div>
      <div>{location.title}</div>
      <div>{location.image}</div>
      <div>{location.description}</div>
      <div>{location.locatedAt.citySubdivision}</div>
      <div>{location.locatedAt.fromStadiums}</div>
      <div>{location.dateNamed}</div>
      <button onClick={onBackClick}>Back</button>
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
