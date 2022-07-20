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
import { v4 as uuidv4 } from 'uuid';

const PRIORITIES = [
    'Low', 'Med', 'High'
]

const AddTask = (props) => {
    const { tables, user } = props;
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState('');
    const [tableName, setTableName] = useState(tables[0]);
    const [priorityName, setPriorityName] = useState(PRIORITIES[0]);
    const [memberName, setMemberName] = useState(null);
    const [members, setMembers] = useState(null);
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
    const navigate = useNavigate();
	const params = useParams().bid;
	const board = useSelector(state => state.board).board;
	const token = useSelector(state => state.user).token;
	const dispatch = useDispatch();
	
    const showModalHandler = () => {
		setShowModal(true);
		getMembers();
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

    const selectMemberHandler = async(e) => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${e.target.value}`);
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData.message);
            }
			setMemberName(responseData.user);
		} catch (error) {
			
		}
    }
	
    const addItemHandler = async() => {
		if(!memberName) return setError('You need to select a member!');
		setIsLoading(true);
		let newTask = {taskName: task, taskTable: tableName, taskPriority: priorityName, taskOwner: memberName[0].id, taskOwnerName: memberName[0].username, img: memberName[0].image, id: uuidv4()};
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/boards/${params}/add-task`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token
				},
				body: JSON.stringify(newTask)
			})
			const responseData = await response.json();
			if(!response.ok) {
				throw new Error(responseData.message);
			}
			dispatch(boardActions.addCurrentBoardTasks(newTask))
			navigate(`/boards/${params}`);
		} catch (error) {
			setError('Something went wrong while adding new task. Please try again later!');
		}
		setIsLoading(false);
		setMemberName(null)
    }

	const getMembers = async() => {
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/boards/${board.id}/members`);
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData.message);
            }
			if(responseData.members.length !== 0) setMembers(responseData.members)
			else setMembers([user])
		} catch (error) {
			
		}
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
					className='flex justify-center items-center px-5 rounded-lg bg-fuchsia-600 text-white hover:bg-fuchsia-500 ml-5' 
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

                            {
								members && 
								<>
									<p className='mb-2 font-semibold'>Assign Member</p>
									<select 
										onChange={selectMemberHandler} 
										className='border border-slate-300 rounded-lg font-medium text-sky-600 px-5 text-lg mb-4'
										
									>
										<option key={1} value='select member'>Select member</option>
										{
											members && members.map(member => (
												<option key={member.id} value={member.username}>{member.username}</option>
											))
										}

									</select>
								</>
							}
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