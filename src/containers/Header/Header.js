import "./Header.styles.scss";

const Header = () => {
  return (
    <nav className="navigation-bar">
      <img
        className="navigation-bar__img"
        src={require("../../images/bird.png")}
        alt="bird"
      />
      <h1 className="navigation-bar__heading">Finding Falcone</h1>
      <div className="navigation-bar__links">
        <a>Home</a>
        <a>Reset</a>
      </div>
    </nav>
  );
};

export default Header;
