import './App.css';
import Navigation from './routes/Navigation';
import { ToastContainer } from './components/Common/index.js'

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Navigation />
    </div>
  );
}

export default App;
