import React, { useState} from 'react'
import { useEffect } from 'react';
import { getToken } from '../../services/LocalStorageService';
import axios from 'axios';



function ViewBook() {
    
    const { access_token } = getToken();
    const [userRole, setUserRole]=useState('');
    const [userId, setUserId] =useState(null);
    const [isSubscribed , setIsSubscribed] =useState(false)

    

    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await getLoggedUser(access_token);

                setUserRole(data.role);
                setUserId(data.id);
                console.log('User role:', userRole);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
        subscribedUser(userId);
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

    const subscribedUser= async (userId)=>{
        const response = await axios.get(`http://127.0.0.1:8000/subscribeduser/${userId}`)
        setIsSubscribed(response.is_subscribed);
    }
    console.log(isSubscribed)
    console.log(userRole)

    return (
        <div>
            {(isSubscribed === true || userRole === 'Admin') && (
                <div>
                    <h1>
                        view the book
                    </h1>
                </div>
            )}

            <div>
                <h3>
                    please subscribe
                </h3>
            </div>

        </div>
    )
}

export default ViewBook