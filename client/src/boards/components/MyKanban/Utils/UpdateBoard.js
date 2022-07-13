import Modal from '../../../../shared/components/UI/Modal';
import Input from '../../../../shared/components/UI/Input/Input';
import LoadingSpinner from '../../../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../../../shared/components/UI/ErrorLayout';
import { boardActions } from '../../../../shared/store/kanban-slice';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { BsQuestion } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux'

const UpdateBoard = () => {
    const board = useSelector(state => state.board).board;
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [usageArea, setUsageArea] = useState('');
	const [isTouched, setIsTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const navigate = useNavigate();
    const params = useParams().bid;
    const dispatch = useDispatch();
    
    const showModalHandler = () => {
        setError();
        setTitle(board.title);
        setUsageArea(board.usageArea);
        setShowModal(true);
        navigate(`/boards/${params}/update`);
    }

    const closeModalHandler = () => {
        setShowModal(false);
        setTitle(board.title);
        setUsageArea(board.usageArea);
        setIsTouched(false);
        navigate(`/boards/${params}`);
    }

    const changeTitleHandler = (e) => {
        setTitle(e.target.value);
        setIsTouched(true);
    }

    const changeUsageHandler = (e) => {
        setUsageArea(e.target.value);
        setIsTouched(true);
    }

    const updateHandler = async() => {
        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/boards/${params}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, usageArea})
            })
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData.message);
            }
            dispatch(boardActions.setCurrentBoard(responseData.board))
            navigate(`/boards/${params}`);
        } catch (error) {
            setError('Something went wrong while signing you up. Please try again later!');
        }
        setIsLoading(false);
    }

    // useEffect(() => {
    //     if(title.length === 0 || usageArea.length < 5) return setFormError(true);
    //     setFormError(false)
    // }, [title.length, usageArea.length])

    return (
        <>
            <ErrorLayout error={error} />
            {isLoading && <LoadingSpinner asOverlay />}
            <Link
                to={`/boards/${params}/update`}
                className='border border-blue-600 p-2 rounded-md font-medium hover:bg-blue-600 hover:text-white'
                onClick={showModalHandler}
            >
                Update Board
            </Link>

            <Modal 
                show={showModal} 
                closeHandler={closeModalHandler} 
                modalTitle='Update Board'
                formError={title.length === 0 || usageArea.length < 5}
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