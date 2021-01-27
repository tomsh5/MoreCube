import { CubeApp }  from './cmps/CubeApp/CubeApp'
import './App.scss';
import ReactGA from 'react-ga';
ReactGA.initialize('G-JNQV85C1EF');
ReactGA.pageview(window.location.pathname + window.location.search);

function App() {
  return (
    <div className="App">
  <CubeApp/>
    </div>
  );
}

export default App;
