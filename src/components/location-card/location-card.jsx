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
