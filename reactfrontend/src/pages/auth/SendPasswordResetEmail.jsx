import { useState } from 'react';
import axios from 'axios';

const SendPasswordResetEmail = () => {
  const [server_error, setServerError] = useState({})
  const [server_msg, setServerMsg] = useState({})

  const handleSubmit = async (e) => {
    try {

      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const actualData = {
        email: data.get('email'),
      }
      const res = await axios.post('http://127.0.0.1:8000/api/user/send-reset-password-email/', actualData)
      if (res.data) {
        console.log(typeof (res.data))
        console.log(res.data)
        setServerError({})
        setServerMsg(res.data)
        document.getElementById('password-reset-email-form').reset()
      }

    }
    catch (error) {
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
          <form onSubmit={handleSubmit} id='password-reset-email-form'>
            <div className="mb-3">
              <label htmlFor='email' className='form-label'>Email Address</label>
              <input type='email' className='form-control' id='email' name='email' placeholder='Enter your email' required />
              {server_error.email && <small className='form-text text-danger'>{server_error.email[0]}</small>}
            </div>

            <div className="text-center">
              <button type='submit' className='btn btn-primary mt-3 mb-2 px-5'>Send</button>
            </div>

            {server_error.non_field_errors && <div className='alert alert-danger mt-2'>{server_error.non_field_errors[0]}</div>}
            {server_msg.msg && <div className='alert alert-success mt-2'>{server_msg.msg}</div>}
          </form>
        </div>
      </div>
    </div>
  </>;
};

export default SendPasswordResetEmail;
