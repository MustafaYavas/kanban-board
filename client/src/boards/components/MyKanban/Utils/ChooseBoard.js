import Modal from '../../../../shared/components/UI/Modal';

import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Select from '../../../../shared/components/UI/Select';

const ChooseBoard = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectDatas, setSelectDatas] = useState([]);
    const [chooseBoard, setChooseBoard] = useState('');
    const navigate = useNavigate();
    const userId = useSelector(state => state.user).user.id;
    
    useEffect(() => {
        const fetchDatas = async() => {
            let selectValue = [];
            try {
                const response = await fetch(`http://localhost:5000/api/boards/user/${userId}`);
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                for(let i=0; i<responseData.boards.length; i++) {
                    selectValue.push(responseData.boards[i].title)
                }
            } catch (error) {
                
            }
            setSelectDatas(selectValue);
        }
        fetchDatas();
    }, [userId])

    const showModalHandler = () => {
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
        navigate(-1, { replace: true });
    }

    const selectChooseHandler = (e) => {
        setChooseBoard(e.target.value);
        
    }

    const chooseHandler = () => {

    }

    return (
        <>
            <NavLink
                to='/boards/choose'
                className={ (navData) => navData.isActive ? 'border-b-2 border-blue-600' : '' }
                onClick={showModalHandler}
            >
                My Kanban
            </NavLink>

            <Modal 
                show={showModal} 
                closeHandler={closeModalHandler} 
                modalTitle='Choose a Board'
                content={
                    <Select 
						name='Choose'
						className='border border-slate-300 rounded-lg font-medium text-sky-600 px-5 text-lg'
						options={selectDatas}
						onChange={selectChooseHandler}
					    value={chooseBoard}
					/>
                }
                modalFunc={chooseHandler}
                buttonText='Choose'
            />
        </>
    )
}

export default ChooseBoard;