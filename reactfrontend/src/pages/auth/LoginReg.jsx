import { useState } from 'react';
import bookshoppic from '../../images/bookshoppic.jpg'
import Registration from './Registration';
import UserLogin from './UserLogin'; 

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

const LoginReg = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div
            className="col-6 mt-2 p-3"
            style={{
              backgroundImage: `url(${bookshoppic})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width:'600px',
              height: '70vh',
            }}
          ></div>
          <div className="col-6">
            <div className="card m-2 " style={{ width: '100%', height: '100%' }}>
              <div className="m-3" style={{ borderBottom: '1px solid #ccc' }}>
                <ul className="nav nav-tabs m-2 ">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${value === 0 ? 'active' : ''}`}
                      onClick={() => handleChange(null, 0)}
                      style={{ cursor: 'pointer', textTransform: 'none', fontWeight: 'bold' }}
                    >
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${value === 1 ? 'active' : ''}`}
                      onClick={() => handleChange(null, 1)}
                      style={{ cursor: 'pointer', textTransform: 'none', fontWeight: 'bold' }}
                    >
                      Registration
                    </a>
                  </li>
                </ul>
              </div>
              <TabPanel value={value} index={0}>
                <UserLogin />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Registration />
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginReg;
