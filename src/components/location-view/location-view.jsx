export const LocationView = ({ location, onBackClick }) => {
  return (
    <div>
      <div>{location.title}</div>
      <div>{location.locatedAt.fromStadiums}</div>
      <div>{location.dateNamed}</div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
