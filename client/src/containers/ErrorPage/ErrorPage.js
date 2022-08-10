import "./ErrorPage.styles.scss";

const ErrorPage = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <div className='error-page'>
      <h1 className='error-page__heading heading'>Something went wrong.</h1>
      <button onClick={handleClick} className='error-page__button button'>
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
