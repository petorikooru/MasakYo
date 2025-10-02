
import Resep from './assets/adminresep';
import Apel from './assets/Apel.jpg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Resep/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
