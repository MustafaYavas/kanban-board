import LoadingSpinner from '../../shared/components/UI/Spinner/LoadingSpinner';
import UserProfile from '../components/UserProfile/UserProfile';
import ErrorLayout from '../../shared//components/UI/ErrorLayout';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [userDatas, setUserDatas] = useState(null);
    const [error, setError] = useState();
    const params = useParams();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${params.username}`);
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                setUserDatas(responseData.user[0]);
            } catch (error) {
                setError('Could not load user infos. Please tyr again later!');
            }
        }

        fetchData();
    }, [params.username])

    return (
        <>
            <ErrorLayout error={error} />
            { !userDatas && <LoadingSpinner asOverlay/> }
            { userDatas && <UserProfile datas={userDatas}/> }
        </>
    )
}

export default Profile;