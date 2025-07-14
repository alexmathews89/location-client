import { useState, useEffect } from "react";
import { LocationCard } from "../location-card/location-card";
import { LocationView } from "../location-view/location-view";

export const MainView = () => {
  const [locations, setLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetch("https://polar-crag-88682-7adc6d8f37e3.herokuapp.com/locations")
      .then((response) => response.json())
      .then((data) => {
        console.log("Locations from API:", data);
        const locationsFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            image: doc.ImagePath,
            description: doc.Description,
            locatedAt: {
              fromStadiums: doc.LocatedAt.FromStadiums,
              citySubdivision: doc.LocatedAt.CitySubdivision,
            },
            dateNamed: doc.DateNamed,
          };
        });
        setLocations(locationsFromApi);
      });
  }, []);

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
