import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from './pages/layouts/Header';
import Books from './pages/Books';
import Login from './pages/auth/Login';

function App() {
  const user = useSelector(state => state.auth.user);
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<div>Home</div>} />
            <Route path='/books' element={<Books />} />
            <Route path='/login' element={user ? <Navigate to='/'/> : <Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
