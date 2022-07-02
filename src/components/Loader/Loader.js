import Lottie from "lottie-react";
import rocketAnimation from "../../animations/rocketAnimation.json";

const Loader = ({ headingText = "" }) => (
  <div className='loader'>
    <Lottie animationData={rocketAnimation} loop={true} />
    {headingText && <h1 className='loader__text'>{headingText}</h1>}
  </div>
);

export default Loader;
