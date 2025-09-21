import { Modal } from './components';
import Navigation from './routes/Navigation';
import { ToastContainer } from 'react-toastify';
import './App.css';

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
      <Modal/>
    </div>
  );
}

export default App;
