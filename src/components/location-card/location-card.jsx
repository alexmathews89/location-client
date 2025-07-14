import PropTypes from "prop-types";

export const LocationCard = ({ location, onLocationClick }) => {
  return (
    <div
      onClick={() => {
        onLocationClick(location);
      }}
    >
      {location.title}
    </div>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  onLocationClick: PropTypes.func.isRequired,
};
