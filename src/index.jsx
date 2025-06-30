import { createRoot } from "react-dom/client";

//Import statement to indicate that you need to bundle `./index.scss
import "./index.scss";

// Main component (will eventually use all the others)
const LocationApplication = () => {
  return (
    <div className="location">
      <div>Good Morning</div>
    </div>
  );
};

//Finds the root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render your app in the root DOM element
root.render(<LocationApplication />);
