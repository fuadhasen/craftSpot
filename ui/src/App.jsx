import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Book from './pages/Book';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import UserServices from './pages/UserServices';
import CreateService from './pages/CreateService';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:id" element={<ServiceDetail />} />
        <Route path="services/:id/book" element={<Book />} />
        <Route path="me" element={<Dashboard />} >
          <Route path="bookings" element={<Bookings />} />
          <Route path="services" element={<UserServices />} />
          <Route path="create-service" element={<CreateService />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
