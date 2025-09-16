import './App.css';
import Navigation from './routes/Navigation';
//import { ToastContainer } from './components/Common/index.js'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Navigation />
    </div>
  );
}

export default App;
