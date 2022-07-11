import Modal from '../../../../shared/components/UI/Modal';
import Input from '../../../../shared/components/UI/Input/Input';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { BsQuestion } from 'react-icons/bs';

const UpdateBoard = () => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [usageArea, setUsageArea] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);
    const navigate = useNavigate();

    const showModalHandler = () => {
        setShowModal(true);
        navigate('/boards/1/update');
    }

    const closeModalHandler = () => {
        setShowModal(false);
        setTitle('');
        setUsageArea('');
        setIsTouched(false);
        setFormError(true);
        navigate(`/boards/1`);
    }

    const changeTitleHandler = (e) => {
        setTitle(e.target.value);
        setIsTouched(true);
    }

    const changeUsageHandler = (e) => {
        setUsageArea(e.target.value);
        setIsTouched(true);
    }

    const updateHandler = () => {

    }

    useEffect(() => {
        if(title.length === 0 || usageArea.length < 5) return setFormError(true);
        setFormError(false)
    }, [title.length, usageArea.length])

    return (
        <>
            <Link
                to='/boards/1/update'
                className='border border-blue-600 p-2 rounded-md font-medium hover:bg-blue-600 hover:text-white'
                onClick={showModalHandler}
            >
                Update Board
            </Link>

            <Modal 
                show={showModal} 
                closeHandler={closeModalHandler} 
                modalTitle='Update Board'
                formError={formError}
                content={
                    <>
                        <Input
                            label='Kanban Title'
                            icon={<MdOutlineDriveFileRenameOutline />}
                            iconClass='top-2.5 left-2.5'
                            className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
                            onChange={changeTitleHandler}
                            value={title}
                            style={{ width: '21rem' }}
                            type='text'
                            placeholder='Title'
                            error={isTouched && title.length === 0}
                            errorText='Can not be empty!'
                        />

                        <Input
                            label='Usage Area'
                            icon={<BsQuestion />}
                            iconClass='top-2.5 left-2.5'
                            className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
                            onChange={changeUsageHandler}
                            value={usageArea}
                            style={{ width: '21rem' }}
                            type='text'
                            placeholder='What will you use it for? eg: Personal'
                            error={isTouched && usageArea.length < 5}
                            errorText='Can not be less than 5 characters!'
                        />
                    </>
                }
                modalFunc={updateHandler}
                buttonText='Update'
            />
        </>
    )
}

export default UpdateBoard;