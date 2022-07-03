import Lottie from "lottie-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SUCCESS } from "../../common/constants";
import birdAnimation from "../../animations/birdAnimation.json";
import "./ResultsPage.styles.scss";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateData = location.state;
  const result = stateData?.result || {};
  const { status = "", planet_name = "" } = result;

  useEffect(() => {
    if (!status || !planet_name) {
      navigate("/");
    }
  }, []);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <section className='results-page'>
      <h1 className='results-page__heading heading'>
        {status === SUCCESS
          ? "Congratulations Voyager! You found Falcone!"
          : "Bad luck Voyager! You did not find Falcone!"}
      </h1>
      <div className='results-page__animation'>
        <Lottie animationData={birdAnimation} loop={true} />
      </div>
      <h2 className='results-page__subheading subheading'>
        He was hiding in {planet_name}
      </h2>
      <button className='results-page__button button' onClick={handleClick}>
        Want to try this adventure again?
      </button>
    </section>
  );
};

export default ResultsPage;
