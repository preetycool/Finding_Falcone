import Lottie from "lottie-react";
import rocketAnimation from "../../animations/rocketAnimation.json";
import "./Loader.styles.scss";

const Loader = ({ headingText = "" }) => (
  <div className="loader">
    <Lottie animationData={rocketAnimation} loop={true} />
    {headingText && <h1 className="loader__heading">{headingText}</h1>}
  </div>
);

export default Loader;
