import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../services/LocalStorageService';

function EditBook() {

    const [inputs, setInputs] = useState({
        name: '',
        author: '',
        publish_date: '',
        price: '',
        file:''
      });
    
    const [file , setFile] = useState()
    const navigate = useNavigate();
    const { id } = useParams();
    const { access_token } = getToken();

    useEffect(() => {
        getBook();
    }, []);

    function getBook() {
        axios.get(`http://127.0.0.1:8000/book/${id}/`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type":"multipart/form-data",
            }
        }).then(function (response) {
            setInputs(response.data);
            setFile(<a href={`http://localhost:8000${inputs.file}`} ></a>)
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleFileChange = (event) => {
        const name = event.target.name;
        const file = event.target.files[0];
        setInputs((values) => ({ ...values, [name]: file }));
    };

    const handlesubmit = (event) => {

        event.preventDefault();
        if (inputs.name.trim() === '' || inputs.author.trim() === '' || inputs.publish_date.trim() === '' ) {
            alert("Please fill in all fields.");
            return;
        }
        const formData = new FormData();
        formData.append("name", inputs.name);
        formData.append("author", inputs.author);
        formData.append("publish_date", inputs.publish_date);
        formData.append("price", inputs.price || 0); 
        formData.append("file", inputs.file);

        axios.put(`http://127.0.0.1:8000/book/${id}/`, formData, {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type":"multipart/form-data",
            },
        }).then(function (response) {
            navigate('/dashboard');
        });
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <h1>Edit book</h1>
                    <form onSubmit={handlesubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={inputs.name} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author">Author</label>
                            <input type="text" className="form-control" id="author" name="author" value={inputs.author} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="publish_date">Published Date</label>
                            <input type="date" className="form-control" id="publish_date" name="publish_date" value={inputs.publish_date} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price">Price</label>
                            <input type="number" className="form-control" id="price" name="price" value={inputs.price} min={0} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="myfile">Select a file:</label>
                            <input type="file" className="form-control" id="file" name="file"  onChange={handleFileChange} required></input>
                        </div>
                        <button type="submit" name="update" className="btn btn-primary">Save</button>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    )
}

export default EditBook