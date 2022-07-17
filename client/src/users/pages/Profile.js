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
                const response = await fetch(`http://localhost:5000/api/users/${params.username}`);
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                setUserDatas(responseData.user[0]);
                dispatch(userActions.setUserBoards(responseData.user[0].memberBoards));
            } catch (error) {
                setError('Could not load user infos. Please tyr again later!');
            }
        }

        fetchData();
    }, [params.username, dispatch])

    // useEffect(() => {
    //     const fetchBoards = async() => {
    //         let userBoardDatas = []
    //         for(let i=0; i<userDatas.memberBoards.length; i++) {
    //             try {
    //                 const response = await fetch(`http://localhost:5000/api/boards/${userDatas.memberBoards[i]}`);
    //                 const responseData = await response.json();
    //                 if(!response.ok) {
    //                     throw new Error(responseData.message);
    //                 }
    //                 userBoardDatas.push(responseData.board.id);
    //             } catch (error) {}
    //         }
    //         dispatch(userActions.setUserBoards(userBoardDatas));
    //     }
    //     userDatas && fetchBoards();
    // }, [userDatas, dispatch])

    return (
        <>
            <ErrorLayout error={error} />
            { !userDatas && <LoadingSpinner asOverlay/> }
            { userDatas && <UserProfile datas={userDatas} /> }
        </>
    )
}

export default Profile;