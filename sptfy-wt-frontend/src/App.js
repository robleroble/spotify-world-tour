import logo from "./logo.svg";
import Map from "./Map/Map";
import NavBar from "./Nav/NavBar";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <Map />
      </header>
    </div>
  );
}

export default App;
