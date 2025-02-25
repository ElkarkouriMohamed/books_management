import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './pages/layouts/Header';
import Books from './pages/Books';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Register from './pages/auth/Register';

function App() {
  const user = useSelector(state => state.auth.user);
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<Home />} />
            <Route path='/books' element={<Books />} />
            <Route path='/login' element={user ? <Navigate to='/'/> : <Login />} />
            <Route path='/register' element={user ? <Navigate to='/'/> : <Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
