import './App.css';
import { Routes as Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" element={<Home />} />
      </Switch>
    </div>
  );
}

export default App;
