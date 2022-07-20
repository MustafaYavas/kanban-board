import LoadingSpinner from '../../shared/components/UI/Spinner/LoadingSpinner';
import UserProfile from '../components/UserProfile/UserProfile';
import ErrorLayout from '../../shared//components/UI/ErrorLayout';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../shared/store/user-slice';

const Profile = () => {
    const [userDatas, setUserDatas] = useState(null);
    const [error, setError] = useState();
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${params.username}`);
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                setUserDatas(responseData.user[0]);
                dispatch(userActions.setUserBoards(responseData.user[0].memberBoards));
            } catch (error) {
                setError('Could not load user infos. Please try again later!');
            }
        }

        fetchData();
    }, [params.username, dispatch])

    return (
        <div className='margin'>
            <ErrorLayout error={error} />
            { !userDatas && <LoadingSpinner asOverlay/> }
            { userDatas && <UserProfile datas={userDatas} /> }
        </div>
    )
}

export default Profile;