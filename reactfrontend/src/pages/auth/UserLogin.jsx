import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserToken } from '../../features/authSlice';
import { getToken, storeToken } from '../../services/LocalStorageService';
import axios from 'axios';

const UserLogin = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    try{
      e.preventDefault();

      const data = new FormData(e.currentTarget);
      
      const actualData = {
        email: data.get('email'),
        password: data.get('password'),
      }

      const res = await axios.post('http://127.0.0.1:8000/api/user/login/', actualData) 

      if (res.data) {
        // console.log(res.data)
        storeToken(res.data.token)
        let { access_token } = getToken()
        dispatch(setUserToken({ access_token: access_token }))
        navigate('/dashboard')
     }

    } catch(error){
      // console.log(error)
      setServerError(error.response.data.errors)
    }

  }
 

  // let { access_token } = getToken()

  // useEffect(() => {
  //   dispatch(setUserToken({ access_token: access_token }))
  // }, [access_token, dispatch])


  return <>
    {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
    {server_error.email ? console.log(server_error.email[0]) : ""}
    {server_error.password ? console.log(server_error.password[0]) : ""}
    <form noValidate onSubmit={handleSubmit} id='login-form' className='mt-3 p-3'>
      <div className="mb-3">
        <label htmlFor='email' className='form-label'>Email Address</label>
        <input type='email' className='form-control' id='email' name='email' placeholder='Enter your email' required />
        {server_error.email && <small className='form-text text-danger'>{server_error.email[0]}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor='password' className='form-label'>Password</label>
        <input type='password' className='form-control' id='password' name='password' placeholder='Enter your password' required />
        {server_error.password && <small className='form-text text-danger'>{server_error.password[0]}</small>}
      </div>

      <div className="text-center">
        <button type='submit' className='btn btn-primary mt-3 mb-2 px-5'>Login</button>
      </div>

      <a href='/sendpasswordresetemail' className="d-block mb-3">Forgot Password?</a>

      {server_error.non_field_errors && <div className='alert alert-danger'>{server_error.non_field_errors[0]}</div>}
    </form>
  </>;
};

export default UserLogin;
