import "./App.styles.scss";
import DestinationSelectionPage from "./containers/DestinationSelectionPage/DestinationSelectionPage";
import Footer from "./containers/Footer/Footer";
import Header from "./containers/Header/Header";

function App() {
  return (
    <>
      <Header />
      <DestinationSelectionPage />
      <Footer />
    </>
  );
}

export default App;
