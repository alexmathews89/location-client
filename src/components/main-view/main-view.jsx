import { useState, useEffect } from "react";
import { LocationCard } from "../location-card/location-card";
import { LocationView } from "../location-view/location-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [locations, setLocations] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [user, setUser] = useState(storedUser ? storedUser : null);

  const [token, setToken] = useState(storedToken ? storedToken : null);

  /* 
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://polar-crag-88682-7adc6d8f37e3.herokuapp.com/locations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((locations) => {
        setLocations(locations);
      });
  }, [token]); 
  **/

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://polar-crag-88682-7adc6d8f37e3.herokuapp.com/locations", {
      headers: { Authorization: `Bearer ${token}` },
    })
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
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or <SignupView />
      </>
    );
  }

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
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </button>
    </div>
  );
};
