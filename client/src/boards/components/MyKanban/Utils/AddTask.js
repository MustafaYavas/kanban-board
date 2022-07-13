import Modal from '../../../../shared/components/UI/Modal';
import Input from '../../../../shared/components/UI/Input/Input';
import LoadingSpinner from '../../../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../../../shared/components/UI/ErrorLayout';
import { boardActions } from '../../../../shared/store/kanban-slice';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsListTask } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

const PRIORITIES = [
    'Low', 'Med', 'High'
]

const AddTask = (props) => {
    const { tables } = props;
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState('');
    const [tableName, setTableName] = useState(tables[0]);
    const [priorityName, setPriorityName] = useState(PRIORITIES[0]);
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
    const navigate = useNavigate();
	const params = useParams().bid;
	const user = useSelector(state => state.user).user;
	const dispatch = useDispatch();
	
    const showModalHandler = () => {
        setShowModal(true);
        navigate(`/boards/${params}/add-task`);
    }

    const closeModalHandler = () => {
        setShowModal(false);
        setIsTouched(false);
        setTask('');
        setFormError(true);
        navigate(`/boards/${params}`);
    }

    const changeTaskHandler = (e) => {
        setTask(e.target.value);
        setIsTouched(true);
    }

    const selectTableHandler = (e) => {
		setTableName(e.target.value);
    }

    const selectPriorityHandler = (e) => {
		setPriorityName(e.target.value);
    }

    // const selectMemberHandler = (e) => {
		
    // }

    const addItemHandler = async() => {
		setIsLoading(true);
		let newTask = {taskName: task, taskTable: tableName, taskPriority: priorityName, taskOwner: user.id, img: user.image};
		try {
			const response = await fetch(`http://localhost:5000/api/boards/boards/${params}/add-task`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newTask)
			})
			const responseData = await response.json();
			if(!response.ok) {
				throw new Error(responseData.message);
			}
			dispatch(boardActions.updateCurrentBoardTasks(newTask))
			navigate(`/boards/${params}`);
		} catch (error) {
			setError('Something went wrong while adding new task. Please try again later!');
		}
		setIsLoading(false);
    }

    useEffect(() => {
        if(task.length === 0) return setFormError(true);
        setFormError(false);
    }, [task]);

    return (
        <>
			<ErrorLayout error={error} />
			{isLoading && <LoadingSpinner asOverlay />}
            <Link to={`/boards/${params}/add-task`}>
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
							<select 
								onChange={selectTableHandler} 
								className='border border-slate-300 rounded-lg font-medium text-sky-600 px-5 text-lg'
							>
								{
									tables.map(board => (
										<option key={board} value={board}>{board}</option>
									))
								}
							</select>

							<p className='mb-2 mt-4 font-semibold'>Select Priority</p>
							<select 
								onChange={selectPriorityHandler} 
								className='border border-slate-300 rounded-lg font-medium text-sky-600 px-5 text-lg mb-4'
							>
								{
									PRIORITIES.map(board => (
										<option key={board} value={board}>{board}</option>
									))
								}
							</select>

                            {/* <p className='mb-2 font-semibold'>Assign Member</p>
							<select 
								onChange={selectMemberHandler} 
								className='border border-slate-300 rounded-lg font-medium text-sky-600 px-5 text-lg mb-4'
							>
								{
									boardDatas.map(board => (
										<option key={board.id} value={board.title}>{board.title}</option>
									))
								}
							</select> */}
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