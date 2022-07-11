import Modal from '../../../../shared/components/UI/Modal';
import Input from '../../../../shared/components/UI/Input/Input';
import Select from '../../../../shared/components/UI/Select';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsListTask } from 'react-icons/bs';

const AddTask = (props) => {
    const { tables, options } = props
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState('');
	const [selectedTable, setSelectedtable] = useState('Backlog');
	const [selectedPriority, setSelectedPriority] = useState('Low');
	const [selectedMember, setSelectedMember] = useState('Mustafa');
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);
    const navigate = useNavigate();

    const showModalHandler = () => {
        setShowModal(true);
        navigate('/boards/1/add-task');
    }

    const closeModalHandler = () => {
        setShowModal(false);
        setIsTouched(false);
        setTask('');
        setFormError(true);
        navigate('/boards/1');
    }

    const changeTaskHandler = (e) => {
        setTask(e.target.value);
        setIsTouched(true);
    }

    const selectTableHandler = (e) => {
        setSelectedtable(e.target.value);
    }

    const selectPriorityHandler = (e) => {
        setSelectedPriority(e.target.value)
    }

    const selectMemberHandler = (e) => {
        setSelectedMember(e.target.value)
    }

    const addItemHandler = () => {

    }

    useEffect(() => {
        if(task.length === 0) return setFormError(true);
        setFormError(false);
    }, [task]);

    return (
        <>
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
					<>
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
						<div className='flex flex-col justify-center items-start'>
							<p className='mb-2 font-semibold'>Select Table</p>
							<Select 
								name='Table'
								className='border border-slate-300 rounded-lg font-medium text-sky-600 px-5 text-lg'
								options={tables}
								onChange={selectTableHandler}
								value={selectedTable}
							/>

							<p className='mb-2 mt-4 font-semibold'>Select Priority</p>
							<Select 
								name='Priority'
								className='border border-slate-300 rounded-lg font-medium text-sky-600 px-5 text-lg mb-4'
								options={options}
								onChange={selectPriorityHandler}
								value={selectedPriority}
							/>

                            <p className='mb-2 font-semibold'>Assign Member</p>
							<Select 
								name='Assing'
								className='border border-slate-300 rounded-lg font-medium text-sky-600 px-5 text-lg mb-4'
								options={options}
								onChange={selectMemberHandler}
								value={selectedMember}
							/>
						</div>
					</>
				}
            	modalFunc={addItemHandler}
            	buttonText='Add'
            />
        </>
    )
}

export default AddTask;