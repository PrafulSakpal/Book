import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../services/LocalStorageService';
import { unSetUserToken } from '../features/authSlice';
import { removeToken } from '../services/LocalStorageService';

const Navbar = () => {
  const { access_token } = getToken();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    // dispatch(unsetUserInfo({ name: "", email: "" }))
    dispatch(unSetUserToken({ access_token: null }))
    removeToken()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand fs-4">Book-Shop</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white" aria-current="page" activeclassname="active">Home</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/contact" className="nav-link text-white" activeclassname="active">Contact</Link>
            </li> */}
            {access_token ? (
              <>
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link text-white" activeclassname="active">Dashboard</Link>
                </li>
                <button onClick={handleLogOut} className='btn btn-danger ml-auto'>LogOut</button>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link text-white" activeclassname="active">Login/Registration</Link>

              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
