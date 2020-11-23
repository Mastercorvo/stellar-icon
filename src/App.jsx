
import './styles/App.css';

import Header from './global/header';
import Main from './Main';
import { useState } from 'react';

function App() {
  const [car, setCar] = useState([])
  return (
    <div className="root">
      <Header car={car} setCar={setCar}/>
      <Main car={car} setCar={setCar}/>
    </div>
  );
}

export default App;
