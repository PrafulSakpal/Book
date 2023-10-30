import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getToken } from '../services/LocalStorageService';
import axios from 'axios';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [userRole, setUserRole] = useState('');
  const { access_token } = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const data = await getLoggedUser(access_token);

        setUserRole(data.role);

        console.log('User role:', userRole);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

      getBooks();
    };

    fetchData();
  }, []);

  async function getLoggedUser(access_token) {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log('User data', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function getBooks() {
    const { access_token } = getToken();
    await axios.get('http://127.0.0.1:8000/books/', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then(function (response) {
      console.log(response.data);
      setBooks(response.data);
    });
  }

  const deleteBook = (id) => {
    axios.delete(`http://localhost:8000/book/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }).then(function (response) {
      getBooks();
    });
  };

  // const handleSubscription = () => {
  //   axios.post('http://127.0.0.1:8000/subscribe/', {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`,
  //     },
  //   })
  // }

  return (

    <div>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-md-12">

            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0 20px 0' }}>
              <h1 style={{ margin: '0 700px 0 0' }}>List  of Books</h1>
              {userRole === 'Admin' && (
                <Link data-testid="add new user" to="/addnewbook" className="btn btn-success" style={{ marginLeft: '10px' }}>Add New Book</Link>
              )}
              {/* {userRole !== 'Admin' && (<button className='btn btn-success'onClick={handleSubscription}>Subscribe</button>)} */}
            </div>

            <div className='table-responsive'>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>

                  <th>Name</th>
                  <th>Author</th>
                  <th>Published Date</th>
                  <th>Price</th>
                  <th>File</th>
                  {userRole === 'Admin' && (
                    <th>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {books && books.map((book) =>
                  <tr key={book.id} >

                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>{book.publish_date}</td>
                    <td>{book.price}</td>
                    <td>{book.file && <a href={`http://localhost:8000${book.file}`} >View Book</a>}</td>
                    {userRole === 'Admin' && (
                      <td>
                        <Link to={`/book/edit/${book.id}`} className="btn btn-primary" style={{ marginRight: "10px" }}>Edit</Link>
                        <button onClick={() => book.id && deleteBook(book.id)} className="btn btn-danger">Delete</button>
                      </td>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
