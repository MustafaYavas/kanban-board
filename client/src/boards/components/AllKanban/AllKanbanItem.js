import Modal from '../../../shared/components/UI/Modal';
import Input from '../../../shared/components/UI/Input/Input';
import ErrorLayout from '../../../shared/components/UI/ErrorLayout';

import { useEffect, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../shared/store/user-slice';

const AllkanbanItem = (props) => {
    const { id, title, usageArea, creatorName, membersNumber, membersLength, createDate, boardPassword } = props;
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);
	const [error, setError] = useState();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const showModalHandler = () => {
        if(creatorName === user.user.username || user.user.memberBoards.includes(id)) return navigate(`/boards/${id}`);
        setShowModal(membersLength >= membersNumber ? false : true);
        navigate('/all-boards/join');
    }

    const closeModalHandler = () => {
        setShowModal(false);
        setIsTouched(false);     
        setFormError(true);   
        setPassword('');
        navigate('/all-boards');
    }

    const changePasswordHandler = (e) => {
        setPassword(e.target.value);
        setIsTouched(true);
    }

    useEffect(() => {
        if(password.length < 5) return setFormError(true);
        setFormError(false);
    }, [password]);

    const enterBoardHandler = async() => {
        setError()
        if(password === boardPassword) {
            try {
				const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/all-boards/join`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + user.token
					},
					body: JSON.stringify({boardId: id, boardPassword: password, userId: user.user.id})
				})
				const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                dispatch(userActions.addBoardToUser(id));
				navigate(`/boards/${id}`);
			} catch (error) {
				setError('Something went wrong while signing you up. Please try again later!');
			}
            
        } else {
            navigate('/all-boards');
            setTimeout(() => {
                setError('Wrong password. Please try again!');
            }, [500])
        }
    }

    return (
        <>  
            <ErrorLayout error={error} />
            <Modal 
                show={showModal} 
                closeHandler={closeModalHandler} 
                modalTitle='Enter Kanban Board Password'
                formError={formError}
                content={
                    <Input
                        label='Kanban Password'
                        icon={<RiLockPasswordLine />}
                        iconClass='top-2.5 left-2.5'
                        className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
                        onChange={changePasswordHandler}
                        value={password}
                        style={{ width: '21rem' }}
                        type='password'
                        placeholder='Enter Password'
                        error={isTouched && password.length < 5}
                        errorText='Can not be less than 5 characters!'
                    />
                }
                modalFunc={enterBoardHandler}
                buttonText='Enter'
            />
            <div 
                onClick={showModalHandler} 
                role={membersLength >= membersNumber ? '' : 'button'} 
                className='my-5 bg-slate-200 p-10 rounded-lg hover:bg-slate-300'
            >
                <div className='flex justify-between items-center'>
                    <p className='text-2xl font-semibold'>{title}</p>
                    <p className='text-md font-semibold text-red-700'>{membersLength >= membersNumber ? 'Full' : ''}</p>
                </div>
                <p className='font-medium'>{usageArea}</p>
                <div className='text-gray-600 flex flex-row font-medium'>
                    <p className='mr-5'>{creatorName}</p>
                    &bull;
                    <p className='mx-5'>{membersNumber}</p>
                    &bull;
                    <p className='ml-5'>{createDate}</p>
                </div>
            </div>
        </>

    )
}

export default AllkanbanItem;