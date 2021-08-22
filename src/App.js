import './App.css';
import WeatherContext from './context/WeatherContext';
import Main from './components/Main';

function App() {

  return (
    <div className="App">
      <WeatherContext>
        <Main />
      </WeatherContext>
    </div>
  );
}

export default App;
