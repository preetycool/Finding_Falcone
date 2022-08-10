import "./Header.styles.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <nav className='navigation-bar'>
      <div onClick={handleClick} className='navigation-bar__information'>
        <img
          className='navigation-bar__img'
          src={require("../../images/bird.png")}
          alt='bird'
        />
        <h1 className='navigation-bar__heading'>Finding Falcone</h1>
      </div>
      <div className='navigation-bar__actions'>
        <Link className='navigation-bar__action link' to='/'>
          Home
        </Link>
        |
        <button
          className='navigation-bar__action nav-button'
          onClick={handleClick}
        >
          Reset
        </button>
      </div>
    </nav>
  );
};

export default Header;
