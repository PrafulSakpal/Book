import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [server_error, setServerError] = useState({})
  const [server_msg, setServerMsg] = useState({})
  const { id, token } = useParams()
  const navigate = useNavigate()

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   const actualData = {
  //     password: data.get('password'),
  //     password2: data.get('password2'),
  //   }
  //   const res = await axios.post(`http://127.0.0.1:8000/api/user/reset-password/${id}/${token}/`, actualData)
  //   if (res.error) {
  //     setServerMsg({})
  //     setServerError(res.error.data.errors)
  //   }
  //   if (res.data) {
  //     setServerError({})
  //     setServerMsg(res.data)
  //     document.getElementById('password-reset-form').reset()
  //     setTimeout(() => {
  //       navigate("/login")
  //     }, 3000)
  //   }

  // }

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData = {
        password: data.get('password'),
        password2: data.get('password2'),
      }
      const res = await axios.post(`http://127.0.0.1:8000/api/user/reset-password/${id}/${token}/`, actualData)
      if (res.data) {
        setServerError({})
        setServerMsg(res.data)
        document.getElementById('password-reset-form').reset()
        
      }
    }
    catch(error){
      console.log(error)
      setServerMsg({})
      setServerError(error.response.data.errors)
    }

  }
  return <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-6 col-xs-12">
          <h1>Reset Password</h1>
          <form noValidate onSubmit={handleSubmit} id='password-reset-form'>
            <div className="mb-3">
              <label htmlFor='password' className='form-label'>New Password</label>
              <input type='password' className='form-control' id='password' name='password' required />
              {server_error.password && <small className='form-text text-danger'>{server_error.password[0]}</small>}
            </div>

            <div className="mb-3">
              <label htmlFor='password2' className='form-label'>Confirm New Password</label>
              <input type='password' className='form-control' id='password2' name='password2' required />
              {server_error.password2 && <small className='form-text text-danger'>{server_error.password2[0]}</small>}
            </div>

            <div className="text-center">
              <button type='submit' className='btn btn-primary mt-3 mb-2 px-5'>Save</button>
            </div>

            {server_error.non_field_errors && <div className='alert alert-danger mt-2'>{server_error.non_field_errors[0]}</div>}
            {server_msg.msg && <div className='alert alert-success mt-2'>{server_msg.msg}</div>}
          </form>
        </div>
      </div>
    </div>
  </>;
};

export default ResetPassword;
