// tüm kanbanları listele
import Modal from '../../../shared/components/UI/Modal';
import Input from '../../../shared/components/UI/Input/Input';

import { useEffect, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ErrorLayout from '../../../shared/components/UI/ErrorLayout';

const AllkanbanItem = (props) => {
    const { id, title, usageArea, creatorName, membersNumber, createDate, boardPassword } = props;
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);
	const [error, setError] = useState();
    const navigate = useNavigate();
    const user = useSelector(state => state.user).user.username;
    
    const showModalHandler = () => {
        setError();
        if(creatorName === user) return navigate(`/boards/${id}`)
        setShowModal(true);
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

    const enterBoardHandler = () => {
        if(password === boardPassword) {
            navigate(`/boards/${id}`)
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
            <div onClick={showModalHandler} role='button' className='my-5 bg-slate-200 p-10 rounded-lg hover:bg-slate-300'>
                <p className='text-2xl font-semibold'>{title}</p>
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