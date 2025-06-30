import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import Complaint from './pages/Complaint';
import { useAppDispatch } from './store/hooks';
import { getUserDetails } from './axios/axios';
import { authLogin } from './store/authStore';
import ComplaintDetail from './pages/ComplaintDetail';
import AddAdmin from './pages/AddAdmin';

function App() {
    const dispatch = useAppDispatch();

    useEffect(()=>{
      (async()=>{
        const userDetails = await getUserDetails();
         
        if(userDetails){
          if(userDetails.data) dispatch(authLogin(userDetails.data));
        }
      })();
    },[])
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-admin" element={<AddAdmin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/complaint-detail/:id" element={<ComplaintDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;