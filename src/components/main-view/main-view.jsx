import { useState } from "react";
import { LocationCard } from "../location-card/location-card";
import { LocationView } from "../location-view/location-view";

export const MainView = () => {
  const [locations, setLocations] = useState([
    {
      id: 1,
      title: "Magnuson Park",
      locatedAt: { fromStadiums: "East" },
      dateNamed: "1977",
    },
    {
      id: 2,
      title: "Discovery Park",
      locatedAt: { fromStadiums: "West" },
      dateNamed: "1973",
    },
    {
      id: 3,
      title: "Capitol Hill",
      locatedAt: { fromStadiums: "East" },
      dateNamed: "1901",
    },
  ]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  if (selectedLocation) {
    return (
      <LocationView
        location={selectedLocation}
        onBackClick={() => setSelectedLocation(null)}
      />
    );
  }

  if (locations.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {locations.map((location) => {
        return (
          <LocationCard
            key={location.id}
            location={location}
            onLocationClick={(newSelectdLocation) => {
              setSelectedLocation(newSelectdLocation);
            }}
          />
        );
      })}
    </div>
  );
};
