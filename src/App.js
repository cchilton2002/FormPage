import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import LinkPage from './components/LinkPage';
import Unauthorized from './components/Unauthorized';
import Home from './components/Home';
import Editor from './components/Editor'
import Admin from './components/Editor';
import Lounge from './components/Lounge';
import Missing from './components/Missing';
import RequireAuth from './components/RequireAuth';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='linkpage' element={<LinkPage />} />
        <Route path='unauthorized' element={<Unauthorized />} />

        <Route element={<RequireAuth />}>
          <Route path='/' element={<Home />} />
          <Route path='editor' element={<Editor />} />
          <Route path='admin' element={<Admin />} />
          <Route path='lounge' element={<Lounge />} />
        </Route>

        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
