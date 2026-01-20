import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { LocationCard } from "../location-card/location-card";
import "./profile-view.scss";

export const ProfileView = ({
  user,
  locations,
  token,
  location,
  setUser,
  onLoggedOut,
}) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  console.log(user);
  let favoriteLocations = locations.filter((l) =>
    user?.FavoriteLocations?.includes(l.id),
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,

      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://polar-crag-88682-7adc6d8f37e3.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("User Updated");
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log(error);
      });
  };

  const deleteAccount = (event) => {
    event.preventDefault();

    fetch(
      `https://polar-crag-88682-7adc6d8f37e3.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        if (response.ok) {
          alert("Account deleted successfully.");
          onLoggedOut();
        }
      })
      .catch((error) => {
        alert("Something went wrong.");
        console.log(error);
      });
  };

  return (
    <>
      <h3 style={{ textAlign: "center" }}>My Profile</h3> <br></br>
      <h6>Username: {user.Username}</h6>
      <br></br>
      <h6>Email: {user.Email}</h6>
      <br></br>
      <h6>Birthday: {new Date(user.Birthday).toLocaleDateString()}</h6>
      <br></br>
      <>
        <div className="favorite-locations">Favorite Locations:</div>
      </>
      {favoriteLocations.map((location) => {
        return (
          <LocationCard
            key={location.id}
            location={location}
            token={token}
            user={user}
            setUser={setUser}
          />
        );
      })}
      <br></br>
      <h5 style={{ textAlign: "center" }}>Update my Information</h5>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>
            <div className="form-label">Username</div>
          </Form.Label>
          <Form.Control type="text" value={username} disabled />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>
            <div className="form-label">Password</div>
          </Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>
            <div className="form-label">Email</div>
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>
            <div className="form-label">Birthday</div>
          </Form.Label>
          <Form.Control
            type="date"
            name="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <br></br>
        <Button onClick={deleteAccount}>Delete Profile</Button>
      </Form>
    </>
  );
};
