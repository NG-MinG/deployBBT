
import { useLocation } from 'react-router-dom';
import './App.css';

import AppRoutes from "./routes/AppRoutes"
import { useEffect } from 'react';


function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


  return <AppRoutes/>
}

export default App;
