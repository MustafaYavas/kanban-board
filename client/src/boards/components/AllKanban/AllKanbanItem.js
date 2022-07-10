// tüm kanbanları listele
import Modal from '../../../shared/components/UI/Modal';
import Input from '../../../shared/components/UI/Input/Input';

import { useEffect, useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri'

const AllkanbanItem = (props) => {
    const { title, usageArea, owner, numberOfMembers, createDate } = props;
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);

    const showModalHandler = () => {
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
        setIsTouched(false);     
        setFormError(true);   
        setPassword('');
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

    }

    return (
        <>  
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
                    <p className='mr-5'>{owner}</p>
                    &bull;
                    <p className='mx-5'>{numberOfMembers}</p>
                    &bull;
                    <p className='ml-5'>{createDate}</p>
                </div>
            </div>
        </>

    )
}

export default AllkanbanItem;