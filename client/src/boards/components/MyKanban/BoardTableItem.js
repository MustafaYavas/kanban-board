import Modal from '../../../shared//components/UI/Modal';
import { boardActions } from '../../../shared//store/kanban-slice'
import ErrorLayout from '../../../shared//components/UI/ErrorLayout';
import Button from '../../../shared/components/UI/Button';

import { AiOutlineClose } from 'react-icons/ai';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const BoardTableItem = (props) => {
    const { task, tables, id } = props;
	const board = useSelector(state => state.board).board;
	const user = useSelector(state => state.user);
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	
	const showModalHandler = () => {
		setShowModal(true);
	} 

	const closeModalHandler = () => {
		setShowModal(false);
		navigate(`/boards/${board.id}`)
	}

	const deleteTaskHandler = async() => {
		setError();
		const newTasks = board.tasks.filter(t => t.id !== task.id);
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/boards/${params.bid}`, {
				method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token
                },
                body: JSON.stringify(newTasks)
			});
			const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData.message);
            }
			dispatch(boardActions.updateCurrentBoardTasks(newTasks))
		} catch (error) {
			setError('Could not delete task. Please try again later!');
		}
	}

	const moveRightHandler = async() => {
		setError();
		const index = tables.findIndex(t => t === task.taskTable);
		dispatch(boardActions.moveBoardItemHandler({id: task.id, table: tables[index+1]}));
		
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/boards/${params.bid}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token
				},
				body: JSON.stringify({id: task.id, table: tables[index+1]})
			});
			const responseData = await response.json();
			if(!response.ok) {
				throw new Error(responseData.message);
			}
		} catch (error) {
			setError('Could not update task. Please try again later!');
		}
	}
	
	const moveLeftHandler = async() => {
		setError();
		const index = tables.findIndex(t => t === task.taskTable);
		dispatch(boardActions.moveBoardItemHandler({id: task.id, table: tables[index-1]}));
		
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/boards/${params.bid}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token
				},
				body: JSON.stringify({id: task.id, table: tables[index-1]})
			});
			const responseData = await response.json();
			if(!response.ok) {
				throw new Error(responseData.message);
			}
		} catch (error) {
			setError('Could not update task. Please try again later!');
		}
	}

	return (
		<>
			<ErrorLayout error={error} />
			<div className='rounded-lg bg-white mx-3 mt-5 py-2 shadow-lg'>
				<div className='flex justify-between items-center'>
					{task.taskPriority === 'Low' && (
						<p className='bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md text-center ml-2 w-1/2'>
							Low Priority
						</p>
					)}

					{task.taskPriority === 'Med' && (
						<p className='bg-gradient-to-r from-lime-500 to-green-500 text-white rounded-md text-center ml-2 w-1/2'>
							Med Priority
						</p>
					)}

					{task.taskPriority === 'High' && (
						<p className='bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md text-center ml-2 w-1/2'>
							High Priority
						</p>
					)}

					<div className='flex justify-end'>
						{
							task.taskTable !== 'Backlog' &&
							<Button
								onClick={moveLeftHandler} 
								className='border rounded-full h-8 w-8 flex justify-center items-center mx-2 hover:bg-fuchsia-500 hover:text-white'
							>
								<FaLessThan />
							</Button>
						}

						{
							task.taskTable !== 'Complete' &&
								<Button
								onClick={moveRightHandler} 
								className='border rounded-full h-8 w-8 flex justify-center items-center mx-2 hover:bg-pink-500 hover:text-white'
							>
								<FaGreaterThan />
							</Button>
						}
					</div>
				</div>

				<p className='ml-2 mt-2 font-normal text-lg'>{task.taskName}</p>
				<div className='flex justify-between items-center mt-2'>
					<img
						className='mx-2 self-end h-8 w-8'
						style={{ borderRadius: '50%' }}
						src={`${task.img}`}
						alt='person'
						data-for={id.toString()}
						data-tip
					/>
					<ReactTooltip 
						id={id.toString()}
						textColor='#FFFFFF' 
						backgroundColor='rgb(132 204 22)' 
						place='bottom' 
						effect='solid'
					>
						{task.taskOwnerName}
					</ReactTooltip>
					{
						board.owner === user.user.id && 
						<Link 
							to={`/boards/${board.id}/${task.id}`}
							onClick={showModalHandler} 
							className='border rounded-full h-8 w-8 flex justify-center items-center mx-2 hover:bg-red-600 hover:text-white'>
							<AiOutlineClose />
						</Link>
					}
				</div>
			</div>

			<Modal 
                show={showModal} 
                closeHandler={closeModalHandler} 
                modalTitle='Delete task'
                content={<p>Are you sure you want to delete this task</p>}
                modalFunc={deleteTaskHandler}
                buttonText='Delete'
            />
		</>
	);
};

export default BoardTableItem;
