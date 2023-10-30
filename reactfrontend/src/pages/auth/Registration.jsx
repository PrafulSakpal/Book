import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeToken } from '../../services/LocalStorageService';
import axios from 'axios';

const Registration = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();

 
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const data = new FormData(e.currentTarget);

      const actualData = {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        password2: data.get('password2'),
        tc: data.get('tc'),
      }
      console.log(actualData)

      const res = await axios.post('http://127.0.0.1:8000/api/user/register/', actualData)
      if (res.data) {
        // console.log(typeof (res.data))
        // console.log(res.data)
        storeToken(res.data.token)
        navigate('/dashboard')
      }
    } catch (error) {
      setServerError(error.response.data.errors)
    }
  }

  return <>

    <form onSubmit={handleSubmit} id='registration-form' className='mt-3 p-3'>
      <div className="mb-3">
        <label htmlFor='name' className='form-label'>Name</label>
        <input type='text' className='form-control' id='name' name='name' placeholder='Enter your name' required />
        {server_error.name && <small className='form-text text-danger'>{server_error.name[0]}</small>}
      </div>

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

      <div className="mb-3">
        <label htmlFor='password2' className='form-label'>Confirm Password</label>
        <input type='password' className='form-control' id='password2' name='password2' placeholder='Confirm your password' required />
        {server_error.password2 && <small className='form-text text-danger'>{server_error.password2[0]}</small>}
      </div>

      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="tc" name="tc" required />
        <label className="form-check-label" htmlFor="tc">I agree to terms and conditions.</label>
        {server_error.tc && <small className='form-text text-danger'>{server_error.tc[0]}</small>}
      </div>

      <div className="text-center">
        <button type='submit' className='btn btn-primary mt-3 mb-2 px-5'>Join</button>
      </div>

      {server_error.non_field_errors && <div className='alert alert-danger mt-2'>{server_error.non_field_errors[0]}</div>}
    </form>

  </>;
};

export default Registration;
