import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LocationCard = ({ location, user, token, setUser }) => {
  function addToFavorites() {
    fetch(
      `https://polar-crag-88682-7adc6d8f37e3.herokuapp.com/users/${user.Username}/locations/${location.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("User Updated");
      })
      .catch((error) => {
        alert("Someting went wrong");
        console.log(error);
      });
  }

  function removeFromFavorites() {
    fetch(
      `https://polar-crag-88682-7adc6d8f37e3.herokuapp.com/users/${user.Username}/locations/${location.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "Application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((updatedUser) => {
        console.log(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("User Updated");
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log(error);
      });
  }

  return (
    <Card>
      <Card.Title>{location.title}</Card.Title>
      <Link to={`/locations/${encodeURIComponent(location.id)}`}>
        <Button variant="link">Open</Button>
      </Link>
      <Button variant="link" onClick={addToFavorites}>
        Add to Favorites
      </Button>
      <Button variant="link" onClick={removeFromFavorites}>
        Remove from Favorites
      </Button>
    </Card>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};
