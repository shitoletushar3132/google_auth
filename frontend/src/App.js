import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Error from "./components/Error";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Error />} /> {/* For handling 404 errors */}
      </Routes>
    </div>
  );
}

export default App;
