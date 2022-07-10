import BoardTableItem from './BoardTableItem';
import Modal from '../../../shared/components/UI/Modal';
import Input from '../../../shared/components/UI/Input/Input'

import { AiOutlinePlus } from 'react-icons/ai';
import { BsListTask } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BoardTable = (props) => {
	const { tableTitle } = props;
	const [showModal, setShowModal] = useState(false);
	const [task, setTask] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);

	const changeTaskHandler = (e) => {
		setTask(e.target.value);
		setIsTouched(true);
	}

    const showModalHandler = () => {
        setShowModal(true);
    }

    const addItemHandler = () => {
        
    }

    const closeModalHandler = () => {
        setShowModal(false);
		setTask('');
		setIsTouched(false);
    }

	useEffect(() => {
        if(task.length === 0) return setFormError(true);
        setFormError(false);
    }, [task]);

	return (
		<div className='bg-slate-100 py-5 mb-5 rounded-lg shadow-lg'>
			<h1 className='font-semibold text-lg mx-3'>{tableTitle}</h1>

			<BoardTableItem />

			<Link to='/boards/1/add-task'>
				<div 
					onClick={showModalHandler} 
					className='flex justify-center items-center bg-white mt-5 mx-3 rounded-lg' 
					role='button'
				>
					<p className='m-2'>Add New Task</p>
					<AiOutlinePlus/>
				</div>
			</Link>

			<Modal 
            	show={showModal} 
            	closeHandler={closeModalHandler} 
            	modalTitle='Add Task'
            	formError={formError}
            	content={
					<Input
                        label='Task Name'
                        icon={<BsListTask />}
                        iconClass='top-2.5 left-2.5'
                        className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
                        onChange={changeTaskHandler}
                        value={task}
                        style={{ width: '21rem' }}
                        type='text'
                        placeholder='Task'
                        error={isTouched && task.length === 0}
                        errorText='Can not be empty!'
                    />
				}
            	modalFunc={addItemHandler}
            	buttonText='Add'
            />
		</div>
	);
};

export default BoardTable;
