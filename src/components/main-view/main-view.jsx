import { useState, useEffect } from "react";
import { LocationCard } from "../location-card/location-card";
import { LocationView } from "../location-view/location-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Button } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  //const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedUser = (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  })();

  const storedToken = localStorage.getItem("token");

  const [locations, setLocations] = useState([]);

  //const [selectedLocation, setSelectedLocation] = useState(null);

  const [user, setUser] = useState(storedUser ? storedUser : null);
  //const [user, setUser] = useState(null);

  const [token, setToken] = useState(storedToken ? storedToken : null);
  //const [token, setToken] = useState(null);

  const [searchKey, setSearchKey] = useState("");
  const [debouncedSearchKey, setDebouncedSearchKey] = useState("");

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

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchKey(searchKey);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchKey]);

  const filterdLocations = locations.filter((location) =>
    location.title.toLowerCase().includes(debouncedSearchKey.toLowerCase())
  );

  /** 
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
  */

  /** 
  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or <SignupView />
          </Col>
        </>
      ) : selectedLocation ? (
        <Col md={8}>
          <LocationView
            location={selectedLocation}
            onBackClick={() => setSelectedLocation(null)}
          />
        </Col>
      ) : locations.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          {locations.map((location) => (
            <Col className="mb-5" key={location.id} md={5}>
              <LocationCard
                //key={location.id}
                location={location}
                onLocationClick={(newSelectdLocation) => {
                  setSelectedLocation(newSelectdLocation);
                }}
              />
            </Col>
          ))}
          <Button
            variant="primary"
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </Button>
        </>
      )}
    </Row>
  );
  */

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        searchKey={searchKey}
        onSearchChange={setSearchKey}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row>
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/locations/:locationID"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : locations.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <LocationView locations={locations} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : locations.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {filterdLocations.map((location) => (
                      <Col className="mb-4" key={location.id} md={3}>
                        <LocationCard
                          location={location}
                          user={user}
                          token={token}
                          setUser={setUser}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <ProfileView
                    user={user}
                    locations={locations}
                    token={token}
                    location={location}
                    setUser={setUser}
                    onLoggedOut={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                  />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
